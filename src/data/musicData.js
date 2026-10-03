// Curated Educational Music Data for Kuldeep Gaur Music Platform (GIPA)
// Strictly verified information: Kuldeep Gaur is the sole master trainer in Lakhimpur Kheri.

export const GUITAR_TYPES = [
  {
    id: 'acoustic',
    name: 'Acoustic Guitar',
    category: 'Steel-String Acoustic',
    description: 'The foundation of modern songwriting, folk, pop, and fingerstyle music. Uses steel strings over a hollow resonance box to project bright, resonant acoustic tone.',
    characteristics: ['Bright, metallic sustain', 'Hollow soundboard amplification', 'Ideal for rhythm strumming and fingerpicking'],
    parts: ['Soundboard (Spruce/Cedar)', 'Soundhole & Rosette', 'Bridge & Saddle', 'Steel Strings (11-52 gauge)', 'Headstock with enclosed tuners'],
    typicalUse: 'Singer-songwriter accompaniment, indie folk, country, rock rhythm, fingerstyle solos.',
    frequencies: [82.41, 110.0, 146.83, 196.0, 246.94, 329.63],
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'classical',
    name: 'Classical / Nylon-String',
    category: 'Nylon Acoustic',
    description: 'Rooted in Spanish and European classical traditions. Features softer nylon strings and a wider flat fingerboard, producing a round, mellow, romantic timbre.',
    characteristics: ['Warm, mellow, rounded tone', 'Soft nylon trebles and silver-wound basses', 'Wider fretboard for classical finger independence'],
    parts: ['Fan-braced Cedar/Spruce top', 'Slotted headstock', 'Tie-block bridge', 'Nylon strings', 'No pickguard'],
    typicalUse: 'Classical repertoire (Tarrega, Bach), flamenco rasgueados, bossa nova, Latin fingerstyle.',
    frequencies: [82.41, 110.0, 146.83, 196.0, 246.94, 329.63],
    image: 'https://images.unsplash.com/photo-1549298240-0d8e60513026?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'electric',
    name: 'Solid-Body Electric Guitar',
    category: 'Electric / Amplified',
    description: 'Requires an electromagnetic pickup and amplifier. Offers infinite sustain, distortion versatility, tremolo arm dynamics, and fast slim fretboard ergonomics.',
    characteristics: ['High sustain and volume control', 'Single-coil or humbucking magnetic pickups', 'Versatile tone shaping via amplifiers and effects pedals'],
    parts: ['Solid wood body (Alder/Ash/Mahogany)', 'Magnetic pickups & 5-way selector switch', 'Volume & tone potentiometers', 'Tremolo / hardtail bridge'],
    typicalUse: 'Rock riffs, blues phrasing, jazz improvisation, heavy metal solos, modern funk chops.',
    frequencies: [82.41, 110.0, 146.83, 196.0, 246.94, 329.63],
    image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bass',
    name: 'Electric Bass Guitar',
    category: 'Rhythm & Foundation',
    description: 'Usually features 4 thick strings tuned one full octave lower than standard guitar (E1, A1, D2, G2). Locks in with the drums to form the harmonic and rhythmic spine of any band.',
    characteristics: ['Deep, punchy, subsonic frequencies', 'Long scale neck (34 inches)', 'Thick gauge nickel or flatwound strings'],
    parts: ['Long-scale neck with heavy frets', 'High-output split or single-coil bass pickups', 'High-mass bridge', 'Heavy tuning pegs'],
    typicalUse: 'Groove foundation, walking bass lines, slap-and-pop funk, rock root notes, reggae sub-bass.',
    frequencies: [41.20, 55.00, 73.42, 98.00],
    image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '12-string',
    name: '12-String Acoustic',
    category: 'Extended Acoustic',
    description: 'Pairs each of the 6 standard strings with an octave or unison buddy string. Produces a lush, sparkling, natural chorus effect reminiscent of a small orchestra.',
    characteristics: ['Natural chorus and shimmer effect', 'Rich, orchestral harmonic overtone density', 'Heavier string tension and wider slotted headstock'],
    parts: ['Reinforced soundboard and dual truss rods', '12 tuning posts', 'Paired bridge pin arrangement'],
    typicalUse: 'Classic rock intro riffs (e.g. Hotel California), folk ensembles, lush vocal accompaniment.',
    frequencies: [82.41, 164.81, 110.0, 220.0, 146.83, 293.66, 196.0, 392.0, 246.94, 246.94, 329.63, 329.63],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'semi-acoustic',
    name: 'Semi-Acoustic / Hollowbody',
    category: 'Jazz & Blues Electric',
    description: 'Combines a central solid wood block with hollow side sound-chambers and f-holes. Delivers warm, woody acoustic warmth paired with electric pickup output.',
    characteristics: ['Warm, round, vintage character', 'Reduced feedback via central sustain block', 'Violin-style f-holes on carved arched top'],
    parts: ['Archtop maple body with f-holes', 'Floating or tune-o-matic bridge', 'Trapeze or Bigsby tailpiece', 'Dual humbuckers'],
    typicalUse: 'Jazz standards, Chicago blues, British invasion rock, neo-soul rhythm comping.',
    frequencies: [82.41, 110.0, 146.83, 196.0, 246.94, 329.63],
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=800&q=80'
  }
];

export const GUITAR_CHORDS = {
  // Major
  'C': { name: 'C Major', family: 'Major', frets: ['x', '3', '2', '0', '1', '0'], fingers: ['', '3', '2', '', '1', ''], notes: ['C', 'E', 'G'], formula: '1 - 3 - 5', freqs: [130.81, 164.81, 196.00, 261.63, 329.63] },
  'D': { name: 'D Major', family: 'Major', frets: ['x', 'x', '0', '2', '3', '2'], fingers: ['', '', '', '1', '3', '2'], notes: ['D', 'F#', 'A'], formula: '1 - 3 - 5', freqs: [146.83, 220.00, 293.66, 369.99] },
  'E': { name: 'E Major', family: 'Major', frets: ['0', '2', '2', '1', '0', '0'], fingers: ['', '2', '3', '1', '', ''], notes: ['E', 'G#', 'B'], formula: '1 - 3 - 5', freqs: [82.41, 123.47, 164.81, 207.65, 246.94, 329.63] },
  'F': { name: 'F Major', family: 'Major', frets: ['1', '3', '3', '2', '1', '1'], fingers: ['1', '3', '4', '2', '1', '1'], notes: ['F', 'A', 'C'], formula: '1 - 3 - 5', barre: 1, freqs: [87.31, 130.81, 174.61, 220.00, 261.63, 349.23] },
  'G': { name: 'G Major', family: 'Major', frets: ['3', '2', '0', '0', '0', '3'], fingers: ['2', '1', '', '', '', '3'], notes: ['G', 'B', 'D'], formula: '1 - 3 - 5', freqs: [98.00, 123.47, 146.83, 196.00, 246.94, 392.00] },
  'A': { name: 'A Major', family: 'Major', frets: ['x', '0', '2', '2', '2', '0'], fingers: ['', '', '1', '2', '3', ''], notes: ['A', 'C#', 'E'], formula: '1 - 3 - 5', freqs: [110.00, 164.81, 220.00, 277.18, 329.63] },
  'B': { name: 'B Major', family: 'Major', frets: ['x', '2', '4', '4', '4', '2'], fingers: ['', '1', '2', '3', '4', '1'], notes: ['B', 'D#', 'F#'], formula: '1 - 3 - 5', barre: 2, freqs: [123.47, 185.00, 246.94, 311.13, 369.99] },

  // Minor
  'Am': { name: 'A Minor', family: 'Minor', frets: ['x', '0', '2', '2', '1', '0'], fingers: ['', '', '2', '3', '1', ''], notes: ['A', 'C', 'E'], formula: '1 - b3 - 5', freqs: [110.00, 164.81, 220.00, 261.63, 329.63] },
  'Bm': { name: 'B Minor', family: 'Minor', frets: ['x', '2', '4', '4', '3', '2'], fingers: ['', '1', '3', '4', '2', '1'], notes: ['B', 'D', 'F#'], formula: '1 - b3 - 5', barre: 2, freqs: [123.47, 185.00, 246.94, 293.66, 369.99] },
  'Cm': { name: 'C Minor', family: 'Minor', frets: ['x', '3', '5', '5', '4', '3'], fingers: ['', '1', '3', '4', '2', '1'], notes: ['C', 'Eb', 'G'], formula: '1 - b3 - 5', barre: 3, freqs: [130.81, 196.00, 261.63, 311.13, 392.00] },
  'Dm': { name: 'D Minor', family: 'Minor', frets: ['x', 'x', '0', '2', '3', '1'], fingers: ['', '', '', '2', '3', '1'], notes: ['D', 'F', 'A'], formula: '1 - b3 - 5', freqs: [146.83, 220.00, 293.66, 349.23] },
  'Em': { name: 'E Minor', family: 'Minor', frets: ['0', '2', '2', '0', '0', '0'], fingers: ['', '2', '3', '', '', ''], notes: ['E', 'G', 'B'], formula: '1 - b3 - 5', freqs: [82.41, 123.47, 164.81, 196.00, 246.94, 329.63] },
  'Fm': { name: 'F Minor', family: 'Minor', frets: ['1', '3', '3', '1', '1', '1'], fingers: ['1', '3', '4', '1', '1', '1'], notes: ['F', 'Ab', 'C'], formula: '1 - b3 - 5', barre: 1, freqs: [87.31, 130.81, 174.61, 207.65, 261.63, 349.23] },
  'Gm': { name: 'G Minor', family: 'Minor', frets: ['3', '5', '5', '3', '3', '3'], fingers: ['1', '3', '4', '1', '1', '1'], notes: ['G', 'Bb', 'D'], formula: '1 - b3 - 5', barre: 3, freqs: [98.00, 146.83, 196.00, 233.08, 293.66, 392.00] },

  // Dominant 7th
  'A7': { name: 'A Dominant 7th', family: '7th', frets: ['x', '0', '2', '0', '2', '0'], fingers: ['', '', '1', '', '2', ''], notes: ['A', 'C#', 'E', 'G'], formula: '1 - 3 - 5 - b7', freqs: [110.00, 164.81, 196.00, 277.18, 329.63] },
  'B7': { name: 'B Dominant 7th', family: '7th', frets: ['x', '2', '1', '2', '0', '2'], fingers: ['', '2', '1', '3', '', '4'], notes: ['B', 'D#', 'F#', 'A'], formula: '1 - 3 - 5 - b7', freqs: [123.47, 155.56, 185.00, 220.00, 369.99] },
  'C7': { name: 'C Dominant 7th', family: '7th', frets: ['x', '3', '2', '3', '1', '0'], fingers: ['', '3', '2', '4', '1', ''], notes: ['C', 'E', 'G', 'Bb'], formula: '1 - 3 - 5 - b7', freqs: [130.81, 164.81, 233.08, 261.63, 329.63] },
  'D7': { name: 'D Dominant 7th', family: '7th', frets: ['x', 'x', '0', '2', '1', '2'], fingers: ['', '', '', '2', '1', '3'], notes: ['D', 'F#', 'A', 'C'], formula: '1 - 3 - 5 - b7', freqs: [146.83, 220.00, 261.63, 369.99] },
  'E7': { name: 'E Dominant 7th', family: '7th', frets: ['0', '2', '0', '1', '0', '0'], fingers: ['', '2', '', '1', '', ''], notes: ['E', 'G#', 'B', 'D'], formula: '1 - 3 - 5 - b7', freqs: [82.41, 123.47, 146.83, 207.65, 246.94, 329.63] },
  'G7': { name: 'G Dominant 7th', family: '7th', frets: ['3', '2', '0', '0', '0', '1'], fingers: ['3', '2', '', '', '', '1'], notes: ['G', 'B', 'D', 'F'], formula: '1 - 3 - 5 - b7', freqs: [98.00, 123.47, 146.83, 196.00, 246.94, 349.23] },

  // Major 7th
  'Cmaj7': { name: 'C Major 7th', family: 'Major 7', frets: ['x', '3', '2', '0', '0', '0'], fingers: ['', '3', '2', '', '', ''], notes: ['C', 'E', 'G', 'B'], formula: '1 - 3 - 5 - 7', freqs: [130.81, 164.81, 196.00, 246.94, 329.63] },
  'Dmaj7': { name: 'D Major 7th', family: 'Major 7', frets: ['x', 'x', '0', '2', '2', '2'], fingers: ['', '', '', '1', '1', '1'], notes: ['D', 'F#', 'A', 'C#'], formula: '1 - 3 - 5 - 7', barre: 2, freqs: [146.83, 220.00, 277.18, 369.99] },
  'Emaj7': { name: 'E Major 7th', family: 'Major 7', frets: ['0', '2', '1', '1', '0', '0'], fingers: ['', '3', '1', '2', '', ''], notes: ['E', 'G#', 'B', 'D#'], formula: '1 - 3 - 5 - 7', freqs: [82.41, 123.47, 155.56, 207.65, 246.94, 329.63] },
  'Gmaj7': { name: 'G Major 7th', family: 'Major 7', frets: ['3', 'x', '0', '0', '0', '2'], fingers: ['2', '', '', '', '', '1'], notes: ['G', 'B', 'D', 'F#'], formula: '1 - 3 - 5 - 7', freqs: [98.00, 146.83, 196.00, 246.94, 369.99] },

  // Suspended
  'Asus2': { name: 'A Suspended 2nd', family: 'Suspended', frets: ['x', '0', '2', '2', '0', '0'], fingers: ['', '', '1', '2', '', ''], notes: ['A', 'B', 'E'], formula: '1 - 2 - 5', freqs: [110.00, 164.81, 220.00, 246.94, 329.63] },
  'Asus4': { name: 'A Suspended 4th', family: 'Suspended', frets: ['x', '0', '2', '2', '3', '0'], fingers: ['', '', '1', '2', '3', ''], notes: ['A', 'D', 'E'], formula: '1 - 4 - 5', freqs: [110.00, 164.81, 220.00, 293.66, 329.63] },
  'Dsus2': { name: 'D Suspended 2nd', family: 'Suspended', frets: ['x', 'x', '0', '2', '3', '0'], fingers: ['', '', '', '1', '2', ''], notes: ['D', 'E', 'A'], formula: '1 - 2 - 5', freqs: [146.83, 220.00, 293.66, 329.63] },
  'Dsus4': { name: 'D Suspended 4th', family: 'Suspended', frets: ['x', 'x', '0', '2', '3', '3'], fingers: ['', '', '', '1', '2', '3'], notes: ['D', 'G', 'A'], formula: '1 - 4 - 5', freqs: [146.83, 220.00, 293.66, 392.00] }
};

export const GUITAR_SCALES = [
  {
    name: 'C Major Scale (Ionian)',
    key: 'C',
    type: 'Major',
    formula: 'W - W - H - W - W - W - H (1 - 2 - 3 - 4 - 5 - 6 - 7)',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
    frequencies: [130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94, 261.63],
    fretHighlights: [
      { string: 5, fret: 3, note: 'C' }, { string: 5, fret: 5, note: 'D' },
      { string: 4, fret: 2, note: 'E' }, { string: 4, fret: 3, note: 'F' }, { string: 4, fret: 5, note: 'G' },
      { string: 3, fret: 2, note: 'A' }, { string: 3, fret: 4, note: 'B' }, { string: 3, fret: 5, note: 'C' }
    ]
  },
  {
    name: 'A Natural Minor (Aeolian)',
    key: 'A',
    type: 'Minor',
    formula: 'W - H - W - W - H - W - W (1 - 2 - b3 - 4 - 5 - b6 - b7)',
    notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'],
    frequencies: [110.00, 123.47, 130.81, 146.83, 164.81, 174.61, 196.00, 220.00],
    fretHighlights: [
      { string: 5, fret: 0, note: 'A' }, { string: 5, fret: 2, note: 'B' }, { string: 5, fret: 3, note: 'C' },
      { string: 4, fret: 0, note: 'D' }, { string: 4, fret: 2, note: 'E' }, { string: 4, fret: 3, note: 'F' },
      { string: 3, fret: 0, note: 'G' }, { string: 3, fret: 2, note: 'A' }
    ]
  },
  {
    name: 'A Minor Pentatonic',
    key: 'A',
    type: 'Pentatonic',
    formula: '1 - b3 - 4 - 5 - b7 (Essential Rock & Blues Scale)',
    notes: ['A', 'C', 'D', 'E', 'G', 'A'],
    frequencies: [110.00, 130.81, 146.83, 164.81, 196.00, 220.00],
    fretHighlights: [
      { string: 6, fret: 5, note: 'A' }, { string: 6, fret: 8, note: 'C' },
      { string: 5, fret: 5, note: 'D' }, { string: 5, fret: 7, note: 'E' },
      { string: 4, fret: 5, note: 'G' }, { string: 4, fret: 7, note: 'A' }
    ]
  },
  {
    name: 'A Blues Scale',
    key: 'A',
    type: 'Blues',
    formula: '1 - b3 - 4 - b5 (Blue Note) - 5 - b7',
    notes: ['A', 'C', 'D', 'Eb', 'E', 'G', 'A'],
    frequencies: [110.00, 130.81, 146.83, 155.56, 164.81, 196.00, 220.00],
    fretHighlights: [
      { string: 6, fret: 5, note: 'A' }, { string: 6, fret: 8, note: 'C' },
      { string: 5, fret: 5, note: 'D' }, { string: 5, fret: 6, note: 'Eb' }, { string: 5, fret: 7, note: 'E' },
      { string: 4, fret: 5, note: 'G' }, { string: 4, fret: 7, note: 'A' }
    ]
  },
  {
    name: 'G Major Pentatonic',
    key: 'G',
    type: 'Pentatonic',
    formula: '1 - 2 - 3 - 5 - 6 (Sweet, Country, Soul & Pop)',
    notes: ['G', 'A', 'B', 'D', 'E', 'G'],
    frequencies: [98.00, 110.00, 123.47, 146.83, 164.81, 196.00],
    fretHighlights: [
      { string: 6, fret: 3, note: 'G' }, { string: 6, fret: 5, note: 'A' },
      { string: 5, fret: 2, note: 'B' }, { string: 5, fret: 5, note: 'D' },
      { string: 4, fret: 2, note: 'E' }, { string: 4, fret: 5, note: 'G' }
    ]
  },
  {
    name: 'Chromatic Scale (C to C)',
    key: 'C',
    type: 'Chromatic',
    formula: 'All 12 Consecutive Semitones',
    notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'],
    frequencies: [130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.00, 196.00, 207.65, 220.00, 233.08, 246.94, 261.63],
    fretHighlights: [
      { string: 5, fret: 3, note: 'C' }, { string: 5, fret: 4, note: 'C#' }, { string: 5, fret: 5, note: 'D' },
      { string: 4, fret: 1, note: 'D#' }, { string: 4, fret: 2, note: 'E' }, { string: 4, fret: 3, note: 'F' }
    ]
  }
];

export const WESTERN_NOTES = [
  { note: 'C', pitch: 'Do', freq: '261.63 Hz', indian: 'Sa (Shadja)', desc: 'The universal foundational root note of Western natural major scale. Anchor of keyboard geometry.' },
  { note: 'D', pitch: 'Re', freq: '293.66 Hz', indian: 'Re (Rishabh)', desc: 'The major second degree. Warm transition tone leading toward third.' },
  { note: 'E', pitch: 'Mi', freq: '329.63 Hz', indian: 'Ga (Gandhar)', desc: 'The major third degree. Dictates whether a chord sounds bright (major) or melancholic (minor).' },
  { note: 'F', pitch: 'Fa', freq: '349.23 Hz', indian: 'Ma (Madhyam)', desc: 'The perfect fourth degree. Only a half step above E (no black key between E and F).' },
  { note: 'G', pitch: 'Sol', freq: '392.00 Hz', indian: 'Pa (Pancham)', desc: 'The dominant fifth degree. The most consonant interval next to the octave.' },
  { note: 'A', pitch: 'La', freq: '440.00 Hz', indian: 'Dha (Dhaivat)', desc: 'Concert pitch reference worldwide (A4 = 440 Hz). Relative minor root of C Major.' },
  { note: 'B', pitch: 'Ti', freq: '493.88 Hz', indian: 'Ni (Nishad)', desc: 'The leading tone. Creates intense harmonic tension wanting to resolve up one half step into C.' }
];

export const INSTRUMENT_LIBRARY = [
  {
    id: 'guitar',
    name: 'Acoustic & Electric Guitar',
    category: 'Strings / Plucked',
    range: 'E2 to E6 (82 Hz - 1318 Hz)',
    taughtByKuldeep: true,
    desc: 'Versatile 6-string fretted instrument spanning classical fingerpicking, blues bends, and rock rhythm.',
    frequencies: [82.41, 110.0, 146.83, 196.0, 246.94, 329.63],
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'piano',
    name: 'Concert Grand Piano',
    category: 'Keys / Percussive Strings',
    range: 'A0 to C8 (27.5 Hz - 4186 Hz)',
    taughtByKuldeep: true,
    desc: 'The master instrument of Western classical and modern harmony, featuring 88 touch-sensitive hammer keys.',
    frequencies: [130.81, 196.0, 261.63, 329.63, 392.0, 523.25],
    image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bass',
    name: 'Electric Bass',
    category: 'Strings / Low Register',
    range: 'E1 to G4 (41.2 Hz - 392 Hz)',
    taughtByKuldeep: true,
    desc: 'The rhythmic and harmonic bridge connecting the drumkit kick with harmonic guitar/piano chord changes.',
    frequencies: [41.20, 55.00, 73.42, 98.00],
    image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'drums',
    name: 'Acoustic Drumkit',
    category: 'Percussion / Membranophone',
    range: 'Full Frequency Percussion Spectrum',
    taughtByKuldeep: true,
    desc: 'Coordinated percussion instrument combining bass drum, snare, hi-hats, toms, and brass cymbals.',
    frequencies: [60, 180, 7000],
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tabla',
    name: 'Indian Tabla',
    category: 'Indian Percussion / Classical',
    range: 'Tuned Dayan + Resonant Bayan',
    taughtByKuldeep: true,
    desc: 'The principal Indian classical percussion pair producing complex syllabic bols (Dha, Dhin, Ta, Na).',
    frequencies: [140, 260],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'violin',
    name: 'Violin',
    category: 'Bowed Strings',
    range: 'G3 to A7 (196 Hz - 3520 Hz)',
    taughtByKuldeep: true,
    desc: 'Fretless 4-string bowed instrument requiring exacting pitch placement, vibrato control, and bow expression.',
    frequencies: [196.00, 293.66, 440.00, 659.25],
    image: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'harmonium',
    name: 'Harmonium',
    category: 'Free-Reed Aerophone',
    range: '3+ Octaves',
    taughtByKuldeep: true,
    desc: 'Bellows-driven hand-pumped reed keyboard instrument vital for Indian classical, bhajan, and vocal riyaaz.',
    frequencies: [130.81, 196.0, 261.63, 392.0],
    image: 'https://images.unsplash.com/photo-1520523839896-5742257ca122?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cello',
    name: 'Violoncello (Cello)',
    category: 'Bowed Strings / Tenor-Bass',
    range: 'C2 to A5 (65.4 Hz - 880 Hz)',
    taughtByKuldeep: false, // Educational exploration only
    desc: 'Rich, resonant bowed string instrument played between the knees, possessing vocal-like human timbre.',
    frequencies: [65.41, 98.00, 146.83, 220.00],
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'flute',
    name: 'Concert Flute / Bansuri',
    category: 'Woodwinds / Aerophone',
    range: 'C4 to D7 (261 Hz - 2349 Hz)',
    taughtByKuldeep: false,
    desc: 'Side-blown reedless woodwind creating pristine, airy tones through edge-tone acoustic split.',
    frequencies: [523.25, 659.25, 783.99, 1046.50],
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'trumpet',
    name: 'B-flat Trumpet',
    category: 'Brass',
    range: 'F#3 to D6 (185 Hz - 1175 Hz)',
    taughtByKuldeep: false,
    desc: 'High-register brass instrument operated by 3 piston valves and focused buzzing embouchure.',
    frequencies: [233.08, 349.23, 466.16, 698.46],
    image: 'https://images.unsplash.com/photo-1573871669414-010dbf73ca84?auto=format&fit=crop&w=600&q=80'
  }
];

export const SOUND_COMPARISONS = [
  {
    id: 'guitar-comparison',
    title: 'Acoustic Guitar vs Electric Guitar',
    desc: 'Hear the difference between raw hollow wood soundboard resonance and magnetic coil pickup amplification.',
    a: { name: 'Steel-String Acoustic', type: 'acoustic', freqs: [130.81, 164.81, 196.00, 261.63, 329.63] },
    b: { name: 'Overdriven Electric', type: 'electric', freqs: [82.41, 123.47, 164.81] }
  },
  {
    id: 'piano-comparison',
    title: 'Grand Piano vs Synthesizer Keys',
    desc: 'Compare natural mechanical felt hammers striking iron-cast steel strings against electronic wave generation.',
    a: { name: 'Acoustic Grand Piano', type: 'piano', freqs: [261.63, 329.63, 392.00, 523.25] },
    b: { name: 'Analog Wave Synthesizer', type: 'synth', freqs: [261.63, 392.00, 587.33] }
  },
  {
    id: 'violin-cello-comparison',
    title: 'Violin (Soprano) vs Cello (Bass-Baritone)',
    desc: 'Compare the soaring, brilliant soprano register of the violin with the warm, chest-resonant depth of the cello.',
    a: { name: 'Violin (High Register)', type: 'violin', freqs: [440.00, 659.25, 880.00] },
    b: { name: 'Cello (Low Register)', type: 'cello', freqs: [65.41, 130.81, 196.00] }
  },
  {
    id: 'guitar-bass-comparison',
    title: 'Electric Guitar vs Electric Bass',
    desc: 'Notice how the bass sits exactly one full octave lower, anchoring the groove while the guitar provides harmonic melody.',
    a: { name: 'Electric Guitar Chord', type: 'guitar', freqs: [196.00, 246.94, 293.66, 392.00] },
    b: { name: 'Electric Bass Sub-Root', type: 'bass', freqs: [49.00, 73.42, 98.00] }
  }
];

export const MUSIC_THEORY_TOPICS = {
  beginner: [
    { title: 'What is Sound & Pitch?', desc: 'Sound is air vibration. High frequency creates high pitch (flute, high e string); slow frequency creates low pitch (bass, cello).' },
    { title: 'The Musical Alphabet (A - G)', desc: 'Only 7 letters exist in Western musical notation: A, B, C, D, E, F, G. After G, the cycle repeats an octave higher.' },
    { title: 'Halftones & Whole Tones', desc: 'A half step (semitone) is the shortest distance between two notes (e.g. fret 1 to fret 2). A whole step equals two half steps.' },
    { title: 'Basic Triad Harmony', desc: 'A chord is formed by stacking notes. A standard triad contains Root (1), Third (3), and Fifth (5).' }
  ],
  intermediate: [
    { title: 'The Circle of Fifths', desc: 'A visual clock showing the relationship among the 12 keys, their sharps and flats, and relative minor keys.' },
    { title: 'Scale Degrees & Roman Numerals', desc: 'I (Tonic), ii (Supertonic), iii (Mediant), IV (Subdominant), V (Dominant), vi (Submediant), vii° (Leading Tone).' },
    { title: 'Key Signatures & Accidental Rules', desc: 'Sharps (#) raise a note by half a step; Flats (b) lower a note by half a step. The order of sharps: F C G D A E B.' },
    { title: 'Diatonic Seventh Chords', desc: 'Extending basic triads with a 7th note (Maj7, Min7, Dominant 7) creating lush jazz and neo-soul textures.' }
  ],
  advanced: [
    { title: 'Modal Interchange & Borrowed Chords', desc: 'Borrowing chords from the parallel minor scale (such as iv minor or bVI) to evoke cinematic emotion.' },
    { title: 'Secondary Dominants (V of V)', desc: 'Temporarily tonicizing a non-root chord by preceding it with its own dominant fifth chord (e.g. D7 &rarr; G7 &rarr; C).' },
    { title: 'Voice Leading & Inversions', desc: 'Moving from chord to chord with the smallest physical finger and note distance, creating smooth musical elegance.' },
    { title: 'Improvisation & Target Tones', desc: 'Phrasing melodies around chord tones on strong downbeats while using passing chromatic scale notes on offbeats.' }
  ]
};

export const MUSIC_GLOSSARY = [
  { term: 'Arpeggio', category: 'Technique', def: 'Playing the notes of a chord individually in sequence rather than strumming them simultaneously.' },
  { term: 'Cadence', category: 'Harmony', def: 'A two-chord progression concluding a musical phrase, providing either final resolution (V - I) or suspense (IV - V).' },
  { term: 'Dynamics', category: 'Expression', def: 'The volume variations in music, ranging from pianissimo (very soft) to fortissimo (very loud).' },
  { term: 'Harmony', category: 'Theory', def: 'The sound created when two or more distinct musical pitches are heard at the same time.' },
  { term: 'Improvisation', category: 'Performance', def: 'Spontaneous composition of melody, rhythm, or chords within a harmonic framework.' },
  { term: 'Interval', category: 'Theory', def: 'The distance in pitch between two musical notes (e.g. minor 3rd, perfect 5th, octave).' },
  { term: 'Legato', category: 'Articulation', def: 'Playing notes smoothly and connectedly without silence between them.' },
  { term: 'Melody', category: 'Theory', def: 'A memorable, linear succession of musical tones perceived as a single cohesive phrase.' },
  { term: 'Modulation', category: 'Composition', def: 'The shift from one musical key center to another within a single piece.' },
  { term: 'Octave', category: 'Acoustics', def: 'The interval between one musical pitch and another with double or half its frequency (12 semitones).' },
  { term: 'Pitch', category: 'Acoustics', def: 'How high or low a musical sound is, determined by the sound wave frequency (Hz).' },
  { term: 'Rhythm', category: 'Time', def: 'The systematic arrangement of musical sounds and silences in relation to time.' },
  { term: 'Scale', category: 'Theory', def: 'An organized ascending or descending sequence of notes ordered by pitch intervals.' },
  { term: 'Staccato', category: 'Articulation', def: 'Playing notes crisply, detached, and short in duration.' },
  { term: 'Syncopation', category: 'Rhythm', def: 'Accenting an unexpected or weak beat in a rhythmic measure to create groove.' },
  { term: 'Tempo', category: 'Time', def: 'The speed or pace at which a piece of music is played, measured in Beats Per Minute (BPM).' },
  { term: 'Timbre', category: 'Acoustics', def: 'The distinct sound quality or color that differentiates one instrument from another playing the same pitch.' },
  { term: 'Vibrato', category: 'Expression', def: 'A subtle, rapid, pulsating fluctuation in pitch used to add warmth and expression.' }
];

export const MUSIC_GENRES = [
  {
    name: 'Indian Classical',
    origins: 'Ancient India (Vedic Traditions)',
    instruments: 'Sitar, Sarod, Tabla, Bansuri, Harmonium, Tanpura',
    rhythm: 'Complex cyclical Taal cycles (Teentaal 16 beats, Ektaal 12 beats, Keherwa 8 beats)',
    desc: 'Centered around microtonal Swaras (Shrutis), emotive Ragas, and intricate rhythmic permutations with meditative depth.'
  },
  {
    name: 'Classical (Western)',
    origins: 'Europe (Baroque, Classical, Romantic Eras)',
    instruments: 'Piano, Violin, Cello, Flute, Orchestral Brass, Timpani',
    rhythm: 'Strict standard notation, dynamic tempo rubato, formal sonata structures',
    desc: 'Structured harmony, counterpoint, multi-movement symphonies, and rigorous technical discipline.'
  },
  {
    name: 'Blues',
    origins: 'African-American communities of the Deep South, USA',
    instruments: 'Acoustic Guitar, Electric Guitar, Harmonica, Piano, Bass',
    rhythm: '12-bar blues progression, shuffle swing feel, bent blue notes (b3, b5, b7)',
    desc: 'The emotional bedrock of modern rock, soul, and jazz. Built on call-and-response vocal inflection.'
  },
  {
    name: 'Jazz',
    origins: 'New Orleans, USA (Early 20th Century)',
    instruments: 'Semi-acoustic Guitar, Upright Bass, Piano, Saxophone, Trumpet, Drums',
    rhythm: 'Syncopated swing, polyrhythms, complex walking bass lines',
    desc: 'Sophisticated extended harmony (7ths, 9ths, 11ths), secondary dominants, and fearless collective improvisation.'
  },
  {
    name: 'Folk & Acoustic',
    origins: 'Global Traditional Heritage',
    instruments: 'Acoustic Guitar, Banjo, Fiddle, Mandolin, Harmonica',
    rhythm: 'Steady strumming patterns, narrative storytelling pacing',
    desc: 'Organic storytelling passed through generations, emphasizing acoustic honesty and intimate vocal harmony.'
  },
  {
    name: 'Bollywood & Fusion',
    origins: 'Indian Cinema (1930s - Present)',
    instruments: 'Acoustic & Electric Guitar, Keyboard Synth, Tabla, Dholak, Strings Ensemble',
    rhythm: 'Blend of Indian folk grooves (Bhangra, Garba, Qawwali) with Western pop chords',
    desc: 'Melodic versatility capturing wide dramatic emotion, blending traditional Indian melodies with modern global orchestration.'
  }
];

export const FOR_PARENTS_FAQ = [
  {
    q: 'At what age can my child begin learning music?',
    a: 'Children can comfortably start from age 5 to 6 on keyboard/piano or classical dance, and around age 7 to 8 on acoustic guitar or drums once finger and hand coordination develops.'
  },
  {
    q: 'How does Kuldeep Gaur personalize lessons for children?',
    a: 'Every lesson is conducted 1-on-1 by Kuldeep Gaur himself. He adapts lesson speed, introduces fun ear-training games, and selects songs that inspire the student while building foundational technique.'
  },
  {
    q: 'How much should my child practice at home?',
    a: 'Consistent daily practice of 15 to 25 minutes is far more effective than a single long weekly session. Short, focused sessions build muscle memory without fatigue.'
  },
  {
    q: 'Do we need to buy an instrument immediately?',
    a: 'For trial sessions, instruments are provided at the GIPA studio in Lakhimpur Kheri. Once enrolled, having an instrument at home is essential for daily practice. Kuldeep provides guidance on choosing the right beginner instrument.'
  },
  {
    q: 'Can parents monitor lesson progress?',
    a: 'Yes. Parents receive direct updates and practice notes from Kuldeep after sessions, and are always welcome to observe the progress and milestones.'
  }
];
