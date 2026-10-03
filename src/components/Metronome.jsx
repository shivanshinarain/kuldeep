import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, VolumeX, Sliders, Activity, Zap } from 'lucide-react';
import { playMetronomeClick } from '../utils/audio';

export default function Metronome() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSignature, setTimeSignature] = useState(4); // 4/4 default
  const [currentBeat, setCurrentBeat] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // References for timing loop
  const timerRef = useRef(null);
  const beatRef = useRef(0);
  const tapTimesRef = useRef([]);

  // Clear timer helper
  const stopMetronome = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setCurrentBeat(0);
    beatRef.current = 0;
  };

  // Start metronome helper
  const startMetronome = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    beatRef.current = 0;
    setCurrentBeat(0);
    setIsPlaying(true);

    // Initial click on start
    if (!isMuted) playMetronomeClick(true);

    const intervalMs = (60 / bpm) * 1000;
    timerRef.current = setInterval(() => {
      beatRef.current = (beatRef.current + 1) % timeSignature;
      setCurrentBeat(beatRef.current);
      if (!isMuted) {
        playMetronomeClick(beatRef.current === 0);
      }
    }, intervalMs);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  // Restart timer if BPM or time signature changes while playing
  useEffect(() => {
    if (isPlaying) {
      startMetronome();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [bpm, timeSignature, isMuted]);

  // Handle BPM adjustments
  const adjustBpm = (delta) => {
    setBpm(prev => Math.min(240, Math.max(40, prev + delta)));
  };

  // Tap Tempo calculation
  const handleTapTempo = () => {
    const now = Date.now();
    const taps = tapTimesRef.current.filter(t => now - t < 3000);
    taps.push(now);
    tapTimesRef.current = taps;

    if (taps.length >= 2) {
      const intervals = [];
      for (let i = 1; i < taps.length; i++) {
        intervals.push(taps[i] - taps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 40 && calculatedBpm <= 240) {
        setBpm(calculatedBpm);
      }
    }
  };

  // Tempo markings
  const getTempoLabel = (val) => {
    if (val < 60) return 'Largo (Broad & Slow)';
    if (val < 76) return 'Adagio (Slow)';
    if (val < 108) return 'Andante (Walking Pace)';
    if (val < 132) return 'Moderato (Moderate)';
    if (val < 168) return 'Allegro (Fast & Bright)';
    return 'Presto (Virtuoso Fast)';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold flex items-center space-x-2 text-slate-100">
            <Sliders className="text-amber-400" size={22} />
            <span>Digital Metronome & Precision Click</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Crystal-clear Web Audio timing pulse with beat accentuation.
          </p>
        </div>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-2 rounded-xl border transition ${
            isMuted
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
          }`}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Main Display & Beat Indicator */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 text-center space-y-5">
        <div className="flex items-baseline justify-center space-x-2">
          <span className="text-6xl sm:text-7xl font-mono font-black text-amber-400 tracking-tight">
            {bpm}
          </span>
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            BPM
          </span>
        </div>

        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {getTempoLabel(bpm)}
        </div>

        {/* Visual LED Beat Pulsers */}
        <div className="flex justify-center items-center gap-3 pt-1">
          {Array.from({ length: timeSignature }).map((_, idx) => {
            const isActive = isPlaying && currentBeat === idx;
            const isDownbeat = idx === 0;

            return (
              <div
                key={idx}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-75 ${
                  isActive
                    ? isDownbeat
                      ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/80 scale-125'
                      : 'bg-indigo-400 text-slate-950 shadow-md shadow-indigo-400/60 scale-110'
                    : isDownbeat
                    ? 'bg-slate-800 border border-amber-500/40 text-amber-400/60'
                    : 'bg-slate-900 border border-slate-800 text-slate-600'
                }`}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>

        {/* BPM Slider */}
        <div className="px-2 pt-2">
          <input
            type="range"
            min="40"
            max="240"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
            <span>40 Largo</span>
            <span>120 Moderato</span>
            <span>240 Presto</span>
          </div>
        </div>

        {/* Quick Steppers & Tap */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={() => adjustBpm(-5)}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 transition"
          >
            -5
          </button>
          <button
            onClick={() => adjustBpm(-1)}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 transition"
          >
            -1
          </button>

          <button
            onClick={togglePlay}
            className={`px-8 py-2.5 rounded-xl font-black text-sm flex items-center space-x-2 transition shadow-lg ${
              isPlaying
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Square size={16} fill="currentColor" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Play size={16} fill="currentColor" />
                <span>Start Click</span>
              </>
            )}
          </button>

          <button
            onClick={() => adjustBpm(1)}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 transition"
          >
            +1
          </button>
          <button
            onClick={() => adjustBpm(5)}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 transition"
          >
            +5
          </button>

          <button
            onClick={handleTapTempo}
            className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition active:scale-95 ml-1"
          >
            <Zap size={13} />
            <span>Tap Tempo</span>
          </button>
        </div>
      </div>

      {/* Meter / Time Signature Selector */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
          Time Signature
        </span>
        <div className="flex space-x-2">
          {[
            { val: 4, label: '4/4' },
            { val: 3, label: '3/4' },
            { val: 2, label: '2/4' },
            { val: 6, label: '6/8' }
          ].map(sig => (
            <button
              key={sig.val}
              onClick={() => setTimeSignature(sig.val)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                timeSignature === sig.val
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {sig.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
