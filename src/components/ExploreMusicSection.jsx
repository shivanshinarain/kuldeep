import React, { useState } from 'react';
import { 
  Volume2, 
  Play, 
  Sparkles, 
  Compass, 
  Layers, 
  History, 
  Disc,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { 
  INSTRUMENT_LIBRARY, 
  SOUND_COMPARISONS, 
  MUSIC_GENRES 
} from '../data/musicData';
import { playChord, playPianoNote, playGuitarPluck, playDrumSound } from '../utils/audioEngine';
import AudioVisualizer from './AudioVisualizer';

export default function ExploreMusicSection() {
  const [activeTab, setActiveTab] = useState('instruments'); // 'instruments' | 'comparisons' | 'genres' | 'history'

  // ==========================================
  // 1. INSTRUMENTS STATE
  // ==========================================
  const [selectedInstrument, setSelectedInstrument] = useState(INSTRUMENT_LIBRARY[0]);
  const [playingInstrumentId, setPlayingInstrumentId] = useState(null);

  const handlePlayInstrument = (inst) => {
    setPlayingInstrumentId(inst.id);
    if (inst.frequencies && inst.frequencies.length > 0) {
      if (inst.id === 'drums' || inst.id === 'tabla') {
        playDrumSound(inst.id === 'tabla' ? 'tabla' : 'kick');
        setTimeout(() => playDrumSound(inst.id === 'tabla' ? 'tabla' : 'snare'), 180);
      } else if (inst.id === 'guitar' || inst.id === 'ukulele' || inst.id === 'bass') {
        playChord(inst.frequencies, 'guitar');
      } else {
        playChord(inst.frequencies, 'piano');
      }
    }
    setTimeout(() => setPlayingInstrumentId(null), 1200);
  };

  // ==========================================
  // 2. COMPARISONS STATE
  // ==========================================
  const [activeCompIndex, setActiveCompIndex] = useState(0);
  const [playingSide, setPlayingSide] = useState(null); // 'A' | 'B'
  const activeComparison = SOUND_COMPARISONS[activeCompIndex];

  const handlePlayComparisonSide = (side) => {
    setPlayingSide(side);
    const item = side === 'A' ? activeComparison.itemA : activeComparison.itemB;
    playChord(item.freqs, item.name.toLowerCase().includes('guitar') ? 'guitar' : 'piano');
    setTimeout(() => setPlayingSide(null), 1200);
  };

  // ==========================================
  // 3. GENRES STATE
  // ==========================================
  const [selectedGenre, setSelectedGenre] = useState(MUSIC_GENRES[0]);

  const handlePlayGenreSample = (genre) => {
    playChord(genre.sampleFreqs, 'piano');
  };

  return (
    <section id="explore-music" className="py-24 lg:py-36 bg-[#141210] text-[#F4F0E8] px-6 lg:px-12 border-t border-b border-[#F4F0E8]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F4F0E8]/15 pb-8 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-[#E6B83A] uppercase px-2 py-0.5 border border-[#E6B83A]/30">
                06 // SONIC EXPEDITION
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/50">
                Global Timbral Archive
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-serif text-[#F4F0E8]">
              EXPLORE <span className="italic font-light text-[#E6B83A]">MUSIC & TIMBRES</span>
            </h2>
            <p className="text-sm sm:text-base text-[#F4F0E8]/70 max-w-2xl font-sans leading-relaxed">
              Travel across the world’s acoustic palette. Hear orchestral and folk instruments, compare acoustic versus electric timbres, and trace the history of modern sound.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'instruments', label: '1. HEAR THE INSTRUMENTS' },
              { id: 'comparisons', label: '2. TIMBRE COMPARISONS' },
              { id: 'genres', label: '3. GENRE EXPLORER' },
              { id: 'history', label: '4. MUSIC HISTORY' },
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
        {/* TAB 1: HEAR THE INSTRUMENTS                                    */}
        {/* ============================================================== */}
        {activeTab === 'instruments' && (
          <div className="space-y-8">
            <div className="p-3 bg-[#111111] border border-[#F4F0E8]/10 text-xs font-mono text-[#F4F0E8]/60 flex items-center justify-between">
              <span><strong>Educational Instrument Exhibition:</strong> Curated for ear training and timbral discovery. (Only subjects confirmed in Kuldeep Gaur's studio curriculum are taught directly).</span>
              <span className="text-[#E6B83A] hidden sm:inline">11 Acoustic & Electric Profiles</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Selector List */}
              <div className="lg:col-span-5 space-y-2 max-h-[560px] overflow-y-auto pr-1">
                {INSTRUMENT_LIBRARY.map((inst) => {
                  const isSelected = selectedInstrument.id === inst.id;
                  const isPlaying = playingInstrumentId === inst.id;
                  return (
                    <button
                      key={inst.id}
                      onClick={() => setSelectedInstrument(inst)}
                      className={`w-full p-3.5 text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                          : 'bg-[#181818] text-[#F4F0E8] border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono opacity-60">
                          {inst.category.split(' ')[0]}
                        </span>
                        <span className="text-base font-serif font-bold">
                          {inst.name}
                        </span>
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  );
                })}
              </div>

              {/* Right: Selected Instrument Spotlight */}
              <div className="lg:col-span-7 bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-6">
                
                <div className="relative h-64 overflow-hidden border border-[#F4F0E8]/10">
                  <img
                    src={selectedInstrument.image}
                    alt={selectedInstrument.name}
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#E6B83A] block">
                        {selectedInstrument.category}
                      </span>
                      <h3 className="text-3xl font-black font-serif text-[#F4F0E8]">
                        {selectedInstrument.name}
                      </h3>
                    </div>

                    <button
                      onClick={() => handlePlayInstrument(selectedInstrument)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#d4a832] transition-colors shadow-lg active:scale-95"
                    >
                      <Volume2 size={15} /> PLAY SOUND
                    </button>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#F4F0E8]/80 font-sans leading-relaxed">
                  {selectedInstrument.description}
                </p>

                {/* Characteristics */}
                <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                    Timbral Characteristics
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F4F0E8]/70 font-sans">
                    {selectedInstrument.characteristics.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#E6B83A]">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                    Typical Musical Context
                  </span>
                  <p className="text-xs text-[#F4F0E8]/80 font-sans">
                    {selectedInstrument.typicalContext}
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: TIMBRE COMPARISONS                                      */}
        {/* ============================================================== */}
        {activeTab === 'comparisons' && (
          <div className="space-y-8">
            <div className="flex flex-wrap gap-2 border-b border-[#F4F0E8]/10 pb-4">
              {SOUND_COMPARISONS.map((comp, idx) => (
                <button
                  key={comp.id}
                  onClick={() => setActiveCompIndex(idx)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${
                    activeCompIndex === idx
                      ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                      : 'bg-[#181818] text-[#F4F0E8]/70 border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                  }`}
                >
                  {comp.title}
                </button>
              ))}
            </div>

            <div className="bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-8">
              <div className="space-y-1 text-center max-w-xl mx-auto">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                  A / B TIMBRAL HEAD-TO-HEAD
                </span>
                <h3 className="text-3xl font-black font-serif text-[#F4F0E8]">
                  {activeComparison.title}
                </h3>
              </div>

              {/* Side by side comparison cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Item A */}
                <div className="p-6 bg-[#111111] border border-[#F4F0E8]/10 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                      INSTRUMENT A
                    </span>
                    <h4 className="text-2xl font-bold font-serif">{activeComparison.itemA.name}</h4>
                    <p className="text-xs text-[#F4F0E8]/70 font-sans leading-relaxed">
                      {activeComparison.itemA.timbre}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlayComparisonSide('A')}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#d4a832] transition-colors"
                  >
                    <Volume2 size={16} /> PLAY {activeComparison.itemA.name}
                  </button>
                </div>

                {/* Item B */}
                <div className="p-6 bg-[#111111] border border-[#F4F0E8]/10 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#9E2F2F]">
                      INSTRUMENT B
                    </span>
                    <h4 className="text-2xl font-bold font-serif">{activeComparison.itemB.name}</h4>
                    <p className="text-xs text-[#F4F0E8]/70 font-sans leading-relaxed">
                      {activeComparison.itemB.timbre}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlayComparisonSide('B')}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#9E2F2F] text-[#F4F0E8] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#852525] transition-colors"
                  >
                    <Volume2 size={16} /> PLAY {activeComparison.itemB.name}
                  </button>
                </div>
              </div>

              {/* Realtime Waveform Display */}
              <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#F4F0E8]/50">
                  <span>LIVE FREQUENCY SPECTRUM</span>
                  <span className="text-[#E6B83A]">Reacting to Web Audio Output</span>
                </div>
                <AudioVisualizer height={48} color="#E6B83A" barCount={40} />
              </div>

              <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 text-xs font-mono text-[#F4F0E8]/70">
                <span className="text-[#E6B83A] font-bold block mb-1">AURAL INSIGHT:</span>
                {activeComparison.difference}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: GENRE EXPLORER                                          */}
        {/* ============================================================== */}
        {activeTab === 'genres' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Genre List */}
            <div className="lg:col-span-5 bg-[#181818] border border-[#F4F0E8]/10 p-4 space-y-2 max-h-[540px] overflow-y-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block p-2">
                MUSICAL TRADITIONS ({MUSIC_GENRES.length})
              </span>
              {MUSIC_GENRES.map((g) => {
                const isSelected = selectedGenre.name === g.name;
                return (
                  <button
                    key={g.name}
                    onClick={() => setSelectedGenre(g)}
                    className={`w-full p-3.5 text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                        : 'bg-[#111111] text-[#F4F0E8] border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                    }`}
                  >
                    <div>
                      <span className="text-base font-serif font-bold block">{g.name}</span>
                      <span className="text-[10px] font-mono opacity-70 block">{g.period}</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                );
              })}
            </div>

            {/* Right Genre Deep Dive */}
            <div className="lg:col-span-7 bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F4F0E8]/10 pb-4 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                    {selectedGenre.period}
                  </span>
                  <h3 className="text-3xl font-black font-serif text-[#F4F0E8]">
                    {selectedGenre.name}
                  </h3>
                </div>

                <button
                  onClick={() => handlePlayGenreSample(selectedGenre)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#d4a832] transition-colors self-start sm:self-auto"
                >
                  <Volume2 size={14} /> PLAY HARMONIC MOTIF
                </button>
              </div>

              <p className="text-sm sm:text-base text-[#F4F0E8]/80 font-sans leading-relaxed">
                {selectedGenre.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                    Core Characteristics
                  </span>
                  <p className="text-xs text-[#F4F0E8]/70 font-sans">
                    {selectedGenre.characteristics}
                  </p>
                </div>

                <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                    Defining Instruments
                  </span>
                  <p className="text-xs text-[#F4F0E8]/70 font-sans">
                    {selectedGenre.instruments.join(', ')}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                  Rhythmic Pulse & Meter
                </span>
                <p className="text-xs text-[#F4F0E8]/80 font-sans">
                  {selectedGenre.rhythm}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: MUSIC HISTORY & EVOLUTION                               */}
        {/* ============================================================== */}
        {activeTab === 'history' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'EVOLUTION OF THE GUITAR',
                  era: '15th Century to Modern Day',
                  summary: 'From Renaissance lutes and Spanish 5-course vihuelas to Antonio de Torres modernizing acoustic fan bracing in 1850, and Leo Fender & Les Paul unleashing electromagnetic solid-body pickups in the 1950s.'
                },
                {
                  title: 'THE PIANO REVOLUTION',
                  era: '1700 Florence to Concert Grand',
                  summary: 'Bartolomeo Cristofori invented the "gravicembalo col piano e forte" (harpsichord with soft and loud) around 1700. Escapement actions and cast-iron frames transformed it into the concert powerhouse heard today.'
                },
                {
                  title: 'RECORDING & ELECTRONICS',
                  era: '1877 Phonograph to Digital DAW',
                  summary: 'Thomas Edison cylinder foil to multi-track magnetic tape in Abbey Road, Robert Moog modular synthesizers in the 1960s, and 24-bit digital workstations that empower modern composers.'
                }
              ].map((hist, i) => (
                <div key={i} className="p-6 bg-[#181818] border border-[#F4F0E8]/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                      {hist.era}
                    </span>
                    <h4 className="text-xl font-bold font-serif text-[#F4F0E8]">
                      {hist.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#F4F0E8]/70 font-sans leading-relaxed">
                      {hist.summary}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono text-[#E6B83A] uppercase tracking-wider pt-2 border-t border-[#F4F0E8]/10">
                    Historical Curated Context
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
