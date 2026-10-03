import React, { useState, useEffect } from 'react';
import {
  Music,
  Mic,
  Flame,
  Award,
  MapPin,
  Phone,
  User,
  Calendar,
  ChevronRight,
  Play,
  Sparkles,
  Sliders,
  CheckCircle,
  Video,
  X,
  Menu,
  GraduationCap,
  Volume2,
  Trash2,
  BookOpen
} from 'lucide-react';

import Metronome from './components/Metronome';
import ChordVisualizer from './components/ChordVisualizer';
import PracticeTimer from './components/PracticeTimer';
import BookingModal from './components/BookingModal';
import VirtualRoomModal from './components/VirtualRoomModal';

export default function KuldeepGaurGIPA() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeNavTab, setActiveNavTab] = useState('home'); // 'home' | 'courses' | 'about' | 'practice' | 'certifications' | 'portal' | 'location'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState('Guitar');
  const [isVirtualRoomOpen, setIsVirtualRoomOpen] = useState(false);
  const [currentVirtualLesson, setCurrentVirtualLesson] = useState(null);

  // Practice & streak stats
  const [streakDays, setStreakDays] = useState(6);
  const [practiceMinutesThisWeek, setPracticeMinutesThisWeek] = useState(320);
  const [toastNotification, setToastNotification] = useState(null);
  const [apiOnline, setApiOnline] = useState(false);

  const offerings = [
    // Instruments
    { category: 'instruments', title: 'Guitar', desc: 'Acoustic, Electric, and Bass professional training by Kuldeep Gaur.', badge: 'Instrument', fee: '₹1,500/mo' },
    { category: 'instruments', title: 'Piano', desc: 'Classical & contemporary keyboard mastery.', badge: 'Instrument', fee: '₹1,800/mo' },
    { category: 'instruments', title: 'Drums', desc: 'Rhythm, coordination, and kit performance.', badge: 'Instrument', fee: '₹1,500/mo' },
    { category: 'instruments', title: 'Violin', desc: 'Classical and modern string articulation.', badge: 'Instrument', fee: '₹1,600/mo' },
    { category: 'instruments', title: 'Tabla', desc: 'Traditional Indian rhythm and bols.', badge: 'Instrument', fee: '₹1,400/mo' },
    { category: 'instruments', title: 'Harmonium', desc: 'Devotional and classical accompaniments.', badge: 'Instrument', fee: '₹1,200/mo' },

    // Singing
    { category: 'singing', title: 'Classical Vocal', desc: 'Shuddh swars, taans, and raag exploration.', badge: 'Vocal', fee: '₹1,500/mo' },
    { category: 'singing', title: 'Western Singing', desc: 'Pitch control, breath support, and pop styling.', badge: 'Vocal', fee: '₹1,600/mo' },
    { category: 'singing', title: 'Vocal Music', desc: 'General voice modulation and stage performance.', badge: 'Vocal', fee: '₹1,200/mo' },

    // Dance
    { category: 'dance', title: 'Classical Kathak', desc: 'Graceful footwork, expressions, and storytelling.', badge: 'Dance', fee: '₹1,500/mo' },
    { category: 'dance', title: 'Western & Indian Style', desc: 'Hip-hop, contemporary, and Bollywood choreography.', badge: 'Dance', fee: '₹1,200/mo' },
    { category: 'dance', title: 'Bhangra & Folk', desc: 'High-energy traditional Punjabi and folk numbers.', badge: 'Dance', fee: '₹1,200/mo' },
    { category: 'dance', title: 'Belly Dance', desc: 'Isolation techniques and rhythm control.', badge: 'Dance', fee: '₹1,500/mo' }
  ];

  const [bookings, setBookings] = useState([
    {
      id: "GIPA-7801",
      studentName: "Aman Verma",
      studentEmail: "aman.v@example.com",
      studentPhone: "7985257106",
      teacherName: "Kuldeep Gaur",
      instrument: "Guitar",
      date: "2026-10-04",
      timeSlot: "04:30 PM",
      lessonTopic: "Direct Training with Kuldeep Gaur",
      status: "Confirmed"
    }
  ]);

  const showToast = (message) => {
    setToastNotification(message);
    setTimeout(() => setToastNotification(null), 4000);
  };

  const loadData = async () => {
    try {
      const [bRes, hRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/health')
      ]);

      if (bRes.ok) {
        const bData = await bRes.json();
        if (Array.isArray(bData)) setBookings(bData);
      }
      if (hRes.ok) setApiOnline(true);
    } catch (err) {
      console.log("Using cached GIPA data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredOfferings = activeCategory === 'all'
    ? offerings
    : offerings.filter(o => o.category === activeCategory);

  const handleOpenBooking = (courseTitle = 'Guitar') => {
    setPreselectedCourse(courseTitle);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newBooking) => {
    setBookings(prev => [newBooking, ...prev.filter(b => b.id !== newBooking.id)]);
    showToast(`Session reserved with Kuldeep Gaur for ${newBooking.date}!`);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
    } catch (err) {
      console.log("Deleted locally");
    }
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    showToast(`Booking ${bookingId} cancelled.`);
  };

  const handleLogPracticeSession = (minutes) => {
    setPracticeMinutesThisWeek(prev => prev + minutes);
    showToast(`Logged ${minutes} mins to your practice streak! 🔥`);
  };

  const handleJoinVirtualRoom = (lesson) => {
    setCurrentVirtualLesson(lesson);
    setIsVirtualRoomOpen(true);
  };

  const scrollToSection = (id) => {
    setActiveNavTab('home');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-[#FF007F] selection:text-white flex flex-col antialiased">
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1f28] border border-[#FF007F] text-white px-5 py-3 rounded-2xl shadow-[0_0_25px_rgba(255,0,127,0.3)] flex items-center space-x-3 animate-in slide-in-from-bottom-5">
          <Sparkles className="text-[#FFF00F]" size={18} />
          <span className="text-sm font-semibold">{toastNotification}</span>
        </div>
      )}

      {/* Top Banner / Announcement Bar */}
      <div className="bg-gradient-to-r from-[#FF007F] via-[#D8125B] to-[#FFF00F] text-slate-950 font-black text-xs md:text-sm py-2 px-4 text-center uppercase tracking-widest shadow-lg flex items-center justify-center space-x-2">
        <span>⚡ Direct Professional Training Under Kuldeep Gaur • Call Now: </span>
        <a href="tel:7985257106" className="underline font-black hover:text-white transition">7985257106</a>
        <span>⚡</span>
      </div>

      {/* Navigation Header */}
      <header className="border-b border-white/10 sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
          {/* Brand & Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveNavTab('home')}
          >
            <div className="bg-[#FFF00F] text-[#121212] p-2.5 rounded-xl font-black text-xl shadow-[0_0_15px_rgba(255,240,15,0.5)] group-hover:scale-105 transition">
              G
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl md:text-2xl font-black tracking-wider bg-gradient-to-r from-[#FFF00F] via-[#FF007F] to-[#D8125B] bg-clip-text text-transparent uppercase">
                  GIPA
                </span>
                <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-white/20 bg-white/5 text-gray-300">
                  <span className={`w-1.5 h-1.5 rounded-full ${apiOnline ? 'bg-emerald-400 animate-pulse' : 'bg-[#FFF00F]'}`}></span>
                  <span>{apiOnline ? 'Lakhimpur Studio' : 'Active'}</span>
                </span>
              </div>
              <p className="text-[10px] text-gray-400 tracking-wider">Gaur Institute of Performing Art</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-gray-300">
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className="hover:text-[#FFF00F] transition"
            >
              About
            </a>
            <a
              href="#courses"
              onClick={(e) => { e.preventDefault(); scrollToSection('courses'); }}
              className="hover:text-[#FF007F] transition"
            >
              Courses
            </a>
            <a
              href="#certifications"
              onClick={(e) => { e.preventDefault(); scrollToSection('certifications'); }}
              className="hover:text-[#FFF00F] transition"
            >
              Certifications
            </a>
            <button
              onClick={() => setActiveNavTab('practice')}
              className={`hover:text-[#FF007F] transition flex items-center space-x-1 ${activeNavTab === 'practice' ? 'text-[#FF007F]' : ''}`}
            >
              <Sliders size={14} />
              <span>Practice Hub</span>
            </button>
            <button
              onClick={() => setActiveNavTab('portal')}
              className={`hover:text-[#FFF00F] transition ${activeNavTab === 'portal' ? 'text-[#FFF00F]' : ''}`}
            >
              Student Portal
            </button>
            <a
              href="#location"
              onClick={(e) => { e.preventDefault(); scrollToSection('location'); }}
              className="hover:text-[#FF007F] transition"
            >
              Location
            </a>
          </nav>

          {/* Phone & CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a
              href="tel:7985257106"
              className="bg-[#FF007F] hover:bg-[#D8125B] text-white px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-[0_0_20px_rgba(255,0,127,0.4)] flex items-center space-x-2"
            >
              <Phone size={16} /> <span>7985257106</span>
            </a>

            <button
              onClick={() => handleOpenBooking('Guitar')}
              className="hidden sm:inline-flex bg-[#FFF00F] hover:bg-yellow-400 text-[#121212] px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(255,240,15,0.4)]"
            >
              Book Trial
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 text-gray-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#161822] px-4 py-4 space-y-2 animate-in slide-in-from-top-4 text-sm font-bold uppercase tracking-wider">
            <a
              href="#about"
              onClick={() => { setIsMobileMenuOpen(false); scrollToSection('about'); }}
              className="block px-4 py-2.5 rounded-xl text-gray-300 hover:bg-white/5"
            >
              About
            </a>
            <a
              href="#courses"
              onClick={() => { setIsMobileMenuOpen(false); scrollToSection('courses'); }}
              className="block px-4 py-2.5 rounded-xl text-gray-300 hover:bg-white/5"
            >
              Courses
            </a>
            <a
              href="#certifications"
              onClick={() => { setIsMobileMenuOpen(false); scrollToSection('certifications'); }}
              className="block px-4 py-2.5 rounded-xl text-gray-300 hover:bg-white/5"
            >
              Certifications
            </a>
            <button
              onClick={() => { setActiveNavTab('practice'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition ${
                activeNavTab === 'practice' ? 'bg-[#FF007F]/20 text-[#FFF00F]' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              Practice Hub
            </button>
            <button
              onClick={() => { setActiveNavTab('portal'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition ${
                activeNavTab === 'portal' ? 'bg-[#FF007F]/20 text-[#FFF00F]' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              Student Portal
            </button>
            <a
              href="#location"
              onClick={() => { setIsMobileMenuOpen(false); scrollToSection('location'); }}
              className="block px-4 py-2.5 rounded-xl text-gray-300 hover:bg-white/5"
            >
              Location
            </a>
          </div>
        )}
      </header>

      {/* Main App Content */}
      <main className="flex-1">
        {activeNavTab === 'practice' && (
          <div className="max-w-7xl mx-auto px-4 py-12 space-y-10 animate-in fade-in duration-300">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[#FF007F] font-bold text-xs uppercase tracking-widest">Training Tools</span>
                <h2 className="text-3xl font-black uppercase text-white mt-1">Interactive Practice Hub</h2>
              </div>
              <button
                onClick={() => setActiveNavTab('home')}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
              >
                Back to Home
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Metronome />
              <ChordVisualizer />
            </div>

            <PracticeTimer onLogSession={handleLogPracticeSession} />
          </div>
        )}

        {activeNavTab === 'portal' && (
          <div className="max-w-7xl mx-auto px-4 py-12 space-y-10 animate-in fade-in duration-300">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[#FFF00F] font-bold text-xs uppercase tracking-widest">Student Portal</span>
                <h2 className="text-3xl font-black uppercase text-white mt-1">My 1-on-1 Sessions With Kuldeep Gaur</h2>
              </div>
              <button
                onClick={() => setActiveNavTab('home')}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
              >
                Back to Home
              </button>
            </div>

            {/* Student Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#1a1c23] border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#FFF00F] uppercase tracking-widest font-bold">Upcoming Session</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">Confirmed</span>
                  </div>
                  <h4 className="font-extrabold text-lg text-white">
                    {bookings[0]?.lessonTopic || "Direct 1-on-1 Training"}
                  </h4>
                  <p className="text-xs text-gray-400">
                    With Kuldeep Gaur • {bookings[0]?.date || "Tomorrow"}, {bookings[0]?.timeSlot || "4:30 PM"}
                  </p>
                </div>
                <button
                  onClick={() => handleJoinVirtualRoom(bookings[0] || {
                    topic: "Direct Training with Kuldeep Gaur",
                    teacherName: "Kuldeep Gaur"
                  })}
                  className="w-full bg-[#FF007F] hover:bg-[#D8125B] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(255,0,127,0.3)] flex items-center justify-center space-x-2"
                >
                  <Video size={15} />
                  <span>Join Live Classroom</span>
                </button>
              </div>

              <div className="bg-[#1a1c23] border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs text-[#FF007F] uppercase tracking-widest font-bold flex items-center space-x-1.5">
                    <Flame size={14} className="text-[#FF007F]" />
                    <span>Practice Streak</span>
                  </span>
                  <h4 className="font-black text-2xl text-white">
                    🔥 {streakDays} Days Active
                  </h4>
                  <p className="text-xs text-gray-400">
                    Weekly practice logged: <strong className="text-white">{Math.floor(practiceMinutesThisWeek / 60)} hrs {practiceMinutesThisWeek % 60} mins</strong>
                  </p>
                </div>
                <div className="w-full bg-[#121212] h-2.5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="bg-gradient-to-r from-[#FF007F] to-[#FFF00F] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (practiceMinutesThisWeek / 360) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#1a1c23] border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs text-[#FFF00F] uppercase tracking-widest font-bold">Curriculum Target</span>
                  <h4 className="font-extrabold text-lg text-white">ABRSM & Prayag Graded Pieces</h4>
                  <p className="text-xs text-gray-400">
                    Guidance: <span className="text-emerald-400 font-semibold">Trained directly by Kuldeep Gaur</span>
                  </p>
                  <p className="text-[11px] text-gray-500 italic">
                    "Maintain precise tempo using the metronome on beats 1 and 3."
                  </p>
                </div>
                <button
                  onClick={() => setActiveNavTab('practice')}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1.5"
                >
                  <Sliders size={14} />
                  <span>Open Practice Hub</span>
                </button>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-[#1a1c23] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-white">Scheduled Sessions & Inquiries</h3>
                <button
                  onClick={() => handleOpenBooking('Guitar')}
                  className="bg-[#FFF00F] hover:bg-yellow-400 text-[#121212] font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(255,240,15,0.3)]"
                >
                  + Book Another Session
                </button>
              </div>

              {bookings.length === 0 ? (
                <p className="text-gray-500 text-xs py-4">No sessions scheduled yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider">
                        <th className="py-3 px-3">Ref ID</th>
                        <th className="py-3 px-3">Student</th>
                        <th className="py-3 px-3">Program</th>
                        <th className="py-3 px-3">Trainer</th>
                        <th className="py-3 px-3">Date & Slot</th>
                        <th className="py-3 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-medium">
                      {bookings.map(b => (
                        <tr key={b.id} className="hover:bg-white/5 transition">
                          <td className="py-3 px-3 font-mono text-[#FFF00F]">{b.id}</td>
                          <td className="py-3 px-3 text-white font-bold">{b.studentName}</td>
                          <td className="py-3 px-3 text-[#FF007F] font-semibold">{b.instrument}</td>
                          <td className="py-3 px-3 text-gray-300">Kuldeep Gaur</td>
                          <td className="py-3 px-3 text-gray-300">{b.date} • {b.timeSlot}</td>
                          <td className="py-3 px-3 text-right space-x-2">
                            <button
                              onClick={() => handleJoinVirtualRoom({
                                topic: b.lessonTopic || b.instrument,
                                teacherName: "Kuldeep Gaur"
                              })}
                              className="bg-[#FF007F]/20 hover:bg-[#FF007F] text-[#FF007F] hover:text-white px-2.5 py-1 rounded-lg text-xs font-bold transition"
                            >
                              Join
                            </button>
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="text-gray-500 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 transition"
                              title="Cancel Session"
                            >
                              <Trash2 size={14} />
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

        {/* Regular Home & Landing View */}
        {activeNavTab === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 md:py-32 px-4 border-b border-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,127,0.15),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(255,240,15,0.1),transparent_50%)] pointer-events-none"></div>

              <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-[#FFF00F]/30 px-4 py-1.5 rounded-full text-[#FFF00F] text-xs font-bold tracking-widest uppercase">
                  <Flame size={14} className="text-[#FF007F]" />
                  <span>Lakhimpur's Premier Music & Dance Academy</span>
                </div>

                <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-none uppercase">
                  Master Music With <span className="bg-gradient-to-r from-[#FFF00F] via-[#FF007F] to-[#D8125B] bg-clip-text text-transparent">Kuldeep Gaur</span>
                </h2>

                <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto font-normal">
                  Comprehensive, hands-on training from beginner to advanced levels across instruments, vocals, and dance.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <a
                    href="#courses"
                    className="bg-[#FFF00F] hover:bg-yellow-400 text-[#121212] font-black px-8 py-4 rounded-xl transition shadow-[0_0_25px_rgba(255,240,15,0.3)] uppercase tracking-wider text-sm flex items-center justify-center space-x-2"
                  >
                    <span>Explore Programs</span> <ChevronRight size={18} />
                  </a>

                  <button
                    onClick={() => handleOpenBooking('Guitar')}
                    className="bg-[#FF007F] hover:bg-[#D8125B] text-white font-black px-8 py-4 rounded-xl transition shadow-[0_0_25px_rgba(255,0,127,0.4)] uppercase tracking-wider text-sm flex items-center justify-center space-x-2"
                  >
                    <Calendar size={18} />
                    <span>Book 1-on-1 Trial Slot</span>
                  </button>

                  <a
                    href="#location"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition uppercase tracking-wider text-sm flex items-center justify-center space-x-2"
                  >
                    <MapPin size={18} className="text-[#FF007F]" /> <span>Visit Academy</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Solo Instructor Spotlight Section */}
            <section id="about" className="py-16 bg-black/40 border-b border-white/10 px-4">
              <div className="max-w-4xl mx-auto bg-[#1a1c23] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF007F]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="space-y-6 relative z-10">
                  <div className="inline-flex items-center space-x-2 bg-[#FFF00F]/10 text-[#FFF00F] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-[#FFF00F]/20">
                    <User size={14} /> <span>Lead Instructor & Founder</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase">Kuldeep Gaur</h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    As the sole master trainer and director at GIPA, Kuldeep Gaur brings years of dedication to performing arts, offering personalized attention to every student in Lakhimpur Kheri. Whether you are picking up a guitar for the first time or training for advanced certifications, every lesson is led directly by him.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#FFF00F]"></span>
                      <span>Specialized 1-on-1 Mentorship</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF007F]"></span>
                      <span>ABRSM & Prayag Sangeet Aligned</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Courses & Offerings Grid */}
            <section id="courses" className="py-20 px-4 max-w-7xl mx-auto space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-[#FF007F] font-bold text-xs uppercase tracking-widest">Comprehensive Curriculum</span>
                  <h2 className="text-3xl md:text-5xl font-black uppercase mt-1">Courses & Offerings</h2>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 bg-black/50 p-1.5 rounded-xl border border-white/10">
                  {['all', 'instruments', 'singing', 'dance'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                        activeCategory === cat
                          ? 'bg-[#FF007F] text-white shadow-[0_0_15px_rgba(255,0,127,0.4)]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredOfferings.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1a1c23] border border-white/10 hover:border-[#FFF00F] p-6 rounded-2xl transition group flex flex-col justify-between shadow-lg hover:-translate-y-1"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-[#FFF00F]/10 text-[#FFF00F] px-2.5 py-1 rounded-md border border-[#FFF00F]/20">
                          {item.badge}
                        </span>
                        <span className="text-[11px] font-mono text-gray-400">
                          {item.fee}
                        </span>
                      </div>
                      <h3 className="text-2xl font-extrabold group-hover:text-[#FFF00F] transition">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-[#FF007F]">
                        <span>Trained by Kuldeep Gaur</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
                      </div>

                      <button
                        onClick={() => handleOpenBooking(item.title)}
                        className="w-full bg-white/5 hover:bg-[#FF007F] hover:text-white text-gray-300 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 border border-white/10"
                      >
                        <Calendar size={13} />
                        <span>Book 1-on-1 Session</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Practice Hub Banner on Home */}
            <section className="py-12 bg-black/40 border-t border-b border-white/10 px-4">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-[#1a1c23] p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 text-[#FFF00F] text-xs font-bold uppercase tracking-wider">
                    <Sliders size={16} /> <span>Interactive Music Lab</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase text-white">
                    Built-in Digital Metronome & Chord Library
                  </h3>
                  <p className="text-gray-400 text-sm max-w-xl">
                    Use our precision Web Audio metronome and interactive guitar/piano chord visualizers designed to accelerate your practice routines.
                  </p>
                </div>
                <button
                  onClick={() => setActiveNavTab('practice')}
                  className="bg-[#FFF00F] hover:bg-yellow-400 text-[#121212] font-black px-6 py-3.5 rounded-xl uppercase tracking-wider text-xs transition shadow-[0_0_20px_rgba(255,240,15,0.3)] flex-shrink-0"
                >
                  Launch Practice Hub
                </button>
              </div>
            </section>

            {/* Affiliations & Certifications */}
            <section id="certifications" className="py-16 bg-[#181a20] border-t border-b border-white/10 px-4">
              <div className="max-w-5xl mx-auto text-center space-y-8">
                <span className="text-[#FFF00F] font-bold text-xs uppercase tracking-widest">Certified Excellence</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase">Affiliations & Qualifications</h2>
                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  <div className="bg-[#121212] border border-white/10 p-8 rounded-2xl space-y-3 shadow-xl text-left">
                    <Award className="text-[#FFF00F]" size={40} />
                    <h3 className="text-xl font-bold">ABRSM (London)</h3>
                    <p className="text-gray-400 text-sm">International graded music examinations providing global recognition for piano, guitar, and theory under Kuldeep Gaur's training.</p>
                  </div>
                  <div className="bg-[#121212] border border-white/10 p-8 rounded-2xl space-y-3 shadow-xl text-left">
                    <Award className="text-[#FF007F]" size={40} />
                    <h3 className="text-xl font-bold">Prayag Sangeet Samiti, Prayagraj</h3>
                    <p className="text-gray-400 text-sm">National-level classical music and dance certifications from foundation to diploma levels.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Location & Footer */}
      <footer id="location" className="bg-[#0e0f14] border-t border-white/10 pt-16 pb-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#FFF00F] text-[#121212] p-2 rounded-xl font-black text-lg">G</div>
              <h3 className="text-2xl font-black tracking-wider uppercase">GIPA Lakhimpur</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering aspiring artists through rigorous training, expert solo mentorship, and official certifications under the direct instruction of Kuldeep Gaur.
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="text-[#FF007F] shrink-0 mt-1" size={18} />
                <span>
                  Punjabi Colony, Nehar Road, Rajgarh, Lakhimpur Kheri - 262701<br />
                  <span className="text-xs text-gray-500">
                    (Near Guru Nanak Inter College / Guru Nanak Degree College)
                  </span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-[#FFF00F] shrink-0" size={18} />
                <a href="tel:7985257106" className="font-bold hover:underline">7985257106</a>
              </div>
            </div>
          </div>

          <div className="bg-[#14161d] border border-white/10 p-8 rounded-2xl flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-xl font-black uppercase text-white">Enrollment & Inquiries</h4>
              <p className="text-gray-400 text-sm mt-2">Ready to begin your musical or dance journey? Contact Director Kuldeep Gaur directly or drop by the institute.</p>
            </div>
            <div className="space-y-3">
              <a
                href="tel:7985257106"
                className="w-full bg-[#FF007F] hover:bg-[#D8125B] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center space-x-2 shadow-lg"
              >
                <Phone size={18} /> <span>Call 7985257106 Now</span>
              </a>
              <button
                onClick={() => handleOpenBooking('Guitar')}
                className="w-full bg-[#FFF00F] hover:bg-yellow-400 text-[#121212] font-black py-3.5 rounded-xl transition flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,240,15,0.3)] uppercase tracking-wider text-xs"
              >
                <Calendar size={16} /> <span>Book 1-on-1 Session</span>
              </button>
              <div className="text-center text-xs text-gray-500 pt-2">
                © {new Date().getFullYear()} Gaur Institute of Performing Art (GIPA). All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedCourse={preselectedCourse}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Virtual Live Studio Modal */}
      <VirtualRoomModal
        isOpen={isVirtualRoomOpen}
        onClose={() => setIsVirtualRoomOpen(false)}
        lesson={currentVirtualLesson}
      />
    </div>
  );
}
