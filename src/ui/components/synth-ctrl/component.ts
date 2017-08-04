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

const INC: string = '+';
const DEC: string = '-';

export default class SynthCtrl extends Component {
  @tracked isRecording: boolean = false;
  @tracked isPlaying: boolean = false;
  @tracked volume: number;

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
        events,
      }
    } = this;
    this.volume = volume / VOLUME_INCREMENT;
    events
      .filter(({ type, key }) => {
        return type === 'keyup' && [INC, DEC].includes(key)
      })
      .subscribe(({ key }) =>
        key === INC ? this.increment() : this.decrement()
      );
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
    this.volume = this.audioService.volume / VOLUME_INCREMENT;
  }

  decrement(): void {
    this.audioService.decrementVolume();
    this.volume = this.audioService.volume / VOLUME_INCREMENT;
  }
}
