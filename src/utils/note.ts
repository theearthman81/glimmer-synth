export const semitoneMap = {
  c: -9,
  d: -7,
  e: -5,
  f: -4,
  g: -2,
  a: 0,
  b: 2,
};

export const calculateSteps = (note: string, octave: number): number  =>
  ((4 - octave) * -12) + semitoneMap[note];

export const calculateFrequency = (semitones: number, base: number): number =>
  base * Math.pow(Math.pow(2, 1/12), semitones);

export class Note {
  context: AudioContext;
  destination: ConvolverNode;
  frequency: number;
  isPlaying: boolean;
  primary: OscillatorNode | null;
  secondary: OscillatorNode | null;
  constructor(note: string, octave: number, context: AudioContext, destination: ConvolverNode) {
    const [ pitch, symbol ] = note.split('');
    const semitones = calculateSteps(pitch, octave) + (symbol ? 1 : 0);
    this.frequency = calculateFrequency(semitones, 440.0);
    this.context = context;
    this.destination = destination;
    this.isPlaying = false;
  }

  start(): void {
    const {
      context,
      destination,
      frequency,
      isPlaying,
    } = this;
    if (!isPlaying) {
      const primary = context.createOscillator();
      const secondary = context.createOscillator();
      primary.connect(destination);
      secondary.connect(destination);
      primary.type = 'sawtooth';
      primary.detune.value = -4;
      primary.frequency.value = frequency;
      secondary.type = 'triangle';
      secondary.detune.value = 4;
      secondary.frequency.value = frequency;

      primary.start(0);
      secondary.start(0);
      this.isPlaying = true;

      this.primary = primary;
      this.secondary = secondary;
    }
  }

  stop(): void {
    const {
      isPlaying,
      primary,
      secondary,
    } = this;
    if (isPlaying) {
      primary.stop(0);
      secondary.stop(0);
      primary.disconnect();
      secondary.disconnect();
      this.primary = null;
      this.secondary = null;
      this.isPlaying = false;
    }
  }
}
