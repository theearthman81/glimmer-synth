import { Note } from './note';

export class AudioService {
  private analyser: AnalyserNode;
  private analyserFreqs: Uint8Array;
  public audio: HTMLAudioElement;
  private audioData: Blob[];
  public context: AudioContext;
  private effect: ConvolverNode;
  public hasAudioRecording: boolean;
  private masterVolume: GainNode;
  private mediaRecorder: MediaRecorder;

  constructor() {
    this.context = new AudioContext();
    this.audio = new Audio();
    this.audioData = [];
    this.hasAudioRecording = false;
    this.setUpVolume();
    this.setUpEffect();
    this.setUpMediaRecorder();
    this.setUpAnalyser();
  }

  private setUpMediaRecorder(): void {
    const {
      audio,
      audioData,
      context,
      effect,
      masterVolume,
    } = this;
    const dest = context.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(dest.stream);
    mediaRecorder.ignoreMutedMedia = false;

    mediaRecorder.ondataavailable = ({ data }) =>
      audioData.push(data);

    mediaRecorder.onstop = () => {
      const blob = new Blob(
        audioData,
        {
          type: 'audio/ogg; codecs=opus',
        }
      );
      audio.src = URL.createObjectURL(blob);
      audio.loop = true;
      this.hasAudioRecording = true;
    };

    masterVolume.connect(dest);
    effect.connect(dest);
    this.mediaRecorder = mediaRecorder;
  }

  setUpVolume(): void {
    const masterVolume = this.context.createGain();
    masterVolume.gain.value = 0.25;
    masterVolume.connect(this.context.destination);
    this.masterVolume = masterVolume;
  }

  setUpEffect() {
    // create white noise.
    const { context } = this;
    const { sampleRate } = context;
    const convolver = context.createConvolver();
    const buffer = context.createBuffer(2, 0.5 * sampleRate, sampleRate);
    let left = buffer.getChannelData(0);
    let right = buffer.getChannelData(1);
    for (let i = 0; i < buffer.length; i++) {
      left[i] = Math.random() * 1 - 1;
      right[i] = Math.random() * 1 - 1;
    }
    convolver.buffer = buffer;
    convolver.connect(context.destination);
    this.effect = convolver;
  }

  setUpAnalyser() {
    const {
      context,
      effect,
      masterVolume,
    } = this;
    const analyser = context.createAnalyser();
    analyser.fftSize = 64;
    const analyserFreqs = new Uint8Array(analyser.frequencyBinCount);
    analyser.connect(context.destination);
    masterVolume.connect(analyser);
    effect.connect(analyser);
    this.analyser = analyser;
    this.analyserFreqs = analyserFreqs;
  }

  getAnalyserData(): Uint8Array  {
    let {
      analyser,
      analyserFreqs,
    } = this;
    analyser.getByteFrequencyData(analyserFreqs);
    return analyserFreqs;
  }

  startRecording(): void {
    const {
      context,
      mediaRecorder,
      masterVolume,
    } = this;
    this.audioData = [];
    const silence = context.createBufferSource();
    silence.connect(masterVolume);
    mediaRecorder.start(0);
  }

  stopRecording(): void {
    this.mediaRecorder.stop();
  }

  createNote(note: string, octave: number): Note {
    return new Note(note, octave, this.context, this.effect);
  }
}

export default new AudioService();
