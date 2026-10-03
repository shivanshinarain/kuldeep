import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  Mic, 
  MicOff, 
  Radio, 
  Search, 
  Play, 
  Sparkles, 
  Check, 
  ChevronRight, 
  Layers, 
  Info,
  RefreshCw
} from 'lucide-react';
import { 
  GUITAR_TYPES, 
  GUITAR_CHORDS, 
  GUITAR_SCALES 
} from '../data/musicData';
import { 
  playGuitarPluck, 
  playChord, 
  playScaleSequence, 
  GUITAR_STRINGS, 
  getFretFrequency, 
  getNoteNameFromFreq,
  LivePitchDetector 
} from '../utils/audioEngine';
import AudioVisualizer from './AudioVisualizer';

export default function GuitarLab() {
  const [activeTab, setActiveTab] = useState('fretboard'); // 'types' | 'fretboard' | 'tuner' | 'chords' | 'scales'
  
  // ==========================================
  // 1. GUITAR TYPES STATE
  // ==========================================
  const [selectedType, setSelectedType] = useState(GUITAR_TYPES[0]);
  const [playingTypeId, setPlayingTypeId] = useState(null);

  const handlePlayType = (type) => {
    setPlayingTypeId(type.id);
    playChord(type.frequencies, type.id === 'electric' ? 'guitar' : 'guitar');
    setTimeout(() => setPlayingTypeId(null), 1200);
  };

  // ==========================================
  // 2. INTERACTIVE FRETBOARD STATE
  // ==========================================
  const [activeFretNote, setActiveFretNote] = useState({
    stringIndex: 0,
    fret: 0,
    note: 'E',
    octave: 2,
    freq: 82.41
  });
  const [isElectricTone, setIsElectricTone] = useState(false);

  // String order: 0 = Low E (6th), 1 = A (5th), 2 = D (4th), 3 = G (3rd), 4 = B (2nd), 5 = High e (1st)
  // Display reversed (High e on top, Low E on bottom) as standard tablature
  const stringIndices = [5, 4, 3, 2, 1, 0];
  const fretsCount = 13; // 0 to 12

  const handleFretClick = (stringIndex, fret) => {
    const freq = getFretFrequency(stringIndex, fret);
    const noteInfo = getNoteNameFromFreq(freq);
    playGuitarPluck(stringIndex, fret, isElectricTone, 1.8);
    setActiveFretNote({
      stringIndex,
      fret,
      note: noteInfo.name,
      octave: noteInfo.octave,
      freq: Math.round(freq * 10) / 10
    });
  };

  // ==========================================
  // 3. GUITAR TUNER STATE
  // ==========================================
  const [isListening, setIsListening] = useState(false);
  const [tunerTargetString, setTunerTargetString] = useState(0); // 0 = Low E
  const [detectedPitch, setDetectedPitch] = useState(null);
  const [micError, setMicError] = useState(null);
  const pitchDetectorRef = useRef(null);

  const startTuner = async () => {
    setMicError(null);
    try {
      const detector = new LivePitchDetector(
        (pitchData) => {
          setDetectedPitch(pitchData);
        },
        (err) => {
          setMicError(err.message || 'Microphone access denied. You can still use manual reference tones below.');
          setIsListening(false);
        }
      );
      await detector.start();
      pitchDetectorRef.current = detector;
      setIsListening(true);
    } catch (e) {
      setMicError('Could not start microphone. Use reference tones below.');
      setIsListening(false);
    }
  };

  const stopTuner = () => {
    if (pitchDetectorRef.current) {
      pitchDetectorRef.current.stop();
      pitchDetectorRef.current = null;
    }
    setIsListening(false);
  };

  useEffect(() => {
    return () => {
      if (pitchDetectorRef.current) pitchDetectorRef.current.stop();
    };
  }, []);

  const playReferenceTone = (stringIdx) => {
    const stringData = GUITAR_STRINGS[stringIdx];
    playGuitarPluck(stringIdx, 0, false, 3.0);
  };

  // Compute tuner feedback state
  const targetNote = GUITAR_STRINGS[tunerTargetString];
  let tuneStatus = 'READY';
  let centsOffset = 0;
  if (detectedPitch) {
    centsOffset = detectedPitch.cents;
    if (Math.abs(centsOffset) <= 4) tuneStatus = 'IN TUNE';
    else if (centsOffset < -4) tuneStatus = 'TOO LOW';
    else tuneStatus = 'TOO HIGH';
  }

  // ==========================================
  // 4. GUITAR CHORD LIBRARY STATE
  // ==========================================
  const [chordSearch, setChordSearch] = useState('');
  const [selectedChordKey, setSelectedChordKey] = useState('C');
  const [chordFilterFamily, setChordFilterFamily] = useState('ALL');
  const [isPlayingChord, setIsPlayingChord] = useState(false);

  const chordKeys = Object.keys(GUITAR_CHORDS);
  const filteredChords = chordKeys.filter((key) => {
    const chord = GUITAR_CHORDS[key];
    const matchesSearch = chord.name.toLowerCase().includes(chordSearch.toLowerCase()) || key.toLowerCase().includes(chordSearch.toLowerCase());
    const matchesFamily = chordFilterFamily === 'ALL' || chord.family === chordFilterFamily;
    return matchesSearch && matchesFamily;
  });

  const activeChord = GUITAR_CHORDS[selectedChordKey] || GUITAR_CHORDS['C'];

  const handlePlayChordFull = (slow = false) => {
    setIsPlayingChord(true);
    if (slow) {
      // Arpeggiate notes
      activeChord.freqs.forEach((freq, idx) => {
        setTimeout(() => {
          playGuitarPluck(0, 0, false, 1.2);
          playChord([freq]);
        }, idx * 180);
      });
      setTimeout(() => setIsPlayingChord(false), activeChord.freqs.length * 180 + 400);
    } else {
      playChord(activeChord.freqs, 'guitar');
      setTimeout(() => setIsPlayingChord(false), 900);
    }
  };

  // ==========================================
  // 5. GUITAR SCALES STATE
  // ==========================================
  const [selectedScaleIndex, setSelectedScaleIndex] = useState(0);
  const [scaleRoot, setScaleRoot] = useState('C');
  const [isPlayingScale, setIsPlayingScale] = useState(false);
  const [activeScaleNoteIdx, setActiveScaleNoteIdx] = useState(null);

  const currentScale = GUITAR_SCALES[selectedScaleIndex] || GUITAR_SCALES[0];

  const handlePlayScale = () => {
    setIsPlayingScale(true);
    playScaleSequence(
      currentScale.frequencies,
      320,
      'guitar',
      (idx) => setActiveScaleNoteIdx(idx)
    );
    setTimeout(() => {
      setIsPlayingScale(false);
      setActiveScaleNoteIdx(null);
    }, currentScale.frequencies.length * 320 + 300);
  };

  return (
    <section id="guitar-lab" className="py-20 lg:py-36 bg-[#111111] text-[#F4F0E8] px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-b border-[#F4F0E8]/10">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F4F0E8]/15 pb-6 sm:pb-8 gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#E6B83A] uppercase px-2 py-0.5 border border-[#E6B83A]/30">
                04 // INTERACTIVE LABORATORY
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/50">
                Lakhimpur Kheri Studio
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase font-serif text-[#F4F0E8] break-words">
              GUITAR <span className="italic font-light text-[#E6B83A]">LEARNING LAB</span>
            </h2>
            <p className="text-xs sm:text-base text-[#F4F0E8]/70 max-w-2xl font-sans leading-relaxed">
              Explore authentic guitar craftsmanship, interactive fretboard geography, precision pitch tuning, and complete chord & scale anatomy under master guidance.
            </p>
          </div>

          {/* Realtime Audio Wave Visualizer */}
          <div className="w-full md:w-64 bg-[#181818] border border-[#F4F0E8]/10 p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#F4F0E8]/50 mb-2">
              <span>AUDIO SIGNAL</span>
              <span className="text-[#E6B83A] animate-pulse">● LIVE</span>
            </div>
            <AudioVisualizer height={40} color="#E6B83A" barCount={28} />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 border-b border-[#F4F0E8]/10 pb-4">
          {[
            { id: 'fretboard', label: '1. FRETBOARD' },
            { id: 'tuner', label: '2. TUNER' },
            { id: 'chords', label: '3. CHORD LIBRARY' },
            { id: 'scales', label: '4. SCALES' },
            { id: 'types', label: '5. GUITAR TYPES' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all duration-200 border touch-manipulation ${
                activeTab === tab.id
                  ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                  : 'bg-[#181818] text-[#F4F0E8]/70 border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30 hover:text-[#F4F0E8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: INTERACTIVE FRETBOARD                                   */}
        {/* ============================================================== */}
        {activeTab === 'fretboard' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181818] p-5 border border-[#F4F0E8]/10">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E6B83A]">
                  Active Selected Note
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black font-serif text-[#F4F0E8]">
                    {activeFretNote.note}
                    <span className="text-xl text-[#E6B83A] font-sans font-normal ml-1">
                      {activeFretNote.octave}
                    </span>
                  </span>
                  <span className="text-xs font-mono text-[#F4F0E8]/60">
                    {activeFretNote.freq} Hz
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 bg-[#111111] border border-[#F4F0E8]/20 text-[#F4F0E8]/80">
                    String {6 - activeFretNote.stringIndex} ({GUITAR_STRINGS[activeFretNote.stringIndex]?.name}) • Fret {activeFretNote.fret}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsElectricTone(!isElectricTone)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all ${
                    isElectricTone 
                      ? 'bg-[#9E2F2F] text-[#F4F0E8] border-[#9E2F2F]' 
                      : 'bg-[#111111] text-[#F4F0E8]/70 border-[#F4F0E8]/20 hover:text-[#F4F0E8]'
                  }`}
                >
                  Tone: {isElectricTone ? 'Electric Distortion' : 'Acoustic Clean'}
                </button>
                <button
                  onClick={() => handleFretClick(activeFretNote.stringIndex, activeFretNote.fret)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#d4a832] transition-colors"
                >
                  <Volume2 size={14} /> Replay
                </button>
              </div>
            </div>

            {/* Fretboard Graphic */}
            <div className="text-[11px] font-mono text-[#E6B83A] sm:hidden flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#181818] border border-[#E6B83A]/25 text-center">
              <span>← Swipe horizontally to explore strings & frets 0 to 12 →</span>
            </div>

            <div className="relative overflow-x-auto scroll-touch-momentum pb-4 pt-2">
              <div className="min-w-[760px] bg-[#1a1715] border-2 border-[#3d2f25] p-4 rounded-none shadow-2xl relative">
                
                {/* Fret Number Markers Top */}
                <div className="grid grid-cols-[60px_repeat(12,1fr)] text-center text-[10px] font-mono text-[#F4F0E8]/40 mb-2 border-b border-[#3d2f25] pb-1">
                  <div>OPEN</div>
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="font-bold">
                      {i + 1}
                      {[3, 5, 7, 9, 12].includes(i + 1) && (
                        <span className="text-[#E6B83A] ml-0.5">•</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* 6 Strings */}
                <div className="space-y-3 relative py-2">
                  {stringIndices.map((stringIdx) => {
                    const stringInfo = GUITAR_STRINGS[stringIdx];
                    const isThick = stringIdx < 3;
                    return (
                      <div key={stringIdx} className="grid grid-cols-[60px_repeat(12,1fr)] items-center relative">
                        {/* String Label */}
                        <div className="text-xs font-mono font-bold text-[#E6B83A] flex items-center gap-1.5 pr-2">
                          <span className="w-5 h-5 rounded-full bg-[#111111] border border-[#E6B83A]/30 flex items-center justify-center text-[10px]">
                            {6 - stringIdx}
                          </span>
                          <span>{stringInfo.name}</span>
                        </div>

                        {/* 13 Frets (0 = Open, 1..12) */}
                        {Array.from({ length: fretsCount }, (_, fret) => {
                          const freq = getFretFrequency(stringIdx, fret);
                          const noteInfo = getNoteNameFromFreq(freq);
                          const isCurrent = activeFretNote.stringIndex === stringIdx && activeFretNote.fret === fret;

                          return (
                            <button
                              key={fret}
                              onClick={() => handleFretClick(stringIdx, fret)}
                              aria-label={`String ${6 - stringIdx}, Fret ${fret}: Note ${noteInfo.name}`}
                              className={`relative h-10 border-r border-[#4a3a2f] flex items-center justify-center transition-all group ${
                                fret === 0 ? 'bg-[#111111]/70 border-l border-[#4a3a2f]' : 'hover:bg-[#2e2621]'
                              }`}
                            >
                              {/* Horizontal Guitar String Line */}
                              <div 
                                className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-all ${
                                  isThick ? 'h-[3px] bg-[#a89b88]' : 'h-[1.5px] bg-[#d6ccbe]'
                                } ${isCurrent ? 'bg-[#E6B83A] shadow-[0_0_8px_#E6B83A]' : ''}`} 
                              />

                              {/* Fret Inlay Dots at 3, 5, 7, 9, 12 */}
                              {stringIdx === 3 && [3, 5, 7, 9].includes(fret) && (
                                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#F4F0E8]/15 pointer-events-none" />
                              )}
                              {stringIdx === 3 && fret === 12 && (
                                <div className="absolute flex gap-1.5 pointer-events-none">
                                  <div className="w-2 h-2 rounded-full bg-[#F4F0E8]/20" />
                                  <div className="w-2 h-2 rounded-full bg-[#F4F0E8]/20" />
                                </div>
                              )}

                              {/* Note Marker Badge */}
                              <div
                                className={`z-10 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all shadow-md ${
                                  isCurrent
                                    ? 'bg-[#E6B83A] text-[#111111] scale-110 ring-2 ring-[#F4F0E8]'
                                    : 'bg-[#111111]/90 text-[#F4F0E8]/70 border border-[#F4F0E8]/20 group-hover:scale-105 group-hover:border-[#E6B83A] group-hover:text-[#E6B83A]'
                                }`}
                              >
                                {noteInfo.name}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#F4F0E8]/50 gap-2 border-t border-[#F4F0E8]/10 pt-4">
              <span>TIP: Click any string or fret to trigger authentic acoustic note synthesis and observe pitch frequencies.</span>
              <span className="text-[#E6B83A]">Standard Guitar Tuning: E2 - A2 - D3 - G3 - B3 - E4</span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: GUITAR TUNER                                            */}
        {/* ============================================================== */}
        {activeTab === 'tuner' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Tuner Display & Meter */}
            <div className="lg:col-span-7 bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-8">
              <div className="flex items-center justify-between border-b border-[#F4F0E8]/10 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                    ELECTRONIC STROBE TUNER
                  </span>
                  <h3 className="text-2xl font-bold font-serif">Chromatic Precision Meter</h3>
                </div>
                <button
                  onClick={isListening ? stopTuner : startTuner}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                    isListening
                      ? 'bg-[#9E2F2F] text-[#F4F0E8] animate-pulse'
                      : 'bg-[#E6B83A] text-[#111111] hover:bg-[#d4a832]'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff size={14} /> STOP MIC
                    </>
                  ) : (
                    <>
                      <Mic size={14} /> LISTEN VIA MICROPHONE
                    </>
                  )}
                </button>
              </div>

              {micError && (
                <div className="p-3 bg-[#9E2F2F]/20 border border-[#9E2F2F]/50 text-xs font-mono text-[#F4F0E8]">
                  {micError}
                </div>
              )}

              {/* Big Tuning Readout */}
              <div className="text-center py-6 space-y-4">
                <div className="inline-block p-8 rounded-full bg-[#111111] border-2 border-[#F4F0E8]/10 relative shadow-inner">
                  <span className="text-6xl sm:text-7xl font-black font-serif tracking-tight text-[#F4F0E8] block">
                    {detectedPitch ? detectedPitch.note : targetNote.name}
                  </span>
                  <span className="text-xs font-mono text-[#E6B83A] uppercase tracking-widest block mt-1">
                    {detectedPitch ? `${detectedPitch.frequency} Hz` : `${targetNote.freq} Hz Target`}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className={`text-lg font-mono font-bold tracking-widest uppercase ${
                    tuneStatus === 'IN TUNE' ? 'text-green-400' :
                    tuneStatus === 'TOO LOW' ? 'text-[#E6B83A]' :
                    tuneStatus === 'TOO HIGH' ? 'text-[#9E2F2F]' : 'text-[#F4F0E8]/50'
                  }`}>
                    {tuneStatus}
                  </span>
                  <p className="text-xs font-mono text-[#F4F0E8]/50">
                    Deviation: {detectedPitch ? `${centsOffset > 0 ? '+' : ''}${centsOffset} Cents` : '0 Cents'}
                  </p>
                </div>

                {/* Needle Deviation Bar */}
                <div className="max-w-md mx-auto space-y-2 pt-4">
                  <div className="relative h-4 bg-[#111111] border border-[#F4F0E8]/20 overflow-hidden">
                    {/* Center in-tune guide */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-green-500 -translate-x-1/2 z-10" />
                    {/* Deviation marker */}
                    <div 
                      className="absolute top-0 bottom-0 w-3 bg-[#E6B83A] transition-all duration-150 -translate-x-1/2"
                      style={{ 
                        left: `${Math.max(5, Math.min(95, 50 + (centsOffset / 50) * 45))}%` 
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#F4F0E8]/40">
                    <span>-50 CENTS (FLAT)</span>
                    <span className="text-green-400">IN TUNE</span>
                    <span>+50 CENTS (SHARP)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reference Tones (Manual Fallback / Ear Training) */}
            <div className="lg:col-span-5 bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-8 space-y-6">
              <div className="space-y-1 border-b border-[#F4F0E8]/10 pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                  REFERENCE TONES
                </span>
                <h4 className="text-xl font-bold font-serif">Play String Pitch</h4>
                <p className="text-xs text-[#F4F0E8]/60 font-sans">
                  Click any string below to hear its exact standard concert pitch. Tune your instrument by ear to match.
                </p>
              </div>

              <div className="space-y-3">
                {GUITAR_STRINGS.map((str, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center justify-between p-3 border transition-all ${
                      tunerTargetString === idx 
                        ? 'bg-[#111111] border-[#E6B83A]' 
                        : 'bg-[#141414] border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold font-serif text-[#F4F0E8]">
                          String {6 - idx}: {str.name}{str.octave}
                        </span>
                        <span className="text-[10px] font-mono text-[#F4F0E8]/50">
                          ({str.freq} Hz)
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#E6B83A]">
                        {str.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setTunerTargetString(idx);
                          playReferenceTone(idx);
                        }}
                        className="px-3 py-1.5 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase flex items-center gap-1.5 hover:bg-[#d4a832] transition-colors"
                      >
                        <Volume2 size={13} /> Play
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: GUITAR CHORD LIBRARY                                    */}
        {/* ============================================================== */}
        {activeTab === 'chords' && (
          <div className="space-y-8">
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#181818] p-4 border border-[#F4F0E8]/10">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F4F0E8]/40" />
                <input
                  type="text"
                  placeholder="Search chords (e.g. C, Am, G7, Cmaj7)..."
                  value={chordSearch}
                  onChange={(e) => setChordSearch(e.target.value)}
                  className="w-full bg-[#111111] border border-[#F4F0E8]/15 pl-10 pr-4 py-2 text-xs font-mono text-[#F4F0E8] placeholder-[#F4F0E8]/40 focus:outline-none focus:border-[#E6B83A]"
                />
              </div>

              {/* Family Pills */}
              <div className="flex flex-wrap gap-1.5">
                {['ALL', 'Major', 'Minor', '7th', 'Major 7', 'Suspended', 'Advanced'].map((family) => (
                  <button
                    key={family}
                    onClick={() => setChordFilterFamily(family)}
                    className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider border transition-all ${
                      chordFilterFamily === family
                        ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                        : 'bg-[#111111] text-[#F4F0E8]/60 border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                    }`}
                  >
                    {family}
                  </button>
                ))}
              </div>
            </div>

            {/* Chord Selection Grid & Active Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Chord Selector List */}
              <div className="lg:col-span-5 bg-[#181818] border border-[#F4F0E8]/10 p-4 max-h-[520px] overflow-y-auto space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#F4F0E8]/50 pb-2 border-b border-[#F4F0E8]/10">
                  AVAILABLE CHORDS ({filteredChords.length})
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {filteredChords.map((chordKey) => {
                    const c = GUITAR_CHORDS[chordKey];
                    const isSelected = selectedChordKey === chordKey;
                    return (
                      <button
                        key={chordKey}
                        onClick={() => setSelectedChordKey(chordKey)}
                        className={`p-3 text-center border transition-all ${
                          isSelected
                            ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A] scale-105 shadow-md'
                            : 'bg-[#111111] text-[#F4F0E8] border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                        }`}
                      >
                        <span className="text-base font-bold font-serif block">{chordKey}</span>
                        <span className="text-[9px] font-mono uppercase opacity-70 block">{c.family}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Active Chord Diagram & Audio */}
              <div className="lg:col-span-7 bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F4F0E8]/10 pb-4 gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                      {activeChord.family} VOICING
                    </span>
                    <h3 className="text-3xl font-black font-serif text-[#F4F0E8]">
                      {activeChord.name}
                    </h3>
                    <p className="text-xs font-mono text-[#F4F0E8]/60 mt-1">
                      Formula: {activeChord.formula} • Notes: {activeChord.notes.join(' - ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayChordFull(false)}
                      disabled={isPlayingChord}
                      className="px-4 py-2 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#d4a832] transition-colors"
                    >
                      <Play size={14} /> PLAY CHORD
                    </button>
                    <button
                      onClick={() => handlePlayChordFull(true)}
                      disabled={isPlayingChord}
                      className="px-3 py-2 bg-[#111111] border border-[#F4F0E8]/20 text-xs font-mono uppercase tracking-wider text-[#F4F0E8] hover:border-[#E6B83A] transition-colors"
                    >
                      Slow Strum
                    </button>
                  </div>
                </div>

                {/* Fretboard Diagram Box */}
                <div className="bg-[#111111] border border-[#F4F0E8]/15 p-6 max-w-sm mx-auto">
                  <div className="text-center text-[10px] font-mono text-[#F4F0E8]/40 mb-3 uppercase tracking-widest">
                    {activeChord.barre ? `Barre Fret ${activeChord.barre}` : 'Open Position Voicing'}
                  </div>

                  {/* 6 String Header (Open / Mute Indicators) */}
                  <div className="grid grid-cols-6 text-center text-xs font-mono font-bold mb-2">
                    {activeChord.frets.map((fretVal, idx) => (
                      <span key={idx} className={fretVal === 'x' ? 'text-[#9E2F2F]' : fretVal === '0' ? 'text-green-400' : 'text-[#F4F0E8]/40'}>
                        {fretVal === 'x' ? '✕' : fretVal === '0' ? '○' : fretVal}
                      </span>
                    ))}
                  </div>

                  {/* Fret Nut / Grid (5 frets tall) */}
                  <div className="border-t-4 border-[#E6B83A] bg-[#1a1715] p-2 space-y-3">
                    {[1, 2, 3, 4, 5].map((fretRow) => (
                      <div key={fretRow} className="grid grid-cols-6 items-center border-b border-[#3d2f25] pb-2 relative">
                        {activeChord.frets.map((fretVal, strIdx) => {
                          const isFrettedHere = String(fretRow) === String(fretVal);
                          return (
                            <div key={strIdx} className="flex justify-center relative">
                              {/* Vertical String */}
                              <div className="w-[1.5px] h-6 bg-[#6e5d50] absolute top-1/2 -translate-y-1/2" />
                              {isFrettedHere && (
                                <div className="z-10 w-6 h-6 rounded-full bg-[#E6B83A] text-[#111111] font-mono text-[10px] font-bold flex items-center justify-center shadow-lg">
                                  {activeChord.fingers?.[strIdx] || '•'}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* String Names Footer */}
                  <div className="grid grid-cols-6 text-center text-[10px] font-mono text-[#F4F0E8]/60 mt-3 border-t border-[#F4F0E8]/10 pt-2">
                    {['E', 'A', 'D', 'G', 'B', 'e'].map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>
                </div>

                <div className="text-center text-xs font-mono text-[#F4F0E8]/50">
                  Numbered dots represent recommended fingerings (1: Index, 2: Middle, 3: Ring, 4: Pinky).
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: GUITAR SCALES EXPLORER                                  */}
        {/* ============================================================== */}
        {activeTab === 'scales' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Scale Selector */}
              <div className="lg:col-span-5 bg-[#181818] border border-[#F4F0E8]/10 p-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                  SELECT SCALE PATTERN
                </span>
                <div className="space-y-2">
                  {GUITAR_SCALES.map((scale, idx) => (
                    <button
                      key={scale.id}
                      onClick={() => setSelectedScaleIndex(idx)}
                      className={`w-full p-3.5 text-left border transition-all flex items-center justify-between ${
                        selectedScaleIndex === idx
                          ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                          : 'bg-[#111111] text-[#F4F0E8] border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-serif font-bold">{scale.name}</div>
                        <div className="text-[10px] font-mono opacity-70 mt-0.5">{scale.formula}</div>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Active Scale Display & Sequencer */}
              <div className="lg:col-span-7 bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F4F0E8]/10 pb-4 gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                      SCALE ANATOMY
                    </span>
                    <h3 className="text-3xl font-black font-serif text-[#F4F0E8]">
                      {currentScale.name}
                    </h3>
                    <p className="text-xs font-mono text-[#F4F0E8]/60 mt-1">
                      Formula: {currentScale.formula}
                    </p>
                  </div>

                  <button
                    onClick={handlePlayScale}
                    disabled={isPlayingScale}
                    className="px-5 py-2.5 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#d4a832] transition-colors self-start sm:self-auto"
                  >
                    <Play size={14} /> PLAY SCALE SEQUENCE
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[#F4F0E8]/80 font-sans leading-relaxed">
                  {currentScale.description}
                </p>

                {/* Notes in Scale Pills */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#E6B83A]">
                    Notes in Sequence
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentScale.notes.map((note, idx) => {
                      const isActiveStep = activeScaleNoteIdx === idx;
                      return (
                        <div
                          key={idx}
                          className={`w-12 h-12 flex flex-col items-center justify-center border font-mono transition-all ${
                            isActiveStep
                              ? 'bg-[#E6B83A] text-[#111111] scale-110 border-[#F4F0E8] font-bold shadow-lg'
                              : 'bg-[#111111] text-[#F4F0E8] border-[#F4F0E8]/15'
                          }`}
                        >
                          <span className="text-sm font-bold">{note}</span>
                          <span className="text-[9px] opacity-60">#{idx + 1}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 text-xs font-mono text-[#F4F0E8]/60 space-y-1">
                  <div className="text-[#E6B83A] font-bold">EDUCATIONAL NOTE</div>
                  <div>Mastering this scale unlocks intuitive soloing across the fretboard and connects harmonic theory directly with muscle memory.</div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: GUITAR TYPES                                            */}
        {/* ============================================================== */}
        {activeTab === 'types' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Guitar Type Selector Cards */}
            <div className="lg:col-span-5 space-y-3">
              {GUITAR_TYPES.map((type) => {
                const isSelected = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                    className={`w-full p-4 text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                        : 'bg-[#181818] text-[#F4F0E8] border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-70 block">
                        {type.category}
                      </span>
                      <span className="text-lg font-serif font-bold block">
                        {type.name}
                      </span>
                    </div>
                    <ChevronRight size={18} />
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Guitar Type Deep-Dive */}
            <div className="lg:col-span-7 bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-6">
              
              <div className="relative h-64 overflow-hidden border border-[#F4F0E8]/10">
                <img 
                  src={selectedType.image} 
                  alt={selectedType.name} 
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E6B83A] block">
                      {selectedType.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#F4F0E8]">
                      {selectedType.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => handlePlayType(selectedType)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#d4a832] transition-colors"
                  >
                    <Volume2 size={14} /> PLAY SOUND
                  </button>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#F4F0E8]/80 font-sans leading-relaxed">
                {selectedType.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                    Key Characteristics
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#F4F0E8]/70 font-sans">
                    {selectedType.characteristics.map((char, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#E6B83A]">•</span>
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                    Essential Anatomy
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#F4F0E8]/70 font-sans">
                    {selectedType.parts.map((part, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#E6B83A]">•</span>
                        <span>{part}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                  Typical Musical Context
                </span>
                <p className="text-xs text-[#F4F0E8]/80 font-sans">
                  {selectedType.typicalUse}
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
