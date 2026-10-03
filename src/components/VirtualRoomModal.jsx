import React, { useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, Volume2, Music, MessageSquare, Maximize2, Radio } from 'lucide-react';

export default function VirtualRoomModal({ isOpen, onClose, lesson }) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [activeSheetTab, setActiveSheetTab] = useState('sheet'); // 'sheet' | 'notes'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <h2 className="font-bold text-slate-100 text-sm sm:text-base flex items-center space-x-2">
                <span>{lesson?.topic || "Jazz Guitar Improvisation"}</span>
                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full font-mono">
                  12ms Hi-Fi Studio
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Mentor: {lesson?.teacherName || "Elena Rostova"} • GIPA Live Classroom
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              aria-label="Exit Studio"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Studio Main Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 sm:p-6 overflow-y-auto">
          {/* Main Stage (Instructor + Student PIP) */}
          <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
            {/* Instructor Feed */}
            <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center group shadow-xl">
              <img
                src={lesson?.teacherImage || "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80"}
                alt="Instructor video feed"
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              {/* Instructor Name & Live Badge */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <span className="bg-slate-900/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-bold text-slate-200 border border-slate-700/60 flex items-center space-x-1.5">
                  <Radio size={12} className="text-rose-500 animate-pulse" />
                  <span>{lesson?.teacherName || "Elena Rostova (Instructor)"}</span>
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg border border-amber-500/30">
                  Acoustic Audio Sync: ON
                </span>
              </div>

              {/* Student Self Picture-in-Picture */}
              <div className="absolute bottom-4 right-4 w-32 sm:w-44 aspect-video bg-slate-900/95 rounded-xl border border-slate-700/80 overflow-hidden shadow-2xl flex items-center justify-center">
                {isVideoOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-slate-900 flex items-center justify-center relative">
                    <span className="text-xs font-bold text-slate-300">You (Student)</span>
                    <div className="absolute bottom-1 right-2 flex space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 text-xs flex flex-col items-center">
                    <VideoOff size={16} />
                    <span className="text-[10px] mt-1">Camera Off</span>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Audio Controls Dock */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
                    isMicOn
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
                  <span>{isMicOn ? 'Mute' : 'Unmute'}</span>
                </button>

                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition ${
                    isVideoOn
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
                  <span>{isVideoOn ? 'Stop Video' : 'Start Video'}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="flex items-center space-x-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Audio Lossless 48kHz</span>
                </span>
              </div>

              <button
                onClick={onClose}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
              >
                Leave Room
              </button>
            </div>
          </div>

          {/* Right Panel: Synchronized Sheet Music & Instructor Feedback */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col space-y-4">
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveSheetTab('sheet')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  activeSheetTab === 'sheet'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Music size={14} />
                <span>Interactive Scores</span>
              </button>
              <button
                onClick={() => setActiveSheetTab('notes')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  activeSheetTab === 'notes'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare size={14} />
                <span>Mentor Notes</span>
              </button>
            </div>

            {activeSheetTab === 'sheet' ? (
              <div className="flex-1 space-y-3 flex flex-col">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-200">Study Piece:</span>
                    <span className="text-amber-400 font-mono">Autumn Leaves (Key: G Minor)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Target: Bar 1-16 chord melody with thumb-bass separation.
                  </p>
                </div>

                <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-center items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <Music size={24} />
                  </div>
                  <h4 className="font-bold text-sm text-slate-200">Lead Sheet Sync Active</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Mentor Elena is sharing annotations on the chord changes: <code>Cm7 - F7 - BbMaj7 - EbMaj7</code>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span className="font-bold text-amber-400">Elena Rostova</span>
                    <span>16:02</span>
                  </div>
                  <p className="text-slate-300">
                    "Relax the left thumb behind fret 3. Notice the smooth voice leading into the BbMaj7 inversion."
                  </p>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span className="font-bold text-amber-400">Elena Rostova</span>
                    <span>16:15</span>
                  </div>
                  <p className="text-slate-300">
                    "Practice the 2-5-1 arpeggios at 95 BPM with the metronome on beats 2 and 4."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
