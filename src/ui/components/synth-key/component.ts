import Component, { tracked } from '@glimmer/component';
import {
  AudioService,
  default as audioService,
} from '../../../utils/services/audio';
import { Note } from '../../../utils/note';
import {
  KeyService,
  default as keyService,
} from '../../../utils/services/key';

export default class SynthKey extends Component {
  @tracked isActive: boolean;
  private _note: Note;

  get audioService(): AudioService {
    return audioService;
  }

  get keyService(): KeyService {
    return keyService;
  }

  didInsertElement(): void {
    const {
      args: {
        key: {
          shortcut,
        },
      },
      keyService: {
        events,
      }
    } = this;
    events
      .filter(({ type, key }) =>
        key === shortcut
      )
      .subscribe(() =>
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
