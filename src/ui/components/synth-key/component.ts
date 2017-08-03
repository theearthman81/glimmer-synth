import Component, { tracked } from '@glimmer/component';
import {
  AudioService,
  default as audioService,
} from '../../../utils/audio-service';
import { Note } from '../../../utils/note';
import * as Rx from 'rxjs/Rx';

export default class SynthKey extends Component {
  @tracked isActive: boolean;
  private _note: Note;

  get audioService(): AudioService {
    return audioService;
  }

  didInsertElement() {
    var keyDowns = Rx.Observable.fromEvent(document, 'keydown');

    keyDowns.subscribe(e =>
      this.isActive ? this.stop() : this.start()
    );
  }

  get note(): Note {
    if (!this._note) {
      const { name, octave } = this.args.key;
      this._note = this.audioService.createNote(name, octave);
    }
    return this._note;
  }

  start(): void {
    this.note.start();
    this.isActive = true;
  }

  stop(): void {
    this.note.stop();
    this.isActive = false;
  }
};
