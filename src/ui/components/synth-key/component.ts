import Component, { tracked } from '@glimmer/component';
import * as Rx from 'rxjs/Rx';
import { Note } from '../../../utils/note';
import {
  AudioService,
  default as audioService,
} from '../../../utils/services/audio';
import { default as keyService, KeyService } from '../../../utils/services/key';

export default class SynthKey extends Component {
  private _note: Note;
  private keySub: Rx.Subscription;
  @tracked private isActive: boolean;

  // *** actions ***
  public start(): void {
    this.note.start();
    this.isActive = true;
  }

  public stop(): void {
    this.note.stop();
    this.isActive = false;
  }

  public didInsertElement(): void {
    const { args: { key: { shortcut } }, keyService: { keypress } } = this;
    this.keySub = keypress
      .filter(({ type, key }) => key === shortcut)
      .subscribe(() => (this.isActive ? this.stop() : this.start()));
  }

  public willDestroy(): void {
    this.keySub.unsubscribe();
  }

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
}
