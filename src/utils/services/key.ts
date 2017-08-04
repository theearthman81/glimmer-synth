import * as Rx from 'rxjs/Rx';

interface KeyEvent {
  type: string;
  key: string;
  keyCode: number;
}

export class KeyService {
  private _events: Rx.Observable<KeyEvent>;

  get events(): Rx.Observable<KeyEvent> {
    if (!this._events) {
      const keyDowns = Rx.Observable.fromEvent(document, 'keydown');
      const keyUps = Rx.Observable.fromEvent(document, 'keyup');

      this._events = Rx.Observable
        .merge(keyDowns, keyUps)
        .map(({ type, key, keyCode, which}) => ({
          type,
          keyCode,
          key: key || which,
        }))
        .groupBy(e => e.keyCode)
        .map(group =>
          group.distinctUntilChanged(null, e => e.type)
        )
        .mergeAll();
    }
    return this._events;
  }
}

export default new KeyService();
