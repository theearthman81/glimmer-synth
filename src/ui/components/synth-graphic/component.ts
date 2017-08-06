import Component, { tracked } from '@glimmer/component';
import {
  AudioService,
  default as audioService,
} from '../../../utils/services/audio';

export default class SynthGraphic extends Component {
  public element: HTMLElement;
  private context: CanvasRenderingContext2D;

  constructor(options: object) {
    super(options);
    this._draw = this._draw.bind(this);
  }

  get audioService(): AudioService {
    return audioService;
  }

  get canvas(): HTMLCanvasElement {
    return this.element.querySelector('canvas');
  }

  public didInsertElement(): void {
    const { args: { height, width }, canvas } = this;
    this.context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    this._draw();
  }

  private _draw(): void {
    const {
      args: { height, width },
      audioService: service,
      canvas,
      context,
    } = this;
    const data = service.getAnalyserData();
    const blockUnit = height / 10;

    context.fillStyle = '#1A1A1A';
    context.fillRect(0, 0, width, height);

    for (let i = 0, l = data.length; i < l; i++) {
      const value = data[i];
      const percent = value / 256;
      const barHeight = height * percent;
      let offset = height - barHeight;
      const barWidth = (width - l * 2) / l;
      const blocks = Math.ceil(height / blockUnit);

      for (let j = 0, k = blocks; j < k; j++) {
        const green = j / k * 75 + 100;
        context.fillStyle = `rgb(30,${green},30)`;
        context.fillRect(i * (barWidth + 2), offset, barWidth, blockUnit);
        offset += blockUnit + 0.5;
      }
    }

    requestAnimationFrame(this._draw);
  }
}
