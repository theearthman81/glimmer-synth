import Component, { tracked } from '@glimmer/component';
import * as Rx from 'rxjs/Rx';
import {
  AudioService,
  default as audioService,
} from '../../../utils/services/audio';
import { Note } from '../../../utils/note';
import { KeyService, default as keyService } from '../../../utils/services/key';

export default class SynthKey extends Component {
  private _keySub: Rx.Subscription;
  private _note: Note;
  @tracked isActive: boolean;

  get audioService(): AudioService {
    return audioService;
  }

  @tracked('args')
  get keyName(): string {
    return this.args.key.name.toUpperCase();
  }

  get keyService(): KeyService {
    return keyService;
  }

  get note(): Note {
    if (!this._note) {
      const { key: { name, octave } } = this.args;
      this._note = this.audioService.createNote(name, octave);
    }
    return this._note;
  }

  didInsertElement(): void {
    const { args: { key: { shortcut } }, keyService: { keypress } } = this;
    this._keySub = keypress
      .filter(({ type, key }) => key === shortcut)
      .subscribe(() => (this.isActive ? this.stop() : this.start()));
  }

  willDestroy(): void {
    this._keySub.unsubscribe();
  }

  // *** actions ***
  start(): void {
    this.note.start();
    this.isActive = true;
  }

  stop(): void {
    this.note.stop();
    this.isActive = false;
  }
}
