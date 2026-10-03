import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Music, BookOpen, Layers, Disc, ChevronRight } from 'lucide-react';
import { 
  GUITAR_CHORDS, 
  GUITAR_SCALES, 
  INSTRUMENT_LIBRARY, 
  MUSIC_THEORY_TOPICS, 
  MUSIC_GLOSSARY, 
  WESTERN_NOTES 
} from '../data/musicData';

export default function GlobalSearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Build searchable index
  const results = [];
  const q = query.trim().toLowerCase();

  if (q.length > 0) {
    // 1. Chords
    Object.keys(GUITAR_CHORDS).forEach((key) => {
      const c = GUITAR_CHORDS[key];
      if (key.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.family.toLowerCase().includes(q)) {
        results.push({
          type: 'Guitar Chord',
          title: `${c.name} (${key})`,
          detail: `Notes: ${c.notes.join(' - ')} • ${c.family}`,
          targetSection: 'guitar-lab',
          category: 'Chords'
        });
      }
    });

    // 2. Scales
    GUITAR_SCALES.forEach((s) => {
      if (s.name.toLowerCase().includes(q) || s.formula.toLowerCase().includes(q)) {
        results.push({
          type: 'Scale',
          title: s.name,
          detail: `Formula: ${s.formula} • Notes: ${s.notes.join(' ')}`,
          targetSection: 'guitar-lab',
          category: 'Scales'
        });
      }
    });

    // 3. Instruments
    INSTRUMENT_LIBRARY.forEach((inst) => {
      if (inst.name.toLowerCase().includes(q) || inst.category.toLowerCase().includes(q)) {
        results.push({
          type: 'Instrument Profile',
          title: inst.name,
          detail: `${inst.category} • ${inst.typicalContext}`,
          targetSection: 'explore-music',
          category: 'Instruments'
        });
      }
    });

    // 4. Notes & Swaras
    WESTERN_NOTES.forEach((n) => {
      if (n.note.toLowerCase().includes(q) || n.indian.toLowerCase().includes(q) || n.sanskrit.toLowerCase().includes(q)) {
        results.push({
          type: 'Musical Note / Swara',
          title: `Note ${n.note} (${n.indian} - ${n.sanskrit})`,
          detail: `${n.frequency} Hz fundamental`,
          targetSection: 'music-theory',
          category: 'Theory'
        });
      }
    });

    // 5. Glossary
    MUSIC_GLOSSARY.forEach((g) => {
      if (g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)) {
        results.push({
          type: 'Music Glossary',
          title: g.term,
          detail: g.definition,
          targetSection: 'music-theory',
          category: 'Glossary'
        });
      }
    });

    // 6. Theory Topics
    ['beginner', 'intermediate', 'advanced'].forEach((lvl) => {
      MUSIC_THEORY_TOPICS[lvl]?.forEach((t) => {
        if (t.title.toLowerCase().includes(q) || t.content.toLowerCase().includes(q)) {
          results.push({
            type: `Music Theory (${lvl})`,
            title: t.title,
            detail: t.content.slice(0, 100) + '...',
            targetSection: 'music-theory',
            category: 'Theory'
          });
        }
      });
    });
  }

  const handleSelect = (result) => {
    onClose();
    if (onSelectResult) {
      onSelectResult(result);
    } else if (result.targetSection) {
      const el = document.getElementById(result.targetSection);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#141210] border border-[#F4F0E8]/20 max-w-2xl w-full p-6 space-y-6 shadow-2xl relative text-[#F4F0E8]">
        
        {/* Search Bar Input */}
        <div className="relative border-b border-[#F4F0E8]/20 pb-4">
          <Search size={22} className="absolute left-1 top-3 text-[#E6B83A]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search instruments, chords, scales, swaras, theory, glossary (e.g. 'Am', 'Piano', 'Timbre')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent pl-10 pr-10 py-2.5 text-base sm:text-lg font-mono text-[#F4F0E8] placeholder-[#F4F0E8]/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="absolute right-1 top-3 text-[#F4F0E8]/60 hover:text-[#F4F0E8]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-1">
          {query.trim().length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#F4F0E8]/40 space-y-2">
              <p>Type to search across the entire Kuldeep Gaur music education platform.</p>
              <div className="flex justify-center gap-2 pt-2">
                {['Am', 'C Major', 'Pentatonic', 'Sa Re Ga', 'Timbre', 'Metronome'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2 py-1 bg-[#181818] border border-[#F4F0E8]/10 text-[10px] text-[#E6B83A] hover:border-[#E6B83A]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#F4F0E8]/50">
              No music resources found matching "{query}". Try searching for chord names, instrument types, or theory terms.
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#E6B83A] pb-1">
                {results.length} MATCHING RESULTS
              </div>
              {results.slice(0, 20).map((res, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(res)}
                  className="w-full p-3.5 bg-[#181818] border border-[#F4F0E8]/10 hover:border-[#E6B83A] hover:bg-[#1f1d1a] transition-all text-left flex items-center justify-between group"
                >
                  <div className="space-y-1 max-w-[85%]">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 bg-[#111111] border border-[#F4F0E8]/10 text-[#E6B83A]">
                        {res.type}
                      </span>
                      <span className="text-sm font-serif font-bold text-[#F4F0E8]">
                        {res.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#F4F0E8]/60 font-sans truncate">
                      {res.detail}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-[#F4F0E8]/40 group-hover:text-[#E6B83A] group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="text-[11px] font-mono text-[#F4F0E8]/40 flex justify-between border-t border-[#F4F0E8]/10 pt-3">
          <span>Press ESC or click outside to dismiss</span>
          <span className="text-[#E6B83A]">Direct Section Anchor Navigation</span>
        </div>

      </div>
    </div>
  );
}
