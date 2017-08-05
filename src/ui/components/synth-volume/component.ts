import Component, { tracked } from '@glimmer/component';

export const ANGLE: number = 30;

export default class SynthVolume extends Component {
  ticks: Array<number> = [...Array(11).keys()];

  @tracked('args')
  public get angle(): number {
    const max = ANGLE * (this.ticks.length - 1);
    return Math.min(this.args.volume * ANGLE, max);
  }
}
