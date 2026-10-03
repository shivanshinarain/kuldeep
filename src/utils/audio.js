// Web Audio API Metronome and Chord Synthesizer Utilities

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a high-precision click sound for the metronome
 * @param {boolean} isAccent - True for the first beat of a measure
 */
export function playMetronomeClick(isAccent = false) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Accent beat is higher pitch and louder
    osc.type = isAccent ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(isAccent ? 1200 : 800, ctx.currentTime);

    // Envelope
    gain.gain.setValueAtTime(isAccent ? 0.8 : 0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (isAccent ? 0.08 : 0.05));

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + (isAccent ? 0.08 : 0.05));
  } catch (err) {
    console.warn("AudioContext error on click:", err);
  }
}

/**
 * Play a polyphonic chord using Web Audio synthesis
 * @param {number[]} frequencies - Array of note frequencies in Hz
 * @param {string} instrument - 'piano' | 'guitar'
 */
export function playChordFrequencies(frequencies, instrument = 'guitar') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = instrument === 'piano' ? 1.8 : 2.2;

    frequencies.forEach((freq, index) => {
      // Strumming delay between strings/keys
      const strumDelay = instrument === 'guitar' ? index * 0.04 : index * 0.015;
      const startTime = now + strumDelay;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = instrument === 'piano' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      // Low-pass filter for warmer acoustic tone
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(instrument === 'piano' ? 2400 : 3200, startTime);
      filter.frequency.exponentialRampToValueAtTime(400, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      // Volume envelope
      const maxGain = (0.28 / Math.sqrt(frequencies.length));
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(maxGain, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch (err) {
    console.warn("AudioContext chord error:", err);
  }
}

// Chord Database with frequencies, guitar frets, and piano keys
export const CHORD_DATA = {
  'C Maj': {
    name: 'C Major',
    instrument: 'Guitar & Piano',
    notes: ['C4', 'E4', 'G4'],
    frequencies: [261.63, 329.63, 392.00, 523.25], // C4, E4, G4, C5
    formula: '1 - 3 - 5 (Root, Major 3rd, Perfect 5th)',
    guitar: {
      frets: ['x', '3', '2', '0', '1', '0'], // strings: E, A, D, G, B, e
      fingers: ['', '3', '2', '', '1', ''],
      barre: null
    },
    piano: {
      keys: ['C', 'E', 'G'], // Active note names
      octaveKeys: [0, 4, 7] // semitone offset from C (0, 4, 7)
    }
  },
  'A Min': {
    name: 'A Minor',
    instrument: 'Guitar & Piano',
    notes: ['A3', 'C4', 'E4'],
    frequencies: [220.00, 261.63, 329.63, 440.00],
    formula: '1 - b3 - 5 (Root, Minor 3rd, Perfect 5th)',
    guitar: {
      frets: ['x', '0', '2', '2', '1', '0'],
      fingers: ['', '', '2', '3', '1', ''],
      barre: null
    },
    piano: {
      keys: ['A', 'C', 'E'],
      octaveKeys: [9, 12, 16]
    }
  },
  'F Maj': {
    name: 'F Major',
    instrument: 'Guitar & Piano',
    notes: ['F3', 'A3', 'C4'],
    frequencies: [174.61, 220.00, 261.63, 349.23],
    formula: '1 - 3 - 5 (Root, Major 3rd, Perfect 5th)',
    guitar: {
      frets: ['1', '3', '3', '2', '1', '1'],
      fingers: ['1', '3', '4', '2', '1', '1'],
      barre: 1
    },
    piano: {
      keys: ['F', 'A', 'C'],
      octaveKeys: [5, 9, 12]
    }
  },
  'G 7': {
    name: 'G Dominant 7th',
    instrument: 'Guitar & Piano',
    notes: ['G3', 'B3', 'D4', 'F4'],
    frequencies: [196.00, 246.94, 293.66, 349.23],
    formula: '1 - 3 - 5 - b7 (Dominant Tension)',
    guitar: {
      frets: ['3', '2', '0', '0', '0', '1'],
      fingers: ['3', '2', '', '', '', '1'],
      barre: null
    },
    piano: {
      keys: ['G', 'B', 'D', 'F'],
      octaveKeys: [7, 11, 14, 17]
    }
  },
  'D Min': {
    name: 'D Minor',
    instrument: 'Guitar & Piano',
    notes: ['D4', 'F4', 'A4'],
    frequencies: [293.66, 349.23, 440.00],
    formula: '1 - b3 - 5 (Root, Minor 3rd, Perfect 5th)',
    guitar: {
      frets: ['x', 'x', '0', '2', '3', '1'],
      fingers: ['', '', '', '2', '3', '1'],
      barre: null
    },
    piano: {
      keys: ['D', 'F', 'A'],
      octaveKeys: [2, 5, 9]
    }
  },
  'E Maj': {
    name: 'E Major',
    instrument: 'Guitar & Piano',
    notes: ['E3', 'G#3', 'B3'],
    frequencies: [164.81, 207.65, 246.94, 329.63],
    formula: '1 - 3 - 5 (Root, Major 3rd, Perfect 5th)',
    guitar: {
      frets: ['0', '2', '2', '1', '0', '0'],
      fingers: ['', '2', '3', '1', '', ''],
      barre: null
    },
    piano: {
      keys: ['E', 'G#', 'B'],
      octaveKeys: [4, 8, 11]
    }
  },
  'E Min': {
    name: 'E Minor',
    instrument: 'Guitar & Piano',
    notes: ['E3', 'G3', 'B3'],
    frequencies: [164.81, 196.00, 246.94, 329.63],
    formula: '1 - b3 - 5 (Root, Minor 3rd, Perfect 5th)',
    guitar: {
      frets: ['0', '2', '2', '0', '0', '0'],
      fingers: ['', '2', '3', '', '', ''],
      barre: null
    },
    piano: {
      keys: ['E', 'G', 'B'],
      octaveKeys: [4, 7, 11]
    }
  },
  'D Maj': {
    name: 'D Major',
    instrument: 'Guitar & Piano',
    notes: ['D4', 'F#4', 'A4'],
    frequencies: [293.66, 369.99, 440.00],
    formula: '1 - 3 - 5 (Root, Major 3rd, Perfect 5th)',
    guitar: {
      frets: ['x', 'x', '0', '2', '3', '2'],
      fingers: ['', '', '', '1', '3', '2'],
      barre: null
    },
    piano: {
      keys: ['D', 'F#', 'A'],
      octaveKeys: [2, 6, 9]
    }
  }
};
