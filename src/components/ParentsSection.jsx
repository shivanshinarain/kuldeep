import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { FOR_PARENTS_FAQ } from '../data/musicData';

export default function ParentsSection({ onOpenBooking }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="for-parents" className="py-24 lg:py-36 bg-[#181818] text-[#F4F0E8] px-6 lg:px-12 border-t border-b border-[#F4F0E8]/10 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-[#F4F0E8]/15 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest text-[#E6B83A] uppercase px-2 py-0.5 border border-[#E6B83A]/30">
                07 // PARENT & GUARDIAN GUIDE
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#F4F0E8]/50">
                Nurturing Musical Discipline
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-serif text-[#F4F0E8]">
              FOR <span className="italic font-light text-[#E6B83A]">PARENTS & GUARDIANS</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base font-mono text-[#F4F0E8]/70 max-w-lg leading-relaxed">
            Transparent insights into how Kuldeep Gaur mentors young musicians, structures home practice habits, and maintains continuous progress dialogue with families.
          </p>
        </div>

        {/* 4 Pillars of the GIPA Parent Partnership */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Clock,
              title: 'Structure & Routine',
              desc: 'Structured 1-on-1 sessions divided into physical warmups, technique drills, core repertoire, and aural listening games.'
            },
            {
              icon: BookOpen,
              title: 'Daily Micro-Practice',
              desc: 'We advocate 15 to 25 minutes of focused daily practice over sporadic weekend marathons to build healthy muscle memory.'
            },
            {
              icon: Users,
              title: 'Parent Progress Updates',
              desc: 'Clear milestone tracking where parents receive transparent verbal and written feedback on technique development.'
            },
            {
              icon: ShieldCheck,
              title: 'Respectful Mentorship',
              desc: 'A calm, encouraging studio environment in Lakhimpur Kheri designed to build authentic musical confidence and curiosity.'
            }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-6 bg-[#111111] border border-[#F4F0E8]/10 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#181818] border border-[#E6B83A]/30 flex items-center justify-center text-[#E6B83A]">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[#F4F0E8]">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#F4F0E8]/70 font-sans leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Home Practice Routine Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111111] border border-[#F4F0E8]/10 p-6 sm:p-12">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
              RECOMMENDED HOME PRACTICE ROUTINE
            </span>
            <h3 className="text-3xl font-black font-serif text-[#F4F0E8]">
              How to Support Your Child’s Practice at Home
            </h3>
            <p className="text-xs sm:text-sm text-[#F4F0E8]/70 font-sans leading-relaxed">
              Parents do not need musical training themselves to be exceptionally supportive partners. Establishing a calm physical space and regular routine is 90% of the journey.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-[#F4F0E8]/80 font-sans pt-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#E6B83A] shrink-0 mt-0.5" />
                <span><strong>Dedicated Music Corner:</strong> Keep the instrument out of its case on a stable stand so it is immediately accessible.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#E6B83A] shrink-0 mt-0.5" />
                <span><strong>Fixed Time Slot:</strong> Anchor practice right after school or before evening dinner to remove daily negotiation.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#E6B83A] shrink-0 mt-0.5" />
                <span><strong>Praise Effort Over Speed:</strong> Encourage slow, deliberate repetitions with a metronome rather than rushed mistakes.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#E6B83A] shrink-0 mt-0.5" />
                <span><strong>Listen Without Judging:</strong> Occasionally ask your child to perform their favourite two-measure phrase for you.</span>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={() => onOpenBooking && onOpenBooking('Child Consultation')}
                className="flex items-center gap-2 px-6 py-3 bg-[#E6B83A] text-[#111111] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#d4a832] transition-colors"
              >
                <span>BOOK PARENT CONSULTATION</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Interactive Lesson Structure Breakdown */}
          <div className="lg:col-span-6 bg-[#181818] border border-[#F4F0E8]/10 p-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A] block border-b border-[#F4F0E8]/10 pb-2">
              TYPICAL 45-MINUTE LESSON ARCHITECTURE
            </span>

            <div className="space-y-3">
              {[
                { time: '00 — 08 Min', label: 'Posture, Instrument Tuning & Physical Warmups' },
                { time: '08 — 20 Min', label: 'Technical Drills (Scales, Finger Independence, Metronome Subdivisions)' },
                { time: '20 — 35 Min', label: 'Core Piece / Song Learning (Sight-reading & Harmonic Analysis)' },
                { time: '35 — 45 Min', label: 'Ear Training Quiz, Review & Home Practice Assignment' },
              ].map((step, idx) => (
                <div key={idx} className="p-3 bg-[#111111] border border-[#F4F0E8]/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#E6B83A] font-bold">{step.time}</span>
                  <span className="text-xs font-sans text-[#F4F0E8]/80 text-right">{step.label}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-mono text-[#F4F0E8]/50 pt-2">
              Note: Every student is paced individually based on natural fine-motor comfort and musical curiosity.
            </p>
          </div>
        </div>

        {/* Parent FAQs Accordion */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E6B83A]">
              COMMON QUESTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#F4F0E8]">
              Frequently Asked Questions by Parents
            </h3>
          </div>

          <div className="space-y-3">
            {FOR_PARENTS_FAQ.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#111111] border border-[#F4F0E8]/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-base font-serif font-bold text-[#F4F0E8] hover:text-[#E6B83A] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} className="text-[#E6B83A]" /> : <ChevronDown size={18} />}
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-[#F4F0E8]/70 font-sans leading-relaxed border-t border-[#F4F0E8]/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
