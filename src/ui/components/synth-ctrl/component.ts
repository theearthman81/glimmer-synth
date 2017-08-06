import Component, { tracked } from '@glimmer/component';
import * as Rx from 'rxjs/Rx';
import {
  AudioService,
  default as audioService,
  VOLUME_INCREMENT,
} from '../../../utils/services/audio';
import { default as keyService, KeyService } from '../../../utils/services/key';

const DEC: string = '-';
const INC: string = '+';
const PLAY: string = '2';
const RECORD: string = '1';

const convertVolume = (volume: number): number => volume / VOLUME_INCREMENT;

export default class SynthCtrl extends Component {
  @tracked public isPlaying: boolean = false;
  @tracked public isRecording: boolean = false;
  @tracked public volume: number;
  private keySub: Rx.Subscription;

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

  public decrement(): void {
    this.audioService.decrementVolume();
    this.volume = convertVolume(this.audioService.volume);
  }

  public increment(): void {
    this.audioService.incrementVolume();
    this.volume = convertVolume(this.audioService.volume);
  }

  public play(): void {
    const { audioService: service, isPlaying } = this;
    if (isPlaying) {
      service.audio.pause();
      this.isPlaying = false;
    } else {
      if (service.hasAudioRecording) {
        service.audio.play();
        this.isPlaying = true;
      }
    }
  }

  public record(): void {
    const { audioService: service, isRecording } = this;
    if (isRecording) {
      service.stopRecording();
      this.isRecording = false;
    } else {
      service.startRecording();
      this.isRecording = true;
    }
  }

  public didInsertElement(): void {
    const { audioService: { volume }, keyService: { keyup } } = this;
    this.volume = convertVolume(volume);
    this.keySub = keyup
      .filter(({ type, key }) => [DEC, INC, PLAY, RECORD].indexOf(key) > -1)
      .subscribe(this._handleKeyPress);
  }

  public willDestroy(): void {
    this.keySub.unsubscribe();
  }

  private _handleKeyPress({ key }): void {
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
}
