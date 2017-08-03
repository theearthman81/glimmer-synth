import { Note } from './note';
import * as Rx from 'rxjs/Rx';

export class KeyService {

  constructor(){
    this.setup();
  }

  setup() {
    const keyDowns = Rx.Observable.fromEvent(document, 'keydown');
    const keyUps = Rx.Observable.fromEvent(document, 'keyup');

    this.events = Rx.Observable
      .merge(keyDowns, keyUps)
      .groupBy(e => e.keyCode)
      .map(group =>
        group.distinctUntilChanged(null, e => e.type)
      )
      .mergeAll();
  }
}

export default new KeyService();
