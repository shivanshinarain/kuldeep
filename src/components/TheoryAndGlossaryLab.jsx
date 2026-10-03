import React, { useState } from 'react';
import { 
  BookOpen, 
  Volume2, 
  Play, 
  Search, 
  ChevronRight, 
  Plus, 
  Trash2, 
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  WESTERN_NOTES, 
  MUSIC_THEORY_TOPICS, 
  MUSIC_GLOSSARY 
} from '../data/musicData';
import { playPianoNote, playChord } from '../utils/audioEngine';

export default function TheoryAndGlossaryLab() {
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'diatonic' | 'progression' | 'theory' | 'glossary'

  // ==========================================
  // 1. NOTES STATE
  // ==========================================
  const [selectedNote, setSelectedNote] = useState(WESTERN_NOTES[0]);

  const handlePlayNote = (noteObj) => {
    setSelectedNote(noteObj);
    playPianoNote(noteObj.frequency, 1.8);
  };

  // ==========================================
  // 2. DIATONIC SCALE -> CHORD EXPLORER
  // ==========================================
  const DIATONIC_C_MAJOR = [
    { degree: 'I', name: 'C Major', quality: 'Major Triad', notes: ['C', 'E', 'G'], freqs: [261.63, 329.63, 392.00], role: 'Tonic (Home, Resolution)' },
    { degree: 'ii', name: 'D Minor', quality: 'Minor Triad', notes: ['D', 'F', 'A'], freqs: [293.66, 349.23, 440.00], role: 'Supertonic (Predominant)' },
    { degree: 'iii', name: 'E Minor', quality: 'Minor Triad', notes: ['E', 'G', 'B'], freqs: [329.63, 392.00, 493.88], role: 'Mediant (Introspective)' },
    { degree: 'IV', name: 'F Major', quality: 'Major Triad', notes: ['F', 'A', 'C'], freqs: [174.61, 220.00, 261.63], role: 'Subdominant (Expansion)' },
    { degree: 'V', name: 'G Major', quality: 'Major Triad', notes: ['G', 'B', 'D'], freqs: [196.00, 246.94, 293.66], role: 'Dominant (Tension, Urge to Resolve)' },
    { degree: 'vi', name: 'A Minor', quality: 'Minor Triad', notes: ['A', 'C', 'E'], freqs: [220.00, 261.63, 329.63], role: 'Submediant (Relative Minor)' },
    { degree: 'vii°', name: 'B Diminished', quality: 'Diminished Triad', notes: ['B', 'D', 'F'], freqs: [246.94, 293.66, 349.23], role: 'Leading Tone (Extreme Tension)' },
  ];

  const [activeDiatonicChord, setActiveDiatonicChord] = useState(DIATONIC_C_MAJOR[0]);

  const handlePlayDiatonic = (item) => {
    setActiveDiatonicChord(item);
    playChord(item.freqs, 'piano');
  };

  // ==========================================
  // 3. CHORD PROGRESSION BUILDER
  // ==========================================
  const CHORD_PALETTE = [
    { key: 'C', name: 'C Major', roman: 'I', freqs: [261.63, 329.63, 392.00] },
    { key: 'G', name: 'G Major', roman: 'V', freqs: [196.00, 246.94, 293.66] },
    { key: 'Am', name: 'A Minor', roman: 'vi', freqs: [220.00, 261.63, 329.63] },
    { key: 'F', name: 'F Major', roman: 'IV', freqs: [174.61, 220.00, 261.63] },
    { key: 'Dm', name: 'D Minor', roman: 'ii', freqs: [293.66, 349.23, 440.00] },
    { key: 'Em', name: 'E Minor', roman: 'iii', freqs: [164.81, 196.00, 246.94] },
  ];

  // Default: Pop/Rock 4-Chord Progression (I - V - vi - IV)
  const [progression, setProgression] = useState([
    CHORD_PALETTE[0], // C
    CHORD_PALETTE[1], // G
    CHORD_PALETTE[2], // Am
    CHORD_PALETTE[3], // F
  ]);
  const [isPlayingProgression, setIsPlayingProgression] = useState(false);
  const [progressionStep, setProgressionStep] = useState(null);

  const addChordToProgression = (chord) => {
    if (progression.length < 8) {
      setProgression([...progression, chord]);
    }
  };

  const removeChordFromProgression = (idx) => {
    setProgression(progression.filter((_, i) => i !== idx));
  };

  const playEntireProgression = () => {
    if (progression.length === 0) return;
    setIsPlayingProgression(true);

    progression.forEach((chord, idx) => {
      setTimeout(() => {
        setProgressionStep(idx);
        playChord(chord.freqs, 'piano');
      }, idx * 950);
    });

    setTimeout(() => {
      setIsPlayingProgression(false);
      setProgressionStep(null);
    }, progression.length * 950 + 400);
  };

  // ==========================================
  // 4. MUSIC THEORY TOPICS STATE
  // ==========================================
  const [theoryLevel, setTheoryLevel] = useState('beginner');
  const [activeTopic, setActiveTopic] = useState(MUSIC_THEORY_TOPICS.beginner[0]);

  // ==========================================
  // 5. GLOSSARY STATE
  // ==========================================
  const [glossaryQuery, setGlossaryQuery] = useState('');
  const filteredGlossary = MUSIC_GLOSSARY.filter((item) =>
    item.term.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
    item.definition.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(glossaryQuery.toLowerCase())
  );

  return (
    <section id="music-theory" className="py-24 lg:py-36 bg-[#111111] text-[#F4F0E8] px-6 lg:px-12 border-t border-b border-[#F4F0E8]/10 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F4F0E8]/15 pb-8 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-[#E6B83A] uppercase px-2 py-0.5 border border-[#E6B83A]/30">
                05 // ARCHITECTURE OF SOUND
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/50">
                Global Pedagogical Framework
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-serif text-[#F4F0E8]">
              THEORY & <span className="italic font-light text-[#E6B83A]">HARMONY LAB</span>
            </h2>
            <p className="text-sm sm:text-base text-[#F4F0E8]/70 max-w-2xl font-sans leading-relaxed">
              Explore Western pitch, Indian Swara equivalents, diatonic chord construction, interactive harmonic progression building, and a complete searchable glossary.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'notes', label: '1. NOTES & SWARAS' },
              { id: 'diatonic', label: '2. DIATONIC CHORDS' },
              { id: 'progression', label: '3. CHORD BUILDER' },
              { id: 'theory', label: '4. THEORY PILLARS' },
              { id: 'glossary', label: '5. MUSIC GLOSSARY' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-200 border ${
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
        {/* TAB 1: NOTES & SWARAS                                          */}
        {/* ============================================================== */}
        {activeTab === 'notes' && (
          <div className="space-y-8">
            <div className="bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F4F0E8]/10 pb-4 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                    SEVEN NATURAL TONES
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#F4F0E8]">
                    Western Letter Names & Indian Saptak Swaras
                  </h3>
                </div>
                <div className="text-xs font-mono text-[#F4F0E8]/50 max-w-sm">
                  Click any note below to trigger Web Audio pitch synthesis and examine its acoustic frequency.
                </div>
              </div>

              {/* Note Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {WESTERN_NOTES.map((n) => {
                  const isSelected = selectedNote.note === n.note;
                  return (
                    <button
                      key={n.note}
                      onClick={() => handlePlayNote(n)}
                      className={`p-5 text-center border transition-all flex flex-col items-center justify-between cursor-pointer group ${
                        isSelected
                          ? 'bg-[#E6B83A] text-[#111111] border-[#E6B83A] scale-105 shadow-xl'
                          : 'bg-[#111111] text-[#F4F0E8] border-[#F4F0E8]/15 hover:border-[#E6B83A] hover:bg-[#151515]'
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Western</span>
                      <span className="text-4xl font-black font-serif my-2">{n.note}</span>
                      <div className="border-t border-current/20 w-full pt-2 mt-1 space-y-0.5">
                        <span className="text-xs font-bold font-serif block">{n.indian}</span>
                        <span className="text-[9px] font-mono opacity-70 block">{n.frequency} Hz</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Selected Note Details & Educational Distinction */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#111111] p-6 border border-[#F4F0E8]/10">
                <div className="md:col-span-4 border-r border-[#F4F0E8]/10 pr-6 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                    SELECTED NOTE ANATOMY
                  </span>
                  <div className="text-3xl font-black font-serif text-[#F4F0E8]">
                    Note {selectedNote.note} • {selectedNote.indian} ({selectedNote.sanskrit})
                  </div>
                  <div className="text-xs font-mono text-[#F4F0E8]/60">
                    Acoustic Fundamental: {selectedNote.frequency} Hz
                  </div>
                  <button
                    onClick={() => handlePlayNote(selectedNote)}
                    className="mt-3 flex items-center gap-2 px-4 py-2 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#d4a832]"
                  >
                    <Volume2 size={14} /> PLAY NOTE
                  </button>
                </div>

                <div className="md:col-span-8 space-y-3 font-sans text-xs sm:text-sm text-[#F4F0E8]/80 leading-relaxed pl-2">
                  <div className="text-[#E6B83A] font-mono font-bold text-xs uppercase">
                    PEDAGOGICAL PERSPECTIVE BY KULDEEP GAUR
                  </div>
                  <p>
                    {selectedNote.description}
                  </p>
                  <div className="p-3 bg-[#181818] border border-[#F4F0E8]/10 text-xs font-mono text-[#F4F0E8]/70">
                    <strong>Critical System Distinction:</strong> While Western notes correspond to fixed absolute frequencies in equal temperament (e.g. A4 = 440 Hz), Indian Swaras (Sa, Re, Ga, Ma, Pa, Dha, Ni) are modal and relational to the chosen tonic (Adhara Shadja). They are distinct aesthetic systems with unique microtonal nuances.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: DIATONIC CHORDS EXPLORER                                */}
        {/* ============================================================== */}
        {activeTab === 'diatonic' && (
          <div className="bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F4F0E8]/10 pb-4 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                  HARMONIC FOUNDATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#F4F0E8]">
                  Scale &rarr; Diatonic Chords of C Major
                </h3>
              </div>
              <div className="text-xs font-mono text-[#F4F0E8]/60">
                Click any diatonic degree to play its chord voicing and inspect harmonic function.
              </div>
            </div>

            {/* 7 Diatonic Degree Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {DIATONIC_C_MAJOR.map((chord) => {
                const isSelected = activeDiatonicChord.degree === chord.degree;
                return (
                  <button
                    key={chord.degree}
                    onClick={() => handlePlayDiatonic(chord)}
                    className={`p-4 text-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A] scale-105 shadow-xl'
                        : 'bg-[#111111] text-[#F4F0E8] border-[#F4F0E8]/15 hover:border-[#E6B83A]'
                    }`}
                  >
                    <span className="text-sm font-mono block opacity-60">{chord.degree}</span>
                    <span className="text-xl font-bold font-serif my-1 block">{chord.name}</span>
                    <span className="text-[10px] font-mono block opacity-70">{chord.quality}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Chord Harmonic Function Details */}
            <div className="p-6 bg-[#111111] border border-[#F4F0E8]/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F4F0E8]/10 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                    DEGREE {activeDiatonicChord.degree} FUNCTION
                  </span>
                  <h4 className="text-2xl font-bold font-serif">
                    {activeDiatonicChord.name} ({activeDiatonicChord.notes.join(' - ')})
                  </h4>
                </div>
                <button
                  onClick={() => playChord(activeDiatonicChord.freqs, 'piano')}
                  className="px-4 py-2 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#d4a832] self-start sm:self-auto"
                >
                  <Volume2 size={14} /> PLAY CHORD
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-[#F4F0E8]/80 pt-2">
                <div>
                  <span className="text-[#E6B83A] block">Harmonic Role:</span>
                  <p className="mt-1 font-sans text-sm">{activeDiatonicChord.role}</p>
                </div>
                <div>
                  <span className="text-[#E6B83A] block">Tonal Triad Structure:</span>
                  <p className="mt-1 font-sans text-sm">Formed by stacking thirds: {activeDiatonicChord.notes[0]} (Root) + {activeDiatonicChord.notes[1]} (Third) + {activeDiatonicChord.notes[2]} (Fifth).</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: CHORD PROGRESSION BUILDER                               */}
        {/* ============================================================== */}
        {activeTab === 'progression' && (
          <div className="bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F4F0E8]/10 pb-4 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                  COMPOSITION LAB
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#F4F0E8]">
                  Build Your Own Chord Progression
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={playEntireProgression}
                  disabled={isPlayingProgression || progression.length === 0}
                  className="px-5 py-2.5 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#d4a832] transition-colors disabled:opacity-50"
                >
                  <Play size={14} /> PLAY PROGRESSION
                </button>
                <button
                  onClick={() => setProgression([])}
                  className="px-3 py-2.5 bg-[#111111] border border-[#F4F0E8]/20 text-xs font-mono uppercase text-[#F4F0E8]/70 hover:text-[#F4F0E8]"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Active Progression Sequence */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                ACTIVE SEQUENCE ({progression.length} CHORDS)
              </span>

              {progression.length === 0 ? (
                <div className="p-8 border-2 border-dashed border-[#F4F0E8]/15 text-center text-xs font-mono text-[#F4F0E8]/40">
                  Your progression is empty. Click chords from the palette below to compose your sequence.
                </div>
              ) : (
                <div className="flex flex-wrap gap-3 p-4 bg-[#111111] border border-[#F4F0E8]/10 items-center">
                  {progression.map((chord, idx) => {
                    const isCurrent = progressionStep === idx;
                    return (
                      <div
                        key={idx}
                        className={`p-4 border font-mono transition-all flex flex-col items-center relative group min-w-[80px] ${
                          isCurrent
                            ? 'bg-[#E6B83A] text-[#111111] font-bold scale-110 border-[#F4F0E8] shadow-lg'
                            : 'bg-[#181818] text-[#F4F0E8] border-[#F4F0E8]/20'
                        }`}
                      >
                        <span className="text-[10px] opacity-60">#{idx + 1} ({chord.roman})</span>
                        <span className="text-xl font-bold font-serif my-1">{chord.key}</span>
                        <button
                          onClick={() => removeChordFromProgression(idx)}
                          className="opacity-0 group-hover:opacity-100 text-[#9E2F2F] text-[10px] hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Chord Palette to Add From */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                ADD CHORD FROM PALETTE
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {CHORD_PALETTE.map((chord) => (
                  <button
                    key={chord.key}
                    onClick={() => addChordToProgression(chord)}
                    className="p-3 bg-[#111111] border border-[#F4F0E8]/15 hover:border-[#E6B83A] text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-serif font-bold text-[#F4F0E8]">{chord.key}</span>
                      <span className="text-xs font-mono text-[#E6B83A]">{chord.roman}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#F4F0E8]/50 block">{chord.name}</span>
                    <span className="text-[10px] font-mono text-[#E6B83A] opacity-0 group-hover:opacity-100 flex items-center gap-1 mt-1">
                      <Plus size={10} /> Add
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 text-xs font-mono text-[#F4F0E8]/60 space-y-1">
              <span className="text-[#E6B83A] font-bold">ROMAN NUMERAL HARMONY (I - V - vi - IV):</span>
              <p>Roman numerals represent chords relative to the key tonic rather than absolute pitches, allowing musicians to transpose progressions across all 12 keys effortlessly.</p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: THEORY PILLARS (Beginner, Intermediate, Advanced)       */}
        {/* ============================================================== */}
        {activeTab === 'theory' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Level Switcher & Topic Selector */}
            <div className="lg:col-span-5 bg-[#181818] border border-[#F4F0E8]/10 p-6 space-y-6">
              <div className="flex gap-2 border-b border-[#F4F0E8]/10 pb-4">
                {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setTheoryLevel(lvl);
                      setActiveTopic(MUSIC_THEORY_TOPICS[lvl][0]);
                    }}
                    className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                      theoryLevel === lvl
                        ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                        : 'bg-[#111111] text-[#F4F0E8]/60 border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                  Curriculum Topics ({MUSIC_THEORY_TOPICS[theoryLevel]?.length})
                </span>
                {MUSIC_THEORY_TOPICS[theoryLevel]?.map((topic) => {
                  const isSelected = activeTopic.title === topic.title;
                  return (
                    <button
                      key={topic.title}
                      onClick={() => setActiveTopic(topic)}
                      className={`w-full p-3.5 text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                          : 'bg-[#111111] text-[#F4F0E8] border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                      }`}
                    >
                      <span className="text-sm font-serif font-bold">{topic.title}</span>
                      <ChevronRight size={16} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Active Topic Content */}
            <div className="lg:col-span-7 bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-6">
              <div className="space-y-1 border-b border-[#F4F0E8]/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                  LEVEL: {theoryLevel.toUpperCase()}
                </span>
                <h3 className="text-3xl font-black font-serif text-[#F4F0E8]">
                  {activeTopic.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#F4F0E8]/80 font-sans leading-relaxed">
                {activeTopic.content}
              </p>

              <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                  Musical Example & Applied Context
                </span>
                <p className="text-xs sm:text-sm text-[#F4F0E8]/70 font-sans">
                  {activeTopic.example}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: SEARCHABLE MUSIC GLOSSARY                               */}
        {/* ============================================================== */}
        {activeTab === 'glossary' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181818] p-4 border border-[#F4F0E8]/10">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F4F0E8]/40" />
                <input
                  type="text"
                  placeholder="Instant glossary search (e.g. Melody, Timbre, Cadence)..."
                  value={glossaryQuery}
                  onChange={(e) => setGlossaryQuery(e.target.value)}
                  className="w-full bg-[#111111] border border-[#F4F0E8]/15 pl-10 pr-4 py-2 text-xs font-mono text-[#F4F0E8] placeholder-[#F4F0E8]/40 focus:outline-none focus:border-[#E6B83A]"
                />
              </div>

              <span className="text-xs font-mono text-[#F4F0E8]/50">
                Showing {filteredGlossary.length} of {MUSIC_GLOSSARY.length} terms
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGlossary.map((item) => (
                <div
                  key={item.term}
                  className="p-5 bg-[#181818] border border-[#F4F0E8]/10 hover:border-[#E6B83A] transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-serif font-bold text-[#F4F0E8]">{item.term}</h4>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#111111] border border-[#F4F0E8]/10 text-[#E6B83A]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#F4F0E8]/70 font-sans leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
