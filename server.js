import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-Memory Database for Teachers
let teachers = [
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

// In-Memory Database for Bookings
let bookings = [
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
    status: "Confirmed",
    createdAt: new Date().toISOString()
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'GIPA Backend API', timestamp: new Date().toISOString() });
});

// Get all teachers filtered by instrument or search
app.get('/api/teachers', (req, res) => {
  const { instrument, search } = req.query;
  let results = [...teachers];

  if (instrument && instrument.toLowerCase() !== 'all') {
    results = results.filter(t => t.instrument.toLowerCase().includes(instrument.toLowerCase()));
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

// Get all bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// Book a lesson
app.post('/api/bookings', (req, res) => {
  const { studentName, studentEmail, teacherId, date, timeSlot, lessonTopic } = req.body;
  if (!studentName || !teacherId || !date || !timeSlot) {
    return res.status(400).json({ error: "Missing required booking details." });
  }

  const teacher = teachers.find(t => t.id === parseInt(teacherId, 10));
  const newBooking = {
    id: `BKG-${Date.now().toString().slice(-5)}`,
    studentName,
    studentEmail: studentEmail || "student@gipa.edu",
    teacherId: parseInt(teacherId, 10),
    teacherName: teacher ? teacher.name : "Faculty Member",
    instrument: teacher ? teacher.instrument : "General Music",
    date,
    timeSlot,
    lessonTopic: lessonTopic || "Virtuoso Technique & Repertoire",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);

  res.status(201).json({
    success: true,
    message: "Lesson successfully booked! Your instructor has been notified.",
    booking: newBooking,
    bookingDetails: { studentName, teacherId, date, timeSlot }
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
  console.log(`GIPA Backend running on port ${PORT}`);
});
