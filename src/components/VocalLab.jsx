import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Play, Sparkles, Check, ChevronRight } from 'lucide-react';
import { playPianoNote, playScaleSequence, LivePitchDetector } from '../utils/audioEngine';
import AudioVisualizer from './AudioVisualizer';

export default function VocalLab() {
  const [activeTab, setActiveTab] = useState('warmups'); // 'warmups' | 'breathing' | 'pitch'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Live pitch detector state
  const [isMicOn, setIsMicOn] = useState(false);
  const [detectedVocalPitch, setDetectedVocalPitch] = useState(null);
  const [micMsg, setMicMsg] = useState(null);
  const vocalDetectorRef = useRef(null);

  const startVocalMic = async () => {
    setMicMsg(null);
    try {
      const detector = new LivePitchDetector(
        (pitchData) => {
          setDetectedVocalPitch(pitchData);
        },
        (err) => {
          setMicMsg('Microphone access denied or unavailable. You can still use the guided audio exercises below.');
          setIsMicOn(false);
        }
      );
      await detector.start();
      vocalDetectorRef.current = detector;
      setIsMicOn(true);
    } catch (e) {
      setMicMsg('Microphone not available.');
      setIsMicOn(false);
    }
  };

  const stopVocalMic = () => {
    if (vocalDetectorRef.current) {
      vocalDetectorRef.current.stop();
      vocalDetectorRef.current = null;
    }
    setIsMicOn(false);
  };

  useEffect(() => {
    return () => {
      if (vocalDetectorRef.current) vocalDetectorRef.current.stop();
    };
  }, []);

  // Guided Warm-ups
  const WARMUPS = [
    {
      title: '5-Tone Ascending & Descending Scale',
      target: 'Do - Re - Mi - Fa - Sol - Fa - Mi - Re - Do',
      notes: [261.63, 293.66, 329.63, 349.23, 392.00, 349.23, 329.63, 293.66, 261.63],
      desc: 'Use gentle lip trills (brrr) or humming on "Mm" to awaken vocal cords without tension.'
    },
    {
      title: 'Octave Siren Glide',
      target: 'Low C3 to High C4 Octave Glide',
      notes: [130.81, 164.81, 196.00, 261.63],
      desc: 'Slide effortlessly from chest voice into head voice on an "Oo" or "Ee" vowel.'
    },
    {
      title: 'Major Arpeggio (1 - 3 - 5 - 8)',
      target: 'Sa - Ga - Pa - Sa (C - E - G - C)',
      notes: [261.63, 329.63, 392.00, 523.25],
      desc: 'Focus on clean pitch centering and resonant forward placement in the mask of the face.'
    },
  ];

  const [activeWarmupIdx, setActiveWarmupIdx] = useState(0);

  const playWarmupSequence = (notes) => {
    setIsPlayingAudio(true);
    playScaleSequence(notes, 380, 'piano');
    setTimeout(() => setIsPlayingAudio(false), notes.length * 380 + 300);
  };

  return (
    <section id="vocal-lab" className="py-20 lg:py-36 bg-[#121014] text-[#F4F0E8] px-4 sm:px-6 lg:px-12 border-t border-b border-[#F4F0E8]/10 relative">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F4F0E8]/15 pb-6 sm:pb-8 gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#E6B83A] uppercase px-2 py-0.5 border border-[#E6B83A]/30">
                08 // THE HUMAN VOICE
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/50">
                Breath & Resonance Sanctuary
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase font-serif text-[#F4F0E8] break-words">
              VOCAL & <span className="italic font-light text-[#E6B83A]">SINGING LAB</span>
            </h2>
            <p className="text-xs sm:text-base text-[#F4F0E8]/70 max-w-2xl font-sans leading-relaxed">
              The voice is your first and most intimate instrument. Cultivate breath control, resonant placement, pitch accuracy, and vocal agility.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'warmups', label: '1. WARMUPS' },
              { id: 'breathing', label: '2. BREATHING' },
              { id: 'pitch', label: '3. PITCH MATCH' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-3.5 py-2 text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all duration-200 border touch-manipulation ${
                  activeTab === tab.id
                    ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                    : 'bg-[#181818] text-[#F4F0E8]/70 border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30 hover:text-[#F4F0E8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: WARMUPS */}
        {activeTab === 'warmups' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              {WARMUPS.map((w, idx) => {
                const isSelected = activeWarmupIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveWarmupIdx(idx)}
                    className={`w-full p-4 text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#E6B83A] text-[#111111] font-bold border-[#E6B83A]'
                        : 'bg-[#181818] text-[#F4F0E8] border-[#F4F0E8]/10 hover:border-[#F4F0E8]/30'
                    }`}
                  >
                    <div>
                      <span className="text-base font-serif font-bold block">{w.title}</span>
                      <span className="text-[10px] font-mono opacity-70 block mt-0.5">{w.target}</span>
                    </div>
                    <ChevronRight size={16} />
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-6">
              <div className="space-y-1 border-b border-[#F4F0E8]/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                  ACTIVE VOCAL DRILL
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#F4F0E8]">
                  {WARMUPS[activeWarmupIdx].title}
                </h3>
                <p className="text-xs font-mono text-[#E6B83A] mt-1">
                  Syllabic Target: {WARMUPS[activeWarmupIdx].target}
                </p>
              </div>

              <p className="text-sm text-[#F4F0E8]/80 font-sans leading-relaxed">
                {WARMUPS[activeWarmupIdx].desc}
              </p>

              <div className="p-4 bg-[#111111] border border-[#F4F0E8]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#F4F0E8]/60 block">Guided Reference Tone Sequence:</span>
                  <span className="text-xs font-mono font-bold text-[#E6B83A]">Piano Accompaniment (9 Notes)</span>
                </div>

                <button
                  onClick={() => playWarmupSequence(WARMUPS[activeWarmupIdx].notes)}
                  disabled={isPlayingAudio}
                  className="px-6 py-3 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#d4a832] transition-colors self-start sm:self-auto"
                >
                  <Play size={14} /> PLAY VOCAL GUIDE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BREATHING */}
        {activeTab === 'breathing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Diaphragmatic Expansion',
                count: 'Inhale 4s • Hold 4s • Release 8s',
                desc: 'Place one hand on your belly and one on your chest. As you inhale slowly through the nose, expand the lower ribs 360 degrees without raising your shoulders.'
              },
              {
                title: 'Hissing Exhale Support',
                count: 'Consistent "Sssss" Stream (20s)',
                desc: 'Exhale with steady resistance on a sharp hiss sound. Feel the lower abdominal muscles engage inward to manage breath pressure smoothly.'
              },
              {
                title: 'Staccato Rib Release',
                count: 'Sh! Sh! Sh! Pulses',
                desc: 'Short, rhythmic puffs of air on "Sh" activate the abdominal wall and train instant breath readiness for high notes and vocal belting.'
              }
            ].map((b, i) => (
              <div key={i} className="p-6 bg-[#181818] border border-[#F4F0E8]/10 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">{b.count}</span>
                  <h4 className="text-xl font-bold font-serif text-[#F4F0E8]">{b.title}</h4>
                  <p className="text-xs sm:text-sm text-[#F4F0E8]/70 font-sans leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: LIVE PITCH MATCHING */}
        {activeTab === 'pitch' && (
          <div className="bg-[#181818] border border-[#F4F0E8]/10 p-6 sm:p-10 space-y-8 max-w-3xl mx-auto text-center">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
                MICROPHONE VOCAL VISUALIZER
              </span>
              <h3 className="text-3xl font-black font-serif text-[#F4F0E8]">
                Real-Time Pitch Feedback
              </h3>
              <p className="text-xs sm:text-sm text-[#F4F0E8]/60 font-sans">
                Sing a steady tone into your microphone to view your real-time vocal pitch and frequency stability.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={isMicOn ? stopVocalMic : startVocalMic}
                className={`px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                  isMicOn
                    ? 'bg-[#9E2F2F] text-[#F4F0E8] animate-pulse'
                    : 'bg-[#E6B83A] text-[#111111] hover:bg-[#d4a832]'
                }`}
              >
                {isMicOn ? <MicOff size={16} /> : <Mic size={16} />}
                {isMicOn ? 'STOP MICROPHONE' : 'START VOCAL ANALYSIS'}
              </button>
            </div>

            {micMsg && (
              <div className="p-3 bg-[#9E2F2F]/20 border border-[#9E2F2F]/40 text-xs font-mono text-[#F4F0E8]">
                {micMsg}
              </div>
            )}

            <div className="p-8 bg-[#111111] border border-[#F4F0E8]/10 space-y-4">
              <div className="text-6xl font-black font-serif text-[#F4F0E8]">
                {detectedVocalPitch ? detectedVocalPitch.note : '—'}
                {detectedVocalPitch && (
                  <span className="text-2xl text-[#E6B83A] ml-1">{detectedVocalPitch.octave}</span>
                )}
              </div>
              <div className="text-xs font-mono text-[#E6B83A]">
                {detectedVocalPitch ? `${detectedVocalPitch.frequency} Hz (${detectedVocalPitch.cents > 0 ? '+' : ''}${detectedVocalPitch.cents} cents)` : 'Sing to detect pitch'}
              </div>
            </div>

            <AudioVisualizer height={48} color="#E6B83A" barCount={32} />
          </div>
        )}

      </div>
    </section>
  );
}
