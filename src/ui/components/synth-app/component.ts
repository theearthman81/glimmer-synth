import Component, { tracked } from '@glimmer/component';
import * as Rx from 'rxjs/Rx';
import { default as keyService, KeyService } from '../../../utils/services/key';

export default class SynthApp extends Component {
  @tracked public showTips: boolean = false;
  private keySub: Rx.Subscription;

  get keyService(): KeyService {
    return keyService;
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
