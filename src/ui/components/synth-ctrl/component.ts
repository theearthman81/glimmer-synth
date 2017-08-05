import Component, { tracked } from '@glimmer/component';
import {
  VOLUME_INCREMENT,
  AudioService,
  default as audioService,
} from '../../../utils/services/audio';
import {
  KeyService,
  default as keyService,
} from '../../../utils/services/key';

const DEC: string = '-';
const INC: string = '+';
const PLAY: string = '2';
const RECORD: string = '1';

const convertVolume = volume =>
  volume / VOLUME_INCREMENT;

export default class SynthCtrl extends Component {
  @tracked isRecording: boolean = false;
  @tracked isPlaying: boolean = false;
  @tracked volume: number;

  constructor(options) {
    super(options);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }
  get audioService(): AudioService {
    return audioService;
  }

  get keyService(): KeyService {
    return keyService;
  }

  didInsertElement(): void {
    const {
      audioService: {
        volume,
      },
      keyService: {
        keyup,
      },
    } = this;
    this.volume = convertVolume(volume);
    keyup
      .filter(({ type, key }) =>
        [DEC, INC, PLAY, RECORD].indexOf(key) > -1
      )
      .subscribe(this._handleKeyPress);
  }

  _handleKeyPress({ key }): void {
    switch (key) {
      case DEC:
        this.decrement();
        break;
      case INC:
        this.increment();
        break;
      case PLAY:
        this.play();
        break;
      case RECORD:
        this.record();
        break;
    }
  }

  record(): void {
    const {
      audioService,
      isRecording,
    } = this;
    if (isRecording) {
      audioService.stopRecording();
      this.isRecording = false;
    } else {
      audioService.startRecording();
      this.isRecording = true;
    }
  }

  play(): void {
    const {
      audioService,
      isPlaying,
    } = this;
    if (isPlaying) {
      audioService.audio.pause();
      this.isPlaying = false;
    } else {
      if (audioService.hasAudioRecording) {
        audioService.audio.play();
        this.isPlaying = true;
      }
    }
  }

  increment(): void {
    this.audioService.incrementVolume();
    this.volume = convertVolume(this.audioService.volume);
  }

  decrement(): void {
    this.audioService.decrementVolume();
    this.volume = convertVolume(this.audioService.volume);
  }
}
