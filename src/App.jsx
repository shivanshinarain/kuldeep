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
  const [activeNavTab, setActiveNavTab] = useState('home'); // 'home' | 'courses' | 'mentors' | 'practice' | 'certifications' | 'portal' | 'location'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedTeacherId, setPreselectedTeacherId] = useState(1);
  const [preselectedCourse, setPreselectedCourse] = useState('Guitar');
  const [isVirtualRoomOpen, setIsVirtualRoomOpen] = useState(false);
  const [currentVirtualLesson, setCurrentVirtualLesson] = useState(null);

  // Practice & streak stats
  const [streakDays, setStreakDays] = useState(6);
  const [practiceMinutesThisWeek, setPracticeMinutesThisWeek] = useState(315);
  const [toastNotification, setToastNotification] = useState(null);
  const [apiOnline, setApiOnline] = useState(false);

  // Offerings data
  const offerings = [
    // Instruments
    { id: 'guitar', category: 'instruments', title: 'Guitar', desc: 'Acoustic, Electric, and Bass professional training from fingerstyle to lead solos.', badge: 'Instrument', fee: '₹1,500/mo' },
    { id: 'piano', category: 'instruments', title: 'Piano & Keyboard', desc: 'Classical & contemporary keyboard mastery, chord theory, and ABRSM grades.', badge: 'Instrument', fee: '₹1,800/mo' },
    { id: 'drums', category: 'instruments', title: 'Drums', desc: 'Rhythm, coordination, stick velocity, and full kit stage performance.', badge: 'Instrument', fee: '₹1,500/mo' },
    { id: 'violin', category: 'instruments', title: 'Violin', desc: 'Classical Western and Indian string articulation, intonation, and bowing.', badge: 'Instrument', fee: '₹1,600/mo' },
    { id: 'tabla', category: 'instruments', title: 'Tabla', desc: 'Traditional Indian rhythm, bols, peshkar, kayada, and raag accompaniment.', badge: 'Instrument', fee: '₹1,400/mo' },
    { id: 'harmonium', category: 'instruments', title: 'Harmonium', desc: 'Devotional bhajans, ghazals, and classical vocal accompaniments.', badge: 'Instrument', fee: '₹1,200/mo' },

    // Singing
    { id: 'classical-vocal', category: 'singing', title: 'Classical Vocal', desc: 'Shuddh swars, taans, alaap, and Prayag Sangeet Samiti raag exploration.', badge: 'Vocal', fee: '₹1,500/mo' },
    { id: 'western-singing', category: 'singing', title: 'Western Singing', desc: 'Pitch control, breath support, vocal registers, and pop/rock styling.', badge: 'Vocal', fee: '₹1,600/mo' },
    { id: 'vocal-music', category: 'singing', title: 'Vocal Music & Stagecraft', desc: 'Voice modulation, microphone technique, and confident stage presentation.', badge: 'Vocal', fee: '₹1,200/mo' },

    // Dance
    { id: 'kathak', category: 'dance', title: 'Classical Kathak', desc: 'Graceful footwork (tatkar), chakkars, bhav, padhant, and Jaipur/Lucknow gharana storytelling.', badge: 'Dance', fee: '₹1,500/mo' },
    { id: 'western-dance', category: 'dance', title: 'Western & Indian Style', desc: 'Hip-hop, contemporary, lyrical, and high-energy Bollywood choreography.', badge: 'Dance', fee: '₹1,200/mo' },
    { id: 'bhangra-folk', category: 'dance', title: 'Bhangra & Folk', desc: 'High-energy traditional Punjabi folk numbers, giddha steps, and festive routines.', badge: 'Dance', fee: '₹1,200/mo' },
    { id: 'belly-dance', category: 'dance', title: 'Belly Dance', desc: 'Core isolation techniques, graceful fluid movement, and rhythm control.', badge: 'Dance', fee: '₹1,500/mo' }
  ];

  // Faculty data
  const initialTeachers = [
    {
      id: 1,
      name: "Director Kuldeep Gaur",
      role: "Founder & Director",
      instrument: "Guitar, Piano & Vocal Harmony",
      genre: "Classical, Contemporary & Indian Fusion",
      rate: "Director Mentorship",
      rating: 5.0,
      reviewsCount: 260,
      experience: "18+ Years",
      bio: "Renowned performing artist and educator leading GIPA Lakhimpur. Certified mentor under ABRSM (London) and Prayag Sangeet Samiti, nurturing virtuoso musicians.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
      tags: ["Director", "ABRSM London", "Guitar Virtuoso", "Keyboard Theory"]
    },
    {
      id: 2,
      name: "Pandit Rameshwar Mishra",
      role: "Senior Vocal Faculty",
      instrument: "Classical Vocal & Harmonium",
      genre: "Hindustani Classical & Raag Sadhana",
      rate: "Regular Batches",
      rating: 4.9,
      reviewsCount: 145,
      experience: "20+ Years",
      bio: "Prayag Sangeet Samiti Sangeet Praveen. Guides disciples through voice culture, rigorous swar sadhana, and classical harmonium accompaniment.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      tags: ["Prayag Praveen", "Classical Vocal", "Harmonium", "Raag Delineation"]
    },
    {
      id: 3,
      name: "Guru Ananya Sharma",
      role: "Head of Dance Department",
      instrument: "Classical Kathak & Folk Dance",
      genre: "Kathak (Lucknow Gharana) & Bollywood",
      rate: "Dance Batches",
      rating: 4.9,
      reviewsCount: 180,
      experience: "12+ Years",
      bio: "Nritya Visharad specializing in abhinaya expressions, intricate tatkar footwork, and energetic folk choreography including traditional Bhangra.",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
      tags: ["Kathak Visharad", "Tatkar & Chakkars", "Bollywood", "Bhangra"]
    },
    {
      id: 4,
      name: "Ustad Zakir Hussain Khan",
      role: "Percussion Master",
      instrument: "Tabla & Traditional Bols",
      genre: "Banaras & Delhi Gharana Tabla",
      rate: "Percussion Batches",
      rating: 4.9,
      reviewsCount: 112,
      experience: "16+ Years",
      bio: "Accomplished rhythmic wizard training students in clarity of bols, kayadas, teentaal, roopak, and stage accompaniment for vocal and instrumental music.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
      tags: ["Tabla Virtuoso", "Teentaal", "Banaras Gharana", "Layakari"]
    },
    {
      id: 5,
      name: "Rohan Kapoor",
      role: "Western Music Instructor",
      instrument: "Guitar & Drums",
      genre: "Rock, Blues & Fingerstyle",
      rate: "Modern Band Batches",
      rating: 4.8,
      reviewsCount: 95,
      experience: "10+ Years",
      bio: "Dynamic performer and rhythm instructor. Specializes in electric lead guitar, modern acoustic fingerstyle, and full drum kit grooving and tempo locks.",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80",
      tags: ["Electric Guitar", "Acoustic Drums", "Fingerstyle", "Band Coaching"]
    },
    {
      id: 6,
      name: "Priya Sen",
      role: "Strings & Western Vocals",
      instrument: "Violin & Western Singing",
      genre: "Classical Strings & Contemporary Pop",
      rate: "Specialized Coaching",
      rating: 4.9,
      reviewsCount: 104,
      experience: "11+ Years",
      bio: "ABRSM Grade 8 certified violinist and vocal coach. Focuses on violin bowing posture, pitch precision, breath management, and contemporary vocal performance.",
      image: "https://images.unsplash.com/photo-1520523839898-50712825e317?auto=format&fit=crop&w=600&q=80",
      tags: ["Violin Articulation", "Western Vocals", "Ear Training", "ABRSM Grade 8"]
    }
  ];

  const [teachers, setTeachers] = useState(initialTeachers);
  const [bookings, setBookings] = useState([
    {
      id: "GIPA-7801",
      studentName: "Aman Verma",
      studentEmail: "aman.v@example.com",
      studentPhone: "9876543210",
      teacherId: 1,
      teacherName: "Director Kuldeep Gaur",
      instrument: "Guitar (Acoustic & Electric)",
      date: "2026-10-04",
      timeSlot: "04:30 PM",
      lessonTopic: "Guitar Admissions & Trial Session",
      status: "Confirmed"
    }
  ]);

  const showToast = (message) => {
    setToastNotification(message);
    setTimeout(() => setToastNotification(null), 4000);
  };

  // Fetch backend data
  const loadData = async () => {
    try {
      const [tRes, bRes, hRes] = await Promise.all([
        fetch('/api/teachers'),
        fetch('/api/bookings'),
        fetch('/api/health')
      ]);

      if (tRes.ok) {
        const tData = await tRes.json();
        if (Array.isArray(tData) && tData.length > 0) setTeachers(tData);
      }
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

  const handleOpenBooking = (teacherId = 1, courseTitle = 'Guitar') => {
    setPreselectedTeacherId(teacherId);
    setPreselectedCourse(courseTitle);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newBooking) => {
    setBookings(prev => [newBooking, ...prev.filter(b => b.id !== newBooking.id)]);
    showToast(`Trial session reserved for ${newBooking.date}! Director Kuldeep Gaur will welcome you.`);
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
        <span>⚡ Admissions Open Under Direct Guidance of Kuldeep Gaur • Call Now: </span>
        <a href="tel:7985257106" className="underline font-black hover:text-white transition">7985257106</a>
        <span>⚡</span>
      </div>

      {/* Navigation Header */}
      <header className="border-b border-white/10 sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
          {/* Logo & Brand */}
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
          <nav className="hidden lg:flex items-center space-x-5 text-xs uppercase tracking-wider font-bold text-gray-300">
            <button
              onClick={() => setActiveNavTab('home')}
              className={`hover:text-[#FFF00F] transition ${activeNavTab === 'home' ? 'text-[#FFF00F]' : ''}`}
            >
              About
            </button>
            <button
              onClick={() => setActiveNavTab('courses')}
              className={`hover:text-[#FF007F] transition ${activeNavTab === 'courses' ? 'text-[#FF007F]' : ''}`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveNavTab('mentors')}
              className={`hover:text-[#FFF00F] transition ${activeNavTab === 'mentors' ? 'text-[#FFF00F]' : ''}`}
            >
              Faculty
            </button>
            <button
              onClick={() => setActiveNavTab('practice')}
              className={`hover:text-[#FF007F] transition flex items-center space-x-1 ${activeNavTab === 'practice' ? 'text-[#FF007F]' : ''}`}
            >
              <Sliders size={13} />
              <span>Practice Hub</span>
            </button>
            <button
              onClick={() => setActiveNavTab('certifications')}
              className={`hover:text-[#FFF00F] transition ${activeNavTab === 'certifications' ? 'text-[#FFF00F]' : ''}`}
            >
              Certifications
            </button>
            <button
              onClick={() => setActiveNavTab('portal')}
              className={`hover:text-[#FF007F] transition ${activeNavTab === 'portal' ? 'text-[#FF007F]' : ''}`}
            >
              Student Portal
            </button>
            <button
              onClick={() => setActiveNavTab('location')}
              className={`hover:text-[#FFF00F] transition ${activeNavTab === 'location' ? 'text-[#FFF00F]' : ''}`}
            >
              Location
            </button>
          </nav>

          {/* Direct Phone & CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a
              href="tel:7985257106"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 sm:px-4 py-2 rounded-xl font-bold text-xs transition flex items-center space-x-1.5"
            >
              <Phone size={14} className="text-[#FFF00F]" />
              <span className="hidden sm:inline">7985257106</span>
            </a>

            <button
              onClick={() => handleOpenBooking(1, 'Guitar')}
              className="bg-[#FF007F] hover:bg-[#D8125B] text-white px-4 sm:px-5 py-2 sm:py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(255,0,127,0.4)] active:scale-95"
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
            {[
              { id: 'home', label: 'About' },
              { id: 'courses', label: 'Courses' },
              { id: 'mentors', label: 'Faculty' },
              { id: 'practice', label: 'Practice Hub' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'portal', label: 'Student Portal' },
              { id: 'location', label: 'Location' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveNavTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl transition ${
                  activeNavTab === tab.id
                    ? 'bg-[#FF007F]/20 text-[#FFF00F] border border-[#FF007F]/30'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main App Content */}
      <main className="flex-1">
        {/* ==================== HERO SECTION (Always visible or on Home) ==================== */}
        {(activeNavTab === 'home' || activeNavTab === 'courses') && (
          <section className="relative overflow-hidden py-16 md:py-28 px-4 border-b border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,0,127,0.18),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(255,240,15,0.12),transparent_50%)] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-[#FFF00F]/30 px-4 py-1.5 rounded-full text-[#FFF00F] text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(255,240,15,0.2)]">
                <Flame size={14} className="text-[#FF007F]" />
                <span>Lakhimpur's Premier Music & Dance Academy</span>
              </div>

              <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-none uppercase">
                Ignite Your{' '}
                <span className="bg-gradient-to-r from-[#FFF00F] via-[#FF007F] to-[#D8125B] bg-clip-text text-transparent">
                  Artistic Soul
                </span>
              </h2>

              <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
                Professional training in Music, Vocals, and Dance from beginner to advanced levels. Led by Director <strong className="text-white">Kuldeep Gaur</strong>.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveNavTab('courses')}
                  className="bg-[#FFF00F] hover:bg-yellow-400 text-[#121212] font-black px-8 py-4 rounded-xl transition shadow-[0_0_25px_rgba(255,240,15,0.3)] uppercase tracking-wider text-sm flex items-center justify-center space-x-2"
                >
                  <span>Explore Programs</span>
                  <ChevronRight size={18} />
                </button>

                <button
                  onClick={() => handleOpenBooking(1, 'Guitar')}
                  className="bg-[#FF007F] hover:bg-[#D8125B] text-white font-black px-8 py-4 rounded-xl transition shadow-[0_0_25px_rgba(255,0,127,0.4)] uppercase tracking-wider text-sm flex items-center justify-center space-x-2"
                >
                  <Calendar size={18} />
                  <span>Book Free Trial Slot</span>
                </button>

                <button
                  onClick={() => setActiveNavTab('location')}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition uppercase tracking-wider text-sm flex items-center justify-center space-x-2"
                >
                  <MapPin size={18} className="text-[#FF007F]" />
                  <span>Visit Academy</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ==================== DIRECTOR & ACADEMY INFO BANNER ==================== */}
        <section className="py-12 bg-black/40 border-b border-white/10 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="bg-[#1a1c23] p-6 rounded-2xl border border-white/10 space-y-2 hover:border-[#FFF00F]/40 transition">
              <div className="text-[#FFF00F] font-bold text-xs uppercase tracking-widest">Leadership</div>
              <h3 className="text-xl font-extrabold text-white">Director Kuldeep Gaur</h3>
              <p className="text-gray-400 text-sm">Dedicated mentor bringing world-class performing arts to Lakhimpur Kheri.</p>
            </div>

            <div className="bg-[#1a1c23] p-6 rounded-2xl border border-white/10 space-y-2 hover:border-[#FF007F]/40 transition">
              <div className="text-[#FF007F] font-bold text-xs uppercase tracking-widest">Global Standards</div>
              <h3 className="text-xl font-extrabold text-white">ABRSM & Prayag Sangeet</h3>
              <p className="text-gray-400 text-sm">Certified international (London) & national curricula for career progression.</p>
            </div>

            <div className="bg-[#1a1c23] p-6 rounded-2xl border border-white/10 space-y-2 hover:border-[#FFF00F]/40 transition">
              <div className="text-[#FFF00F] font-bold text-xs uppercase tracking-widest">Direct Contact</div>
              <h3 className="text-xl font-extrabold text-white">
                <a href="tel:7985257106" className="hover:text-[#FFF00F] transition">+91 79852 57106</a>
              </h3>
              <p className="text-gray-400 text-sm">Call now to book your trial slot or schedule a visit.</p>
            </div>
          </div>
        </section>

        {/* ==================== COURSES & OFFERINGS SECTION ==================== */}
        {(activeNavTab === 'home' || activeNavTab === 'courses') && (
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
                      <span>Beginner to Advanced</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
                    </div>

                    <button
                      onClick={() => handleOpenBooking(1, item.title)}
                      className="w-full bg-white/5 hover:bg-[#FF007F] hover:text-white text-gray-300 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 border border-white/10"
                    >
                      <Calendar size={13} />
                      <span>Book Trial Session</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================== MASTER FACULTY SECTION ==================== */}
        {(activeNavTab === 'home' || activeNavTab === 'mentors') && (
          <section id="mentors" className="py-20 px-4 bg-[#14161d] border-t border-b border-white/10">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[#FFF00F] font-bold text-xs uppercase tracking-widest">
                  Conservatory & Concert Virtuosos
                </span>
                <h2 className="text-3xl md:text-5xl font-black uppercase">
                  Faculty & Department Mentors
                </h2>
                <p className="text-gray-400 text-sm">
                  Personalized 1-on-1 and ensemble mentorship under Director Kuldeep Gaur and distinguished artists.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map(teacher => (
                  <div
                    key={teacher.id}
                    className="bg-[#1a1c23] border border-white/10 hover:border-[#FF007F] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition duration-200 group"
                  >
                    <div>
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c23] via-transparent to-transparent"></div>

                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 bg-[#FFF00F] px-2.5 py-1 rounded-md shadow">
                            {teacher.role || teacher.instrument}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-[#FFF00F] border border-white/10 flex items-center space-x-1">
                          <span>★ {teacher.rating}</span>
                          <span className="text-gray-400 text-[10px]">({teacher.reviewsCount})</span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div>
                          <h3 className="text-xl font-extrabold group-hover:text-[#FFF00F] transition">
                            {teacher.name}
                          </h3>
                          <p className="text-xs text-[#FF007F] font-semibold mt-0.5">
                            {teacher.instrument}
                          </p>
                        </div>

                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                          {teacher.bio}
                        </p>

                        {teacher.tags && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {teacher.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-mono bg-black/50 text-gray-300 px-2 py-0.5 rounded border border-white/10"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-white/5 mt-4 flex justify-between items-center">
                      <span className="text-xs font-bold text-[#FFF00F]">{teacher.rate}</span>
                      <button
                        onClick={() => handleOpenBooking(teacher.id, teacher.instrument)}
                        className="bg-[#FF007F] hover:bg-[#D8125B] text-white px-4 py-2 rounded-xl font-bold text-xs transition shadow-[0_0_15px_rgba(255,0,127,0.3)] flex items-center space-x-1.5"
                      >
                        <Calendar size={13} />
                        <span>Book Session</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================== INTERACTIVE PRACTICE HUB SECTION ==================== */}
        {(activeNavTab === 'home' || activeNavTab === 'practice') && (
          <section id="practice" className="py-20 px-4 max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[#FF007F] font-bold text-xs uppercase tracking-widest">
                GIPA Audio Engine
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase">
                Interactive Practice Hub
              </h2>
              <p className="text-gray-400 text-sm">
                Fine-tune your timing with our Web Audio metronome, explore multi-instrument chord voicings, and track practice sessions.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Metronome />
              <ChordVisualizer />
            </div>

            <PracticeTimer onLogSession={handleLogPracticeSession} />
          </section>
        )}

        {/* ==================== AFFILIATIONS & CERTIFICATIONS ==================== */}
        {(activeNavTab === 'home' || activeNavTab === 'certifications') && (
          <section id="certifications" className="py-20 bg-[#181a20] border-t border-b border-white/10 px-4">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <span className="text-[#FFF00F] font-bold text-xs uppercase tracking-widest">Certified Excellence</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase">Affiliations & Qualifications</h2>
              <p className="text-gray-400 text-sm max-w-xl mx-auto">
                GIPA students prepare for and appear in officially accredited examinations recognized globally and across India.
              </p>

              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="bg-[#121212] border border-white/10 hover:border-[#FFF00F] p-8 rounded-3xl space-y-4 shadow-xl text-left transition">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF00F]/10 text-[#FFF00F] flex items-center justify-center border border-[#FFF00F]/30 shadow-[0_0_15px_rgba(255,240,15,0.3)]">
                    <Award size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white">ABRSM (London)</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    The Associated Board of the Royal Schools of Music graded examinations. World-standard benchmarks for Piano, Western Guitar, Violin, and Music Theory (Grades 1 to 8).
                  </p>
                  <div className="text-xs font-mono text-[#FFF00F] pt-2">
                    ✓ Global University UCAS Credits • International Certificate
                  </div>
                </div>

                <div className="bg-[#121212] border border-white/10 hover:border-[#FF007F] p-8 rounded-3xl space-y-4 shadow-xl text-left transition">
                  <div className="w-14 h-14 rounded-2xl bg-[#FF007F]/10 text-[#FF007F] flex items-center justify-center border border-[#FF007F]/30 shadow-[0_0_15px_rgba(255,0,127,0.3)]">
                    <Award size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white">Prayag Sangeet Samiti, Prayagraj</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Premier national examination board for Hindustani Classical Vocal, Kathak Dance, Tabla, and Harmonium from Prathama and Madhyama to Visharad and Sangeet Praveen diplomas.
                  </p>
                  <div className="text-xs font-mono text-[#FF007F] pt-2">
                    ✓ Government Recognized Diplomas • Classical Authenticity
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==================== STUDENT PORTAL SECTION ==================== */}
        {(activeNavTab === 'home' || activeNavTab === 'portal') && (
          <section id="portal" className="py-20 px-4 max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-[#FF007F] font-bold text-xs uppercase tracking-widest">Student Portal</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase mt-1">My Schedule & Practice Hub</h2>
              </div>
              <button
                onClick={() => handleOpenBooking(1, 'Guitar')}
                className="bg-[#FFF00F] hover:bg-yellow-400 text-[#121212] font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(255,240,15,0.3)]"
              >
                + Book New Lesson
              </button>
            </div>

            {/* Student Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#1a1c23] border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#FFF00F] uppercase tracking-widest font-bold">Upcoming Lesson</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">Confirmed</span>
                  </div>
                  <h4 className="font-extrabold text-lg text-white">
                    {bookings[0]?.lessonTopic || "Guitar Technique & Harmony"}
                  </h4>
                  <p className="text-xs text-gray-400">
                    With {bookings[0]?.teacherName || "Director Kuldeep Gaur"} • {bookings[0]?.date || "Tomorrow"}, {bookings[0]?.timeSlot || "4:30 PM"}
                  </p>
                </div>
                <button
                  onClick={() => handleJoinVirtualRoom(bookings[0] || {
                    topic: "Guitar Technique & Harmony",
                    teacherName: "Director Kuldeep Gaur",
                    teacherImage: teachers[0]?.image
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
                    Feedback: <span className="text-emerald-400 font-semibold">Reviewed by Kuldeep Gaur</span>
                  </p>
                  <p className="text-[11px] text-gray-500 italic">
                    "Work on tempo synchronization with the metronome on beats 1 and 3."
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
              <h3 className="text-xl font-extrabold text-white">Scheduled Sessions & Inquiries</h3>
              {bookings.length === 0 ? (
                <p className="text-gray-500 text-xs py-4">No sessions scheduled yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider">
                        <th className="py-3 px-3">Ref ID</th>
                        <th className="py-3 px-3">Student</th>
                        <th className="py-3 px-3">Program / Discipline</th>
                        <th className="py-3 px-3">Guiding Faculty</th>
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
                          <td className="py-3 px-3 text-gray-300">{b.teacherName}</td>
                          <td className="py-3 px-3 text-gray-300">{b.date} • {b.timeSlot}</td>
                          <td className="py-3 px-3 text-right space-x-2">
                            <button
                              onClick={() => handleJoinVirtualRoom({
                                topic: b.lessonTopic || b.instrument,
                                teacherName: b.teacherName,
                                teacherImage: teachers[0]?.image
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
          </section>
        )}
      </main>

      {/* ==================== LOCATION & FOOTER ==================== */}
      <footer id="location" className="bg-[#0e0f14] border-t border-white/10 pt-16 pb-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#FFF00F] text-[#121212] p-2 rounded-xl font-black text-lg shadow-[0_0_15px_rgba(255,240,15,0.4)]">
                G
              </div>
              <h3 className="text-2xl font-black tracking-wider uppercase">GIPA Lakhimpur</h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering aspiring artists through rigorous training, expert mentorship, and official certifications under the guidance of Director <strong className="text-white">Kuldeep Gaur</strong>.
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
                <a href="tel:7985257106" className="font-bold hover:underline text-white">
                  7985257106
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#14161d] border border-white/10 p-8 rounded-2xl flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-xl font-black uppercase text-white">Enrollment & Inquiries</h4>
              <p className="text-gray-400 text-sm mt-2">
                Ready to begin your musical or dance journey? Contact Director Kuldeep Gaur directly or drop by the institute.
              </p>
            </div>
            <div className="space-y-3">
              <a
                href="tel:7985257106"
                className="w-full bg-[#FF007F] hover:bg-[#D8125B] text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,0,127,0.4)]"
              >
                <Phone size={18} /> <span>Call 7985257106 Now</span>
              </a>
              <button
                onClick={() => handleOpenBooking(1, 'Guitar')}
                className="w-full bg-[#FFF00F] hover:bg-yellow-400 text-[#121212] font-black py-3.5 rounded-xl transition flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,240,15,0.3)] uppercase tracking-wider text-xs"
              >
                <Calendar size={16} /> <span>Book Admission Consultation</span>
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
        teachers={teachers}
        preselectedTeacherId={preselectedTeacherId}
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
