import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Award, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  Equal,
  HelpCircle
} from 'lucide-react';
import { playPianoNote, playChord, NOTE_FREQUENCIES } from '../utils/audioEngine';

export default function EarTrainingLab() {
  const [activeGame, setActiveGame] = useState('note'); // 'note' | 'higher_lower' | 'same_diff' | 'chord_type'
  const [difficulty, setDifficulty] = useState('beginner'); // 'beginner' | 'intermediate' | 'advanced'
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, message: string }
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // ==========================================
  // GAME 1: IDENTIFY THE NOTE
  // ==========================================
  const NATURAL_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const [targetNote, setTargetNote] = useState('C');
  const [targetOctave, setTargetOctave] = useState(4);

  const startNewNoteRound = (level = difficulty) => {
    setFeedback(null);
    const randomNote = NATURAL_NOTES[Math.floor(Math.random() * NATURAL_NOTES.length)];
    const octave = level === 'advanced' ? (Math.random() > 0.5 ? 3 : 5) : 4;
    setTargetNote(randomNote);
    setTargetOctave(octave);

    const freqKey = `${randomNote}${octave}`;
    const freq = NOTE_FREQUENCIES[freqKey] || 440;
    playPianoNote(freq, 1.6);
  };

  const replayCurrentNote = () => {
    const freqKey = `${targetNote}${targetOctave}`;
    const freq = NOTE_FREQUENCIES[freqKey] || 440;
    playPianoNote(freq, 1.6);
  };

  const handleNoteGuess = (guessedNote) => {
    if (feedback) return;
    setAttempts((a) => a + 1);
    const isCorrect = guessedNote === targetNote;
    if (isCorrect) setScore((s) => s + 1);

    setFeedback({
      isCorrect,
      message: isCorrect
        ? `Brilliant! That was indeed ${targetNote}${targetOctave}.`
        : `Not quite. That note was ${targetNote}${targetOctave}. Listen to the pitch again.`
    });
  };

  // ==========================================
  // GAME 2: HIGHER OR LOWER
  // ==========================================
  const [pitchPair, setPitchPair] = useState({ note1: 'C4', note2: 'G4', answer: 'higher' });

  const startNewHigherLowerRound = () => {
    setFeedback(null);
    const noteKeys = Object.keys(NOTE_FREQUENCIES).slice(12, 28); // C3 to E5
    const idx1 = Math.floor(Math.random() * (noteKeys.length - 2));
    let diff = Math.floor(Math.random() * 5) + 1; // 1 to 5 semitones away
    if (Math.random() > 0.5) diff = -diff;
    const idx2 = Math.max(0, Math.min(noteKeys.length - 1, idx1 + diff));

    const note1 = noteKeys[idx1];
    const note2 = noteKeys[idx2];
    const freq1 = NOTE_FREQUENCIES[note1];
    const freq2 = NOTE_FREQUENCIES[note2];

    const answer = freq2 > freq1 ? 'higher' : freq2 < freq1 ? 'lower' : 'same';
    setPitchPair({ note1, note2, answer });

    playHigherLowerPair(freq1, freq2);
  };

  const playHigherLowerPair = (f1 = NOTE_FREQUENCIES[pitchPair.note1], f2 = NOTE_FREQUENCIES[pitchPair.note2]) => {
    setIsPlayingAudio(true);
    playPianoNote(f1, 1.2);
    setTimeout(() => {
      playPianoNote(f2, 1.2);
      setIsPlayingAudio(false);
    }, 700);
  };

  const handleHigherLowerGuess = (guess) => {
    if (feedback) return;
    setAttempts((a) => a + 1);
    const isCorrect = guess === pitchPair.answer;
    if (isCorrect) setScore((s) => s + 1);

    setFeedback({
      isCorrect,
      message: isCorrect
        ? `Accurate! Note 2 (${pitchPair.note2}) was ${pitchPair.answer} than Note 1 (${pitchPair.note1}).`
        : `Incorrect. Note 2 (${pitchPair.note2}) was actually ${pitchPair.answer} than Note 1 (${pitchPair.note1}).`
    });
  };

  // ==========================================
  // GAME 3: IDENTIFY CHORD QUALITY (MAJOR VS MINOR)
  // ==========================================
  const [targetChord, setTargetChord] = useState({ name: 'C Major', type: 'Major', freqs: [261.63, 329.63, 392.00] });

  const startNewChordRound = () => {
    setFeedback(null);
    const isMajor = Math.random() > 0.5;
    const roots = [
      { name: 'C', base: 261.63 },
      { name: 'D', base: 293.66 },
      { name: 'E', base: 329.63 },
      { name: 'G', base: 392.00 },
      { name: 'A', base: 440.00 }
    ];
    const root = roots[Math.floor(Math.random() * roots.length)];
    const thirdMult = isMajor ? Math.pow(2, 4 / 12) : Math.pow(2, 3 / 12);
    const fifthMult = Math.pow(2, 7 / 12);

    const freqs = [root.base, root.base * thirdMult, root.base * fifthMult];
    const chordInfo = {
      name: `${root.name} ${isMajor ? 'Major' : 'Minor'}`,
      type: isMajor ? 'Major' : 'Minor',
      freqs
    };
    setTargetChord(chordInfo);
    playChord(freqs, 'piano');
  };

  const handleChordGuess = (guess) => {
    if (feedback) return;
    setAttempts((a) => a + 1);
    const isCorrect = guess === targetChord.type;
    if (isCorrect) setScore((s) => s + 1);

    setFeedback({
      isCorrect,
      message: isCorrect
        ? `Correct! That bright & open sound was indeed a ${targetChord.type} chord (${targetChord.name}).`
        : `Incorrect. That was a ${targetChord.type} chord (${targetChord.name}). Notice the ${targetChord.type === 'Major' ? 'bright/uplifting' : 'somber/reflective'} third.`
    });
  };

  // Start initial round on mount
  useEffect(() => {
    startNewNoteRound('beginner');
  }, []);

  const resetGame = () => {
    setScore(0);
    setAttempts(0);
    setFeedback(null);
    if (activeGame === 'note') startNewNoteRound();
    else if (activeGame === 'higher_lower') startNewHigherLowerRound();
    else if (activeGame === 'chord_type') startNewChordRound();
  };

  return (
    <section id="ear-training" className="py-24 lg:py-36 bg-[#181818] text-[#F4F0E8] px-6 lg:px-12 border-t border-b border-[#F4F0E8]/10 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F4F0E8]/15 pb-8 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-[#E6B83A] uppercase px-2 py-0.5 border border-[#E6B83A]/30">
                10 // EAR TRAINING & AUDITORY GYM
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/50">
                Aural Skills Development
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-serif text-[#F4F0E8]">
              EAR <span className="italic font-light text-[#E6B83A]">TRAINING LAB</span>
            </h2>
            <p className="text-sm sm:text-base text-[#F4F0E8]/70 max-w-xl font-sans leading-relaxed">
              Music is first heard, then felt, then played. Train your ear to recognize pitch, detect intervals, and distinguish harmonic colorations.
            </p>
          </div>

          {/* Score Counter */}
          <div className="flex items-center gap-4 bg-[#111111] p-4 border border-[#F4F0E8]/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4F0E8]/50 block">
                SESSION SCORE
              </span>
              <div className="text-2xl font-mono font-bold text-[#E6B83A]">
                {score} / {attempts}
                <span className="text-xs font-normal text-[#F4F0E8]/40 ml-2">
                  ({attempts > 0 ? Math.round((score / attempts) * 100) : 0}%)
                </span>
              </div>
            </div>
            <button
              onClick={resetGame}
              className="p-2 text-[#F4F0E8]/60 hover:text-[#F4F0E8] hover:border-[#E6B83A] border border-transparent transition-colors"
              title="Reset Score"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Game Mode Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-[#F4F0E8]/10 pb-4">
          {[
            { id: 'note', label: '1. IDENTIFY THE NOTE' },
            { id: 'higher_lower', label: '2. HIGHER OR LOWER?' },
            { id: 'chord_type', label: '3. MAJOR VS MINOR CHORD' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveGame(tab.id);
                setFeedback(null);
                if (tab.id === 'note') startNewNoteRound();
                else if (tab.id === 'higher_lower') startNewHigherLowerRound();
                else if (tab.id === 'chord_type') startNewChordRound();
              }}
              className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 border ${
                activeGame === tab.id
                  ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                  : 'bg-[#111111] text-[#F4F0E8]/70 border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30 hover:text-[#F4F0E8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ============================================================== */}
        {/* GAME 1: IDENTIFY THE NOTE                                      */}
        {/* ============================================================== */}
        {activeGame === 'note' && (
          <div className="bg-[#111111] border border-[#F4F0E8]/10 p-6 sm:p-12 space-y-8 text-center max-w-3xl mx-auto shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                EXERCISE 01
              </span>
              <h3 className="text-3xl font-black font-serif text-[#F4F0E8]">
                Which note did you hear?
              </h3>
              <p className="text-xs sm:text-sm text-[#F4F0E8]/60 font-sans">
                Listen carefully to the piano tone and select the corresponding pitch letter below.
              </p>
            </div>

            {/* Replay Audio Trigger */}
            <div className="flex justify-center">
              <button
                onClick={replayCurrentNote}
                className="flex items-center gap-3 px-8 py-4 bg-[#E6B83A] text-[#111111] font-mono text-sm font-bold uppercase tracking-wider hover:bg-[#d4a832] transition-colors shadow-lg active:scale-95"
              >
                <Volume2 size={20} /> REPLAY NOTE AUDIO
              </button>
            </div>

            {/* Note Options (A, B, C, D, E, F, G) */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 pt-4">
              {NATURAL_NOTES.map((note) => (
                <button
                  key={note}
                  onClick={() => handleNoteGuess(note)}
                  disabled={feedback !== null}
                  className={`py-5 text-center border font-serif font-black text-2xl transition-all cursor-pointer ${
                    feedback
                      ? note === targetNote
                        ? 'bg-green-500 text-white border-green-500 scale-105'
                        : 'bg-[#181818] text-[#F4F0E8]/30 border-[#F4F0E8]/5'
                      : 'bg-[#181818] text-[#F4F0E8] border-[#F4F0E8]/15 hover:border-[#E6B83A] hover:text-[#E6B83A] active:scale-95'
                  }`}
                >
                  {note}
                </button>
              ))}
            </div>

            {/* Feedback Message & Next Round */}
            {feedback && (
              <div className="space-y-4 pt-4 border-t border-[#F4F0E8]/10 animate-fade-in">
                <div className={`flex items-center justify-center gap-2 text-sm font-mono font-bold ${
                  feedback.isCorrect ? 'text-green-400' : 'text-[#9E2F2F]'
                }`}>
                  {feedback.isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />}
                  <span>{feedback.message}</span>
                </div>

                <button
                  onClick={() => startNewNoteRound()}
                  className="px-6 py-2.5 bg-[#F4F0E8] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#E6B83A] transition-colors"
                >
                  NEXT NOTE &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* GAME 2: HIGHER OR LOWER?                                       */}
        {/* ============================================================== */}
        {activeGame === 'higher_lower' && (
          <div className="bg-[#111111] border border-[#F4F0E8]/10 p-6 sm:p-12 space-y-8 text-center max-w-3xl mx-auto shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                EXERCISE 02
              </span>
              <h3 className="text-3xl font-black font-serif text-[#F4F0E8]">
                Was the second note Higher or Lower?
              </h3>
              <p className="text-xs sm:text-sm text-[#F4F0E8]/60 font-sans">
                You will hear two pitches in sequence. Determine whether Note 2 was higher in pitch or lower than Note 1.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => playHigherLowerPair()}
                disabled={isPlayingAudio}
                className="flex items-center gap-3 px-8 py-4 bg-[#E6B83A] text-[#111111] font-mono text-sm font-bold uppercase tracking-wider hover:bg-[#d4a832] transition-colors shadow-lg active:scale-95"
              >
                <Volume2 size={20} /> REPLAY BOTH TONES
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4">
              <button
                onClick={() => handleHigherLowerGuess('higher')}
                disabled={feedback !== null}
                className="py-6 px-4 bg-[#181818] border border-[#F4F0E8]/15 hover:border-green-400 hover:text-green-400 font-mono font-bold text-base flex flex-col items-center gap-2 transition-all"
              >
                <ArrowUp size={24} className="text-green-400" />
                <span>HIGHER PITCH</span>
              </button>

              <button
                onClick={() => handleHigherLowerGuess('lower')}
                disabled={feedback !== null}
                className="py-6 px-4 bg-[#181818] border border-[#F4F0E8]/15 hover:border-[#9E2F2F] hover:text-[#9E2F2F] font-mono font-bold text-base flex flex-col items-center gap-2 transition-all"
              >
                <ArrowDown size={24} className="text-[#9E2F2F]" />
                <span>LOWER PITCH</span>
              </button>
            </div>

            {feedback && (
              <div className="space-y-4 pt-4 border-t border-[#F4F0E8]/10 animate-fade-in">
                <div className={`flex items-center justify-center gap-2 text-sm font-mono font-bold ${
                  feedback.isCorrect ? 'text-green-400' : 'text-[#9E2F2F]'
                }`}>
                  {feedback.isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />}
                  <span>{feedback.message}</span>
                </div>

                <button
                  onClick={startNewHigherLowerRound}
                  className="px-6 py-2.5 bg-[#F4F0E8] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#E6B83A] transition-colors"
                >
                  NEXT INTERVAL &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* GAME 3: MAJOR VS MINOR CHORD                                   */}
        {/* ============================================================== */}
        {activeGame === 'chord_type' && (
          <div className="bg-[#111111] border border-[#F4F0E8]/10 p-6 sm:p-12 space-y-8 text-center max-w-3xl mx-auto shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                EXERCISE 03
              </span>
              <h3 className="text-3xl font-black font-serif text-[#F4F0E8]">
                Identify Chord Quality: Major or Minor?
              </h3>
              <p className="text-xs sm:text-sm text-[#F4F0E8]/60 font-sans">
                Major chords possess a bright, resolute, celebratory quality; minor chords sound melancholic, introspective, or moody.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => playChord(targetChord.freqs, 'piano')}
                className="flex items-center gap-3 px-8 py-4 bg-[#E6B83A] text-[#111111] font-mono text-sm font-bold uppercase tracking-wider hover:bg-[#d4a832] transition-colors shadow-lg active:scale-95"
              >
                <Volume2 size={20} /> REPLAY CHORD
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4">
              <button
                onClick={() => handleChordGuess('Major')}
                disabled={feedback !== null}
                className="py-6 px-4 bg-[#181818] border border-[#F4F0E8]/15 hover:border-[#E6B83A] hover:text-[#E6B83A] font-serif font-bold text-xl flex flex-col items-center gap-2 transition-all"
              >
                <Sparkles size={22} className="text-[#E6B83A]" />
                <span>MAJOR (Bright)</span>
              </button>

              <button
                onClick={() => handleChordGuess('Minor')}
                disabled={feedback !== null}
                className="py-6 px-4 bg-[#181818] border border-[#F4F0E8]/15 hover:border-[#9E2F2F] hover:text-[#9E2F2F] font-serif font-bold text-xl flex flex-col items-center gap-2 transition-all"
              >
                <div className="w-5 h-5 rounded-full border border-[#9E2F2F] flex items-center justify-center text-xs font-mono text-[#9E2F2F]">m</div>
                <span>MINOR (Somber)</span>
              </button>
            </div>

            {feedback && (
              <div className="space-y-4 pt-4 border-t border-[#F4F0E8]/10 animate-fade-in">
                <div className={`flex items-center justify-center gap-2 text-sm font-mono font-bold ${
                  feedback.isCorrect ? 'text-green-400' : 'text-[#9E2F2F]'
                }`}>
                  {feedback.isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />}
                  <span>{feedback.message}</span>
                </div>

                <button
                  onClick={startNewChordRound}
                  className="px-6 py-2.5 bg-[#F4F0E8] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#E6B83A] transition-colors"
                >
                  NEXT CHORD &rarr;
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
