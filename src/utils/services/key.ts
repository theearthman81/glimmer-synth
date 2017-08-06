import * as Rx from 'rxjs/Rx';

interface IKeyEvent {
  type: string;
  key: string;
  keyCode: number;
}

export class KeyService {
  private _events: Rx.Observable<IKeyEvent>;

  public get keydown(): Rx.Observable<IKeyEvent> {
    return this.keypress.filter(({ type }) => type === 'keydown');
  }

  public get keypress(): Rx.Observable<IKeyEvent> {
    if (!this._events) {
      const keyDowns = Rx.Observable.fromEvent(document, 'keydown');
      const keyUps = Rx.Observable.fromEvent(document, 'keyup');

      this._events = Rx.Observable
        .merge(keyDowns, keyUps)
        .map(({ type, key, keyCode, which }) => ({
          key: key || which,
          keyCode,
          type,
        }))
        .groupBy(e => e.keyCode)
        .map(group => group.distinctUntilChanged(null, e => e.type))
        .mergeAll();
    }
    return this._events;
  }

  public get keyup(): Rx.Observable<IKeyEvent> {
    return this.keypress.filter(({ type }) => type === 'keyup');
  }
}

export default new KeyService();
