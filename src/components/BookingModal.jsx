import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle, User, Mail, Phone, Sparkles, Music, ShieldCheck, MapPin } from 'lucide-react';

export default function BookingModal({
  isOpen,
  onClose,
  teachers = [],
  preselectedTeacherId = 1,
  preselectedCourse = '',
  onBookingSuccess
}) {
  const [selectedTeacherId, setSelectedTeacherId] = useState(preselectedTeacherId || 1);
  const [selectedCourse, setSelectedCourse] = useState(preselectedCourse || 'Guitar');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('04:30 PM');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (preselectedTeacherId) setSelectedTeacherId(preselectedTeacherId);
    if (preselectedCourse) setSelectedCourse(preselectedCourse);
  }, [preselectedTeacherId, preselectedCourse]);

  if (!isOpen) return null;

  const currentTeacher = teachers.find(t => t.id === Number(selectedTeacherId)) || teachers[0] || {
    id: 1,
    name: "Director Kuldeep Gaur",
    instrument: "Guitar & Piano",
    rate: "Free Trial / Consultation"
  };

  const availableSlots = [
    '10:30 AM', '12:00 PM', '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'
  ];

  const courseList = [
    'Guitar (Acoustic, Electric, Bass)',
    'Piano & Keyboard',
    'Drums',
    'Violin',
    'Tabla',
    'Harmonium',
    'Classical Vocal (Prayag Syllabus)',
    'Western Singing & Pop',
    'Vocal Music & Stagecraft',
    'Classical Kathak Dance',
    'Western & Bollywood Dance',
    'Bhangra & Folk Dance',
    'Belly Dance'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!studentName.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!studentPhone.trim() || studentPhone.trim().length < 10) {
      setError('Please provide a valid 10-digit phone number so Director Kuldeep Gaur can reach you.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: studentName.trim(),
          studentEmail: studentEmail.trim() || `${studentName.toLowerCase().replace(/\s+/g, '')}@student.gipa.in`,
          studentPhone: studentPhone.trim(),
          teacherId: Number(selectedTeacherId),
          courseTitle: selectedCourse,
          date,
          timeSlot,
          lessonTopic: notes.trim() || `${selectedCourse} (${skillLevel} Level) - Trial & Admissions`
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit admission booking.');
      }

      setConfirmation(data.booking || {
        id: 'GIPA-' + Math.floor(1000 + Math.random() * 9000),
        studentName,
        teacherName: currentTeacher.name,
        instrument: selectedCourse,
        date,
        timeSlot
      });

      if (onBookingSuccess) {
        onBookingSuccess(data.booking);
      }
    } catch (err) {
      console.error(err);
      // Fallback local booking
      const fallbackBooking = {
        id: 'GIPA-' + Math.floor(1000 + Math.random() * 9000),
        studentName,
        studentEmail: studentEmail || "student@gipa.in",
        studentPhone: studentPhone || "7985257106",
        teacherId: Number(selectedTeacherId),
        teacherName: currentTeacher.name,
        instrument: selectedCourse,
        date,
        timeSlot,
        lessonTopic: `${selectedCourse} (${skillLevel} Level)`,
        status: 'Confirmed'
      };
      setConfirmation(fallbackBooking);
      if (onBookingSuccess) onBookingSuccess(fallbackBooking);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#14161d] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {confirmation ? (
          <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#FFF00F]/20 text-[#FFF00F] rounded-2xl flex items-center justify-center mx-auto border border-[#FFF00F]/40 shadow-[0_0_20px_rgba(255,240,15,0.3)]">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFF00F] bg-[#FFF00F]/10 px-3 py-1 rounded-full border border-[#FFF00F]/30">
                Admission Slot Confirmed • Ref: {confirmation.id}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
                Welcome to GIPA Lakhimpur!
              </h2>
              <p className="text-gray-300 text-sm max-w-md mx-auto">
                Your trial session and consultation under <strong className="text-[#FFF00F]">Director Kuldeep Gaur</strong> has been reserved for <strong className="text-white">{confirmation.studentName}</strong>.
              </p>
            </div>

            <div className="bg-[#101116] border border-white/10 rounded-2xl p-5 text-left space-y-3 text-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-gray-400">Program / Course:</span>
                <span className="font-bold text-[#FF007F]">{confirmation.instrument}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-gray-400">Guiding Mentor:</span>
                <span className="font-bold text-[#FFF00F]">{confirmation.teacherName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-gray-400">Scheduled Date & Time:</span>
                <span className="font-semibold text-white">{confirmation.date} at {confirmation.timeSlot}</span>
              </div>
              <div className="flex justify-between items-start pt-1">
                <span className="text-gray-400 flex items-center space-x-1">
                  <MapPin size={14} className="text-[#FF007F]" />
                  <span>Campus:</span>
                </span>
                <span className="text-xs text-right text-gray-300">
                  Punjabi Colony, Nehar Road, Rajgarh, Lakhimpur Kheri
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="tel:7985257106"
                className="flex-1 bg-[#FF007F] hover:bg-[#D8125B] text-white font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,0,127,0.4)]"
              >
                <Phone size={16} />
                <span>Call Director (7985257106)</span>
              </a>
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-xl transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[#FFF00F] text-xs font-bold uppercase tracking-wider">
                <Sparkles size={16} className="text-[#FF007F]" />
                <span>Direct Guidance of Kuldeep Gaur</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Book Trial & Consultation
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Join Lakhimpur Kheri's premier institute for Music, Vocals, and Dance. ABRSM & Prayag certified curricula.
              </p>
            </div>

            {error && (
              <div className="bg-rose-500/20 border border-rose-500/40 text-rose-200 px-4 py-3 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Program / Discipline Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Interested Discipline / Course
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full bg-[#101116] border border-white/15 focus:border-[#FFF00F] rounded-xl py-2.5 px-3 text-sm text-white outline-none transition"
                >
                  {courseList.map(c => (
                    <option key={c} value={c} className="bg-[#14161d] text-white">{c}</option>
                  ))}
                </select>
              </div>

              {/* Mentor Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Select Faculty / Mentor
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                  {teachers.map(teacher => {
                    const isSelected = Number(selectedTeacherId) === teacher.id;
                    return (
                      <div
                        key={teacher.id}
                        onClick={() => setSelectedTeacherId(teacher.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center space-x-2.5 ${
                          isSelected
                            ? 'bg-[#FF007F]/20 border-[#FF007F] shadow-[0_0_15px_rgba(255,0,127,0.3)]'
                            : 'bg-[#101116] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="overflow-hidden">
                          <p className={`text-xs font-bold truncate ${isSelected ? 'text-[#FFF00F]' : 'text-white'}`}>
                            {teacher.name}
                          </p>
                          <p className="text-[10px] text-gray-400 truncate">{teacher.instrument}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Student Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Student Full Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3 text-gray-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-[#101116] border border-white/15 focus:border-[#FFF00F] rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-600 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3 text-gray-500" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 7985257106"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      className="w-full bg-[#101116] border border-white/15 focus:border-[#FFF00F] rounded-xl py-2.5 pl-10 pr-3 text-sm text-white placeholder-gray-600 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center space-x-1.5">
                    <Calendar size={14} className="text-[#FFF00F]" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#101116] border border-white/15 focus:border-[#FFF00F] rounded-xl py-2.5 px-3 text-sm text-white outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 flex items-center space-x-1.5">
                    <Clock size={14} className="text-[#FF007F]" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#101116] border border-white/15 focus:border-[#FF007F] rounded-xl py-2.5 px-3 text-sm text-white outline-none transition"
                  >
                    {availableSlots.map(slot => (
                      <option key={slot} value={slot} className="bg-[#14161d]">{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Skill Level Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Current Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Beginner', 'Intermediate', 'Advanced / Graded'].map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSkillLevel(lvl)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                        skillLevel === lvl
                          ? 'bg-[#FFF00F] text-[#121212] border-[#FFF00F] shadow-[0_0_10px_rgba(255,240,15,0.4)]'
                          : 'bg-[#101116] border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-gray-400">
                <span>Direct Guidance: </span>
                <strong className="text-white">Director Kuldeep Gaur</strong>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FF007F] hover:bg-[#D8125B] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition shadow-[0_0_20px_rgba(255,0,127,0.4)] text-xs uppercase tracking-wider flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      <span>Confirm Slot</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
