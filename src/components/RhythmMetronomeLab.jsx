import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Square, 
  Volume2, 
  Sliders, 
  Activity, 
  Zap, 
  RotateCcw, 
  Plus, 
  Minus,
  Sparkles,
  Music
} from 'lucide-react';
import { playDrumSound, playPianoNote, getAudioContext } from '../utils/audioEngine';

export default function RhythmMetronomeLab() {
  const [activeTab, setActiveTab] = useState('metronome'); // 'metronome' | 'rhythm' | 'beatmaker'

  // ==========================================
  // 1. METRONOME STATE
  // ==========================================
  const [bpm, setBpm] = useState(100);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState(false);
  const [timeSignature, setTimeSignature] = useState(4); // 4, 3, 2, 6
  const [currentBeat, setCurrentBeat] = useState(0);
  const metronomeTimerRef = useRef(null);
  const beatCounterRef = useRef(0);
  const tapTimesRef = useRef([]);

  const triggerMetronomeClick = (isAccent) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.frequency.setValueAtTime(isAccent ? 1600 : 900, now);
      gain.gain.setValueAtTime(isAccent ? 0.9 : 0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn(e);
    }
  };

  const startMetronome = () => {
    if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
    beatCounterRef.current = 0;
    setCurrentBeat(0);
    setIsPlayingMetronome(true);
    triggerMetronomeClick(true);

    const intervalMs = (60 / bpm) * 1000;
    metronomeTimerRef.current = setInterval(() => {
      beatCounterRef.current = (beatCounterRef.current + 1) % timeSignature;
      setCurrentBeat(beatCounterRef.current);
      triggerMetronomeClick(beatCounterRef.current === 0);
    }, intervalMs);
  };

  const stopMetronome = () => {
    if (metronomeTimerRef.current) {
      clearInterval(metronomeTimerRef.current);
      metronomeTimerRef.current = null;
    }
    setIsPlayingMetronome(false);
    setCurrentBeat(0);
    beatCounterRef.current = 0;
  };

  useEffect(() => {
    if (isPlayingMetronome) {
      startMetronome();
    }
    return () => {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
    };
  }, [bpm, timeSignature]);

  const handleTapTempo = () => {
    const now = performance.now();
    tapTimesRef.current.push(now);
    if (tapTimesRef.current.length > 4) tapTimesRef.current.shift();

    if (tapTimesRef.current.length >= 2) {
      const intervals = [];
      for (let i = 1; i < tapTimesRef.current.length; i++) {
        intervals.push(tapTimesRef.current[i] - tapTimesRef.current[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 40 && calculatedBpm <= 240) {
        setBpm(calculatedBpm);
      }
    }
  };

  // ==========================================
  // 2. RHYTHM SUBDIVISIONS LAB STATE
  // ==========================================
  const [activeSubdivision, setActiveSubdivision] = useState('quarter');
  const [isPlayingRhythm, setIsPlayingRhythm] = useState(false);
  const [rhythmBeatIndex, setRhythmBeatIndex] = useState(0);
  const rhythmTimerRef = useRef(null);

  const SUBDIVISIONS = {
    quarter: { name: 'Quarter Notes (1 Beat)', count: 4, labels: ['1', '2', '3', '4'], speedMult: 1 },
    eighth: { name: 'Eighth Notes (Half Beat)', count: 8, labels: ['1', '&', '2', '&', '3', '&', '4', '&'], speedMult: 2 },
    triplet: { name: 'Eighth Triplets (3 per Beat)', count: 6, labels: ['1', 'la', 'li', '2', 'la', 'li'], speedMult: 3 },
    sixteenth: { name: 'Sixteenth Notes (Quarter Beat)', count: 8, labels: ['1', 'e', '&', 'a', '2', 'e', '&', 'a'], speedMult: 4 },
  };

  const startRhythmDemo = () => {
    if (rhythmTimerRef.current) clearInterval(rhythmTimerRef.current);
    setIsPlayingRhythm(true);
    let step = 0;
    const sub = SUBDIVISIONS[activeSubdivision];
    const stepDurationMs = (60 / 90) * 1000 / (sub.speedMult > 2 ? 2 : sub.speedMult);

    rhythmTimerRef.current = setInterval(() => {
      setRhythmBeatIndex(step % sub.count);
      if (step % sub.count === 0) {
        playDrumSound('kick');
      } else {
        playDrumSound('hihat');
      }
      step++;
    }, stepDurationMs);
  };

  const stopRhythmDemo = () => {
    if (rhythmTimerRef.current) {
      clearInterval(rhythmTimerRef.current);
      rhythmTimerRef.current = null;
    }
    setIsPlayingRhythm(false);
    setRhythmBeatIndex(0);
  };

  useEffect(() => {
    return () => {
      if (rhythmTimerRef.current) clearInterval(rhythmTimerRef.current);
    };
  }, []);

  // ==========================================
  // 3. MINI MUSIC STUDIO ("BUILD A BEAT")
  // ==========================================
  const TRACKS = [
    { id: 'kick', name: 'Kick Drum', sound: () => playDrumSound('kick'), color: '#9E2F2F' },
    { id: 'snare', name: 'Snare Drum', sound: () => playDrumSound('snare'), color: '#E6B83A' },
    { id: 'hihat', name: 'Closed Hi-Hat', sound: () => playDrumSound('hihat'), color: '#4CAF50' },
    { id: 'clap', name: 'Acoustic Clap', sound: () => playDrumSound('clap'), color: '#2196F3' },
    { id: 'tabla', name: 'Tabla Bol', sound: () => playDrumSound('tabla'), color: '#9C27B0' },
    { id: 'bass', name: 'Piano Bass (C2)', sound: () => playPianoNote(65.41, 0.4), color: '#FF9800' },
  ];

  const STEP_COUNT = 8;
  const [studioBpm, setStudioBpm] = useState(110);
  const [isPlayingStudio, setIsPlayingStudio] = useState(false);
  const [studioCurrentStep, setStudioCurrentStep] = useState(0);
  const studioTimerRef = useRef(null);

  // Initial pattern
  const [grid, setGrid] = useState({
    kick: [true, false, false, false, true, false, false, false],
    snare: [false, false, true, false, false, false, true, false],
    hihat: [true, true, true, true, true, true, true, true],
    clap: [false, false, false, false, false, false, true, false],
    tabla: [false, false, false, false, true, false, false, true],
    bass: [true, false, false, false, false, false, false, false],
  });

  const toggleGridCell = (trackId, stepIdx) => {
    setGrid((prev) => ({
      ...prev,
      [trackId]: prev[trackId].map((val, idx) => (idx === stepIdx ? !val : val)),
    }));
  };

  const clearPattern = () => {
    const emptyGrid = {};
    TRACKS.forEach((t) => (emptyGrid[t.id] = Array(STEP_COUNT).fill(false)));
    setGrid(emptyGrid);
  };

  const loadGroovePreset = (presetName) => {
    if (presetName === 'funk') {
      setGrid({
        kick: [true, false, false, true, false, false, true, false],
        snare: [false, false, true, false, false, false, true, false],
        hihat: [true, true, true, true, true, true, true, true],
        clap: [false, false, false, false, false, true, false, false],
        tabla: [false, false, true, false, true, false, false, false],
        bass: [true, false, false, true, false, false, false, false],
      });
      setStudioBpm(104);
    } else if (presetName === 'rock') {
      setGrid({
        kick: [true, false, false, false, true, false, false, false],
        snare: [false, false, true, false, false, false, true, false],
        hihat: [true, true, true, true, true, true, true, true],
        clap: [false, false, false, false, false, false, false, false],
        tabla: [false, false, false, false, false, false, false, false],
        bass: [true, false, false, false, true, false, false, false],
      });
      setStudioBpm(120);
    } else if (presetName === 'fusion') {
      setGrid({
        kick: [true, false, false, false, false, true, false, false],
        snare: [false, false, true, false, false, false, false, true],
        hihat: [true, true, true, true, true, true, true, true],
        clap: [false, false, false, false, false, false, true, false],
        tabla: [true, true, false, true, true, false, true, false],
        bass: [true, false, false, false, false, true, false, false],
      });
      setStudioBpm(96);
    }
  };

  const startStudio = () => {
    if (studioTimerRef.current) clearInterval(studioTimerRef.current);
    setIsPlayingStudio(true);
    let step = 0;
    const stepDurationMs = (60 / studioBpm) * 1000 / 2;

    studioTimerRef.current = setInterval(() => {
      const activeStep = step % STEP_COUNT;
      setStudioCurrentStep(activeStep);

      // Play any active sounds on this step
      TRACKS.forEach((track) => {
        if (grid[track.id]?.[activeStep]) {
          track.sound();
        }
      });

      step++;
    }, stepDurationMs);
  };

  const stopStudio = () => {
    if (studioTimerRef.current) {
      clearInterval(studioTimerRef.current);
      studioTimerRef.current = null;
    }
    setIsPlayingStudio(false);
    setStudioCurrentStep(0);
  };

  useEffect(() => {
    if (isPlayingStudio) {
      startStudio();
    }
    return () => {
      if (studioTimerRef.current) clearInterval(studioTimerRef.current);
    };
  }, [studioBpm, grid]);

  return (
    <section id="rhythm-lab" className="py-20 lg:py-36 bg-[#111111] text-[#F4F0E8] px-4 sm:px-6 lg:px-12 border-t border-b border-[#F4F0E8]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F4F0E8]/15 pb-6 sm:pb-8 gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#E6B83A] uppercase px-2 py-0.5 border border-[#E6B83A]/30">
                03 // TEMPO & GROOVE SANCTUARY
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/50">
                Precision Timing Engine
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase font-serif text-[#F4F0E8] break-words">
              RHYTHM & <span className="italic font-light text-[#E6B83A]">METRONOME LAB</span>
            </h2>
            <p className="text-xs sm:text-base text-[#F4F0E8]/70 max-w-2xl font-sans leading-relaxed">
              Lock in your internal pulse. Explore digital metronomic precision, rhythmic subdivisions, and an interactive 8-step groove studio.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'metronome', label: '1. METRONOME' },
              { id: 'rhythm', label: '2. SUBDIVISIONS' },
              { id: 'beatmaker', label: '3. BEAT STUDIO' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  stopMetronome();
                  stopRhythmDemo();
                  stopStudio();
                  setActiveTab(tab.id);
                }}
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
        </div>

        {/* ============================================================== */}
        {/* TAB 1: DIGITAL METRONOME                                       */}
        {/* ============================================================== */}
        {activeTab === 'metronome' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#181818] border border-[#F4F0E8]/10 p-5 sm:p-8 lg:p-12">
            
            {/* Visual Beat Display & Pulses */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center sm:text-left">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                  PRECISION TICK
                </span>
                <div className="flex items-baseline gap-3 sm:gap-4 justify-center sm:justify-start">
                  <span className="text-5xl sm:text-7xl lg:text-8xl font-black font-serif text-[#F4F0E8]">
                    {bpm}
                  </span>
                  <span className="text-lg sm:text-xl font-mono text-[#E6B83A] font-bold">
                    BPM
                  </span>
                  <span className="text-xs font-mono text-[#F4F0E8]/50">
                    {timeSignature}/4 Time
                  </span>
                </div>
              </div>

              {/* Animated Beat Dots (1 - 2 - 3 - 4) */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4F0E8]/40 block">
                  Beat Position (1 is Downbeat Accent)
                </span>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                  {Array.from({ length: timeSignature }, (_, i) => {
                    const isCurrent = isPlayingMetronome && currentBeat === i;
                    const isDownbeat = i === 0;
                    return (
                      <div
                        key={i}
                        className={`w-12 h-12 sm:w-16 sm:h-16 flex flex-col items-center justify-center border font-mono transition-all duration-75 ${
                          isCurrent
                            ? isDownbeat
                              ? 'bg-[#9E2F2F] text-[#F4F0E8] scale-105 sm:scale-110 border-[#F4F0E8] shadow-[0_0_15px_#9E2F2F]'
                              : 'bg-[#E6B83A] text-[#111111] scale-105 border-[#F4F0E8]'
                            : 'bg-[#111111] text-[#F4F0E8]/50 border-[#F4F0E8]/10'
                        }`}
                      >
                        <span className="text-base sm:text-lg font-bold">{i + 1}</span>
                        <span className="text-[8px] uppercase tracking-wider opacity-60">
                          {isDownbeat ? 'ACCENT' : 'BEAT'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Play / Stop Button & Tap Tempo */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
                <button
                  onClick={isPlayingMetronome ? stopMetronome : startMetronome}
                  className={`px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl ${
                    isPlayingMetronome
                      ? 'bg-[#9E2F2F] text-[#F4F0E8] hover:bg-[#852525]'
                      : 'bg-[#E6B83A] text-[#111111] hover:bg-[#d4a832]'
                  }`}
                >
                  {isPlayingMetronome ? (
                    <>
                      <Square size={16} /> STOP METRONOME
                    </>
                  ) : (
                    <>
                      <Play size={16} /> START METRONOME
                    </>
                  )}
                </button>

                <button
                  onClick={handleTapTempo}
                  className="px-5 py-3.5 bg-[#111111] border border-[#F4F0E8]/20 text-xs font-mono uppercase tracking-wider text-[#F4F0E8] hover:border-[#E6B83A] active:scale-95 transition-all"
                >
                  TAP TEMPO
                </button>
              </div>
            </div>

            {/* Metronome Controls (Slider, Presets, Time Signatures) */}
            <div className="lg:col-span-6 bg-[#111111] border border-[#F4F0E8]/10 p-6 sm:p-8 space-y-6">
              
              {/* Slider & Fine Increment Buttons */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#F4F0E8]/70">
                  <span>TEMPO ADJUSTMENT</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBpm((b) => Math.max(40, b - 1))}
                      className="w-7 h-7 bg-[#181818] border border-[#F4F0E8]/20 flex items-center justify-center hover:border-[#E6B83A]"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-bold text-[#E6B83A]">{bpm} BPM</span>
                    <button
                      onClick={() => setBpm((b) => Math.min(240, b + 1))}
                      className="w-7 h-7 bg-[#181818] border border-[#F4F0E8]/20 flex items-center justify-center hover:border-[#E6B83A]"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <input
                  type="range"
                  min="40"
                  max="240"
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full h-2 bg-[#222222] rounded-lg appearance-none cursor-pointer accent-[#E6B83A]"
                />
              </div>

              {/* Presets: 60, 80, 100, 120, 140 */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4F0E8]/40 block">
                  STANDARD TEMPO PRESETS
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {[60, 80, 100, 120, 140].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setBpm(preset)}
                      className={`py-2 text-xs font-mono border transition-all ${
                        bpm === preset
                          ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                          : 'bg-[#181818] text-[#F4F0E8]/70 border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Signatures */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4F0E8]/40 block">
                  TIME SIGNATURE
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { sig: 4, label: '4/4 Common' },
                    { sig: 3, label: '3/4 Waltz' },
                    { sig: 2, label: '2/4 March' },
                    { sig: 6, label: '6/8 Compound' },
                  ].map((ts) => (
                    <button
                      key={ts.sig}
                      onClick={() => setTimeSignature(ts.sig)}
                      className={`p-2 text-center border transition-all ${
                        timeSignature === ts.sig
                          ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                          : 'bg-[#181818] text-[#F4F0E8]/70 border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                      }`}
                    >
                      <span className="text-xs font-bold block">{ts.sig}/4</span>
                      <span className="text-[9px] font-mono opacity-60 block truncate">{ts.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: RHYTHM SUBDIVISIONS LAB                                 */}
        {/* ============================================================== */}
        {activeTab === 'rhythm' && (
          <div className="bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F4F0E8]/10 pb-4 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                  SUBDIVISION LABORATORY
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#F4F0E8]">
                  Learn How Beats Divide
                </h3>
              </div>

              <button
                onClick={isPlayingRhythm ? stopRhythmDemo : startRhythmDemo}
                className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  isPlayingRhythm
                    ? 'bg-[#9E2F2F] text-[#F4F0E8]'
                    : 'bg-[#E6B83A] text-[#111111]'
                }`}
              >
                {isPlayingRhythm ? <Square size={14} /> : <Play size={14} />}
                {isPlayingRhythm ? 'PAUSE PULSE' : 'LISTEN TO SUBDIVISION'}
              </button>
            </div>

            {/* Subdivision Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(SUBDIVISIONS).map((key) => {
                const sub = SUBDIVISIONS[key];
                const isSelected = activeSubdivision === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      stopRhythmDemo();
                      setActiveSubdivision(key);
                    }}
                    className={`p-4 text-left border transition-all ${
                      isSelected
                        ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                        : 'bg-[#111111] text-[#F4F0E8] border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                    }`}
                  >
                    <span className="text-xs font-mono uppercase block opacity-70">Subdivision</span>
                    <span className="text-sm font-serif font-bold block mt-1">{sub.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Visual Beat Indicator */}
            <div className="p-8 bg-[#111111] border border-[#F4F0E8]/15 text-center space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                Visual Subdivision Count (90 BPM)
              </span>

              <div className="flex flex-wrap justify-center gap-3">
                {SUBDIVISIONS[activeSubdivision].labels.map((lbl, idx) => {
                  const isActive = isPlayingRhythm && rhythmBeatIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`w-14 h-16 sm:w-18 sm:h-20 flex flex-col items-center justify-center border font-mono transition-all ${
                        isActive
                          ? 'bg-[#E6B83A] text-[#111111] scale-110 font-black border-[#F4F0E8] shadow-lg'
                          : 'bg-[#181818] text-[#F4F0E8]/60 border-[#F4F0E8]/10'
                      }`}
                    >
                      <span className="text-xl sm:text-2xl font-bold">{lbl}</span>
                      <span className="text-[9px] opacity-60">Step {idx + 1}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs font-mono text-[#F4F0E8]/60 max-w-lg mx-auto">
                Practicing subdivisions with Kuldeep Gaur trains both your auditory pulse and finger precision to lock onto any groove without rushing or dragging.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: MINI MUSIC STUDIO ("BUILD A BEAT")                      */}
        {/* ============================================================== */}
        {activeTab === 'beatmaker' && (
          <div className="bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#F4F0E8]/10 pb-6 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block font-bold">
                  // MINI MUSIC STUDIO
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-serif uppercase tracking-tight text-[#F4F0E8]">
                  8-Step Interactive Drum Sequencer
                </h3>
              </div>

              {/* Studio Master Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={isPlayingStudio ? stopStudio : startStudio}
                  className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                    isPlayingStudio
                      ? 'bg-[#9E2F2F] text-[#F4F0E8]'
                      : 'bg-[#E6B83A] text-[#111111]'
                  }`}
                >
                  {isPlayingStudio ? <Square size={14} /> : <Play size={14} />}
                  {isPlayingStudio ? 'STOP LOOP' : 'PLAY LOOP'}
                </button>

                <div className="flex items-center gap-2 bg-[#111111] px-3 py-2 border border-[#F4F0E8]/20">
                  <span className="text-xs font-mono text-[#F4F0E8]/70">BPM:</span>
                  <input
                    type="number"
                    min="60"
                    max="180"
                    value={studioBpm}
                    onChange={(e) => setStudioBpm(Number(e.target.value))}
                    className="w-14 bg-transparent text-xs font-mono font-bold text-[#E6B83A] focus:outline-none"
                  />
                </div>

                <button
                  onClick={clearPattern}
                  className="px-3 py-2 bg-[#111111] border border-[#F4F0E8]/20 text-xs font-mono text-[#F4F0E8]/70 hover:text-[#F4F0E8] hover:border-[#F4F0E8]/40"
                >
                  Clear Pattern
                </button>
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase text-[#E6B83A] mr-2">Groove Presets:</span>
              <button
                onClick={() => loadGroovePreset('funk')}
                className="px-3 py-1 bg-[#111111] border border-[#F4F0E8]/20 text-xs font-mono hover:border-[#E6B83A]"
              >
                Funk Groove
              </button>
              <button
                onClick={() => loadGroovePreset('rock')}
                className="px-3 py-1 bg-[#111111] border border-[#F4F0E8]/20 text-xs font-mono hover:border-[#E6B83A]"
              >
                Classic 4/4 Rock
              </button>
              <button
                onClick={() => loadGroovePreset('fusion')}
                className="px-3 py-1 bg-[#111111] border border-[#F4F0E8]/20 text-xs font-mono hover:border-[#E6B83A]"
              >
                Indian Tabla Fusion
              </button>
            </div>

            {/* Sequencer Grid */}
            <div className="text-[11px] font-mono text-[#E6B83A] sm:hidden flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#111111] border border-[#E6B83A]/25 text-center mb-2">
              <span>← Swipe horizontally to edit 8-step sequencer →</span>
            </div>

            <div className="overflow-x-auto scroll-touch-momentum pb-4">
              <div className="min-w-[640px] space-y-3 bg-[#111111] p-4 border border-[#F4F0E8]/10">
                
                {/* Step Position Bar */}
                <div className="grid grid-cols-[140px_repeat(8,1fr)] gap-2 text-center text-[10px] font-mono text-[#F4F0E8]/40 pb-2 border-b border-[#F4F0E8]/10">
                  <div className="text-left font-bold text-[#E6B83A]">VOICE / STEP</div>
                  {Array.from({ length: STEP_COUNT }, (_, i) => (
                    <div
                      key={i}
                      className={`font-bold transition-all ${
                        isPlayingStudio && studioCurrentStep === i ? 'text-[#E6B83A] scale-125' : ''
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* 6 Drum / Instrument Tracks */}
                {TRACKS.map((track) => (
                  <div key={track.id} className="grid grid-cols-[140px_repeat(8,1fr)] gap-2 items-center">
                    {/* Track Header */}
                    <button
                      onClick={track.sound}
                      className="p-2 text-left bg-[#181818] border border-[#F4F0E8]/10 hover:border-[#E6B83A] transition-colors flex items-center justify-between group"
                    >
                      <span className="text-xs font-mono font-bold truncate">{track.name}</span>
                      <Volume2 size={12} className="text-[#E6B83A] opacity-0 group-hover:opacity-100" />
                    </button>

                    {/* 8 Steps */}
                    {Array.from({ length: STEP_COUNT }, (_, stepIdx) => {
                      const isActive = grid[track.id]?.[stepIdx];
                      const isCurrentStep = isPlayingStudio && studioCurrentStep === stepIdx;

                      return (
                        <button
                          key={stepIdx}
                          onClick={() => toggleGridCell(track.id, stepIdx)}
                          className={`h-11 border transition-all rounded-none ${
                            isActive
                              ? isCurrentStep
                                ? 'bg-[#F4F0E8] text-[#111111] scale-105 border-[#F4F0E8] shadow-lg'
                                : 'bg-[#E6B83A] text-[#111111] border-[#E6B83A]'
                              : isCurrentStep
                              ? 'bg-[#222222] border-[#E6B83A]/50'
                              : 'bg-[#181818] border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#F4F0E8]/50 gap-2 border-t border-[#F4F0E8]/10 pt-4">
              <span>Lightweight Web Audio step synthesis. Click cells to toggle hits, or click any voice label to preview its tone.</span>
              <span className="text-[#E6B83A]">Zero external plugins required</span>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
