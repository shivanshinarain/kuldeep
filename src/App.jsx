import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  Menu, 
  X, 
  Volume2, 
  Music, 
  Mic, 
  Sliders, 
  Disc, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Star,
  Sparkles,
  ExternalLink,
  Search,
  Award,
  BookOpen,
  Flame,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

import GuitarLab from './components/GuitarLab';
import PianoLab from './components/PianoLab';
import RhythmMetronomeLab from './components/RhythmMetronomeLab';
import EarTrainingLab from './components/EarTrainingLab';
import TheoryAndGlossaryLab from './components/TheoryAndGlossaryLab';
import ExploreMusicSection from './components/ExploreMusicSection';
import ParentsSection from './components/ParentsSection';
import VocalLab from './components/VocalLab';
import PracticeAndBadgesModal from './components/PracticeAndBadgesModal';
import GlobalSearchModal from './components/GlobalSearchModal';

import { playChord, playPianoNote, playGuitarPluck, playDrumSound } from './utils/audioEngine';

// ==========================================
// GIPA - GAUR INSTITUTE OF PERFORMING ART
// KULDEEP GAUR MUSIC PLATFORM
// ==========================================

const lessonsData = [
  {
    id: "01",
    title: "GUITAR",
    subtitle: "Acoustic, Electric & Fingerstyle",
    description: "Build your foundational technique, master fretboard geography, explore advanced chord melody arrangements, and develop fluid rhythm under personal mentorship.",
    accent: "#9E2F2F",
    bgColor: "#141010",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Chord Voicings, Triads & Barre Chords",
      "Fingerstyle Mechanics & Plectrum Control",
      "Improvisation & Pentatonic Soloing",
      "Acoustic & Electric Tone Shaping"
    ],
    level: "All Levels (Beginner to Advanced)",
    practiceTopics: ["Finger independence drills", "Clean open chord transitions", "Metronome syncopation at 70 BPM"],
    soundPreview: [82.41, 110.00, 146.83, 196.00, 246.94, 329.63]
  },
  {
    id: "02",
    title: "PIANO",
    subtitle: "Classical & Contemporary Keys",
    description: "Understand keyboard harmony, voice leading, classical interpretation, and contemporary chord progressions under direct mentorship.",
    accent: "#E6B83A",
    bgColor: "#14130F",
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=1400&q=85",
    details: [
      "Touch, Dynamics & Arm Weight Release",
      "Standard Notation & Lead Sheet Deciphering",
      "Diatonic Triads & Voice Leading",
      "Classical Repertoire & Modern Ballads"
    ],
    level: "Beginner to Advanced Virtuoso",
    practiceTopics: ["Hanon finger exercises", "Major & minor scale runs", "Arpeggio fluid motion"],
    soundPreview: [261.63, 329.63, 392.00, 523.25]
  },
  {
    id: "03",
    title: "VOCALS",
    subtitle: "Classical & Western Singing",
    description: "Develop pristine pitch control, healthy breath support, vocal agility, tone resonance, and commanding stage expression.",
    accent: "#E87532",
    bgColor: "#14120F",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Vocal Warmups & Diaphragmatic Breath Economy",
      "Shuddh Swars & Western Pitch Precision",
      "Vibrato, Belting & Falsetto Agility",
      "Microphone Technique & Mic Confidence"
    ],
    level: "All Voices & Skill Levels",
    practiceTopics: ["5-tone ascending scales", "Lip trill tension release", "Vowel modification at high registers"],
    soundPreview: [261.63, 293.66, 329.63, 349.23, 392.00]
  },
  {
    id: "04",
    title: "RHYTHM & DRUMS",
    subtitle: "Percussion, Tabla & Groove",
    description: "Lock in your internal clock. Explore complex time signatures, drumkit coordination, traditional bols, and groove dynamics.",
    accent: "#687A55",
    bgColor: "#101310",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Metronome Mastery & Subdivision Fluency",
      "Limb Independence & Kit Dynamics",
      "Tabla Bols & Indian Rhythm Cycles",
      "Ensemble Timing & Deep Pocket"
    ],
    level: "Beginner to Advanced",
    practiceTopics: ["Single and double stroke rolls", "Paradiddle accents", "Syncopated kick patterns"],
    soundPreview: 'drums'
  },
  {
    id: "05",
    title: "MUSIC THEORY",
    subtitle: "The Architecture of Sound",
    description: "Demystify the patterns behind the music you love. Understand intervals, scales, chord construction, and harmonic analysis.",
    accent: "#55405F",
    bgColor: "#121014",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Intervals, Saptak Swaras & Modes",
      "Functional Diatonic Harmony & Cadences",
      "Ear Training & Sight-Reading",
      "Songwriting & Structural Form"
    ],
    level: "Essential for All Musicians",
    practiceTopics: ["Circle of Fifths navigation", "Roman numeral analysis", "Interval ear identification"],
    soundPreview: [261.63, 329.63, 392.00, 440.00]
  },
  {
    id: "06",
    title: "DANCE & EXPRESSION",
    subtitle: "Kathak, Folk & Stage Presence",
    description: "Connect physical movement with musical rhythm. Master graceful footwork, classical expressions, and high-energy choreography.",
    accent: "#243746",
    bgColor: "#0F1114",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Classical Kathak Footwork & Taal",
      "Folk, Bhangra & Contemporary Fusion",
      "Posture, Balance & Spatial Awareness",
      "Expressive Storytelling (Abhinaya)"
    ],
    level: "Beginner to Advanced",
    practiceTopics: ["Tatkar footwork cycles", "Chakkar spin stability", "Mudras and expressive abhinaya"],
    soundPreview: 'tabla'
  }
];

const learningJourneySteps = [
  { step: "01", title: "CHOOSE", desc: "Select your instrument or vocal discipline aligned with your artistic ambitions." },
  { step: "02", title: "LEARN", desc: "Receive 1-on-1 direct guidance, technical breakdowns, and custom exercises from Kuldeep Gaur." },
  { step: "03", title: "PRACTICE", desc: "Build disciplined daily habits with structured practice schedules and guided metronome work." },
  { step: "04", title: "PLAY", desc: "Apply your technique to real songs, masterpieces, and confident live performances." }
];

const faqsData = [
  { q: "Who teaches the lessons?", a: "Every single lesson, session, and masterclass is personally conducted by Kuldeep Gaur at Gaur Institute of Performing Art." },
  { q: "What instruments and disciplines can I learn?", a: "Guitar (Acoustic, Electric, Fingerstyle), Piano & Keyboard, Vocals (Classical & Western), Drums & Rhythm, Tabla, Harmonium, Violin, Music Theory, and Kathak / Folk Dance." },
  { q: "Are complete beginners welcome?", a: "Yes. Beginners of all ages receive patient, step-by-step foundation training designed to build unshakeable technique." },
  { q: "Can lessons be taken online or offline?", a: "Both! Kuldeep conducts direct in-person lessons at GIPA Studio in Lakhimpur Kheri and interactive 1-on-1 live video masterclasses for students worldwide." },
  { q: "Where is the institute located?", a: "Punjabi Colony, Nehar Road, Rajgarh, Lakhimpur Kheri - 262701 (Near Guru Nanak Inter College / Guru Nanak Degree College)." },
  { q: "How are lesson times and schedules booked?", a: "You can book trial slots or regular weekly schedules directly by calling Kuldeep Gaur at +91 7985257106 or submitting the booking form." }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showLessonNotes, setShowLessonNotes] = useState(false);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);

  const playMusicalChime = (freqs = [261.63, 329.63, 392.00, 523.25]) => {
    playChord(freqs, 'piano');
  };

  const handleKeepPlayingClick = () => {
    playMusicalChime([261.63, 329.63, 392.00, 523.25]); // C Major triad arpeggio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayCurrentLessonAudio = (lesson) => {
    if (lesson.soundPreview === 'drums') {
      playDrumSound('kick');
      setTimeout(() => playDrumSound('snare'), 200);
      setTimeout(() => playDrumSound('hihat'), 350);
    } else if (lesson.soundPreview === 'tabla') {
      playDrumSound('tabla');
      setTimeout(() => playDrumSound('tabla'), 180);
    } else if (Array.isArray(lesson.soundPreview)) {
      playChord(lesson.soundPreview, lesson.title === 'GUITAR' ? 'guitar' : 'piano');
    }
  };

  // Upgraded Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    studentName: '',
    age: '',
    phone: '',
    email: '',
    interest: 'Guitar',
    level: 'Beginner',
    preferredDays: 'Flexible',
    deliveryMode: 'Offline (Studio in Lakhimpur Kheri)',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const name = (formData.name || '').trim();
    const phone = (formData.phone || '').trim();
    const interest = formData.interest || 'Guitar';
    const level = formData.level || 'Beginner';
    const message = (formData.message || '').trim();

    // Required-field validation
    if (!name || !phone || !interest) {
      return;
    }

    const whatsappMessage = `Hello Kuldeep Gaur,

I have an enquiry regarding music lessons/admission at Gaur Institute of Performing Art (GIPA).

Name: ${name}
Phone Number: ${phone}
Instrument / Interest: ${interest}
Experience Level: ${level}
Message / Goals: ${message || 'N/A'}

I would like to know more about the lessons and admission process.

Thank you.`;

    const whatsappUrl = `https://wa.me/917985257106?text=${encodeURIComponent(whatsappMessage)}`;

    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }

    setFormSubmitted(true);
  };

  const currentLesson = lessonsData[activeLessonIndex];

  return (
    <div className="bg-[#F4F0E8] text-[#111111] font-sans selection:bg-[#9E2F2F] selection:text-[#F4F0E8] relative overflow-x-hidden w-full max-w-[100vw]">
      
      {/* Subtle Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* ================= GLOBAL NAVIGATION ================= */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#F4F0E8]/95 backdrop-blur-md border-b border-[#111111]/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <a href="#" className="flex flex-col group pr-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tighter uppercase font-mono group-hover:text-[#9E2F2F] transition-colors truncate">
              KULDEEP GAUR
            </span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-[#111111]/60 font-medium truncate">
              Gaur Institute of Performing Art (GIPA)
            </span>
          </a>

          {/* Desktop Nav - 8 Major Areas */}
          <nav className="hidden xl:flex items-center space-x-5 text-xs font-semibold uppercase tracking-wider">
            <a href="#lessons" className="hover:text-[#9E2F2F] transition-colors py-2">Lessons</a>
            <a href="#explore-music" className="hover:text-[#9E2F2F] transition-colors py-2">Explore Music</a>
            <a href="#guitar-lab" className="hover:text-[#9E2F2F] transition-colors py-2 text-[#9E2F2F]">Guitar Lab</a>
            <a href="#piano" className="hover:text-[#9E2F2F] transition-colors py-2 text-[#E6B83A]">Piano</a>
            <a href="#rhythm-lab" className="hover:text-[#9E2F2F] transition-colors py-2">Rhythm</a>
            <a href="#music-theory" className="hover:text-[#9E2F2F] transition-colors py-2">Learn</a>
            <a href="#about" className="hover:text-[#9E2F2F] transition-colors py-2">About</a>
            <a href="#for-parents" className="hover:text-[#9E2F2F] transition-colors py-2">For Parents</a>
            <a href="#contact" className="hover:text-[#9E2F2F] transition-colors py-2">Contact</a>
          </nav>

          {/* Action Tools & Booking CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 bg-white border border-[#111111]/15 text-[#111111] hover:border-[#E6B83A] transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="Global Search"
            >
              <Search size={15} className="text-[#E6B83A]" />
              <span className="hidden xl:inline text-[11px] opacity-70">SEARCH</span>
            </button>

            {/* Practice Mode Button */}
            <button
              onClick={() => setIsPracticeOpen(true)}
              className="p-2.5 bg-white border border-[#111111]/15 text-[#111111] hover:border-[#9E2F2F] transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="Today's Practice Companion"
            >
              <Flame size={15} className="text-[#9E2F2F]" />
              <span className="hidden xl:inline text-[11px] opacity-70">PRACTICE</span>
            </button>

            {/* Primary CTA */}
            <a 
              href="#contact"
              className="bg-[#111111] text-[#F4F0E8] px-4 sm:px-5 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-[#9E2F2F] transition-all rounded-none flex items-center space-x-2 shadow-lg"
            >
              <span>Book Lesson</span>
              <ArrowRight size={13} />
            </a>
          </div>

          {/* Mobile Actions: Search, Practice & Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#111111] hover:text-[#9E2F2F] active:scale-95 touch-manipulation"
              aria-label="Search Platform"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsPracticeOpen(true)}
              className="p-2 text-[#9E2F2F] hover:text-[#111111] active:scale-95 touch-manipulation"
              aria-label="Daily Practice Mode"
            >
              <Flame size={20} />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#111111] hover:text-[#9E2F2F] transition active:scale-95 touch-manipulation"
              aria-label="Open Navigation Menu"
            >
              <Menu size={26} />
            </button>
          </div>

        </div>
      </header>

      {/* ================= MOBILE FULLSCREEN MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#111111] text-[#F4F0E8] flex flex-col justify-between p-6 sm:p-8 lg:hidden animate-fade-in overflow-y-auto max-h-screen">
          <div className="flex justify-between items-center border-b border-[#F4F0E8]/10 pb-4">
            <span className="text-lg font-black font-mono tracking-tighter">KULDEEP GAUR // GIPA</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#F4F0E8] hover:text-[#9E2F2F] transition"
              aria-label="Close Navigation Menu"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col space-y-3.5 sm:space-y-4 text-xl sm:text-2xl font-black uppercase tracking-tight py-4">
            <a href="#lessons" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">01. Lessons</a>
            <a href="#explore-music" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">02. Explore Music</a>
            <a href="#guitar-lab" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition text-[#9E2F2F]">03. Guitar Lab</a>
            <a href="#piano" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition text-[#E6B83A]">04. Piano Sanctuary</a>
            <a href="#vocal-lab" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">05. Vocal Lab</a>
            <a href="#rhythm-lab" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">06. Rhythm & Metronome</a>
            <a href="#music-theory" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">07. Theory & Harmony</a>
            <a href="#ear-training" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">08. Ear Training</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">09. About Kuldeep</a>
            <a href="#for-parents" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition text-[#E6B83A]">10. For Parents</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition text-[#E87532]">11. Book A Lesson</a>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-[#F4F0E8]/20">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex-1 py-3 bg-[#181818] border border-[#F4F0E8]/20 text-xs font-mono font-bold uppercase flex items-center justify-center gap-2"
              >
                <Search size={14} /> SEARCH PLATFORM
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsPracticeOpen(true);
                }}
                className="flex-1 py-3 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase flex items-center justify-center gap-2"
              >
                <Flame size={14} /> PRACTICE MODE
              </button>
            </div>

            <div className="text-[11px] font-mono text-[#F4F0E8]/60 pt-2 flex flex-col sm:flex-row justify-between">
              <span>Gaur Institute of Performing Art</span>
              <span>Lakhimpur Kheri • +91 7985257106</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[92vh] pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 flex flex-col justify-between max-w-7xl mx-auto">
        
        {/* Top Meta Tagging */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#111111]/70 border-b border-[#111111]/10 pb-4 sm:pb-6 gap-2 sm:gap-4">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#9E2F2F] animate-pulse"></span>
            <span>GAUR INSTITUTE OF PERFORMING ART</span>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6 text-[9px] sm:text-xs">
            <span>MENTOR: KULDEEP GAUR</span>
            <span className="hidden sm:inline">LAKHIMPUR KHERI</span>
          </div>
        </div>

        {/* Grand Editorial Typography Header */}
        <div className="my-8 sm:my-12 lg:my-16 space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] xl:text-[130px] font-black tracking-tighter leading-[0.92] uppercase font-sans break-words">
            LEARN MUSIC.<br />
            <span className="italic font-light font-serif text-[#9E2F2F]">FEEL SOUND.</span><br />
            PLAY TRUTH.
          </h1>
          <p className="max-w-2xl text-base sm:text-xl lg:text-2xl font-light text-[#111111]/80 pt-2 sm:pt-4 leading-relaxed font-sans">
            A premier conservatory of music and performing arts founded on personal mentorship, uncompromising discipline, and deep aural literacy under <strong className="text-[#9E2F2F] font-semibold">Kuldeep Gaur</strong>.
          </p>
        </div>

        {/* Hero Visual Composition & Features Bar */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-end border-t border-[#111111]/10 pt-6 sm:pt-8">
          
          <div className="lg:col-span-8 flex flex-wrap gap-2.5 sm:gap-4 text-xs font-mono uppercase tracking-wider">
            <a 
              href="#guitar-lab" 
              className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#111111] text-[#F4F0E8] hover:bg-[#9E2F2F] transition-all flex items-center space-x-2 text-[11px] sm:text-xs"
            >
              <span>Explore Guitar Lab</span>
              <ChevronRight size={14} />
            </a>
            <a 
              href="#piano" 
              className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#111111]/20 hover:border-[#111111] transition-all flex items-center space-x-2 text-[11px] sm:text-xs"
            >
              <span>Virtual Piano</span>
              <ChevronRight size={14} />
            </a>
            <a 
              href="#rhythm-lab" 
              className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white border border-[#111111]/20 hover:border-[#111111] transition-all flex items-center space-x-2 text-[11px] sm:text-xs"
            >
              <span>Beat Studio & Metronome</span>
              <ChevronRight size={14} />
            </a>
            <button
              onClick={() => setIsPracticeOpen(true)}
              className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#E6B83A] text-[#111111] font-bold hover:bg-[#d4a832] transition-all flex items-center space-x-2 text-[11px] sm:text-xs"
            >
              <Flame size={14} />
              <span>Today's Practice</span>
            </button>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="text-left lg:text-right font-mono text-[11px] sm:text-xs text-[#111111]/60 space-y-0.5">
              <span className="block font-bold text-[#111111] uppercase">Studio & Online Admissions Open</span>
              <span>Individual Mentorship • All Age Groups</span>
            </div>
          </div>

        </div>

      </section>

      {/* ================= STUDIO MANIFESTO BANNER ================= */}
      <section className="py-20 lg:py-40 bg-[#111111] text-[#F4F0E8] px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
              // STUDIO MANIFESTO
            </span>
            <blockquote className="text-2xl sm:text-4xl lg:text-6xl font-light font-serif leading-tight break-words">
              "We do not mass-produce generic players. We train listeners, craftspeople, and artists who understand the sacred geometry of melody, harmony, and touch."
            </blockquote>
            <div className="flex items-center space-x-4 pt-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#F4F0E8]/70">
                Kuldeep Gaur — Sole Master Instructor
              </span>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="p-6 sm:p-8 border border-[#F4F0E8]/20 bg-[#181818] space-y-4 w-full max-w-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">Academy Hallmarks</span>
              <ul className="space-y-2.5 font-mono text-xs text-[#F4F0E8]/80">
                <li className="flex items-center gap-2">
                  <span className="text-[#E6B83A]">✦</span>
                  <span>Pure 1-on-1 Personalized Attention</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E6B83A]">✦</span>
                  <span>Western ABRSM & Indian Classical Rigor</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E6B83A]">✦</span>
                  <span>Acoustic Dynamics & Micro-Ear Training</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E6B83A]">✦</span>
                  <span>Dedicated Lakhimpur Kheri Studio</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXPLORE THE LESSONS (INTERACTIVE) ================= */}
      <section id="lessons" className="py-20 lg:py-36 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 sm:mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#9E2F2F] block mb-2">
              01 // CURRICULUM SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight uppercase font-serif break-words">
              EXPLORE THE LESSONS
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-mono font-bold text-[#111111]/60">
              {currentLesson.id} / 0{lessonsData.length}
            </span>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveLessonIndex((prev) => (prev === 0 ? lessonsData.length - 1 : prev - 1))}
                className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#F4F0E8] transition active:scale-95 touch-manipulation"
                aria-label="Previous Lesson"
              >
                <ArrowLeft size={18} />
              </button>
              <button 
                onClick={() => setActiveLessonIndex((prev) => (prev === lessonsData.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#F4F0E8] transition active:scale-95 touch-manipulation"
                aria-label="Next Lesson"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Interactive Display Card */}
        <div 
          className="border-2 border-[#111111] p-5 sm:p-8 lg:p-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-500 shadow-2xl"
          style={{ backgroundColor: currentLesson.bgColor, color: '#F4F0E8' }}
        >
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-[#F4F0E8] text-[#111111] uppercase tracking-widest">
                {currentLesson.subtitle}
              </span>
              <span className="text-xs font-mono text-[#F4F0E8]/60">
                {currentLesson.level}
              </span>
            </div>

            <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase font-serif break-words">
              {currentLesson.title}
            </h3>

            <p className="text-base sm:text-lg lg:text-xl text-[#F4F0E8]/80 font-normal leading-relaxed">
              {currentLesson.description}
            </p>

            <div className="space-y-3 pt-2 sm:pt-4 border-t border-[#F4F0E8]/20">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">What You Will Master:</span>
              <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
                {currentLesson.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-[#F4F0E8]/90 font-mono">
                    <CheckIcon style={{ color: currentLesson.accent }} />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Sound Preview & Lesson Notes */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2 sm:pt-4">
              <button
                onClick={() => handlePlayCurrentLessonAudio(currentLesson)}
                className="flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 bg-[#E6B83A] text-[#111111] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#d4a832] transition-colors shadow-lg active:scale-95 touch-manipulation"
              >
                <Volume2 size={16} />
                <span>PLAY SOUND PREVIEW</span>
              </button>

              <button
                onClick={() => setShowLessonNotes(!showLessonNotes)}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 bg-[#111111] border border-[#F4F0E8]/30 text-[#F4F0E8] font-mono text-xs uppercase tracking-wider hover:border-[#E6B83A] transition-colors touch-manipulation"
              >
                <BookOpen size={16} />
                <span>{showLessonNotes ? 'HIDE NOTES' : 'LESSON NOTES & PRACTICE'}</span>
              </button>

              <a 
                href="#contact" 
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  interest: currentLesson.title === 'RHYTHM & DRUMS' ? 'Drums & Rhythm' : 
                            currentLesson.title === 'MUSIC THEORY' ? 'Music Theory' : 
                            currentLesson.title === 'DANCE & EXPRESSION' ? 'Dance' : 
                            currentLesson.title === 'VOCALS' ? 'Vocals' : 
                            currentLesson.title === 'PIANO' ? 'Piano' : 'Guitar' 
                }))}
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 sm:py-3.5 bg-[#F4F0E8] text-[#111111] font-black text-xs uppercase tracking-widest hover:bg-[#9E2F2F] hover:text-[#F4F0E8] transition shadow-lg touch-manipulation"
              >
                <span>Enroll in {currentLesson.title}</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Expandable Lesson Notes Box */}
            {showLessonNotes && (
              <div className="p-4 sm:p-6 bg-[#111111] border border-[#F4F0E8]/20 space-y-3 sm:space-y-4 animate-fade-in text-xs font-mono">
                <div className="flex items-center justify-between border-b border-[#F4F0E8]/10 pb-2">
                  <span className="text-[#E6B83A] font-bold uppercase">LESSON NOTES & HOME PRACTICE DRILLS</span>
                  <span className="text-[#F4F0E8]/40 hidden sm:inline">GIPA Verified Pedagogy</span>
                </div>
                <div className="space-y-2">
                  <span className="text-[#F4F0E8]/70 block">Recommended Daily Practice Checklist:</span>
                  <ul className="space-y-1 text-[#F4F0E8]/90">
                    {currentLesson.practiceTopics.map((top, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#E6B83A]">□</span>
                        <span>{top}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-[11px] text-[#F4F0E8]/50 pt-2 border-t border-[#F4F0E8]/10">
                  Detailed lesson assignments are customized 1-on-1 during your weekly studio session with Kuldeep Gaur.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 relative w-full">
            <div 
              onClick={() => handlePlayCurrentLessonAudio(currentLesson)}
              className="relative overflow-hidden group w-full border border-[#F4F0E8]/10 bg-black/40 shadow-2xl cursor-pointer active:scale-95 transition-transform duration-300 touch-manipulation"
              title="Tap to preview instrument tone"
            >
              <img 
                src={currentLesson.image} 
                alt={currentLesson.title} 
                loading="lazy"
                className="w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[460px] object-cover object-center grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
              <div 
                className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-mono font-black text-base sm:text-lg bg-[#111111] text-[#F4F0E8] shadow-md z-10"
                style={{ borderLeft: `4px solid ${currentLesson.accent}` }}
              >
                {currentLesson.id}
              </div>
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#111111]/90 backdrop-blur-md p-2.5 sm:p-3 border border-[#F4F0E8]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#F4F0E8] font-bold uppercase truncate">{currentLesson.title} STUDIO</span>
                <span className="text-[#E6B83A] shrink-0 ml-2 font-semibold text-[11px]">Tap For Audio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Thumbnails Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mt-6">
          {lessonsData.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => {
                setActiveLessonIndex(idx);
                setShowLessonNotes(false);
              }}
              className={`p-3 sm:p-4 border text-left transition-all flex flex-col justify-between h-24 sm:h-28 active:scale-95 touch-manipulation ${activeLessonIndex === idx ? 'border-[#111111] bg-[#111111] text-[#F4F0E8] shadow-lg' : 'border-[#111111]/20 bg-transparent text-[#111111] hover:border-[#111111]'}`}
            >
              <span className="text-[10px] sm:text-xs font-mono font-bold opacity-60">{lesson.id}</span>
              <span className="text-xs sm:text-base font-black tracking-tight uppercase font-serif truncate">{lesson.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ================= EXPLORE MUSIC (TIMBRE ARCHIVE & COMPARISONS) ================= */}
      <ExploreMusicSection />

      {/* ================= GUITAR LEARNING LAB (FRETBOARD, TUNER, CHORDS, SCALES, TYPES) ================= */}
      <GuitarLab />

      {/* ================= PIANO SANCTUARY (VIRTUAL 2-OCTAVE KEYBOARD & CHORDS) ================= */}
      <PianoLab />

      {/* ================= VOCAL & SINGING LAB (WARMUPS & PITCH VISUALIZER) ================= */}
      <VocalLab />

      {/* ================= RHYTHM & METRONOME LAB (BEAT STUDIO) ================= */}
      <RhythmMetronomeLab />

      {/* ================= THEORY & HARMONY LAB (NOTES, SWARAS, DIATONIC, PROGRESSION) ================= */}
      <TheoryAndGlossaryLab />

      {/* ================= EAR TRAINING LAB (PITCH & CHORD AUDITORY GYM) ================= */}
      <EarTrainingLab />

      {/* ================= ABOUT KULDEEP GAUR (VERIFIED MENTOR PROFILE) ================= */}
      <section id="about" className="py-20 lg:py-36 bg-[#111111] text-[#F4F0E8] px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 sm:gap-16 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#9E2F2F]/20 to-[#E6B83A]/25 filter blur-2xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80" 
              alt="Kuldeep Gaur at GIPA Studio" 
              className="w-full h-[300px] sm:h-[450px] lg:h-[620px] object-cover grayscale-0 md:grayscale hover:grayscale-0 active:scale-[0.98] transition-all duration-500 shadow-2xl border border-[#F4F0E8]/20 cursor-pointer"
            />
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-[#9E2F2F] text-[#F4F0E8] p-3 sm:p-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest shadow-xl">
              Founder & Director • GIPA
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
              // MEET THE MENTOR
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase font-serif break-words">
              KULDEEP GAUR
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3 font-mono text-xs">
              <span className="px-2.5 sm:px-3 py-1 bg-[#F4F0E8]/10 text-[#F4F0E8] border border-[#F4F0E8]/20">Master Instructor</span>
              <span className="px-2.5 sm:px-3 py-1 bg-[#F4F0E8]/10 text-[#F4F0E8] border border-[#F4F0E8]/20">Multi-Instrumentalist</span>
              <span className="px-2.5 sm:px-3 py-1 bg-[#F4F0E8]/10 text-[#F4F0E8] border border-[#F4F0E8]/20">Aural Pedagogue</span>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-[#F4F0E8]/80 leading-relaxed font-normal font-sans">
              Kuldeep Gaur is the sole master teacher and visionary behind the Gaur Institute of Performing Art (GIPA) in Lakhimpur Kheri. Dedicated to elevating musical standards, Kuldeep provides uncompromising, personalized mentorship across guitar, piano, vocals, traditional instruments, and dance.
            </p>

            <div className="space-y-4 pt-2 sm:pt-4 border-t border-[#F4F0E8]/20">
              <div className="flex items-start space-x-3">
                <span className="text-[#E6B83A] font-bold font-mono">01</span>
                <div>
                  <h4 className="font-bold uppercase text-sm tracking-wider font-serif">Uncompromising Technique</h4>
                  <p className="text-xs text-[#F4F0E8]/60 mt-1 font-mono">Focusing on correct posture, finger placement, breath control, and foundational theory from day one.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#9E2F2F] font-bold font-mono">02</span>
                <div>
                  <h4 className="font-bold uppercase text-sm tracking-wider font-serif">Direct 1-on-1 Mentorship</h4>
                  <p className="text-xs text-[#F4F0E8]/60 mt-1 font-mono">Every student receives undivided attention directly from Kuldeep Gaur without intermediaries or assistant trainers.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#E87532] font-bold font-mono">03</span>
                <div>
                  <h4 className="font-bold uppercase text-sm tracking-wider font-serif">Dual Western & Indian Curricula</h4>
                  <p className="text-xs text-[#F4F0E8]/60 mt-1 font-mono">Training aligned with international standards (ABRSM London) and prestigious national institutions (Prayag Sangeet Samiti).</p>
                </div>
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a href="#contact" className="bg-[#E6B83A] text-[#111111] px-6 sm:px-8 py-3.5 sm:py-4 text-xs font-black uppercase tracking-widest hover:bg-[#F4F0E8] transition text-center">
                Book a Session with Kuldeep
              </a>
              <span className="text-xs font-mono text-[#F4F0E8]/60 text-center sm:text-left">Call / WhatsApp: +91 7985257106</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FOR PARENTS SECTION ================= */}
      <ParentsSection onOpenBooking={(interest) => {
        setFormData((prev) => ({ ...prev, interest: 'Piano & Keyboard (Child Consultation)' }));
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* ================= TEACHING PHILOSOPHY MANIFESTO ================= */}
      <section className="py-20 lg:py-36 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
        <span className="text-xs font-mono uppercase tracking-widest text-[#9E2F2F] block">
          // TEACHING PHILOSOPHY
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight uppercase font-serif break-words">
          "GOOD MUSIC ISN'T JUST HEARD. IT'S UNDERSTOOD."
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-[#111111]/80 max-w-2xl mx-auto font-normal leading-relaxed font-sans">
          When you understand the grammar of music—harmony, rhythm, scale structure, and emotion—you stop merely copying notes and start creating your own artistic voice.
        </p>
      </section>

      {/* ================= LEARNING JOURNEY TIMELINE ================= */}
      <section id="journey" className="py-20 lg:py-36 bg-[#111111] text-[#F4F0E8] px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block mb-2">
                // Step-by-Step Pathway
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase font-serif break-words">
                HOW THE LESSONS WORK
              </h2>
            </div>
            <span className="text-xs font-mono text-[#F4F0E8]/60 max-w-xs">
              Designed for absolute beginners, intermediate musicians, and performers preparing for certifications.
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {learningJourneySteps.map((item, idx) => (
              <div key={idx} className="border border-[#F4F0E8]/20 p-6 sm:p-8 space-y-4 sm:space-y-6 hover:border-[#E6B83A] transition group bg-[#161616]">
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#E6B83A] block group-hover:scale-110 transition-transform origin-left">
                  {item.step}
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider font-serif">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#F4F0E8]/70 font-mono leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="py-20 lg:py-36 bg-[#181818] text-[#F4F0E8] px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center space-y-3 sm:space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
              // Common Inquiries
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase font-serif break-words">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-8">
            {faqsData.map((faq, idx) => (
              <div key={idx} className="border border-[#F4F0E8]/20 bg-[#111111]">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 sm:p-6 text-left flex justify-between items-center font-bold text-base sm:text-lg hover:text-[#E6B83A] transition font-serif active:scale-[0.99] touch-manipulation"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className="font-mono text-xl shrink-0">{openFaqIndex === idx ? '−' : '+'}</span>
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 sm:p-6 pt-0 text-xs sm:text-sm font-mono text-[#F4F0E8]/70 border-t border-[#F4F0E8]/10 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-20 lg:py-40 bg-[#9E2F2F] text-[#F4F0E8] px-4 sm:px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
            // Begin Your Musical Journey
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-none font-sans break-words">
            DON'T WAIT TO PLAY.
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl font-light max-w-xl mx-auto opacity-90 leading-relaxed font-sans px-2">
            Every master was once a student who took the first step. Reserve your slot directly with Kuldeep Gaur.
          </p>
          <div className="pt-2 sm:pt-4">
            <a 
              href="#contact" 
              className="inline-flex items-center space-x-3 sm:space-x-4 px-8 sm:px-10 py-4 sm:py-5 bg-[#111111] text-[#F4F0E8] font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-[#F4F0E8] hover:text-[#111111] transition shadow-2xl active:scale-95 touch-manipulation"
            >
              <span>Book A Lesson Now</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ================= BOOK A LESSON (UPGRADED FORM) ================= */}
      <section id="contact" className="py-20 lg:py-36 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9E2F2F] block">
              // ADMISSIONS & BOOKING
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase font-serif break-words">
              BOOK A MUSIC LESSON
            </h2>
            <p className="text-base sm:text-lg text-[#111111]/80 leading-relaxed font-normal">
              Whether you want to master acoustic or electric guitar, study classical piano, train your vocals, or enroll a young learner, reach out directly to Kuldeep Gaur.
            </p>

            <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 border-t border-[#111111]/10 font-mono text-xs sm:text-sm">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <MapPin className="text-[#9E2F2F] shrink-0 mt-1" size={18} />
                <div>
                  <strong className="block font-bold uppercase">Academy Studio Address:</strong>
                  <span className="text-[#111111]/70">Punjabi Colony, Nehar Road, Rajgarh, Lakhimpur Kheri - 262701</span>
                  <span className="block text-[11px] text-[#111111]/50 mt-0.5">(Near Guru Nanak Inter College / Guru Nanak Degree College)</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <Phone className="text-[#9E2F2F] shrink-0" size={18} />
                <div>
                  <strong className="block font-bold uppercase">Direct Phone / WhatsApp:</strong>
                  <a href="tel:+917985257106" className="text-[#111111]/80 hover:text-[#9E2F2F] font-bold">+91 7985257106</a>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <Music className="text-[#9E2F2F] shrink-0" size={18} />
                <div>
                  <strong className="block font-bold uppercase">Sole Master Teacher:</strong>
                  <span className="text-[#111111]/70">Kuldeep Gaur (GIPA)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form Card */}
          <div className="lg:col-span-7 bg-[#111111] text-[#F4F0E8] p-5 sm:p-8 lg:p-12 shadow-2xl">
            {formSubmitted ? (
              <div className="py-14 sm:py-20 text-center space-y-4 sm:space-y-6">
                <span className="text-4xl sm:text-5xl block">🎵</span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase font-serif">Enquiry Dispatched</h3>
                <p className="text-xs sm:text-sm font-mono text-[#F4F0E8]/70 max-w-md mx-auto">
                  Thank you for booking with GIPA. Your details have been formatted and dispatched. Kuldeep Gaur will connect directly at {formData.phone}.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-3 bg-[#9E2F2F] text-[#F4F0E8] text-xs font-black uppercase tracking-widest hover:bg-[#F4F0E8] hover:text-[#111111] transition"
                >
                  Submit Another Booking
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#F4F0E8]/20">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider font-serif">
                    Lesson & Admission Form
                  </h3>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#E6B83A] uppercase tracking-widest hidden sm:inline">
                    Direct To Kuldeep Gaur
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleFormChange}
                      placeholder="e.g. Aryan Sharma" 
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-3 sm:p-3.5 text-[#F4F0E8] font-mono text-base sm:text-sm focus:border-[#E6B83A] outline-none"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Student Name (if child)</label>
                    <input 
                      type="text" 
                      name="studentName" 
                      value={formData.studentName} 
                      onChange={handleFormChange}
                      placeholder="Leave blank if self" 
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-3 sm:p-3.5 text-[#F4F0E8] font-mono text-base sm:text-sm focus:border-[#E6B83A] outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Student Age</label>
                    <input 
                      type="text" 
                      name="age" 
                      value={formData.age} 
                      onChange={handleFormChange}
                      placeholder="e.g. 14 years" 
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-3 sm:p-3.5 text-[#F4F0E8] font-mono text-base sm:text-sm focus:border-[#E6B83A] outline-none"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Phone / WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleFormChange}
                      placeholder="e.g. +91 98765 43210" 
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-3 sm:p-3.5 text-[#F4F0E8] font-mono text-base sm:text-sm focus:border-[#E6B83A] outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Instrument / Subject *</label>
                    <select 
                      name="interest" 
                      value={formData.interest} 
                      onChange={handleFormChange}
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-3 sm:p-3.5 text-[#F4F0E8] font-mono text-base sm:text-sm focus:border-[#E6B83A] outline-none"
                    >
                      <option value="Guitar (Acoustic / Electric / Fingerstyle)">Guitar (Acoustic / Electric / Fingerstyle)</option>
                      <option value="Piano & Keyboard">Piano & Keyboard</option>
                      <option value="Vocals (Classical / Western)">Vocals (Classical / Western)</option>
                      <option value="Drums & Rhythm">Drums & Rhythm</option>
                      <option value="Tabla">Tabla</option>
                      <option value="Violin">Violin</option>
                      <option value="Harmonium">Harmonium</option>
                      <option value="Music Theory & Ear Training">Music Theory & Ear Training</option>
                      <option value="Dance (Kathak / Folk)">Dance (Kathak / Folk)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Current Experience Level</label>
                    <select 
                      name="level" 
                      value={formData.level} 
                      onChange={handleFormChange}
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-3 sm:p-3.5 text-[#F4F0E8] font-mono text-base sm:text-sm focus:border-[#E6B83A] outline-none"
                    >
                      <option value="Complete Beginner">Complete Beginner</option>
                      <option value="Intermediate">Intermediate (Some Basics)</option>
                      <option value="Advanced / Performance">Advanced / Performance</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Preferred Schedule Days</label>
                    <select 
                      name="preferredDays" 
                      value={formData.preferredDays} 
                      onChange={handleFormChange}
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-3 sm:p-3.5 text-[#F4F0E8] font-mono text-base sm:text-sm focus:border-[#E6B83A] outline-none"
                    >
                      <option value="Flexible Schedule">Flexible Schedule</option>
                      <option value="Weekdays (Mon - Fri)">Weekdays (Mon - Fri)</option>
                      <option value="Weekends (Sat - Sun)">Weekends (Sat - Sun)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Learning Mode</label>
                    <select 
                      name="deliveryMode" 
                      value={formData.deliveryMode} 
                      onChange={handleFormChange}
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-3 sm:p-3.5 text-[#F4F0E8] font-mono text-base sm:text-sm focus:border-[#E6B83A] outline-none"
                    >
                      <option value="Offline Studio (Lakhimpur Kheri)">Offline Studio (Lakhimpur Kheri)</option>
                      <option value="Online 1-on-1 Live Video">Online 1-on-1 Live Video</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Message, Goals & Prior Experience</label>
                  <textarea 
                    name="message" 
                    rows="3" 
                    value={formData.message} 
                    onChange={handleFormChange}
                    placeholder="Tell Kuldeep about your musical background and what you hope to achieve..." 
                    className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-3 sm:p-3.5 text-[#F4F0E8] font-mono text-base sm:text-sm focus:border-[#E6B83A] outline-none resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 sm:py-5 bg-[#E6B83A] text-[#111111] font-black uppercase tracking-widest hover:bg-[#F4F0E8] transition shadow-xl text-xs sm:text-sm active:scale-[0.99] touch-manipulation"
                >
                  SEND ENQUIRY TO KULDEEP GAUR
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#111111] text-[#F4F0E8] pt-16 sm:pt-24 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-12 border-t border-[#F4F0E8]/10">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-20">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 border-b border-[#F4F0E8]/20 pb-10 sm:pb-16">
            <div className="space-y-2 sm:space-y-4">
              <span className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase font-mono block">
                KULDEEP GAUR
              </span>
              <p className="text-xs sm:text-sm font-mono text-[#F4F0E8]/60 uppercase tracking-widest">
                Gaur Institute of Performing Art (GIPA) • Lakhimpur Kheri
              </p>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs font-mono uppercase tracking-wider">
              <a href="#lessons" className="hover:text-[#E6B83A] transition">Lessons</a>
              <a href="#explore-music" className="hover:text-[#E6B83A] transition">Explore Music</a>
              <a href="#guitar-lab" className="hover:text-[#E6B83A] transition">Guitar Lab</a>
              <a href="#piano" className="hover:text-[#E6B83A] transition">Piano</a>
              <a href="#rhythm-lab" className="hover:text-[#E6B83A] transition">Rhythm</a>
              <a href="#music-theory" className="hover:text-[#E6B83A] transition">Theory</a>
              <a href="#about" className="hover:text-[#E6B83A] transition">About</a>
              <a href="#for-parents" className="hover:text-[#E6B83A] transition">Parents</a>
              <a href="#contact" className="hover:text-[#E6B83A] transition">Contact</a>
            </div>
          </div>

          <div className="text-center py-6 sm:py-12 space-y-3 sm:space-y-4">
            <button
              type="button"
              onClick={handleKeepPlayingClick}
              aria-label="Keep Playing - Tap to play musical chord and return to top"
              className="text-4xl sm:text-6xl md:text-8xl lg:text-[130px] font-black tracking-tight uppercase leading-none font-sans text-[#F4F0E8]/35 sm:text-[#F4F0E8]/20 hover:text-[#F4F0E8] active:text-[#E6B83A] active:scale-[0.97] transition-all duration-300 select-none cursor-pointer w-full text-center focus:outline-none touch-manipulation break-words"
            >
              KEEP PLAYING.
            </button>
            <p className="text-[11px] sm:text-xs font-mono text-[#E6B83A]/70 uppercase tracking-widest flex items-center justify-center space-x-2">
              <Sparkles size={12} className="text-[#E6B83A]" />
              <span>Tap to Play Harmony & Return to Top</span>
              <Sparkles size={12} className="text-[#E6B83A]" />
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] sm:text-xs font-mono text-[#F4F0E8]/50 pt-6 sm:pt-8 border-t border-[#F4F0E8]/10 space-y-3 sm:space-y-0 text-center sm:text-left">
            <span>© 2026 Kuldeep Gaur (GIPA). All verified academy rights reserved.</span>
            <span>Uncompromising musical excellence in Lakhimpur Kheri & Worldwide Online.</span>
          </div>

        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/917985257106?text=${encodeURIComponent(
          "Hello Kuldeep Gaur, I am interested in learning music/instruments through Gaur Institute of Performing Art (GIPA). I would like to know more about the lessons and admission process."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Kuldeep Gaur on WhatsApp"
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] cursor-pointer touch-manipulation"
      >
        <WhatsAppIcon size={28} />
      </a>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Practice Companion Modal */}
      <PracticeAndBadgesModal
        isOpen={isPracticeOpen}
        onClose={() => setIsPracticeOpen(false)}
      />

    </div>
  );
}

function CheckIcon({ style }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function WhatsAppIcon({ size = 30, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.979-.276-.1-.476-.15-.677.15-.201.3-.777.979-.953 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.501.101-.201.05-.376-.025-.526-.075-.15-.677-1.631-.928-2.234-.244-.588-.493-.508-.677-.518-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.512c0 1.482 1.079 2.912 1.23 3.113.15.201 2.124 3.244 5.145 4.549.719.31 1.28.496 1.718.636.722.23 1.379.197 1.898.12.578-.086 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.006 2C6.488 2 2 6.488 2 12.006c0 1.91.536 3.696 1.464 5.225L2 22l4.908-1.428a9.96 9.96 0 0 0 5.098 1.44c5.518 0 10.006-4.488 10.006-10.006C22.012 6.488 17.524 2 12.006 2zm0 18.314c-1.636 0-3.153-.473-4.444-1.289l-.319-.199-2.923.85.87-2.846-.208-.332A8.272 8.272 0 0 1 3.73 12.006c0-4.563 3.713-8.276 8.276-8.276s8.276 3.713 8.276 8.276-3.713 8.308-8.276 8.308z" />
    </svg>
  );
}
