import Component, { tracked } from '@glimmer/component';
import * as Rx from 'rxjs/Rx';
import {
  AudioService,
  default as audioService,
} from '../../../utils/services/audio';
import { default as keyService, KeyService } from '../../../utils/services/key';

export default class SynthApp extends Component {
  @tracked public showTips: boolean = false;
  private keySub: Rx.Subscription;

  get audioService(): AudioService {
    return audioService;
  }

  get keyService(): KeyService {
    return keyService;
  }

  get supportsAudio(): boolean {
    return this.audioService.supportsAudio;
  }

  public didInsertElement(): void {
    const { keyService: { keyup } } = this;
    this.keySub = keyup
      .filter(({ key }) => key === '?')
      .subscribe(() => (this.showTips = !this.showTips));
  }

  public willDestroy(): void {
    this.keySub.unsubscribe();
  }
}
