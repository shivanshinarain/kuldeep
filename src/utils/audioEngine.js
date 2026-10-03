// Comprehensive Web Audio Engine for Kuldeep Gaur Music Platform
// Features: Polyphonic Synth, Acoustic Pluck, Drum Synthesizer, Scale Sequencer, Microphone Pitch Detection

let audioCtx = null;
let masterGain = null;
let analyserNode = null;

export function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.85, audioCtx.currentTime);

      analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 256;
      analyserNode.smoothingTimeConstant = 0.8;

      masterGain.connect(analyserNode);
      analyserNode.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function getAudioAnalyser() {
  getAudioContext();
  return analyserNode;
}

// Frequency helper for Note Names (e.g. 'C4' -> 261.63)
export const NOTE_FREQUENCIES = {
  'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.47,
  'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
  'C6': 1046.50
};

// Standard Guitar String Open Tunings (6 to 1: E2, A2, D3, G3, B3, E4)
export const GUITAR_STRINGS = [
  { name: 'E', octave: 2, freq: 82.41, label: '6th String (Low E)' },
  { name: 'A', octave: 2, freq: 110.00, label: '5th String (A)' },
  { name: 'D', octave: 3, freq: 146.83, label: '4th String (D)' },
  { name: 'G', octave: 3, freq: 196.00, label: '3rd String (G)' },
  { name: 'B', octave: 3, freq: 246.94, label: '2nd String (B)' },
  { name: 'e', octave: 4, freq: 329.63, label: '1st String (High e)' }
];

export function getFretFrequency(stringIndex, fretNumber) {
  const baseFreq = GUITAR_STRINGS[stringIndex]?.freq || 82.41;
  return baseFreq * Math.pow(2, fretNumber / 12);
}

const CHROMATIC_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function getNoteNameFromFreq(freq) {
  const a4 = 440;
  const semitonesFromA4 = Math.round(12 * Math.log2(freq / a4));
  const noteIndex = (semitonesFromA4 + 69) % 12;
  const octave = Math.floor((semitonesFromA4 + 69) / 12) - 1;
  return {
    name: CHROMATIC_NOTES[noteIndex],
    octave,
    cents: Math.floor(1200 * Math.log2(freq / (a4 * Math.pow(2, semitonesFromA4 / 12))))
  };
}

/**
 * Play a warm, acoustic grand piano note
 */
export function playPianoNote(freqOrNote, duration = 1.5) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const freq = typeof freqOrNote === 'string' ? (NOTE_FREQUENCIES[freqOrNote] || 440) : freqOrNote;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2, now); // Harmonic

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3200, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (e) {
    console.warn('Piano tone error:', e);
  }
}

/**
 * Play an acoustic or electric guitar string pluck
 */
export function playGuitarPluck(stringIndex, fret = 0, isElectric = false, duration = 2.0) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const freq = getFretFrequency(stringIndex, fret);
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = isElectric ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = isElectric ? 'bandpass' : 'lowpass';
    filter.frequency.setValueAtTime(isElectric ? 2200 : 3600, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(isElectric ? 0.3 : 0.45, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {
    console.warn('Guitar pluck error:', e);
  }
}

/**
 * Play a polyphonic chord with natural strum timing
 */
export function playChord(frequencies, instrument = 'guitar') {
  try {
    const ctx = getAudioContext();
    if (!ctx || !frequencies || frequencies.length === 0) return;

    const now = ctx.currentTime;
    const duration = instrument === 'piano' ? 2.0 : 2.4;
    const strumGap = instrument === 'guitar' ? 0.035 : 0.015;

    frequencies.forEach((freq, idx) => {
      const startTime = now + idx * strumGap;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = instrument === 'piano' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(instrument === 'piano' ? 2600 : 3200, startTime);
      filter.frequency.exponentialRampToValueAtTime(350, startTime + duration);

      const maxGain = 0.3 / Math.sqrt(frequencies.length);
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(maxGain, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch (e) {
    console.warn('Play chord error:', e);
  }
}

/**
 * Play a scale sequence with controllable tempo
 */
export function playScaleSequence(frequencies, speedMs = 320, instrument = 'piano', onNoteIndex) {
  frequencies.forEach((freq, idx) => {
    setTimeout(() => {
      if (instrument === 'guitar') {
        playGuitarPluck(0, 0, false, 0.8);
      } else {
        playPianoNote(freq, 0.8);
      }
      if (onNoteIndex) onNoteIndex(idx);
    }, idx * speedMs);
  });
}

/**
 * Synthesize electronic & acoustic drum voices for the Rhythm Lab & Beat Maker
 */
export function playDrumSound(type = 'kick') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'kick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.25);
      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'snare') {
      // Noise + Tone
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      oscGain.gain.setValueAtTime(0.5, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.12);

      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(1000, now);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.55, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noise.start(now);
      noise.stop(now + 0.18);
    } else if (type === 'hihat') {
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(7000, now);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      noise.start(now);
      noise.stop(now + 0.05);
    } else if (type === 'clap') {
      [0, 0.012, 0.024].forEach((burstTime) => {
        const bufferSize = ctx.sampleRate * 0.04;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, now + burstTime);
        gain.gain.exponentialRampToValueAtTime(0.001, now + burstTime + 0.05);
        noise.connect(gain);
        gain.connect(masterGain);
        noise.start(now + burstTime);
        noise.stop(now + burstTime + 0.05);
      });
    } else if (type === 'tabla') {
      // Warm resonant Indian percussion bols simulation
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.28);
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {
    console.warn('Drum sound error:', e);
  }
}

/**
 * Microphone Pitch Detection using Autocorrelation Algorithm
 */
export class LivePitchDetector {
  constructor(onPitch, onError) {
    this.onPitch = onPitch;
    this.onError = onError;
    this.stream = null;
    this.source = null;
    this.analyser = null;
    this.animationId = null;
    this.isRunning = false;
  }

  async start() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone API not supported on this browser.');
      }
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = getAudioContext();
      this.analyser = ctx.createAnalyser();
      this.analyser.fftSize = 2048;
      this.source = ctx.createMediaStreamSource(this.stream);
      this.source.connect(this.analyser);
      this.isRunning = true;
      this.detect();
    } catch (err) {
      this.isRunning = false;
      if (this.onError) this.onError(err);
    }
  }

  detect() {
    if (!this.isRunning) return;

    const buffer = new Float32Array(this.analyser.fftSize);
    this.analyser.getFloatTimeDomainData(buffer);

    // Compute RMS volume
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
    const rms = Math.sqrt(sum / buffer.length);

    if (rms > 0.015) {
      const pitch = this.autoCorrelate(buffer, audioCtx.sampleRate);
      if (pitch !== -1 && pitch > 60 && pitch < 1200) {
        const noteInfo = getNoteNameFromFreq(pitch);
        if (this.onPitch) {
          this.onPitch({
            frequency: Math.round(pitch * 10) / 10,
            note: noteInfo.name,
            octave: noteInfo.octave,
            cents: noteInfo.cents
          });
        }
      }
    }

    this.animationId = requestAnimationFrame(() => this.detect());
  }

  autoCorrelate(buf, sampleRate) {
    let SIZE = buf.length;
    let MAX_SAMPLES = Math.floor(SIZE / 2);
    let best_offset = -1;
    let best_correlation = 0;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1;

    let lastCorrelation = 1;
    for (let offset = 0; offset < MAX_SAMPLES; offset++) {
      let correlation = 0;
      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs(buf[i] - buf[i + offset]);
      }
      correlation = 1 - correlation / MAX_SAMPLES;
      if (correlation > 0.9 && correlation > lastCorrelation) {
        if (correlation > best_correlation) {
          best_correlation = correlation;
          best_offset = offset;
        }
      }
      lastCorrelation = correlation;
    }

    if (best_correlation > 0.5 && best_offset > 0) {
      return sampleRate / best_offset;
    }
    return -1;
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.source) this.source.disconnect();
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  }
}
