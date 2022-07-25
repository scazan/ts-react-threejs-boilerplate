
interface IOptions {
  audioContext: AudioContext;
}

const makeDistortionCurve = (amount: number) => {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;

  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};

class NoiseSynth {
  private masterGainNode: GainNode;
  private oscillator: OscillatorNode;

  constructor(options: IOptions) {
    const { audioContext } = options;

    this.setupGraph(audioContext);
  }

  private setupGraph(audioContext: AudioContext) {
    const masterGain = audioContext.createGain();
    masterGain.gain.value = 0;

    const distortion = audioContext.createWaveShaper();
    distortion.curve = makeDistortionCurve(40);
    distortion.oversample = '4x';

    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 700;

    const sineTerms = new Float32Array([0, 0, 1, 1, 1]);
    const cosineTerms = new Float32Array(sineTerms.length);
    const customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);

    const oscillator = audioContext.createOscillator();
    oscillator.setPeriodicWave(customWaveform);
    oscillator.start();

    oscillator.connect(distortion);
    distortion.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioContext.destination);

    // expose some variables
    this.oscillator = oscillator;
    this.masterGainNode = masterGain;
  }

  public setMasterVolume(value: number) {
    this.masterGainNode.gain.value = value;
  }

  public setFrequency(freq: number) {
    this.oscillator.frequency.value = freq;
  }

}

export default NoiseSynth;
