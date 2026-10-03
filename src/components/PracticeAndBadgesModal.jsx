import React, { useState } from 'react';
import { 
  X, 
  CheckSquare, 
  Square, 
  Award, 
  Flame, 
  Sparkles, 
  Clock, 
  RotateCcw,
  Volume2
} from 'lucide-react';

export default function PracticeAndBadgesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Practice Checklist State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Instrument Tune-Up', detail: 'Check all 6 strings or check keyboard pitch accuracy with the Tuner', completed: false, category: 'Tuning' },
    { id: 2, title: 'C Major & A Minor Transitions', detail: 'Clean 60 BPM metronome switches between open C and Am chords', completed: false, category: 'Chords' },
    { id: 3, title: 'Scale Precision Drill', detail: 'Play 1 octave up and down with steady finger alternation', completed: false, category: 'Scales' },
    { id: 4, title: '4/4 Metronome Rhythm Subdivision', detail: 'Count out loud 1 - & - 2 - & - 3 - & - 4 - & alongside click', completed: false, category: 'Rhythm' },
    { id: 5, title: 'Ear Training Identification', detail: 'Score 5 correct answers in the Ear Training Lab pitch challenge', completed: false, category: 'Aural' },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  // Gamification Badges
  const badges = [
    { id: 'b1', name: 'First Chord Master', symbol: '🎸', desc: 'Unlocked by playing and switching between foundational chords', unlocked: completedCount >= 2 },
    { id: 'b2', name: 'Scale Pioneer', symbol: '🎵', desc: 'Explored major and pentatonic scale architecture', unlocked: completedCount >= 3 },
    { id: 'b3', name: 'Keys Virtuoso', symbol: '🎹', desc: 'Engaged with virtual grand piano articulation', unlocked: true },
    { id: 'b4', name: 'Groove Locked', symbol: '🔥', desc: 'Locked in tempo alongside metronomic pulse', unlocked: completedCount >= 4 },
    { id: 'b5', name: 'Pitch Detective', symbol: '🎯', desc: 'Identified intervals and note pitches by ear', unlocked: completedCount >= 5 },
    { id: 'b6', name: 'Theory Architect', symbol: '🏆', desc: 'Examined Saptak Swaras and Diatonic harmonies', unlocked: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#141210] border border-[#F4F0E8]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-[#F4F0E8]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#F4F0E8]/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
              // STUDENT PRACTICE COMPANION
            </span>
            <h3 className="text-2xl font-black font-serif uppercase tracking-tight">
              Today's Practice & Badges
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#F4F0E8]/60 hover:text-[#F4F0E8] border border-[#F4F0E8]/10 hover:border-[#E6B83A] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#E6B83A] font-bold">DAILY ROUTINE PROGRESS</span>
            <span>{completedCount} of {tasks.length} Complete ({progressPercent}%)</span>
          </div>
          <div className="h-2 bg-[#222222] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E6B83A] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Checklist */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
            TODAY'S EXERCISES
          </span>
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`w-full p-3.5 text-left border transition-all flex items-start gap-3 cursor-pointer ${
                task.completed
                  ? 'bg-[#181818] border-green-500/40 text-[#F4F0E8]/60 line-through'
                  : 'bg-[#111111] border-[#F4F0E8]/10 hover:border-[#E6B83A] text-[#F4F0E8]'
              }`}
            >
              <div className="mt-0.5 text-[#E6B83A]">
                {task.completed ? <CheckSquare size={18} className="text-green-400" /> : <Square size={18} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-serif font-bold">{task.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#181818] border border-[#F4F0E8]/10 text-[#E6B83A]">
                    {task.category}
                  </span>
                </div>
                <p className="text-xs font-sans text-[#F4F0E8]/60 mt-0.5 no-underline">
                  {task.detail}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Badges System */}
        <div className="space-y-3 pt-2 border-t border-[#F4F0E8]/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
              YOUR MUSIC JOURNEY BADGES
            </span>
            <span className="text-[10px] font-mono text-[#F4F0E8]/50">
              {badges.filter((b) => b.unlocked).length} / {badges.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3.5 border transition-all text-center space-y-1 ${
                  b.unlocked
                    ? 'bg-[#181818] border-[#E6B83A]/50 text-[#F4F0E8]'
                    : 'bg-[#111111] border-[#F4F0E8]/5 text-[#F4F0E8]/30 opacity-50'
                }`}
              >
                <div className="text-2xl mb-1">{b.symbol}</div>
                <div className="text-xs font-serif font-bold truncate">{b.name}</div>
                <div className="text-[9px] font-sans opacity-70 leading-tight">{b.desc}</div>
                {b.unlocked && (
                  <span className="text-[9px] font-mono text-[#E6B83A] block uppercase font-bold mt-1">
                    ✓ Unlocked
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#d4a832] transition-colors"
          >
            CONTINUE PRACTICING
          </button>
        </div>

      </div>
    </div>
  );
}
