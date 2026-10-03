import React, { useState } from 'react';
import { Volume2, Play, Sparkles, ChevronRight, Layers } from 'lucide-react';
import { playPianoNote, playChord, playScaleSequence, NOTE_FREQUENCIES } from '../utils/audioEngine';
import AudioVisualizer from './AudioVisualizer';

// Full 2-octave keyboard mapping (C3 to C5: 25 keys)
const PIANO_KEYS = [
  { note: 'C3', name: 'C', isBlack: false, freq: 130.81 },
  { note: 'C#3', name: 'C#', isBlack: true, freq: 138.59 },
  { note: 'D3', name: 'D', isBlack: false, freq: 146.83 },
  { note: 'D#3', name: 'D#', isBlack: true, freq: 155.56 },
  { note: 'E3', name: 'E', isBlack: false, freq: 164.81 },
  { note: 'F3', name: 'F', isBlack: false, freq: 174.61 },
  { note: 'F#3', name: 'F#', isBlack: true, freq: 185.00 },
  { note: 'G3', name: 'G', isBlack: false, freq: 196.00 },
  { note: 'G#3', name: 'G#', isBlack: true, freq: 207.65 },
  { note: 'A3', name: 'A', isBlack: false, freq: 220.00 },
  { note: 'A#3', name: 'A#', isBlack: true, freq: 233.08 },
  { note: 'B3', name: 'B', isBlack: false, freq: 246.94 },

  { note: 'C4', name: 'C', isBlack: false, freq: 261.63, isMiddleC: true },
  { note: 'C#4', name: 'C#', isBlack: true, freq: 277.18 },
  { note: 'D4', name: 'D', isBlack: false, freq: 293.66 },
  { note: 'D#4', name: 'D#', isBlack: true, freq: 311.13 },
  { note: 'E4', name: 'E', isBlack: false, freq: 329.63 },
  { note: 'F4', name: 'F', isBlack: false, freq: 349.23 },
  { note: 'F#4', name: 'F#', isBlack: true, freq: 369.99 },
  { note: 'G4', name: 'G', isBlack: false, freq: 392.00 },
  { note: 'G#4', name: 'G#', isBlack: true, freq: 415.30 },
  { note: 'A4', name: 'A', isBlack: false, freq: 440.00 },
  { note: 'A#4', name: 'A#', isBlack: true, freq: 466.16 },
  { note: 'B4', name: 'B', isBlack: false, freq: 493.88 },

  { note: 'C5', name: 'C', isBlack: false, freq: 523.25 },
];

const PIANO_CHORDS = {
  'C Major': { notes: ['C4', 'E4', 'G4'], formula: 'Root - Maj 3rd - 5th', freqs: [261.63, 329.63, 392.00] },
  'D Major': { notes: ['D4', 'F#4', 'A4'], formula: 'Root - Maj 3rd - 5th', freqs: [293.66, 369.99, 440.00] },
  'E Major': { notes: ['E3', 'G#3', 'B3'], formula: 'Root - Maj 3rd - 5th', freqs: [164.81, 207.65, 246.94] },
  'F Major': { notes: ['F3', 'A3', 'C4'], formula: 'Root - Maj 3rd - 5th', freqs: [174.61, 220.00, 261.63] },
  'G Major': { notes: ['G3', 'B3', 'D4'], formula: 'Root - Maj 3rd - 5th', freqs: [196.00, 246.94, 293.66] },
  'A Major': { notes: ['A3', 'C#4', 'E4'], formula: 'Root - Maj 3rd - 5th', freqs: [220.00, 277.18, 329.63] },
  'B Major': { notes: ['B3', 'D#4', 'F#4'], formula: 'Root - Maj 3rd - 5th', freqs: [246.94, 311.13, 369.99] },

  'C Minor': { notes: ['C4', 'D#4', 'G4'], formula: 'Root - Min 3rd - 5th', freqs: [261.63, 311.13, 392.00] },
  'D Minor': { notes: ['D4', 'F4', 'A4'], formula: 'Root - Min 3rd - 5th', freqs: [293.66, 349.23, 440.00] },
  'E Minor': { notes: ['E3', 'G3', 'B3'], formula: 'Root - Min 3rd - 5th', freqs: [164.81, 196.00, 246.94] },
  'F Minor': { notes: ['F3', 'G#3', 'C4'], formula: 'Root - Min 3rd - 5th', freqs: [174.61, 207.65, 261.63] },
  'G Minor': { notes: ['G3', 'A#3', 'D4'], formula: 'Root - Min 3rd - 5th', freqs: [196.00, 233.08, 293.66] },
  'A Minor': { notes: ['A3', 'C4', 'E4'], formula: 'Root - Min 3rd - 5th', freqs: [220.00, 261.63, 329.63] },
  'B Minor': { notes: ['B3', 'D4', 'F#4'], formula: 'Root - Min 3rd - 5th', freqs: [246.94, 293.66, 369.99] },
};

const PIANO_SCALES = {
  'C Major': { notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], formula: 'W - W - H - W - W - W - H' },
  'G Major': { notes: ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F#4', 'G4'], formula: '1 Sharp (F#)' },
  'D Major': { notes: ['D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4', 'D4'], formula: '2 Sharps (F#, C#)' },
  'F Major': { notes: ['F3', 'G3', 'A3', 'A#3', 'C4', 'D4', 'E4', 'F4'], formula: '1 Flat (Bb/A#)' },
  'A Natural Minor': { notes: ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'], formula: 'W - H - W - W - H - W - W' },
  'E Natural Minor': { notes: ['E3', 'F#3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4'], formula: '1 Sharp (F#)' },
  'Chromatic Scale': { notes: ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'], formula: 'All Semitones (Half Steps)' }
};

export default function PianoLab() {
  const [activeTab, setActiveTab] = useState('keyboard'); // 'keyboard' | 'chords' | 'scales'
  const [pressedNote, setPressedNote] = useState(null);
  const [showLabels, setShowLabels] = useState(true);

  // Chord Explorer State
  const [selectedChordKey, setSelectedChordKey] = useState('C Major');
  const [isPlayingChord, setIsPlayingChord] = useState(false);

  // Scale Explorer State
  const [selectedScaleKey, setSelectedScaleKey] = useState('C Major');
  const [isPlayingScale, setIsPlayingScale] = useState(false);
  const [activeScaleNote, setActiveScaleNote] = useState(null);

  const activeChord = PIANO_CHORDS[selectedChordKey];
  const activeScale = PIANO_SCALES[selectedScaleKey];

  const handleKeyClick = (keyItem) => {
    setPressedNote(keyItem.note);
    playPianoNote(keyItem.freq, 1.8);
    setTimeout(() => {
      setPressedNote((prev) => (prev === keyItem.note ? null : prev));
    }, 400);
  };

  const handlePlayChord = (arpeggio = false) => {
    setIsPlayingChord(true);
    if (arpeggio) {
      activeChord.freqs.forEach((freq, idx) => {
        setTimeout(() => playPianoNote(freq, 1.5), idx * 220);
      });
      setTimeout(() => setIsPlayingChord(false), activeChord.freqs.length * 220 + 300);
    } else {
      playChord(activeChord.freqs, 'piano');
      setTimeout(() => setIsPlayingChord(false), 900);
    }
  };

  const handlePlayScale = () => {
    setIsPlayingScale(true);
    const freqs = activeScale.notes.map((n) => NOTE_FREQUENCIES[n] || 440);
    playScaleSequence(freqs, 300, 'piano', (idx) => {
      setActiveScaleNote(activeScale.notes[idx]);
    });
    setTimeout(() => {
      setIsPlayingScale(false);
      setActiveScaleNote(null);
    }, freqs.length * 300 + 400);
  };

  // Determine key highlights based on active tab
  const isKeyHighlighted = (noteName) => {
    if (activeTab === 'chords' && activeChord?.notes.includes(noteName)) return true;
    if (activeTab === 'scales' && activeScale?.notes.includes(noteName)) return true;
    return false;
  };

  const whiteKeys = PIANO_KEYS.filter((k) => !k.isBlack);

  return (
    <section id="piano" className="py-24 lg:py-36 bg-[#14130F] text-[#F4F0E8] px-6 lg:px-12 border-t border-b border-[#F4F0E8]/10 relative overflow-hidden">
      
      {/* Subtle atmospheric glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E6B83A]/5 rounded-full filter blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-[#F4F0E8]/15 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-[#E6B83A] uppercase px-2 py-0.5 border border-[#E6B83A]/30">
                02 // DISCIPLINE SANCTUARY
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/50">
                88-Key Acoustic & Digital Keys
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase font-serif">
              THE PIANO <span className="italic font-light text-[#E6B83A]">SANCTUARY</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base font-mono text-[#F4F0E8]/70 max-w-lg leading-relaxed">
            From foundational finger independence to concert-grade classical interpretation and contemporary chord voicing under personal guidance of <strong className="text-[#E6B83A]">Kuldeep Gaur</strong>.
          </p>
        </div>

        {/* Responsive Photography Storytelling */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7">
            <div 
              onClick={() => handlePlayChord(false)}
              className="relative group overflow-hidden border border-[#F4F0E8]/20 shadow-2xl bg-black/50 cursor-pointer active:scale-95 transition-transform duration-300 touch-manipulation"
              title="Tap to hear piano harmony"
            >
              <img 
                src="https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=1400&q=85" 
                alt="Concert Grand Piano at GIPA Studio" 
                loading="lazy"
                className="w-full h-[260px] sm:h-[380px] md:h-[460px] lg:h-[480px] object-cover object-center grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-[#111111]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#F4F0E8]/20 font-mono text-[11px] uppercase tracking-widest text-[#E6B83A] font-bold">
                Concert Grand Dynamics
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                    Dynamic Articulation
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F4F0E8]">
                    Touch, Weight & Pedaling
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#F4F0E8]/60 bg-black/60 px-3 py-1 border border-[#F4F0E8]/10 shrink-0 self-start sm:self-auto">
                  Click To Strum Harmonic Chime
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            <div 
              onClick={() => handleKeyClick(PIANO_KEYS[4])}
              className="relative group overflow-hidden border border-[#F4F0E8]/20 shadow-xl bg-black/50 cursor-pointer active:scale-95 transition-transform duration-300 touch-manipulation"
            >
              <img 
                src="https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=1000&q=85" 
                alt="Pianist Hands & Touch Mechanics" 
                loading="lazy"
                className="w-full h-[180px] sm:h-[220px] object-cover object-center grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#F4F0E8] uppercase tracking-wider">Finger Independence</span>
                <span className="text-[#E6B83A] text-[10px] uppercase tracking-widest font-bold">01 // Posture</span>
              </div>
            </div>

            <div 
              onClick={() => handleKeyClick(PIANO_KEYS[12])}
              className="relative group overflow-hidden border border-[#F4F0E8]/20 shadow-xl bg-black/50 cursor-pointer active:scale-95 transition-transform duration-300 touch-manipulation"
            >
              <img 
                src="https://images.unsplash.com/photo-1571974599782-87624638275e?auto=format&fit=crop&w=1000&q=85" 
                alt="Classical Sheet Music & Grand Staff" 
                loading="lazy"
                className="w-full h-[180px] sm:h-[220px] object-cover object-center grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#F4F0E8] uppercase tracking-wider">Notation & Harmony</span>
                <span className="text-[#E6B83A] text-[10px] uppercase tracking-widest font-bold">02 // Lead Sheets</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE PIANO LAB                                          */}
        {/* ============================================================== */}
        <div className="border border-[#F4F0E8]/20 p-6 sm:p-10 bg-[#181612] space-y-8 shadow-2xl">
          
          {/* Header & Mode Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F4F0E8]/10 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block font-bold">
                // INTERACTIVE VIRTUAL PIANO LAB
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-serif uppercase tracking-tight">
                Two-Octave Acoustic Synthesis
              </h3>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'keyboard', label: 'FREE PLAY' },
                { id: 'chords', label: 'CHORD EXPLORER' },
                { id: 'scales', label: 'SCALE EXPLORER' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                      : 'bg-[#111111] text-[#F4F0E8]/70 border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <button
                onClick={() => setShowLabels(!showLabels)}
                className="px-3 py-1.5 bg-[#111111] border border-[#F4F0E8]/10 text-xs font-mono text-[#F4F0E8]/60 hover:text-[#F4F0E8]"
              >
                Labels: {showLabels ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Sub-panel Controls for Chords & Scales */}
          {activeTab === 'chords' && (
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111111] p-4 border border-[#F4F0E8]/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#E6B83A] uppercase tracking-wider mr-2">
                  Select Chord:
                </span>
                {Object.keys(PIANO_CHORDS).map((chordName) => (
                  <button
                    key={chordName}
                    onClick={() => setSelectedChordKey(chordName)}
                    className={`px-2.5 py-1 text-xs font-mono uppercase border transition-all ${
                      selectedChordKey === chordName
                        ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                        : 'bg-[#181818] text-[#F4F0E8]/70 border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                    }`}
                  >
                    {chordName}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlayChord(false)}
                  disabled={isPlayingChord}
                  className="px-4 py-2 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#d4a832] transition-colors"
                >
                  <Play size={13} /> PLAY CHORD
                </button>
                <button
                  onClick={() => handlePlayChord(true)}
                  disabled={isPlayingChord}
                  className="px-3 py-2 bg-[#181818] border border-[#F4F0E8]/20 text-xs font-mono uppercase text-[#F4F0E8] hover:border-[#E6B83A] transition-colors"
                >
                  Arpeggiate
                </button>
              </div>
            </div>
          )}

          {activeTab === 'scales' && (
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111111] p-4 border border-[#F4F0E8]/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#E6B83A] uppercase tracking-wider mr-2">
                  Select Scale:
                </span>
                {Object.keys(PIANO_SCALES).map((scaleName) => (
                  <button
                    key={scaleName}
                    onClick={() => setSelectedScaleKey(scaleName)}
                    className={`px-2.5 py-1 text-xs font-mono uppercase border transition-all ${
                      selectedScaleKey === scaleName
                        ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                        : 'bg-[#181818] text-[#F4F0E8]/70 border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                    }`}
                  >
                    {scaleName}
                  </button>
                ))}
              </div>

              <button
                onClick={handlePlayScale}
                disabled={isPlayingScale}
                className="px-4 py-2 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#d4a832] transition-colors"
              >
                <Play size={13} /> PLAY SCALE SEQUENCE
              </button>
            </div>
          )}

          {/* ========================================================== */}
          {/* REALISTIC 2-OCTAVE VIRTUAL KEYBOARD                        */}
          {/* ========================================================== */}
          <div className="relative overflow-x-auto pb-4 pt-2">
            <div className="min-w-[700px] h-64 bg-[#0a0a0a] p-3 border-4 border-[#222222] shadow-2xl relative select-none">
              
              {/* White Keys Container (Flex row) */}
              <div className="flex h-full w-full relative">
                {whiteKeys.map((keyItem) => {
                  const isPressed = pressedNote === keyItem.note;
                  const isHighlighted = isKeyHighlighted(keyItem.note);
                  const isScalePlaying = activeScaleNote === keyItem.note;

                  return (
                    <button
                      key={keyItem.note}
                      onClick={() => handleKeyClick(keyItem)}
                      className={`flex-1 h-full border-r border-[#111111] rounded-b flex flex-col justify-end pb-3 items-center transition-all cursor-pointer touch-manipulation relative group ${
                        isScalePlaying || isPressed
                          ? 'bg-[#E6B83A] shadow-inner scale-[0.99]'
                          : isHighlighted
                          ? 'bg-[#f0dfaa] border-b-4 border-[#E6B83A]'
                          : 'bg-[#F4F0E8] hover:bg-[#eae3d5] active:bg-[#E6B83A]'
                      }`}
                    >
                      {/* Middle C Indicator */}
                      {keyItem.isMiddleC && (
                        <div className="absolute top-4 w-2 h-2 rounded-full bg-[#9E2F2F]" title="Middle C (C4)" />
                      )}

                      {/* Note Label */}
                      {showLabels && (
                        <div className="text-center font-mono pointer-events-none">
                          <span className="text-xs font-black text-[#111111] block">
                            {keyItem.name}
                          </span>
                          <span className="text-[9px] text-[#111111]/50 block">
                            {keyItem.note}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}

                {/* Black Keys Overlaid Absolute */}
                {PIANO_KEYS.map((keyItem) => {
                  if (!keyItem.isBlack) return null;

                  // Find which white key this black key sits after
                  const whiteIndex = whiteKeys.findIndex((w) => {
                    // C# sits after C, D# sits after D, etc.
                    const natural = keyItem.name.replace('#', '');
                    return w.name === natural && w.note.slice(-1) === keyItem.note.slice(-1);
                  });

                  if (whiteIndex === -1) return null;

                  // Percentage offset: (whiteIndex + 1) * (100 / whiteKeysCount) - half black key width
                  const totalWhites = whiteKeys.length;
                  const leftPercent = ((whiteIndex + 1) / totalWhites) * 100;
                  const isPressed = pressedNote === keyItem.note;
                  const isHighlighted = isKeyHighlighted(keyItem.note);
                  const isScalePlaying = activeScaleNote === keyItem.note;

                  return (
                    <button
                      key={keyItem.note}
                      onClick={() => handleKeyClick(keyItem)}
                      style={{
                        left: `${leftPercent}%`,
                        width: '3.6%',
                        transform: 'translateX(-50%)'
                      }}
                      className={`absolute top-0 h-[62%] z-20 rounded-b flex flex-col justify-end pb-2 items-center cursor-pointer transition-all shadow-xl touch-manipulation ${
                        isScalePlaying || isPressed
                          ? 'bg-[#E6B83A] text-[#111111]'
                          : isHighlighted
                          ? 'bg-[#c49a2a] text-[#F4F0E8] border-b-4 border-[#F4F0E8]'
                          : 'bg-[#181818] border-b-4 border-[#000000] text-[#F4F0E8] hover:bg-[#282828] active:bg-[#E6B83A]'
                      }`}
                    >
                      {showLabels && (
                        <span className="text-[8px] font-mono font-bold leading-none pointer-events-none">
                          {keyItem.name}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Information Readout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#F4F0E8]/60 border-t border-[#F4F0E8]/10 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9E2F2F]" />
              <span>Red dot indicates <strong>Middle C (C4)</strong> — the anchor of the grand staff.</span>
            </div>
            {activeTab === 'chords' && (
              <span className="text-[#E6B83A]">
                {activeChord.name} ({activeChord.notes.join(' + ')}) • {activeChord.formula}
              </span>
            )}
            {activeTab === 'scales' && (
              <span className="text-[#E6B83A]">
                {activeScaleKey} ({activeScale.formula})
              </span>
            )}
          </div>

        </div>

        {/* 4 Core Pillars of Piano Training at GIPA */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: "01",
              title: "TOUCH & DYNAMICS",
              desc: "Master forearm weight release, curved fingers, legato singing tone, and nuanced pedal usage."
            },
            {
              num: "02",
              title: "NOTATION & HARMONY",
              desc: "Read treble & bass grand staff fluently, decipher lead sheets, and analyze diatonic harmony."
            },
            {
              num: "03",
              title: "REPERTOIRE DIVERSITY",
              desc: "Explore classical etudes (Bach, Chopin) alongside modern acoustic ballads and jazz standards."
            },
            {
              num: "04",
              title: "SOLO & ENSEMBLE",
              desc: "Develop steady internal tempo to accompany vocalists, perform in bands, and deliver solo recitals."
            }
          ].map((pillar) => (
            <div key={pillar.num} className="p-6 bg-[#181612] border border-[#F4F0E8]/10 space-y-3">
              <span className="text-xs font-mono text-[#E6B83A] font-bold">{pillar.num} // PILLAR</span>
              <h4 className="text-lg font-bold font-serif uppercase text-[#F4F0E8]">{pillar.title}</h4>
              <p className="text-xs text-[#F4F0E8]/70 font-sans leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
