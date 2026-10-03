import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, CheckCircle, Flame } from 'lucide-react';

export default function PracticeTimer({ onLogSession }) {
  const [seconds, setSeconds] = useState(1500); // 25 mins default
  const [initialSeconds, setInitialSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [sessionLogged, setSessionLogged] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => {
    setIsActive(!isActive);
    setSessionLogged(false);
  };

  const reset = (durationSec = initialSeconds) => {
    setIsActive(false);
    setSeconds(durationSec);
    setInitialSeconds(durationSec);
    setSessionLogged(false);
  };

  const handleLog = () => {
    const elapsedMinutes = Math.max(1, Math.round((initialSeconds - seconds) / 60));
    if (onLogSession) {
      onLogSession(elapsedMinutes);
    }
    setSessionLogged(true);
    setTimeout(() => setSessionLogged(false), 3000);
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, Math.max(0, ((initialSeconds - seconds) / initialSeconds) * 100));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center space-x-2 text-slate-100">
            <Timer className="text-amber-400" size={22} />
            <span>Practice Session Focus Timer</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build discipline with structured interval practice routines.
          </p>
        </div>

        <div className="flex space-x-2">
          {[
            { label: '15m', sec: 900 },
            { label: '25m', sec: 1500 },
            { label: '45m', sec: 2700 }
          ].map(preset => (
            <button
              key={preset.sec}
              onClick={() => reset(preset.sec)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                initialSeconds === preset.sec
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 text-center space-y-4">
        <div className="text-5xl sm:text-6xl font-mono font-black text-slate-100 tracking-tight">
          {formatTime(seconds)}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-500 to-indigo-500 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="flex justify-center items-center gap-3 pt-2">
          <button
            onClick={toggle}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 transition shadow-lg ${
              isActive
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isActive ? <Pause size={16} /> : <Play size={16} />}
            <span>{isActive ? 'Pause' : 'Start Focus'}</span>
          </button>

          <button
            onClick={() => reset(initialSeconds)}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
            title="Reset Timer"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={handleLog}
            disabled={seconds === initialSeconds}
            className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 disabled:opacity-30 disabled:pointer-events-none"
          >
            <Flame size={14} className="text-amber-400" />
            <span>{sessionLogged ? 'Logged to Streak! ✓' : 'Log Minutes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
