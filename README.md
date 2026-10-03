# Gaur Institute of Performing Art (GIPA)

A full-stack web application for 1-on-1 music mentorship, masterclass scheduling, and an interactive practice hub for guitarists and pianists.

---

## 🚀 Features

- **Live Faculty Discovery & Filtering:**
  - Real-time mentor profiles with high-definition photos, verified ratings, genre tags, and hourly rates.
  - Filter by instrument (`Guitar`, `Piano`, `All`) and instant keyword search.
  - Backed by an Express REST API (`GET /api/teachers`).

- **Interactive 1-on-1 Masterclass Booking:**
  - Interactive modal dialog to select teacher, date, time slot, and repertoire goals.
  - Synchronous submission to Express backend (`POST /api/bookings`) with booking ID generation and live updates to the student schedule.
  - Real-time validation and cancellation (`DELETE /api/bookings/:id`).

- **Interactive Practice Hub:**
  - **Precision Digital Metronome:** Built with the browser's native **Web Audio API** oscillator and gain envelope for microsecond click precision. Features time signatures (4/4, 3/4, 2/4, 6/8), visual LED beat pulses with downbeat accent, volume controls, and **Tap Tempo**.
  - **Multi-Instrument Chord Visualizer:** Toggle between **Guitar Fretboard** (string lines, fret positions, finger dots) and **Piano Keyboard** (2-octave keys with highlighted chord tones). Includes real-time **Web Audio synthesis** to play acoustic-like guitar strums and piano voicings.
  - **Practice Focus Timer:** Interval focus timer (15m, 25m Pomodoro, 45m) with a "Log Session" button that updates weekly practice hours and streak count.

- **Student Portal & Schedule:**
  - Shows upcoming masterclasses with countdown, weekly practice streak graph, and homework feedback from faculty.
  - **Virtual Live Studio Room:** Simulated 1-on-1 classroom featuring instructor video feed, student webcam PIP, 12ms low-latency indicator, and interactive score/notes sync.

---

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React icons
- **Audio Engine:** Native Web Audio API (`AudioContext`, `OscillatorNode`, `BiquadFilterNode`, `GainNode`)
- **Backend:** Node.js, Express 5, CORS
- **Dev Tooling:** Concurrently for unified full-stack dev server

---

## 💻 Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Full-Stack Dev Server (Frontend + Backend)
```bash
npm run dev
```
This runs:
- **Express Backend:** `http://localhost:5001`
- **Vite React Frontend:** `http://localhost:5173` (proxies `/api` to port 5001)

### 3. Individual Commands
- `npm run dev:client` - Run only the Vite dev server
- `npm run dev:server` - Run only the Express backend
- `npm run build` - Create optimized production bundle in `dist/`

---

## 📡 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check and API status |
| `GET` | `/api/teachers` | Fetch faculty list (supports `?instrument=` and `?search=`) |
| `GET` | `/api/teachers/:id` | Fetch single instructor details |
| `GET` | `/api/bookings` | Fetch all student masterclass bookings |
| `POST` | `/api/bookings` | Create new masterclass reservation |
| `DELETE` | `/api/bookings/:id` | Cancel an existing booking |
# kuldeepgaur
