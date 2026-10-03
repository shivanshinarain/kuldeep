import React, { useState, useEffect } from 'react';
import {
  Music,
  Play,
  Calendar,
  User,
  Search,
  BookOpen,
  Award,
  Sliders,
  CheckCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Flame,
  ShieldCheck,
  Video,
  X,
  Menu,
  Trash2,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

import Metronome from './components/Metronome';
import ChordVisualizer from './components/ChordVisualizer';
import PracticeTimer from './components/PracticeTimer';
import BookingModal from './components/BookingModal';
import VirtualRoomModal from './components/VirtualRoomModal';

export default function GipaApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [instrumentFilter, setInstrumentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedTeacherId, setPreselectedTeacherId] = useState(1);
  const [isVirtualRoomOpen, setIsVirtualRoomOpen] = useState(false);
  const [currentVirtualLesson, setCurrentVirtualLesson] = useState(null);

  // Student practice stats
  const [streakDays, setStreakDays] = useState(5);
  const [practiceMinutesThisWeek, setPracticeMinutesThisWeek] = useState(270);
  const [toastNotification, setToastNotification] = useState(null);
  const [apiOnline, setApiOnline] = useState(false);

  // Fallback initial teachers data
  const initialTeachers = [
    {
      id: 1,
      name: "Maestro Vikram Gaur",
      instrument: "Piano",
      genre: "Classical / Indian Fusion",
      rate: "$50/hr",
      rawRate: 50,
      rating: 4.9,
      reviewsCount: 142,
      experience: "18+ Years",
      bio: "Internationally acclaimed concert pianist and composer. Specializes in advanced harmony, Bach polyphony, and contemporary Indian classical fusion.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
      tags: ["Concert Pianist", "Raga Fusion", "Sight Reading"]
    },
    {
      id: 2,
      name: "Elena Rostova",
      instrument: "Guitar",
      genre: "Jazz / Blues & Neo-Soul",
      rate: "$45/hr",
      rawRate: 45,
      rating: 4.8,
      reviewsCount: 98,
      experience: "12+ Years",
      bio: "Berklee College of Music alumna. Passionate about fretboard mastery, bebop improvisation, modal interchange, and soulful fingerpicking.",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80",
      tags: ["Bebop & Modal", "Acoustic Blues", "Tone Crafting"]
    },
    {
      id: 3,
      name: "Marcus Vance",
      instrument: "Guitar & Piano",
      genre: "Rock / Acoustic Fingerstyle",
      rate: "$60/hr",
      rawRate: 60,
      rating: 5.0,
      reviewsCount: 185,
      experience: "15+ Years",
      bio: "Touring multi-instrumentalist and studio session musician. Teaches modern percussive fingerstyle acoustic guitar and rock keyboard composition.",
      image: "https://images.unsplash.com/photo-1525994886628-b2c5082cbde7?auto=format&fit=crop&w=600&q=80",
      tags: ["Percussive Guitar", "Multi-Instrumentalist", "Stage Performance"]
    },
    {
      id: 4,
      name: "Sophia Chen",
      instrument: "Piano",
      genre: "Classical & Cinematic Score",
      rate: "$55/hr",
      rawRate: 55,
      rating: 4.9,
      reviewsCount: 110,
      experience: "10+ Years",
      bio: "Film composer and classical concertist. Guides students through film scoring, expressive touch dynamics, and mastering Chopin, Debussy & Liszt.",
      image: "https://images.unsplash.com/photo-1520523839898-50712825e317?auto=format&fit=crop&w=600&q=80",
      tags: ["Film Scoring", "Impressionism", "Touch Technique"]
    },
    {
      id: 5,
      name: "Julian Rivera",
      instrument: "Guitar",
      genre: "Flamenco & Classical Spanish Guitar",
      rate: "$52/hr",
      rawRate: 52,
      rating: 4.9,
      reviewsCount: 89,
      experience: "14+ Years",
      bio: "Royal Conservatory trained flamenco virtuoso. Master of rasgueado, picado scales, compás rhythms, and traditional Spanish guitar repertoire.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
      tags: ["Flamenco", "Spanish Classical", "Nylon Fingerpicking"]
    }
  ];

  const [teachers, setTeachers] = useState(initialTeachers);
  const [bookings, setBookings] = useState([
    {
      id: "BKG-101",
      studentName: "Alex Rivera",
      studentEmail: "alex.rivera@example.com",
      teacherId: 2,
      teacherName: "Elena Rostova",
      instrument: "Guitar",
      date: "2026-10-04",
      timeSlot: "04:00 PM",
      lessonTopic: "Jazz Guitar Improvisation & Modal Soloing",
      status: "Confirmed"
    }
  ]);

  // Trigger Toast Notification helper
  const showToast = (message) => {
    setToastNotification(message);
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  // Fetch teachers from backend API
  const fetchTeachers = async () => {
    try {
      const res = await fetch('/api/teachers');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTeachers(data);
          setApiOnline(true);
        }
      }
    } catch (err) {
      console.log("Backend offline or proxying, using local teachers cache");
    }
  };

  // Fetch bookings from backend API
  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setBookings(data);
          setApiOnline(true);
        }
      }
    } catch (err) {
      console.log("Backend offline or proxying, using local bookings");
    }
  };

  // Check health and load initial data
  useEffect(() => {
    fetchTeachers();
    fetchBookings();

    fetch('/api/health')
      .then(res => res.json())
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
  }, []);

  // Filter teachers by instrument & search text
  const filteredTeachers = teachers.filter(t => {
    const matchesInstrument =
      instrumentFilter === 'all' ||
      t.instrument.toLowerCase().includes(instrumentFilter.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.instrument.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesInstrument && matchesSearch;
  });

  // Open booking modal for specific teacher
  const handleOpenBooking = (teacherId = null) => {
    if (teacherId) {
      setPreselectedTeacherId(teacherId);
    } else if (teachers.length > 0) {
      setPreselectedTeacherId(teachers[0].id);
    }
    setIsBookingOpen(true);
  };

  // Callback when booking successfully completed
  const handleBookingSuccess = (newBooking) => {
    fetchBookings();
    setBookings(prev => [newBooking, ...prev.filter(b => b.id !== newBooking.id)]);
    showToast(`Masterclass confirmed for ${newBooking.date} with ${newBooking.teacherName}!`);
  };

  // Cancel booking handler
  const handleCancelBooking = async (bookingId) => {
    try {
      await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
    } catch (err) {
      console.log("Delete call failed, updating local state");
    }
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    showToast(`Booking ${bookingId} cancelled.`);
  };

  // Log practice time
  const handleLogPracticeSession = (minutes) => {
    setPracticeMinutesThisWeek(prev => prev + minutes);
    showToast(`Logged ${minutes} mins to your practice streak! 🔥`);
  };

  // Launch Virtual Studio Room
  const handleJoinVirtualRoom = (lesson) => {
    setCurrentVirtualLesson(lesson);
    setIsVirtualRoomOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/40 text-slate-100 px-5 py-3 rounded-2xl shadow-2xl shadow-amber-500/10 flex items-center space-x-3 animate-in slide-in-from-bottom-5">
          <Sparkles className="text-amber-400" size={18} />
          <span className="text-sm font-semibold">{toastNotification}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="bg-gradient-to-tr from-amber-500 to-indigo-600 p-2.5 rounded-xl text-slate-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition">
              <Music size={26} strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-400 bg-clip-text text-transparent">
                  GIPA
                </span>
                <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-slate-700 bg-slate-800 text-slate-300">
                  <span className={`w-1.5 h-1.5 rounded-full ${apiOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                  <span>{apiOnline ? 'Live Studio' : 'Active'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Gaur Institute of Performing Art</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2 text-sm font-semibold">
            {[
              { id: 'home', label: 'Home' },
              { id: 'teachers', label: 'Find Mentors' },
              { id: 'practice', label: 'Practice Hub' },
              { id: 'dashboard', label: 'Student Portal' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl transition ${
                    isActive
                      ? 'bg-slate-800 text-amber-400 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleOpenBooking()}
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Book Trial Lesson
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-4 space-y-2 animate-in slide-in-from-top-4">
            {[
              { id: 'home', label: 'Home' },
              { id: 'teachers', label: 'Find Mentors' },
              { id: 'practice', label: 'Practice Hub' },
              { id: 'dashboard', label: 'Student Portal' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* ==================== HOME TAB ==================== */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
              {/* Background ambient glow */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-2xl space-y-6 relative z-10 text-left">
                <span className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-500/20 uppercase tracking-widest">
                  <Sparkles size={14} />
                  <span>Master Guitar & Piano with Virtuosos</span>
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                  Unleash Your Inner{' '}
                  <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-400 bg-clip-text text-transparent">
                    Virtuoso
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                  World-class 1-on-1 online instruction from elite concert pianists and session guitarists.
                  Tailored curricula, live 12ms audio feedback, and synchronized practice tools.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('teachers')}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition flex items-center space-x-2 shadow-lg shadow-amber-500/20 active:scale-95"
                  >
                    <Search size={18} />
                    <span>Explore Faculty</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('practice')}
                    className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold px-6 py-3.5 rounded-xl transition border border-slate-700/80 hover:border-slate-600 flex items-center space-x-2"
                  >
                    <Sliders size={18} className="text-indigo-400" />
                    <span>Interactive Practice Hub</span>
                  </button>
                </div>
              </div>

              {/* Stats Highlights Grid */}
              <div className="w-full lg:w-auto grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-slate-900/90 backdrop-blur border border-slate-800 p-6 rounded-2xl text-center shadow-xl hover:border-amber-500/40 transition">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Music className="text-amber-400" size={26} />
                  </div>
                  <h3 className="font-black text-3xl text-slate-100">500+</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">Concert Masterclasses</p>
                </div>

                <div className="bg-slate-900/90 backdrop-blur border border-slate-800 p-6 rounded-2xl text-center shadow-xl hover:border-indigo-500/40 transition">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Award className="text-indigo-400" size={26} />
                  </div>
                  <h3 className="font-black text-3xl text-slate-100">98%</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">Student Retention</p>
                </div>

                <div className="bg-slate-900/90 backdrop-blur border border-slate-800 p-6 rounded-2xl text-center shadow-xl hover:border-amber-500/40 transition">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="text-amber-400" size={26} />
                  </div>
                  <h3 className="font-black text-3xl text-slate-100">15+</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">Berklee & Royal Mentors</p>
                </div>

                <div className="bg-slate-900/90 backdrop-blur border border-slate-800 p-6 rounded-2xl text-center shadow-xl hover:border-indigo-500/40 transition">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="text-indigo-400" size={26} />
                  </div>
                  <h3 className="font-black text-3xl text-slate-100">4.9★</h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">Virtuoso Rating</p>
                </div>
              </div>
            </div>

            {/* Featured Instruments Section */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Curated Disciplines</span>
                <h2 className="text-3xl font-black text-slate-100 mt-1">Primary Performance Tracks</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Guitar Track Card */}
                <div className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 p-8 flex flex-col justify-between h-96 hover:border-amber-500/50 transition duration-300 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none"></div>
                  <img
                    src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80"
                    alt="Guitar Performance"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 group-hover:opacity-35 transition duration-500"
                  />

                  <div className="relative z-10 space-y-3">
                    <span className="bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase px-3 py-1 rounded-full inline-block">
                      Strings & Fretboard
                    </span>
                    <h3 className="text-3xl font-extrabold text-white">Acoustic & Electric Guitar</h3>
                    <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                      From intricate fingerstyle blues to jazz chord melodies, modal improvisation, high-gain soloing, and flamenco rasgueado.
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-xs text-slate-400 font-medium">3 Master Mentors available</span>
                    <button
                      onClick={() => {
                        setInstrumentFilter('guitar');
                        setActiveTab('teachers');
                      }}
                      className="flex items-center space-x-2 text-amber-400 font-bold text-sm group-hover:translate-x-1 transition bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950"
                    >
                      <span>Find Guitar Mentors</span>
                      <Play size={15} fill="currentColor" />
                    </button>
                  </div>
                </div>

                {/* Piano Track Card */}
                <div className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 p-8 flex flex-col justify-between h-96 hover:border-indigo-500/50 transition duration-300 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none"></div>
                  <img
                    src="https://images.unsplash.com/photo-1520523839898-50712825e317?auto=format&fit=crop&w=800&q=80"
                    alt="Piano Virtuosity"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 group-hover:opacity-35 transition duration-500"
                  />

                  <div className="relative z-10 space-y-3">
                    <span className="bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold text-xs uppercase px-3 py-1 rounded-full inline-block">
                      Keys & Harmony
                    </span>
                    <h3 className="text-3xl font-extrabold text-white">Classical & Modern Piano</h3>
                    <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                      Master Bach polyphony, Beethoven sonatas, cinematic film scoring, chord inversions, and contemporary Indian raga fusions.
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-xs text-slate-400 font-medium">3 Master Mentors available</span>
                    <button
                      onClick={() => {
                        setInstrumentFilter('piano');
                        setActiveTab('teachers');
                      }}
                      className="flex items-center space-x-2 text-indigo-400 font-bold text-sm group-hover:translate-x-1 transition bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/30 hover:bg-indigo-600 hover:text-white"
                    >
                      <span>Find Piano Mentors</span>
                      <Play size={15} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose GIPA */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 lg:p-12 space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  The GIPA Difference
                </span>
                <h2 className="text-3xl font-black text-slate-100">
                  Engineered for Serious Musical Growth
                </h2>
                <p className="text-slate-400 text-sm">
                  Traditional music pedagogy combined with state-of-the-art interactive audio tools.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="font-bold text-lg text-slate-100">12ms Low-Latency Audio</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Custom WebRTC audio pipeline tuned for true harmonic overtones, pitch accuracy, and lag-free duets.
                  </p>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                    <Sliders size={20} />
                  </div>
                  <h4 className="font-bold text-lg text-slate-100">Synchronized Practice Hub</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Integrated digital metronome, multi-instrument chord visualizer, and practice timers synced to your student profile.
                  </p>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    <CheckCircle size={20} />
                  </div>
                  <h4 className="font-bold text-lg text-slate-100">Curated Virtuoso Faculty</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Every mentor is auditioned, possessing conservatory degrees, international performance credits, or multi-album discographies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TEACHERS TAB ==================== */}
        {activeTab === 'teachers' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Conservatory & Concert Faculty
                </span>
                <h2 className="text-3xl font-black tracking-tight text-slate-100 mt-1">
                  Meet Our Master Faculty
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Book 1-on-1 masterclasses customized to your pace, repertoire, and performance goals.
                </p>
              </div>

              {/* Search & Instrument Tabs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search mentor or style..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-56 bg-slate-900 border border-slate-800 focus:border-amber-400 rounded-xl py-2 pl-10 pr-3 text-xs text-slate-100 placeholder-slate-500 outline-none transition"
                  />
                </div>

                {/* Instrument Filter Buttons */}
                <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800">
                  {['all', 'guitar', 'piano'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setInstrumentFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition ${
                        instrumentFilter === filter
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Teachers Grid */}
            {filteredTeachers.length === 0 ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
                <Music className="mx-auto text-slate-600" size={40} />
                <h3 className="text-lg font-bold text-slate-300">No instructors matched your criteria</h3>
                <p className="text-slate-500 text-xs">Try clearing your search query or selecting "All" instruments.</p>
                <button
                  onClick={() => { setInstrumentFilter('all'); setSearchQuery(''); }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeachers.map(teacher => (
                  <div
                    key={teacher.id}
                    className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-slate-700 transition duration-200 group"
                  >
                    <div>
                      {/* Teacher Image & Overlay Badges */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                        <div className="absolute top-3 left-3">
                          <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-md border border-amber-500/30">
                            {teacher.instrument}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-amber-400 border border-slate-800 flex items-center space-x-1">
                          <span>★ {teacher.rating}</span>
                          <span className="text-slate-500 text-[10px]">({teacher.reviewsCount || 100})</span>
                        </div>
                      </div>

                      {/* Teacher Details */}
                      <div className="p-6 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition">
                            {teacher.name}
                          </h3>
                          <p className="text-xs text-indigo-400 font-semibold mt-0.5">
                            {teacher.genre}
                          </p>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                          {teacher.bio}
                        </p>

                        {/* Tags */}
                        {teacher.tags && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {teacher.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-mono bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer with Rate & CTA */}
                    <div className="p-6 pt-0 flex justify-between items-center border-t border-slate-800/80 mt-4">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Tuition</span>
                        <span className="text-lg font-black text-amber-400">
                          {teacher.rate}
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenBooking(teacher.id)}
                        className="bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-md flex items-center space-x-1.5"
                      >
                        <Calendar size={14} />
                        <span>Book Session</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== PRACTICE HUB TAB ==================== */}
        {activeTab === 'practice' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Virtuoso Training Ground
              </span>
              <h2 className="text-3xl font-black tracking-tight text-slate-100 mt-1">
                Interactive Practice Hub
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Master tempo synchronization, explore interactive fretboard and keyboard chords, and log practice sessions.
              </p>
            </div>

            {/* Practice Hub Grid: Metronome & Chord Visualizer */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Metronome />
              <ChordVisualizer />
            </div>

            {/* Practice Session Timer */}
            <PracticeTimer onLogSession={handleLogPracticeSession} />
          </div>
        )}

        {/* ==================== STUDENT PORTAL TAB ==================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Student Learning Center
              </span>
              <h2 className="text-3xl font-black tracking-tight text-slate-100 mt-1">
                Student Portal & Schedule
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Manage upcoming masterclasses, join live video rooms, and review instructor homework.
              </p>
            </div>

            {/* Top Stats Overview Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Next Lesson Card */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-indigo-400 uppercase tracking-widest font-bold">
                      Upcoming Masterclass
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Confirmed
                    </span>
                  </div>
                  <h4 className="font-bold text-lg text-slate-100">
                    {bookings[0]?.lessonTopic || "Jazz Guitar Improvisation"}
                  </h4>
                  <p className="text-xs text-slate-400">
                    With {bookings[0]?.teacherName || "Elena Rostova"} • {bookings[0]?.date || "Tomorrow"}, {bookings[0]?.timeSlot || "4:00 PM"}
                  </p>
                </div>

                <button
                  onClick={() => handleJoinVirtualRoom(bookings[0] || {
                    topic: "Jazz Guitar Improvisation",
                    teacherName: "Elena Rostova",
                    teacherImage: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80"
                  })}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-bold text-xs transition shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2"
                >
                  <Video size={16} />
                  <span>Join Live Studio Room</span>
                </button>
              </div>

              {/* Practice Streak Card */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs text-amber-400 uppercase tracking-widest font-bold flex items-center space-x-1.5">
                    <Flame size={14} className="text-amber-400" />
                    <span>Practice Streak</span>
                  </span>
                  <h4 className="font-black text-2xl text-slate-100">
                    🔥 {streakDays} Days Active
                  </h4>
                  <p className="text-xs text-slate-400">
                    Weekly practice logged: <strong className="text-slate-200">{Math.floor(practiceMinutesThisWeek / 60)} hrs {practiceMinutesThisWeek % 60} mins</strong>
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>Goal: 5 hrs/week</span>
                    <span>{Math.min(100, Math.round((practiceMinutesThisWeek / 300) * 100))}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (practiceMinutesThisWeek / 300) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Active Assignment Card */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs text-emerald-400 uppercase tracking-widest font-bold">
                    Assignment & Repertoire
                  </span>
                  <h4 className="font-bold text-lg text-slate-100">Chopin Nocturne Op. 9 No. 2</h4>
                  <p className="text-xs text-slate-400">
                    Status: <span className="text-emerald-400 font-semibold">Reviewed by Maestro Vikram Gaur</span>
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    "Great rubato control in bar 12. Focus on the left hand arpeggiation dynamics."
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('practice')}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl font-semibold text-xs transition border border-slate-700 flex items-center justify-center space-x-1.5"
                >
                  <Sliders size={14} />
                  <span>Open Practice Hub</span>
                </button>
              </div>
            </div>

            {/* My Booked Masterclasses Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">My Booked Masterclasses</h3>
                  <p className="text-xs text-slate-400">Synchronized live with the GIPA Express backend</p>
                </div>

                <button
                  onClick={() => handleOpenBooking()}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl font-bold text-xs transition"
                >
                  + Book Another Lesson
                </button>
              </div>

              {bookings.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No upcoming masterclasses booked yet. Book your first trial session above!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="py-3 px-4">Booking ID</th>
                        <th className="py-3 px-4">Instructor</th>
                        <th className="py-3 px-4">Instrument</th>
                        <th className="py-3 px-4">Date & Slot</th>
                        <th className="py-3 px-4">Focus Topic</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {bookings.map(b => (
                        <tr key={b.id} className="hover:bg-slate-800/30 transition">
                          <td className="py-3.5 px-4 font-mono text-amber-400">{b.id}</td>
                          <td className="py-3.5 px-4 text-slate-200 font-bold">{b.teacherName}</td>
                          <td className="py-3.5 px-4">
                            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px]">
                              {b.instrument || "General Music"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {b.date} • {b.timeSlot}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">
                            {b.lessonTopic || "Virtuoso Technique"}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleJoinVirtualRoom({
                                topic: b.lessonTopic || `${b.instrument} Masterclass`,
                                teacherName: b.teacherName,
                                teacherImage: teachers.find(t => t.id === b.teacherId)?.image
                              })}
                              className="bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                            >
                              Join
                            </button>
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition"
                              title="Cancel Booking"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 mt-16 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400">
              <Music size={18} />
            </div>
            <div>
              <p className="font-bold text-slate-300">Gaur Institute of Performing Art (GIPA)</p>
              <p className="text-[11px] text-slate-500">Concert-Grade Music Mentorship for Guitar & Piano</p>
            </div>
          </div>

          <div className="flex space-x-6 text-slate-400">
            <button onClick={() => setActiveTab('teachers')} className="hover:text-amber-400 transition">Faculty</button>
            <button onClick={() => setActiveTab('practice')} className="hover:text-amber-400 transition">Practice Tools</button>
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-amber-400 transition">Student Portal</button>
          </div>

          <p className="text-slate-600">
            © {new Date().getFullYear()} GIPA. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        teachers={teachers}
        preselectedTeacherId={preselectedTeacherId}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Virtual Live Classroom Studio Modal */}
      <VirtualRoomModal
        isOpen={isVirtualRoomOpen}
        onClose={() => setIsVirtualRoomOpen(false)}
        lesson={currentVirtualLesson}
      />
    </div>
  );
}
