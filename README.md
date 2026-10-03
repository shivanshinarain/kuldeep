# KULDEEP GAUR | Gaur Institute of Performing Art (GIPA)

> **"Music, Played Differently."**  
> An editorial full-stack web platform for personal music training, classical discipline, and modern instrument mastery with **Kuldeep Gaur** in Lakhimpur Kheri, UP.

---

## 🏛️ About GIPA

- **Founder & Sole Master Trainer:** Kuldeep Gaur
- **Location:** Punjabi Colony, Nehar Road, Rajgarh, Lakhimpur Kheri - 262701 *(Near Guru Nanak Inter College / Guru Nanak Degree College)*
- **Contact:** +91 7985257106
- **Standards Aligned:** ABRSM (London) & Prayag Sangeet Samiti, Prayagraj

---

## 🚀 Key Features

1. **Editorial Design System:**
   - Warm linen aesthetic (`#F4F0E8`), deep onyx text (`#111111`), with Crimson (`#9E2F2F`) and Ochre Gold (`#E6B83A`) accents.
   - Typography paired with **Space Mono** and **Plus Jakarta Sans** with a subtle grain texture overlay.

2. **Curriculum Showcase (6 Core Disciplines):**
   - **Guitar:** Acoustic, Electric & Fingerstyle
   - **Piano:** Classical & Contemporary Keys *(with verified concert grand photography)*
   - **Vocals:** Classical (Shuddh Swars) & Western Singing
   - **Rhythm & Drums:** Percussion, Tabla Bols & Kit Coordination
   - **Music Theory:** Intervals, Harmony, Ear Training & Sight Reading
   - **Dance & Expression:** Kathak Footwork, Folk, Bhangra & Stage Presence

3. **Dedicated Piano Sanctuary (`#piano`):**
   - Responsive multi-image showcase (Concert grand in spotlight, pianist hand mechanics, and classical notation).
   - **Interactive Web Audio Keyboard:** 8 responsive keys ($C_4$ to $C_5$) with synthesized harmonic tones for interactive exploration on touch and click.
   - 4 Pillars of Piano Mastery (Touch & Dynamics, Chord Reharmony, Grand Staff Notation, ABRSM Repertoire).

4. **1-on-1 Mentorship & Philosophy:**
   - Highlights Kuldeep Gaur's direct instruction model without third-party trainers.
   - 4-Step Learning Pathway: *01 Choose &rarr; 02 Learn &rarr; 03 Practice &rarr; 04 Play*.

5. **Integrated Lesson Admission & Enquiry System:**
   - In-page admission form wired to backend Express API (`POST /api/enquiries`).
   - Generates tracking IDs (`GIPA-XXXX`) with immediate feedback and local persistence.

---

## 🛠 Tech Stack

- **Frontend:** React 19, Vite 8, Tailwind CSS v4, Lucide React icons
- **Audio Synthesis:** Native Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`)
- **Backend:** Node.js, Express 5, CORS
- **Dev Tooling:** Concurrently for synchronized full-stack development

---

## 💻 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Full-Stack Dev Server (Client + Server)
```bash
npm run dev
```
- **Vite Frontend:** [http://localhost:5173](http://localhost:5173) (Proxies `/api` to port 5001)
- **Express Backend:** [http://localhost:5001](http://localhost:5001)

### 3. Build for Production
```bash
npm run build
```

---

## 📡 Backend API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status & academy contact details |
| `GET` | `/api/info` | Academy metadata, address, and director profile |
| `GET` | `/api/offerings` | Curriculum disciplines and course offerings |
| `GET` | `/api/teachers` | Lead instructor details (Kuldeep Gaur) |
| `GET` | `/api/bookings` | View confirmed student bookings & enquiries |
| `POST` | `/api/enquiries` | Submit student admission or lesson enquiry |
| `POST` | `/api/bookings` | Create scheduled masterclass reservation |
