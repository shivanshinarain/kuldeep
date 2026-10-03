import React, { useState } from 'react';
import { BookOpen, Volume2, Sparkles, Layers } from 'lucide-react';
import { CHORD_DATA, playChordFrequencies } from '../utils/audio';

export default function ChordVisualizer() {
  const [selectedChordKey, setSelectedChordKey] = useState('C Maj');
  const [instrumentView, setInstrumentView] = useState('guitar'); // 'guitar' | 'piano'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const chord = CHORD_DATA[selectedChordKey] || CHORD_DATA['C Maj'];

  const handlePlayChord = () => {
    setIsPlayingAudio(true);
    playChordFrequencies(chord.frequencies, instrumentView);
    setTimeout(() => setIsPlayingAudio(false), 800);
  };

  // Guitar string names (6 to 1: low E to high e)
  const guitarStrings = ['E', 'A', 'D', 'G', 'B', 'e'];

  // Piano keys configuration for 2 octaves (24 semitones from C3 to B4)
  const pianoKeys = [
    { note: 'C', isBlack: false, semitone: 0 },
    { note: 'C#', isBlack: true, semitone: 1 },
    { note: 'D', isBlack: false, semitone: 2 },
    { note: 'D#', isBlack: true, semitone: 3 },
    { note: 'E', isBlack: false, semitone: 4 },
    { note: 'F', isBlack: false, semitone: 5 },
    { note: 'F#', isBlack: true, semitone: 6 },
    { note: 'G', isBlack: false, semitone: 7 },
    { note: 'G#', isBlack: true, semitone: 8 },
    { note: 'A', isBlack: false, semitone: 9 },
    { note: 'A#', isBlack: true, semitone: 10 },
    { note: 'B', isBlack: false, semitone: 11 },
    // Octave 2
    { note: 'C', isBlack: false, semitone: 12 },
    { note: 'C#', isBlack: true, semitone: 13 },
    { note: 'D', isBlack: false, semitone: 14 },
    { note: 'D#', isBlack: true, semitone: 15 },
    { note: 'E', isBlack: false, semitone: 16 },
    { note: 'F', isBlack: false, semitone: 17 },
    { note: 'F#', isBlack: true, semitone: 18 },
    { note: 'G', isBlack: false, semitone: 19 },
    { note: 'G#', isBlack: true, semitone: 20 },
    { note: 'A', isBlack: false, semitone: 21 },
    { note: 'A#', isBlack: true, semitone: 22 },
    { note: 'B', isBlack: false, semitone: 23 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold flex items-center space-x-2 text-slate-100">
            <BookOpen className="text-indigo-400" size={22} />
            <span>Interactive Chord Library & Visualizer</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fretboard fingerings, keyboard voicings, and real-time audio synthesis.
          </p>
        </div>

        {/* View Switcher: Guitar vs Piano */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setInstrumentView('guitar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              instrumentView === 'guitar'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🎸 Guitar</span>
          </button>
          <button
            onClick={() => setInstrumentView('piano')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
              instrumentView === 'piano'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🎹 Piano</span>
          </button>
        </div>
      </div>

      {/* Chord Selection Pills */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(CHORD_DATA).map(key => {
          const isSelected = selectedChordKey === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedChordKey(key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                isSelected
                  ? instrumentView === 'guitar'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/25'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {key}
            </button>
          );
        })}
      </div>

      {/* Chord Preview Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-slate-100">{chord.name}</span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono">
                {chord.notes.join(' - ')}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">{chord.formula}</p>
          </div>

          <button
            onClick={handlePlayChord}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg ${
              instrumentView === 'guitar'
                ? 'bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30'
                : 'bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40'
            } ${isPlayingAudio ? 'scale-95' : ''}`}
          >
            <Volume2 size={16} />
            <span>Play {instrumentView === 'guitar' ? 'Guitar Strum' : 'Piano Voicing'}</span>
          </button>
        </div>

        {/* Dynamic Visualizer: Guitar Fretboard */}
        {instrumentView === 'guitar' && (
          <div className="pt-2">
            <div className="text-[11px] font-mono text-slate-400 mb-2 flex justify-between">
              <span>Fretboard (Standard E A D G B e)</span>
              <span>Nut / Open strings</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-x-auto">
              {/* String Indicators (O = Open, X = Mute) */}
              <div className="grid grid-cols-6 text-center text-xs font-mono font-bold mb-2">
                {chord.guitar.frets.map((fret, idx) => (
                  <span
                    key={idx}
                    className={
                      fret === 'x'
                        ? 'text-rose-400'
                        : fret === '0'
                        ? 'text-emerald-400'
                        : 'text-slate-500'
                    }
                  >
                    {fret === 'x' ? '✕' : fret === '0' ? '○' : `fr ${fret}`}
                  </span>
                ))}
              </div>

              {/* Fret Grid (Frets 1 to 4) */}
              <div className="relative border-t-4 border-amber-500/60 pt-2 space-y-3">
                {[1, 2, 3, 4].map(fretNum => (
                  <div key={fretNum} className="relative flex items-center">
                    <span className="text-[10px] font-mono text-slate-500 w-6 flex-shrink-0">
                      F{fretNum}
                    </span>
                    <div className="flex-1 grid grid-cols-6 relative py-2 border-b border-slate-700/80">
                      {chord.guitar.frets.map((fretVal, strIdx) => {
                        const isPlacedHere = fretVal === String(fretNum);
                        const fingerNum = chord.guitar.fingers[strIdx];

                        return (
                          <div key={strIdx} className="flex justify-center items-center relative">
                            {/* Vertical string line */}
                            <div className="absolute inset-y-0 w-0.5 bg-slate-600/70"></div>

                            {/* Finger Marker Dot */}
                            {isPlacedHere && (
                              <div className="relative z-10 w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-mono text-xs font-black flex items-center justify-center shadow-lg shadow-amber-400/50">
                                {fingerNum || '•'}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom string labels */}
              <div className="grid grid-cols-6 text-center text-xs font-mono font-bold text-slate-400 mt-3 pl-6">
                {guitarStrings.map((s, idx) => (
                  <span key={idx}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Visualizer: Piano Keyboard */}
        {instrumentView === 'piano' && (
          <div className="pt-2">
            <div className="text-[11px] font-mono text-slate-400 mb-2 flex justify-between">
              <span>Interactive 2-Octave Keyboard</span>
              <span>Active Keys Highlighted</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-x-auto">
              <div className="relative flex justify-center h-36 min-w-[340px] select-none py-1">
                {pianoKeys.map((keyInfo, idx) => {
                  const isActive = chord.piano.octaveKeys.includes(keyInfo.semitone);

                  if (keyInfo.isBlack) {
                    return (
                      <div
                        key={idx}
                        className={`absolute z-10 w-5 sm:w-6 h-20 rounded-b-md transition-all ${
                          isActive
                            ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/70 border-b-2 border-amber-300'
                            : 'bg-slate-950 border border-slate-700 hover:bg-slate-800'
                        }`}
                        style={{
                          left: `calc(${calculateBlackKeyOffset(keyInfo.semitone)}% - 10px)`
                        }}
                      >
                        {isActive && (
                          <span className="absolute bottom-1.5 inset-x-0 text-[9px] font-mono font-black text-center">
                            {keyInfo.note}
                          </span>
                        )}
                      </div>
                    );
                  }

                  // White Key
                  return (
                    <div
                      key={idx}
                      className={`flex-1 h-32 rounded-b-lg border-x border-b transition-all flex flex-col justify-end items-center pb-2 ${
                        isActive
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-inner font-bold'
                          : 'bg-slate-200 border-slate-400 text-slate-800 hover:bg-white'
                      }`}
                    >
                      <span className={`text-[10px] font-mono font-black ${isActive ? 'text-white' : 'text-slate-600'}`}>
                        {keyInfo.note}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to position black keys cleanly across the 2-octave span
function calculateBlackKeyOffset(semitone) {
  // 14 white keys total in 2 octaves. Each white key is approx 100/14 = 7.14%
  const whiteKeyWidth = 100 / 14;
  // Map semitone to approximate white key boundary
  const semitoneToWhiteIndex = {
    1: 1,   // C#
    3: 2,   // D#
    6: 4,   // F#
    8: 5,   // G#
    10: 6,  // A#
    13: 8,  // C# (oct 2)
    15: 9,  // D#
    18: 11, // F#
    20: 12, // G#
    22: 13  // A#
  };
  const whiteIndex = semitoneToWhiteIndex[semitone] || 0;
  return whiteIndex * whiteKeyWidth;
}
