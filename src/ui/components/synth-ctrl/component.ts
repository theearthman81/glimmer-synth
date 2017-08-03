import Component, { tracked } from '@glimmer/component';
import {
  AudioService,
  default as audioService,
} from '../../../utils/audio-service';

export default class SynthCtrl extends Component {
  @tracked isRecording = false;
  @tracked isPlaying = false;
  @tracked volume = 0;

  get audioService(): AudioService {
    return audioService;
  }

  record() {
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

  play() {
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

  increment() {
    this.volume += 1;
  }
}
