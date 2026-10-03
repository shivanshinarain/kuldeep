import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Academy Details & Sole Instructor Profile
const academyInfo = {
  name: "Gaur Institute of Performing Art (GIPA)",
  instructor: "Kuldeep Gaur",
  role: "Sole Master Trainer, Lead Instructor & Founder",
  phone: "7985257106",
  email: "kuldeepgaur.gipa@gmail.com",
  address: "Punjabi Colony, Nehar Road, Rajgarh, Lakhimpur Kheri - 262701",
  landmark: "Near Guru Nanak Inter College / Guru Nanak Degree College",
  certifications: ["ABRSM (London)", "Prayag Sangeet Samiti, Prayagraj"],
  bio: "As the sole master trainer and director at GIPA, Kuldeep Gaur brings years of dedication to performing arts, offering personalized 1-on-1 attention to every student in Lakhimpur Kheri. Every lesson is led directly by him."
};

// Course Offerings
const offerings = [
  // Instruments
  { id: 'guitar', category: 'instruments', title: 'Guitar', desc: 'Acoustic, Electric, and Bass professional training by Kuldeep Gaur.', badge: 'Instrument', fee: '₹1,500/mo' },
  { id: 'piano', category: 'instruments', title: 'Piano', desc: 'Classical & contemporary keyboard mastery.', badge: 'Instrument', fee: '₹1,800/mo' },
  { id: 'drums', category: 'instruments', title: 'Drums', desc: 'Rhythm, coordination, and kit performance.', badge: 'Instrument', fee: '₹1,500/mo' },
  { id: 'violin', category: 'instruments', title: 'Violin', desc: 'Classical and modern string articulation.', badge: 'Instrument', fee: '₹1,600/mo' },
  { id: 'tabla', category: 'instruments', title: 'Tabla', desc: 'Traditional Indian rhythm and bols.', badge: 'Instrument', fee: '₹1,400/mo' },
  { id: 'harmonium', category: 'instruments', title: 'Harmonium', desc: 'Devotional and classical accompaniments.', badge: 'Instrument', fee: '₹1,200/mo' },

  // Singing
  { id: 'classical-vocal', category: 'singing', title: 'Classical Vocal', desc: 'Shuddh swars, taans, and raag exploration.', badge: 'Vocal', fee: '₹1,500/mo' },
  { id: 'western-singing', category: 'singing', title: 'Western Singing', desc: 'Pitch control, breath support, and pop styling.', badge: 'Vocal', fee: '₹1,600/mo' },
  { id: 'vocal-music', category: 'singing', title: 'Vocal Music', desc: 'General voice modulation and stage performance.', badge: 'Vocal', fee: '₹1,200/mo' },

  // Dance
  { id: 'kathak', category: 'dance', title: 'Classical Kathak', desc: 'Graceful footwork, expressions, and storytelling.', badge: 'Dance', fee: '₹1,500/mo' },
  { id: 'western-dance', category: 'dance', title: 'Western & Indian Style', desc: 'Hip-hop, contemporary, and Bollywood choreography.', badge: 'Dance', fee: '₹1,200/mo' },
  { id: 'bhangra-folk', category: 'dance', title: 'Bhangra & Folk', desc: 'High-energy traditional Punjabi and folk numbers.', badge: 'Dance', fee: '₹1,200/mo' },
  { id: 'belly-dance', category: 'dance', title: 'Belly Dance', desc: 'Isolation techniques and rhythm control.', badge: 'Dance', fee: '₹1,500/mo' }
];

// Sole Master Faculty
const masterInstructor = {
  id: 1,
  name: "Kuldeep Gaur",
  role: "Lead Instructor, Founder & Director",
  instrument: "Multi-Instrumentalist, Vocal Coach & Dance Mentor",
  rate: "Personalized 1-on-1 Mentorship",
  rating: 5.0,
  reviewsCount: 260,
  experience: "18+ Years",
  bio: "Sole master trainer and director at GIPA Lakhimpur. Offers personalized attention across Guitar, Piano, Drums, Violin, Tabla, Harmonium, Classical Vocals, and Dance.",
  image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
  tags: ["Sole Master Trainer", "ABRSM Aligned", "Prayag Sangeet Certified", "1-on-1 Mentorship"]
};

// In-Memory Database for Bookings
let bookings = [
  {
    id: "GIPA-7801",
    studentName: "Aman Verma",
    studentEmail: "aman.v@example.com",
    studentPhone: "7985257106",
    teacherId: 1,
    teacherName: "Kuldeep Gaur",
    instrument: "Guitar",
    date: "2026-10-04",
    timeSlot: "04:30 PM",
    lessonTopic: "Direct Training with Kuldeep Gaur",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    academy: academyInfo.name,
    instructor: academyInfo.instructor,
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

// Get Instructor profile (always returns Kuldeep Gaur)
app.get('/api/teachers', (req, res) => {
  res.json([masterInstructor]);
});

app.get('/api/teachers/:id', (req, res) => {
  res.json(masterInstructor);
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// Book a trial session / admission consultation directly with Kuldeep Gaur
app.post('/api/bookings', (req, res) => {
  const { studentName, studentEmail, studentPhone, courseTitle, date, timeSlot, lessonTopic } = req.body;
  if (!studentName || !date || !timeSlot) {
    return res.status(400).json({ error: "Missing required details: studentName, date, and timeSlot." });
  }

  const newBooking = {
    id: `GIPA-${Math.floor(1000 + Math.random() * 9000)}`,
    studentName,
    studentEmail: studentEmail || "student@gipa.in",
    studentPhone: studentPhone || "7985257106",
    teacherId: 1,
    teacherName: "Kuldeep Gaur",
    instrument: courseTitle || "Music Training",
    date,
    timeSlot,
    lessonTopic: lessonTopic || `Direct 1-on-1 Training with Kuldeep Gaur (${courseTitle || 'Music'})`,
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);

  res.status(201).json({
    success: true,
    message: `Session booked successfully with Kuldeep Gaur! Call 7985257106 for any queries.`,
    booking: newBooking,
    bookingDetails: { studentName, teacherId: 1, date, timeSlot }
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
  console.log(`GIPA Backend running on port ${PORT} - Lead Instructor: Kuldeep Gaur (7985257106)`);
});
