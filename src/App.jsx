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
    // Premium, dramatic, high-end editorial grand piano photograph
    image: "https://images.unsplash.com/photo-1520523839896-5742257ca122?auto=format&fit=crop&w=1400&q=85",
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
  { q: "How are lesson times and schedules booked?", a: "You can book trial slots or regular weekly schedules directly by calling Kuldeep Gaur at 7985257106." }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.log("Enquiry logged locally", err);
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
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">02. About Kuldeep</a>
            <a href="#journey" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">03. Learning Journey</a>
            <a href="#knowledge" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">04. Music Knowledge</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition">05. FAQ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9E2F2F] transition text-[#E87532]">06. Contact</a>
          </div>

          <div className="border-t border-[#F4F0E8]/20 pt-6 flex flex-col space-y-2 text-xs font-mono text-[#F4F0E8]/60">
            <span>Gaur Institute of Performing Art (GIPA)</span>
            <span>Lakhimpur Kheri • 7985257106</span>
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
            <div className="relative group w-full max-w-md lg:max-w-none">
              <img 
                src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80" 
                alt="Acoustic Electric Guitar" 
                className="w-full h-[450px] lg:h-[580px] object-cover shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-[1.02]"
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
                className="inline-flex items-center space-x-3 px-8 py-4 bg-[#F4F0E8] text-[#111111] font-black text-xs uppercase tracking-widest hover:bg-[#9E2F2F] hover:text-[#F4F0E8] transition shadow-lg"
              >
                <span>Enroll in {currentLesson.title}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden group">
              <img 
                src={currentLesson.image} 
                alt={currentLesson.title} 
                className="w-full h-[400px] lg:h-[480px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
              />
              <div 
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center font-mono font-black text-lg bg-[#111111] text-[#F4F0E8]"
                style={{ borderLeft: `4px solid ${currentLesson.accent}` }}
              >
                {currentLesson.id}
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

      {/* ================= KULDEEP GAUR PROFILE SECTION ================= */}
      <section id="about" className="py-24 lg:py-36 bg-[#111111] text-[#F4F0E8] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#9E2F2F]/20 to-[#E6B83A]/25 filter blur-2xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80" 
              alt="Kuldeep Gaur" 
              className="w-full h-[550px] lg:h-[650px] object-cover grayscale shadow-2xl border border-[#F4F0E8]/20"
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
              <span className="text-xs font-mono text-[#F4F0E8]/60">Call: 7985257106</span>
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
                  <a href="tel:7985257106" className="text-[#111111]/80 hover:text-[#9E2F2F] font-bold">7985257106</a>
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
              <a href="#about" className="hover:text-[#E6B83A] transition">About</a>
              <a href="#journey" className="hover:text-[#E6B83A] transition">Journey</a>
              <a href="#knowledge" className="hover:text-[#E6B83A] transition">Theory</a>
              <a href="#faq" className="hover:text-[#E6B83A] transition">FAQ</a>
              <a href="#contact" className="hover:text-[#E6B83A] transition">Contact</a>
            </div>
          </div>

          <div className="text-center py-12 space-y-6">
            <h2 className="text-5xl sm:text-7xl lg:text-[130px] font-black tracking-tight uppercase leading-none font-sans text-[#F4F0E8]/10 hover:text-[#F4F0E8] transition-colors duration-500">
              KEEP PLAYING.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-[#F4F0E8]/50 pt-8 border-t border-[#F4F0E8]/10 space-y-4 sm:space-y-0">
            <span>© 2026 Kuldeep Gaur (GIPA). All rights reserved.</span>
            <span>Designed for uncompromising musical excellence.</span>
          </div>

        </div>
      </footer>

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
