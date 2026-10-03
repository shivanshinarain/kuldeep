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
  ExternalLink
} from 'lucide-react';

// ==========================================
// GIPA - GAUR INSTITUTE OF PERFORMING ART
// KULDEEP GAUR MUSIC PLATFORM
// ==========================================

const lessonsData = [
  {
    id: "01",
    title: "GUITAR",
    subtitle: "Acoustic, Electric & Fingerstyle",
    description: "Build your foundational technique, master fretboard geography, explore advanced chord melody arrangements, and develop fluid rhythm.",
    accent: "#9E2F2F",
    bgColor: "#141010",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80",
    details: [
      "Chord Voicings & Inversions",
      "Fingerstyle & Plectrum Mechanics",
      "Improvisation & Pentatonic Scales",
      "Acoustic & Electric Rig Mastery"
    ],
    level: "All Levels (Beginner to Advanced)"
  },
  {
    id: "02",
    title: "PIANO",
    subtitle: "Classical & Contemporary Keys",
    description: "Understand keyboard harmony, voice leading, classical interpretation, and contemporary chord progressions under direct mentorship.",
    accent: "#E6B83A",
    bgColor: "#14130F",
    // Premium, dramatic concert grand piano photograph
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=1400&q=85",
    details: [
      "Touch, Dynamics & Articulation",
      "Standard Notation & Lead Sheets",
      "Chord Progressions & Reharmonization",
      "Classical Repertoire & Modern Ballads"
    ],
    level: "Beginner to Advanced Virtuoso"
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
      "Vocal Warmups & Breath Economy",
      "Shuddh Swars & Western Pitch Accuracies",
      "Vibrato, Belting & Falsetto Control",
      "Microphone Technique & Mic Confidence"
    ],
    level: "All Voices & Skill Levels"
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
      "Metronome Mastery & Subdivision",
      "Limb Independence & Kit Dynamics",
      "Tabla Bols & Indian Rhythm Cycles",
      "Ensemble Timing & Groove Pocket"
    ],
    level: "Beginner to Advanced"
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
      "Intervals, Scales & Modes",
      "Functional Harmony & Cadences",
      "Ear Training & Sight Reading",
      "Songwriting & Structural Form"
    ],
    level: "Essential for All Musicians"
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
    level: "Beginner to Advanced"
  }
];

const learningJourneySteps = [
  { step: "01", title: "CHOOSE", desc: "Select your instrument or vocal discipline aligned with your artistic ambitions." },
  { step: "02", title: "LEARN", desc: "Receive 1-on-1 direct guidance, technical breakdowns, and custom exercises from Kuldeep Gaur." },
  { step: "03", title: "PRACTICE", desc: "Build disciplined daily habits with structured practice schedules and guided metronome work." },
  { step: "04", title: "PLAY", desc: "Apply your technique to real songs, masterpieces, and confident live performances." }
];

const faqsData = [
  { q: "Who teaches the lessons?", a: "Every single lesson, session, and masterclass is personally conducted by Kuldeep Gaur." },
  { q: "What instruments and disciplines can I learn?", a: "Guitar, Piano, Drums, Violin, Tabla, Harmonium, Classical & Western Vocals, and Dance (Kathak, Folk, Bhangra)." },
  { q: "Are complete beginners welcome?", a: "Yes. Beginners receive patient, step-by-step foundation training designed to build unshakeable technique." },
  { q: "Where is the institute located?", a: "Punjabi Colony, Nehar Road, Rajgarh, Lakhimpur Kheri - 262701 (Near Guru Nanak Inter College / Guru Nanak Degree College)." },
  { q: "How are lesson times and schedules booked?", a: "You can book trial slots or regular weekly schedules directly by calling Kuldeep Gaur at +91 7985257106." }
];

const pianoNotes = [
  { note: "C4", key: "C", freq: 261.63, sub: "Root" },
  { note: "D4", key: "D", freq: 293.66, sub: "2nd" },
  { note: "E4", key: "E", freq: 329.63, sub: "Maj 3rd" },
  { note: "F4", key: "F", freq: 349.23, sub: "4th" },
  { note: "G4", key: "G", freq: 392.00, sub: "5th" },
  { note: "A4", key: "A", freq: 440.00, sub: "6th" },
  { note: "B4", key: "B", freq: 493.88, sub: "Maj 7th" },
  { note: "C5", key: "C", freq: 523.25, sub: "Octave" }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activePianoNote, setActivePianoNote] = useState(null);

  const handlePlayPianoNote = (noteObj) => {
    setActivePianoNote(noteObj.note);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(noteObj.freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      }
    } catch (err) {
      console.warn("AudioContext tone error", err);
    }
    setTimeout(() => {
      setActivePianoNote((curr) => (curr === noteObj.note ? null : curr));
    }, 450);
  };

  const playMusicalChime = (freqs = [261.63, 329.63, 392.00, 523.25]) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

          gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.07);
          gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + idx * 0.07 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.07 + 0.9);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.07);
          osc.stop(ctx.currentTime + idx * 0.07 + 0.9);
        });
      }
    } catch (e) {
      console.warn("Audio chime error", e);
    }
  };

  const handleKeepPlayingClick = () => {
    playMusicalChime([261.63, 329.63, 392.00, 523.25]); // C Major triad arpeggio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    interest: 'Guitar',
    level: 'Beginner',
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
    <div className="bg-[#F4F0E8] text-[#111111] font-sans selection:bg-[#9E2F2F] selection:text-[#F4F0E8] relative overflow-x-hidden">
      
      {/* Subtle Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* ================= GLOBAL NAVIGATION ================= */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#F4F0E8]/90 backdrop-blur-md border-b border-[#111111]/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <a href="#" className="flex flex-col group">
            <span className="text-2xl lg:text-3xl font-black tracking-tighter uppercase font-mono group-hover:text-[#9E2F2F] transition-colors">
              KULDEEP GAUR
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#111111]/60 font-medium">
              Gaur Institute of Performing Art (GIPA)
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold uppercase tracking-wider">
            <a href="#lessons" className="hover:text-[#9E2F2F] transition-colors py-2">Lessons</a>
            <a href="#piano" className="hover:text-[#9E2F2F] transition-colors py-2">Piano</a>
            <a href="#about" className="hover:text-[#9E2F2F] transition-colors py-2">About</a>
            <a href="#journey" className="hover:text-[#9E2F2F] transition-colors py-2">Journey</a>
            <a href="#knowledge" className="hover:text-[#9E2F2F] transition-colors py-2">Theory</a>
            <a href="#faq" className="hover:text-[#9E2F2F] transition-colors py-2">FAQ</a>
            <a href="#contact" className="hover:text-[#9E2F2F] transition-colors py-2">Contact</a>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="#contact"
              className="bg-[#111111] text-[#F4F0E8] px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#9E2F2F] transition-all rounded-none flex items-center space-x-2 shadow-lg"
            >
              <span>Start Learning</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#111111] hover:text-[#9E2F2F] transition"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#111111] text-[#F4F0E8] flex flex-col justify-between p-8 lg:hidden animate-fade-in">
          <div className="flex justify-between items-center">
            <span className="text-xl font-black font-mono tracking-tighter">KULDEEP GAUR</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#F4F0E8] hover:text-[#9E2F2F] transition"
            >
              <X size={32} />
            </button>
          </div>

          <div className="flex flex-col space-y-6 text-3xl font-black uppercase tracking-tight">
            <a href="#lessons" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">01. Lessons</a>
            <a href="#piano" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition text-[#E6B83A]">02. Piano Studio</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">03. About Kuldeep</a>
            <a href="#journey" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">04. Learning Journey</a>
            <a href="#knowledge" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">05. Music Knowledge</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">06. FAQ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition text-[#E87532]">07. Contact</a>
          </div>

          <div className="border-t border-[#F4F0E8]/20 pt-6 flex flex-col space-y-2 text-xs font-mono text-[#F4F0E8]/60">
            <span>Gaur Institute of Performing Art (GIPA)</span>
            <span>Lakhimpur Kheri • +91 7985257106</span>
          </div>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen pt-32 lg:pt-40 pb-20 px-6 lg:px-12 flex flex-col justify-between max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center my-auto">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center space-x-3 bg-[#111111] text-[#F4F0E8] px-4 py-1.5 text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles size={14} className="text-[#E6B83A]" />
              <span>Music, Played Differently</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[110px] font-black tracking-tight leading-[0.95] uppercase font-sans">
              MUSIC, <br />
              PLAYED <br />
              <span className="text-[#9E2F2F]">DIFFERENTLY.</span>
            </h1>

            <p className="text-lg lg:text-xl text-[#111111]/80 max-w-xl font-normal leading-relaxed">
              Personal music training, classical discipline, and modern instrument mastery with <strong className="text-[#111111] font-bold">Kuldeep Gaur</strong> in Lakhimpur Kheri.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
              <a 
                href="#lessons"
                className="bg-[#9E2F2F] text-[#F4F0E8] px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-[#111111] transition-all text-center shadow-xl flex items-center justify-center space-x-3"
              >
                <span>Explore Lessons</span>
                <ArrowRight size={16} />
              </a>
              <a 
                href="#about"
                className="border-2 border-[#111111] text-[#111111] px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-[#111111] hover:text-[#F4F0E8] transition-all text-center flex items-center justify-center space-x-3"
              >
                <span>Meet Kuldeep</span>
              </a>
            </div>
          </div>

          {/* Right Hero Instrument Visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#9E2F2F]/10 to-[#E6B83A]/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
            <div 
              onClick={() => playMusicalChime([196.00, 246.94, 293.66, 392.00])}
              className="relative group w-full max-w-md lg:max-w-none cursor-pointer active:scale-95 transition-transform duration-300 touch-manipulation"
              title="Tap to preview guitar acoustic chord"
            >
              <img 
                src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80" 
                alt="Acoustic Electric Guitar" 
                className="w-full h-[320px] sm:h-[420px] lg:h-[580px] object-cover shadow-2xl grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-6 left-6 bg-[#111111] text-[#F4F0E8] p-4 backdrop-blur-md border border-[#F4F0E8]/20">
                <span className="text-[10px] font-mono tracking-widest text-[#E6B83A] block uppercase">Featured Instrument</span>
                <span className="text-lg font-black tracking-wider block">Gitaar & Fretboard Mastery</span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="pt-12 pb-4 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-[#111111]/60 border-t border-[#111111]/10 mt-12">
          <span>Lakhimpur Kheri, UP</span>
          <span className="animate-bounce">↓ Scroll to Explore</span>
          <span>GIPA Academy</span>
        </div>
      </section>

      {/* ================= INTRODUCTION STATEMENT ================= */}
      <section className="py-24 lg:py-40 bg-[#111111] text-[#F4F0E8] px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
            // The Manifesto
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[1.05] uppercase">
            "Music isn't just something you listen to."
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 pt-8 border-t border-[#F4F0E8]/20">
            <p className="text-xl lg:text-2xl text-[#F4F0E8]/80 font-normal leading-relaxed">
              It's something you learn, understand, practice, and make entirely your own through disciplined, passionate mentorship.
            </p>
            <div className="space-y-6 text-sm lg:text-base text-[#F4F0E8]/60 font-mono leading-relaxed">
              <p>
                At Gaur Institute of Performing Art (GIPA), founded and directed by Kuldeep Gaur, music education transcends routine academics. We teach technique, feeling, harmony, and stage confidence.
              </p>
              <div className="flex space-x-6 pt-4">
                <div>
                  <span className="text-3xl font-black text-[#E6B83A] block">100%</span>
                  <span className="text-xs text-[#F4F0E8]/60 uppercase tracking-widest">Personal Mentorship</span>
                </div>
                <div>
                  <span className="text-3xl font-black text-[#9E2F2F] block">Multi</span>
                  <span className="text-xs text-[#F4F0E8]/60 uppercase tracking-widest">Disciplinary Arts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LESSON EXPLORER / SLIDER SECTION ================= */}
      <section id="lessons" className="py-24 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#9E2F2F] block mb-2">
              // Curriculum Showcase
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase">
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
                className="w-12 h-12 border-2 border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#F4F0E8] transition"
                aria-label="Previous Lesson"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={() => setActiveLessonIndex((prev) => (prev === lessonsData.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 border-2 border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-[#F4F0E8] transition"
                aria-label="Next Lesson"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Interactive Display Card */}
        <div 
          className="border-2 border-[#111111] p-8 lg:p-16 grid lg:grid-cols-12 gap-12 items-center transition-all duration-500 shadow-2xl"
          style={{ backgroundColor: currentLesson.bgColor, color: '#F4F0E8' }}
        >
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-mono font-bold px-3 py-1 bg-[#F4F0E8] text-[#111111] uppercase tracking-widest">
                {currentLesson.subtitle}
              </span>
              <span className="text-xs font-mono text-[#F4F0E8]/60">
                {currentLesson.level}
              </span>
            </div>

            <h3 className="text-5xl sm:text-7xl font-black tracking-tight uppercase">
              {currentLesson.title}
            </h3>

            <p className="text-lg lg:text-xl text-[#F4F0E8]/80 font-normal leading-relaxed">
              {currentLesson.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-[#F4F0E8]/20">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">What You Will Master:</span>
              <div className="grid sm:grid-cols-2 gap-3">
                {currentLesson.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm text-[#F4F0E8]/90 font-mono">
                    <CheckIcon style={{ color: currentLesson.accent }} />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
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
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#F4F0E8] text-[#111111] font-black text-xs uppercase tracking-widest hover:bg-[#9E2F2F] hover:text-[#F4F0E8] transition shadow-lg"
              >
                <span>Enroll in {currentLesson.title}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative w-full">
            <div 
              onClick={() => playMusicalChime([261.63, 329.63, 392.00])}
              className="relative overflow-hidden group w-full border border-[#F4F0E8]/10 bg-black/40 shadow-2xl cursor-pointer active:scale-95 transition-transform duration-300 touch-manipulation"
              title="Tap to preview instrument tone"
            >
              <img 
                src={currentLesson.image} 
                alt={currentLesson.title} 
                loading="lazy"
                className="w-full h-[240px] sm:h-[340px] md:h-[420px] lg:h-[480px] object-cover object-center grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
              <div 
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center font-mono font-black text-lg bg-[#111111] text-[#F4F0E8] shadow-md z-10"
                style={{ borderLeft: `4px solid ${currentLesson.accent}` }}
              >
                {currentLesson.id}
              </div>
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#111111]/90 backdrop-blur-md p-3 border border-[#F4F0E8]/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#F4F0E8] font-bold uppercase truncate">{currentLesson.title} STUDIO</span>
                <span className="text-[#E6B83A] shrink-0 ml-2 font-semibold">1-on-1 Mentorship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Thumbnails Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {lessonsData.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => setActiveLessonIndex(idx)}
              className={`p-4 border text-left transition-all flex flex-col justify-between h-28 ${activeLessonIndex === idx ? 'border-[#111111] bg-[#111111] text-[#F4F0E8] shadow-lg' : 'border-[#111111]/20 bg-transparent text-[#111111] hover:border-[#111111]'}`}
            >
              <span className="text-xs font-mono font-bold opacity-60">{lesson.id}</span>
              <span className="text-base font-black tracking-tight uppercase">{lesson.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ================= DEDICATED PIANO & KEYBOARD SECTION ================= */}
      <section id="piano" className="py-24 lg:py-36 bg-[#14130F] text-[#F4F0E8] px-6 lg:px-12 border-t border-b border-[#F4F0E8]/10 relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E6B83A]/5 rounded-full filter blur-3xl pointer-events-none -z-0"></div>

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-[#F4F0E8]/15 pb-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-[#E6B83A] uppercase">
                <Sparkles size={14} />
                <span>// Dedicated Discipline Spotlight</span>
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase">
                THE PIANO SANCTUARY
              </h2>
            </div>
            <p className="text-sm sm:text-base font-mono text-[#F4F0E8]/70 max-w-lg leading-relaxed">
              From foundational finger independence to concert-grade classical interpretation and contemporary chord voicing under personal guidance of <strong className="text-[#E6B83A]">Kuldeep Gaur</strong>.
            </p>
          </div>

          {/* Responsive Editorial Visual Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Main Featured Grand Piano Image (7 cols on desktop, responsive full width on mobile) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div 
                onClick={() => playMusicalChime([261.63, 329.63, 392.00, 523.25])}
                className="relative group overflow-hidden border border-[#F4F0E8]/20 shadow-2xl bg-black/50 cursor-pointer active:scale-95 transition-transform duration-300 touch-manipulation"
                title="Tap to hear piano harmony"
              >
                <img 
                  src="https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=1400&q=85" 
                  alt="Concert Grand Piano at GIPA Studio" 
                  loading="lazy"
                  className="w-full h-[260px] sm:h-[380px] md:h-[460px] lg:h-[500px] object-cover object-center grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none"></div>
                
                {/* Responsive Badges */}
                <div className="absolute top-4 left-4 bg-[#111111]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#F4F0E8]/20 font-mono text-[11px] uppercase tracking-widest text-[#E6B83A] font-bold">
                  88-Key Acoustic & Digital Rig
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
                      Acoustic Grand Dynamics
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F4F0E8]">
                      Concert Grand Technique
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#F4F0E8]/60 bg-black/60 px-3 py-1 border border-[#F4F0E8]/10 shrink-0 self-start sm:self-auto">
                    ABRSM London Aligned
                  </span>
                </div>
              </div>
            </div>

            {/* Side Dual Responsive Images & Studio Highlights (5 cols on desktop, responsive stack on mobile) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              
              {/* Image 2: Hands on Keys */}
              <div 
                onClick={() => playMusicalChime([329.63, 392.00, 493.88])}
                className="relative group overflow-hidden border border-[#F4F0E8]/20 shadow-xl bg-black/50 cursor-pointer active:scale-95 transition-transform duration-300 touch-manipulation"
                title="Tap to hear piano articulation"
              >
                <img 
                  src="https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=1000&q=85" 
                  alt="Pianist Hands & Touch Mechanics" 
                  loading="lazy"
                  className="w-full h-[180px] sm:h-[220px] object-cover object-center grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#F4F0E8] uppercase tracking-wider">Touch & Articulation</span>
                  <span className="text-[#E6B83A] text-[10px] uppercase tracking-widest font-bold">01 // Posture</span>
                </div>
              </div>

              {/* Image 3: Score & Upright Keys */}
              <div 
                onClick={() => playMusicalChime([349.23, 440.00, 523.25])}
                className="relative group overflow-hidden border border-[#F4F0E8]/20 shadow-xl bg-black/50 cursor-pointer active:scale-95 transition-transform duration-300 touch-manipulation"
                title="Tap to hear harmony"
              >
                <img 
                  src="https://images.unsplash.com/photo-1571974599782-87624638275e?auto=format&fit=crop&w=1000&q=85" 
                  alt="Classical Sheet Music & Grand Staff" 
                  loading="lazy"
                  className="w-full h-[180px] sm:h-[220px] object-cover object-center grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#F4F0E8] uppercase tracking-wider">Notation & Harmony</span>
                  <span className="text-[#E6B83A] text-[10px] uppercase tracking-widest font-bold">02 // Sight-Reading</span>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Virtual Piano Keyboard Preview */}
          <div className="border border-[#F4F0E8]/20 p-6 sm:p-8 bg-[#181612] space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F4F0E8]/10 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block font-bold">
                  // Interactive Keyboard Experience
                </span>
                <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                  Tap To Hear The Tones
                </h4>
              </div>
              <div className="text-xs font-mono text-[#F4F0E8]/60 flex items-center space-x-2">
                <Volume2 size={16} className="text-[#E6B83A] animate-pulse" />
                <span>Web Audio Synthesized • Touch & Click Ready</span>
              </div>
            </div>

            {/* Responsive Keyboard Keys */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
              {pianoNotes.map((item) => {
                const isActive = activePianoNote === item.note;
                return (
                  <button
                    key={item.note}
                    onClick={() => handlePlayPianoNote(item)}
                    className={`py-6 sm:py-8 px-2 flex flex-col items-center justify-between border transition-all text-center group cursor-pointer touch-manipulation select-none ${
                      isActive 
                        ? 'bg-[#E6B83A] text-[#111111] border-[#E6B83A] scale-95 shadow-lg' 
                        : 'bg-[#F4F0E8] text-[#111111] border-[#F4F0E8] hover:bg-[#E6B83A] hover:border-[#E6B83A] active:bg-[#E6B83A] active:scale-90 shadow-md'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold opacity-60">{item.sub}</span>
                    <span className="font-black font-sans text-xl sm:text-2xl my-2">{item.key}</span>
                    <span className="font-mono text-[10px] font-bold tracking-wider">{item.note}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 Core Pillars of Piano Training */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "TOUCH & DYNAMICS",
                desc: "Master forearm weight release, curved fingers, legato singing tone, and nuanced pedal usage."
              },
              {
                num: "02",
                title: "CHORD REHARMONY",
                desc: "Explore classical voice leading, 7th & 9th chords, modal interchange, and contemporary song accompaniment."
              },
              {
                num: "03",
                title: "NOTATION & SCALES",
                desc: "Read treble and bass clefs fluently. Conquer major/minor scales, arpeggios, and rhythmic subdivisions."
              },
              {
                num: "04",
                title: "ABRSM & REPERTOIRE",
                desc: "Prepare for international graded exams or learn your favorite classical masterpieces and modern cinematic themes."
              }
            ].map((pillar) => (
              <div key={pillar.num} className="border border-[#F4F0E8]/15 p-6 space-y-4 bg-[#181612] hover:border-[#E6B83A] transition">
                <span className="text-xs font-mono font-bold text-[#E6B83A] block">// {pillar.num}</span>
                <h4 className="text-lg font-black uppercase tracking-wider">{pillar.title}</h4>
                <p className="text-xs sm:text-sm font-mono text-[#F4F0E8]/70 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 border-2 border-[#E6B83A] bg-[#1A1813]">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Ready To Master The Keys?
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#F4F0E8]/70">
                Personal 1-on-1 piano masterclasses with Kuldeep Gaur at GIPA Lakhimpur Kheri.
              </p>
            </div>
            <a
              href="#contact"
              onClick={() => setFormData(prev => ({ ...prev, interest: 'Piano' }))}
              className="bg-[#E6B83A] text-[#111111] px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-[#F4F0E8] transition-all flex items-center space-x-2 shrink-0 shadow-xl"
            >
              <span>Enroll In Piano Mentorship</span>
              <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </section>

      {/* ================= KULDEEP GAUR PROFILE SECTION ================= */}
      <section id="about" className="py-24 lg:py-36 bg-[#111111] text-[#F4F0E8] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#9E2F2F]/20 to-[#E6B83A]/25 filter blur-2xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80" 
              alt="Kuldeep Gaur" 
              className="w-full h-[360px] sm:h-[480px] lg:h-[650px] object-cover grayscale-0 md:grayscale hover:grayscale-0 active:scale-[0.98] transition-all duration-500 shadow-2xl border border-[#F4F0E8]/20 cursor-pointer"
            />
            <div className="absolute bottom-6 right-6 bg-[#9E2F2F] text-[#F4F0E8] p-4 font-mono text-xs uppercase tracking-widest shadow-xl">
              Founder & Director • GIPA
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
              // Meet The Mentor
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
              KULDEEP GAUR
            </h2>
            <div className="flex flex-wrap gap-3 font-mono text-xs">
              <span className="px-3 py-1 bg-[#F4F0E8]/10 text-[#F4F0E8] border border-[#F4F0E8]/20">Music Teacher</span>
              <span className="px-3 py-1 bg-[#F4F0E8]/10 text-[#F4F0E8] border border-[#F4F0E8]/20">Instrumentalist</span>
              <span className="px-3 py-1 bg-[#F4F0E8]/10 text-[#F4F0E8] border border-[#F4F0E8]/20">Mentor</span>
            </div>

            <p className="text-lg lg:text-xl text-[#F4F0E8]/80 leading-relaxed font-normal">
              Kuldeep Gaur is the sole master teacher and visionary behind the Gaur Institute of Performing Art (GIPA) in Lakhimpur Kheri. Dedicated to elevating musical standards, Kuldeep provides uncompromising, personalized mentorship across guitar, piano, vocals, traditional instruments, and dance.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#F4F0E8]/20">
              <div className="flex items-start space-x-3">
                <span className="text-[#E6B83A] font-bold font-mono">01</span>
                <div>
                  <h4 className="font-bold uppercase text-sm tracking-wider">Uncompromising Technique</h4>
                  <p className="text-xs text-[#F4F0E8]/60 mt-1 font-mono">Focusing on correct posture, finger placement, breath control, and foundational theory from day one.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#9E2F2F] font-bold font-mono">02</span>
                <div>
                  <h4 className="font-bold uppercase text-sm tracking-wider">Direct 1-on-1 Mentorship</h4>
                  <p className="text-xs text-[#F4F0E8]/60 mt-1 font-mono">Every student receives undivided attention directly from Kuldeep Gaur without intermediaries or assistant trainers.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-[#E87532] font-bold font-mono">03</span>
                <div>
                  <h4 className="font-bold uppercase text-sm tracking-wider">Global & National Curricula</h4>
                  <p className="text-xs text-[#F4F0E8]/60 mt-1 font-mono">Training aligned with international standards (ABRSM London) and prestigious national institutions (Prayag Sangeet Samiti).</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-6">
              <a href="#contact" className="bg-[#E6B83A] text-[#111111] px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-[#F4F0E8] transition">
                Book a Session with Kuldeep
              </a>
              <span className="text-xs font-mono text-[#F4F0E8]/60">Call: +91 7985257106</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= TEACHING PHILOSOPHY MANIFESTO ================= */}
      <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-5xl mx-auto text-center space-y-12">
        <span className="text-xs font-mono uppercase tracking-widest text-[#9E2F2F] block">
          // Teaching Philosophy
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight uppercase">
          "GOOD MUSIC ISN'T JUST HEARD. IT'S UNDERSTOOD."
        </h2>
        <p className="text-lg lg:text-xl text-[#111111]/80 max-w-2xl mx-auto font-normal leading-relaxed">
          When you understand the grammar of music—harmony, rhythm, scale structure, and emotion—you stop merely copying notes and start creating your own artistic voice.
        </p>
      </section>

      {/* ================= LEARNING JOURNEY TIMELINE ================= */}
      <section id="journey" className="py-24 lg:py-36 bg-[#111111] text-[#F4F0E8] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block mb-2">
                // Step-by-Step Pathway
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
                HOW THE LESSONS WORK
              </h2>
            </div>
            <span className="text-xs font-mono text-[#F4F0E8]/60 max-w-xs">
              Designed for absolute beginners, intermediate musicians, and performers preparing for certifications.
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningJourneySteps.map((item, idx) => (
              <div key={idx} className="border border-[#F4F0E8]/20 p-8 space-y-6 hover:border-[#E6B83A] transition group bg-[#161616]">
                <span className="text-4xl font-black font-mono text-[#E6B83A] block group-hover:scale-110 transition-transform origin-left">
                  {item.step}
                </span>
                <h3 className="text-2xl font-black uppercase tracking-wider">{item.title}</h3>
                <p className="text-sm text-[#F4F0E8]/70 font-mono leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MUSIC KNOWLEDGE SECTION ================= */}
      <section id="knowledge" className="py-24 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="space-y-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#9E2F2F] block mb-2">
                // Educational Pillars
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
                UNDERSTAND THE MUSIC
              </h2>
            </div>
            <p className="text-sm font-mono text-[#111111]/70 max-w-md">
              Every masterclass at GIPA is backed by comprehensive theory, ear training, rhythm precision, and expressive dynamics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "RHYTHM & GROOVE", desc: "Why does a song feel the way it does? Master subdivisions, syncopation, and internal timekeeping." },
              { title: "HARMONY & CHORDS", desc: "Unlock chord inversions, voice leading, extensions, and the emotional resonance behind chord progressions." },
              { title: "MELODY & IMPROV", desc: "Express your inner voice through scales, phrasing, articulation, and fearless musical improvisation." }
            ].map((pillar, idx) => (
              <div key={idx} className="border-2 border-[#111111] p-8 space-y-6 bg-[#F4F0E8] hover:bg-[#111111] hover:text-[#F4F0E8] transition-all group">
                <span className="text-xs font-mono uppercase tracking-widest text-[#9E2F2F] block">Pillar 0{idx + 1}</span>
                <h3 className="text-3xl font-black uppercase">{pillar.title}</h3>
                <p className="text-sm opacity-80 font-mono leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="py-24 lg:py-36 bg-[#181818] text-[#F4F0E8] px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
              // Common Inquiries
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-4 pt-8">
            {faqsData.map((faq, idx) => (
              <div key={idx} className="border border-[#F4F0E8]/20 bg-[#111111]">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center font-bold text-lg hover:text-[#E6B83A] transition"
                >
                  <span>{faq.q}</span>
                  <span className="font-mono text-xl">{openFaqIndex === idx ? '−' : '+'}</span>
                </button>
                {openFaqIndex === idx && (
                  <div className="p-6 pt-0 text-sm font-mono text-[#F4F0E8]/70 border-t border-[#F4F0E8]/10 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-24 lg:py-40 bg-[#9E2F2F] text-[#F4F0E8] px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block">
            // Begin Your Journey
          </span>
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight uppercase leading-none">
            READY TO PLAY?
          </h2>
          <p className="text-xl lg:text-2xl text-[#F4F0E8]/90 max-w-xl mx-auto font-normal">
            Your first note starts here. Connect directly with Kuldeep Gaur at Gaur Institute of Performing Art.
          </p>
          <div className="pt-6">
            <a 
              href="#contact"
              className="inline-flex items-center space-x-3 bg-[#111111] text-[#F4F0E8] px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-[#F4F0E8] hover:text-[#111111] transition shadow-2xl"
            >
              <span>Contact Kuldeep Now</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ================= CONTACT & ENQUIRY SECTION ================= */}
      <section id="contact" className="py-24 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5 space-y-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#9E2F2F] block">
              // Get In Touch
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
              START YOUR ENQUIRY
            </h2>
            <p className="text-lg text-[#111111]/80 leading-relaxed font-normal">
              Whether you want to master the acoustic guitar, study classical piano, train your vocals, or enroll in dance, reach out directly.
            </p>

            <div className="space-y-6 pt-6 border-t border-[#111111]/10 font-mono text-sm">
              <div className="flex items-start space-x-4">
                <MapPin className="text-[#9E2F2F] shrink-0 mt-1" size={20} />
                <div>
                  <strong className="block font-bold uppercase">Academy Address:</strong>
                  <span className="text-[#111111]/70">Punjabi Colony, Nehar Road, Rajgarh, Lakhimpur Kheri - 262701</span>
                  <span className="block text-xs text-[#111111]/50 mt-1">(Near Guru Nanak Inter College / Guru Nanak Degree College)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="text-[#9E2F2F] shrink-0" size={20} />
                <div>
                  <strong className="block font-bold uppercase">Direct Phone:</strong>
                  <a href="tel:+917985257106" className="text-[#111111]/80 hover:text-[#9E2F2F] font-bold">+91 7985257106</a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Music className="text-[#9E2F2F] shrink-0" size={20} />
                <div>
                  <strong className="block font-bold uppercase">Director & Trainer:</strong>
                  <span className="text-[#111111]/70">Kuldeep Gaur</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#111111] text-[#F4F0E8] p-8 lg:p-12 shadow-2xl">
            {formSubmitted ? (
              <div className="py-20 text-center space-y-6">
                <span className="text-5xl block">🎵</span>
                <h3 className="text-3xl font-black uppercase">Enquiry Received</h3>
                <p className="text-sm font-mono text-[#F4F0E8]/70 max-w-md mx-auto">
                  Thank you for reaching out to GIPA. Kuldeep Gaur will review your message and contact you shortly at {formData.phone || formData.email}.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-3 bg-[#9E2F2F] text-[#F4F0E8] text-xs font-black uppercase tracking-widest hover:bg-[#F4F0E8] hover:text-[#111111] transition"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-wider pb-4 border-b border-[#F4F0E8]/20">
                  Lesson & Admission Form
                </h3>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleFormChange}
                      placeholder="e.g. Aryan Sharma" 
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-4 text-[#F4F0E8] font-mono text-sm focus:border-[#E6B83A] outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone} 
                      onChange={handleFormChange}
                      placeholder="e.g. +91 98765 43210" 
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-4 text-[#F4F0E8] font-mono text-sm focus:border-[#E6B83A] outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Instrument / Interest *</label>
                    <select 
                      name="interest" 
                      value={formData.interest} 
                      onChange={handleFormChange}
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-4 text-[#F4F0E8] font-mono text-sm focus:border-[#E6B83A] outline-none"
                    >
                      <option value="Guitar">Guitar</option>
                      <option value="Piano">Piano</option>
                      <option value="Vocals">Vocals (Classical/Western)</option>
                      <option value="Drums & Rhythm">Drums & Rhythm / Tabla</option>
                      <option value="Violin & Harmonium">Violin & Harmonium</option>
                      <option value="Dance">Dance (Kathak / Folk / Bhangra)</option>
                      <option value="Music Theory">Music Theory</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Experience Level</label>
                    <select 
                      name="level" 
                      value={formData.level} 
                      onChange={handleFormChange}
                      className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-4 text-[#F4F0E8] font-mono text-sm focus:border-[#E6B83A] outline-none"
                    >
                      <option value="Beginner">Complete Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced / Performance</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/60 block">Message or Goals</label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    value={formData.message} 
                    onChange={handleFormChange}
                    placeholder="Tell Kuldeep about your musical background and what you'd love to achieve..." 
                    className="w-full bg-[#1A1A1A] border border-[#F4F0E8]/20 p-4 text-[#F4F0E8] font-mono text-sm focus:border-[#E6B83A] outline-none resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-5 bg-[#E6B83A] text-[#111111] font-black uppercase tracking-widest hover:bg-[#F4F0E8] transition shadow-xl text-sm"
                >
                  Send Enquiry to Kuldeep Gaur
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#111111] text-[#F4F0E8] pt-24 pb-12 px-6 lg:px-12 border-t border-[#F4F0E8]/10">
        <div className="max-w-7xl mx-auto space-y-20">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-[#F4F0E8]/20 pb-16">
            <div className="space-y-4">
              <span className="text-3xl lg:text-5xl font-black tracking-tighter uppercase font-mono block">
                KULDEEP GAUR
              </span>
              <p className="text-sm font-mono text-[#F4F0E8]/60 uppercase tracking-widest">
                Gaur Institute of Performing Art (GIPA) • Lakhimpur Kheri
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-xs font-mono uppercase tracking-wider">
              <a href="#lessons" className="hover:text-[#E6B83A] transition">Lessons</a>
              <a href="#piano" className="hover:text-[#E6B83A] transition">Piano</a>
              <a href="#about" className="hover:text-[#E6B83A] transition">About</a>
              <a href="#journey" className="hover:text-[#E6B83A] transition">Journey</a>
              <a href="#knowledge" className="hover:text-[#E6B83A] transition">Theory</a>
              <a href="#faq" className="hover:text-[#E6B83A] transition">FAQ</a>
              <a href="#contact" className="hover:text-[#E6B83A] transition">Contact</a>
            </div>
          </div>

          <div className="text-center py-12 space-y-4">
            <button
              type="button"
              onClick={handleKeepPlayingClick}
              aria-label="Keep Playing - Tap to play musical chord and return to top"
              className="text-5xl sm:text-7xl lg:text-[130px] font-black tracking-tight uppercase leading-none font-sans text-[#F4F0E8]/35 sm:text-[#F4F0E8]/20 hover:text-[#F4F0E8] active:text-[#E6B83A] active:scale-[0.97] transition-all duration-300 select-none cursor-pointer w-full text-center focus:outline-none touch-manipulation"
            >
              KEEP PLAYING.
            </button>
            <p className="text-xs font-mono text-[#E6B83A]/70 uppercase tracking-widest flex items-center justify-center space-x-2">
              <Sparkles size={12} className="text-[#E6B83A]" />
              <span>Tap to Play Harmony & Return to Top</span>
              <Sparkles size={12} className="text-[#E6B83A]" />
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-[#F4F0E8]/50 pt-8 border-t border-[#F4F0E8]/10 space-y-4 sm:space-y-0">
            <span>© 2026 Kuldeep Gaur (GIPA). All rights reserved.</span>
            <span>Designed for uncompromising musical excellence.</span>
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
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] cursor-pointer"
      >
        <WhatsAppIcon size={30} />
      </a>

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
