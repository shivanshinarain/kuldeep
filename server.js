import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Academy Details
const academyInfo = {
  name: "Gaur Institute of Performing Art (GIPA)",
  director: "Kuldeep Gaur",
  phone: "7985257106",
  email: "kuldeepgaur.gipa@gmail.com",
  address: "Punjabi Colony, Nehar Road, Rajgarh, Lakhimpur Kheri - 262701",
  landmark: "Near Guru Nanak Inter College / Guru Nanak Degree College",
  certifications: ["ABRSM (London)", "Prayag Sangeet Samiti, Prayagraj"]
};

// Course Offerings
const offerings = [
  // Instruments
  { id: 'guitar', category: 'instruments', title: 'Guitar', desc: 'Acoustic, Electric, and Bass professional fingerstyle and plectrum training.', badge: 'Instrument', icon: 'guitar', duration: 'Foundation to Diploma', fee: '₹1,500/mo' },
  { id: 'piano', category: 'instruments', title: 'Piano & Keyboard', desc: 'Classical Western & contemporary keyboard harmony, chord voicings, and sight reading.', badge: 'Instrument', icon: 'piano', duration: 'ABRSM Grade 1-8', fee: '₹1,800/mo' },
  { id: 'drums', category: 'instruments', title: 'Drums', desc: 'Rhythm, stick coordination, polyrhythms, and full acoustic kit performance.', badge: 'Instrument', icon: 'drums', duration: 'Foundation to Pro', fee: '₹1,500/mo' },
  { id: 'violin', category: 'instruments', title: 'Violin', desc: 'Classical Western and Indian violin articulation, bowing dynamics, and tonal precision.', badge: 'Instrument', icon: 'violin', duration: 'Graded Syllabus', fee: '₹1,600/mo' },
  { id: 'tabla', category: 'instruments', title: 'Tabla', desc: 'Traditional Indian rhythm, peshkar, kayada, rela, and classical raag accompaniment.', badge: 'Instrument', icon: 'tabla', duration: 'Prayag Sangeet Certified', fee: '₹1,400/mo' },
  { id: 'harmonium', category: 'instruments', title: 'Harmonium', desc: 'Devotional bhajans, ghazals, and classical vocal accompaniments.', badge: 'Instrument', icon: 'harmonium', duration: 'Complete Course', fee: '₹1,200/mo' },

  // Singing
  { id: 'classical-vocal', category: 'singing', title: 'Classical Vocal', desc: 'Shuddh swars, taans, alaap, voice culture, and raag exploration according to Prayag tradition.', badge: 'Vocal', icon: 'mic', duration: 'Visharad / Diploma', fee: '₹1,500/mo' },
  { id: 'western-singing', category: 'singing', title: 'Western Singing', desc: 'Pitch control, diaphragmatic breath support, belt/mix technique, and contemporary pop styling.', badge: 'Vocal', icon: 'mic', duration: 'Trinity / Pop Grades', fee: '₹1,600/mo' },
  { id: 'vocal-music', category: 'singing', title: 'Vocal Music & Stagecraft', desc: 'General voice modulation, microphone technique, stage confidence, and public performance.', badge: 'Vocal', icon: 'mic', duration: 'Practical Training', fee: '₹1,200/mo' },

  // Dance
  { id: 'kathak', category: 'dance', title: 'Classical Kathak', desc: 'Graceful footwork (tatkar), chakkars, bhav, padhant, and Jaipur/Lucknow gharana storytelling.', badge: 'Dance', icon: 'sparkles', duration: 'Prayag Sangeet Certified', fee: '₹1,500/mo' },
  { id: 'western-dance', category: 'dance', title: 'Western & Bollywood Dance', desc: 'Hip-hop, contemporary, jazz fundamentals, and energetic Bollywood choreography.', badge: 'Dance', icon: 'sparkles', duration: 'All Age Groups', fee: '₹1,200/mo' },
  { id: 'bhangra-folk', category: 'dance', title: 'Bhangra & Folk', desc: 'High-energy traditional Punjabi folk numbers, giddha rhythms, and festive performance steps.', badge: 'Dance', icon: 'sparkles', duration: 'Ensemble & Solo', fee: '₹1,200/mo' },
  { id: 'belly-dance', category: 'dance', title: 'Belly Dance', desc: 'Core isolation techniques, graceful fluid movement, muscle control, and rhythmic accents.', badge: 'Dance', icon: 'sparkles', duration: 'Beginner to Advanced', fee: '₹1,500/mo' }
];

// Faculty & Mentors Database
let teachers = [
  {
    id: 1,
    name: "Director Kuldeep Gaur",
    role: "Founder & Director",
    instrument: "Guitar, Piano & Vocal Harmony",
    genre: "Classical, Contemporary & Indian Fusion",
    rate: "Admissions Consultation / Masterclass",
    rating: 5.0,
    reviewsCount: 260,
    experience: "18+ Years",
    bio: "Renowned performing artist and educator leading GIPA Lakhimpur. Certified mentor under ABRSM (London) and Prayag Sangeet Samiti, dedicated to nurturing virtuoso musicians.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    tags: ["Director", "ABRSM Graded", "Multi-Instrumentalist", "Concert Artist"]
  },
  {
    id: 2,
    name: "Pandit Rameshwar Mishra",
    role: "Senior Vocal Faculty",
    instrument: "Classical Vocal & Harmonium",
    genre: "Hindustani Classical, Khayal & Thumri",
    rate: "Regular Academy Batches",
    rating: 4.9,
    reviewsCount: 145,
    experience: "20+ Years",
    bio: "Prayag Sangeet Samiti Sangeet Praveen. Guides disciples through voice culture, rigorous swar sadhana, raga delineation, and traditional harmonium accompaniment.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    tags: ["Classical Vocal", "Prayag Praveen", "Harmonium", "Raag Sadhana"]
  },
  {
    id: 3,
    name: "Guru Ananya Sharma",
    role: "Head of Dance Department",
    instrument: "Classical Kathak & Folk Dance",
    genre: "Kathak (Lucknow Gharana), Bhangra & Bollywood",
    rate: "Regular Dance Batches",
    rating: 4.9,
    reviewsCount: 180,
    experience: "12+ Years",
    bio: "Nritya Visharad specializing in graceful abhinaya, intricate tatkar footwork, and energetic folk choreography including traditional Bhangra and Bollywood.",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
    tags: ["Kathak Visharad", "Tatkar & Chakkars", "Bollywood", "Bhangra"]
  },
  {
    id: 4,
    name: "Ustad Zakir Hussain Khan",
    role: "Percussion Master",
    instrument: "Tabla & Traditional Bols",
    genre: "Delhi & Banaras Gharana Tabla",
    rate: "Percussion Batches",
    rating: 4.9,
    reviewsCount: 112,
    experience: "16+ Years",
    bio: "Accomplished rhythmic wizard training students in clarity of bols, kayadas, teentaal, roopak, and stage accompaniment for vocal and instrumental music.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    tags: ["Tabla Virtuoso", "Teentaal", "Layakari", "Banaras Gharana"]
  },
  {
    id: 5,
    name: "Rohan Kapoor",
    role: "Western Music Instructor",
    instrument: "Guitar & Drums",
    genre: "Rock, Blues, Jazz & Fingerstyle",
    rate: "Modern Band Batches",
    rating: 4.8,
    reviewsCount: 95,
    experience: "10+ Years",
    bio: "Dynamic performer and rhythm instructor. Specializes in electric lead guitar, modern acoustic fingerstyle, and full drum kit grooving and tempo locks.",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80",
    tags: ["Electric Guitar", "Acoustic Drums", "ABRSM Theory", "Stage Performance"]
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
    tags: ["Violin Articulation", "Western Vocals", "Ear Training", "Pitch Control"]
  }
];

// In-Memory Database for Bookings / Admissions Inquiries
let bookings = [
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
    status: "Confirmed",
    createdAt: new Date().toISOString()
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'GIPA Backend API - Lakhimpur Kheri',
    director: academyInfo.director,
    phone: academyInfo.phone,
    timestamp: new Date().toISOString()
  });
});

// Academy Info Endpoint
app.get('/api/info', (req, res) => {
  res.json(academyInfo);
});

// Course Offerings Endpoint
app.get('/api/offerings', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all') {
    const filtered = offerings.filter(o => o.category === category);
    return res.json(filtered);
  }
  res.json(offerings);
});

// Get all faculty / teachers
app.get('/api/teachers', (req, res) => {
  const { instrument, search } = req.query;
  let results = [...teachers];

  if (instrument && instrument.toLowerCase() !== 'all') {
    results = results.filter(t =>
      t.instrument.toLowerCase().includes(instrument.toLowerCase()) ||
      t.genre.toLowerCase().includes(instrument.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.instrument.toLowerCase().includes(q) ||
      t.genre.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

// Get single teacher by ID
app.get('/api/teachers/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const teacher = teachers.find(t => t.id === id);
  if (!teacher) {
    return res.status(404).json({ error: "Teacher not found" });
  }
  res.json(teacher);
});

// Get all bookings / inquiries
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// Book a trial session / admission consultation
app.post('/api/bookings', (req, res) => {
  const { studentName, studentEmail, studentPhone, teacherId, date, timeSlot, lessonTopic, courseTitle } = req.body;
  if (!studentName || !date || !timeSlot) {
    return res.status(400).json({ error: "Missing required booking details (Name, Date, Time Slot)." });
  }

  const teacher = teachers.find(t => t.id === parseInt(teacherId, 10)) || teachers[0];
  const newBooking = {
    id: `GIPA-${Math.floor(1000 + Math.random() * 9000)}`,
    studentName,
    studentEmail: studentEmail || "student@gipa.edu",
    studentPhone: studentPhone || "7985257106",
    teacherId: teacher.id,
    teacherName: teacher.name,
    instrument: courseTitle || teacher.instrument,
    date,
    timeSlot,
    lessonTopic: lessonTopic || `Trial & Guidance under ${teacher.name}`,
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);

  res.status(201).json({
    success: true,
    message: `Trial session confirmed with ${teacher.name}! Director Kuldeep Gaur will welcome you at GIPA Lakhimpur.`,
    booking: newBooking,
    bookingDetails: { studentName, teacherId: teacher.id, date, timeSlot }
  });
});

// Cancel a booking
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = bookings.length;
  bookings = bookings.filter(b => b.id !== id);
  if (bookings.length === initialLength) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.json({ success: true, message: `Booking ${id} cancelled successfully.` });
});

app.listen(PORT, () => {
  console.log(`GIPA Backend running on port ${PORT} - Director: Kuldeep Gaur (Call: ${academyInfo.phone})`);
});
