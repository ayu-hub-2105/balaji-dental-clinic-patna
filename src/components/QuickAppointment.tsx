import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  Share2,
  CalendarPlus,
  ArrowLeft,
  Home,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useClinic } from '../context/ClinicContext';
import { Appointment } from '../types';
import { ToothIcon } from './DentalIcons';

interface QuickAppointmentProps {
  initialTreatment?: string;
  initialDoctor?: string;
  onCloseModal?: () => void;
  isModal?: boolean;
}

export const QuickAppointment: React.FC<QuickAppointmentProps> = ({
  initialTreatment = '',
  initialDoctor = '',
  onCloseModal,
  isModal = false
}) => {
  const { doctors, treatments, bookAppointment } = useClinic();

  // Form state
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [treatment, setTreatment] = useState(initialTreatment || treatments[0]?.title || 'Invisalign Clear Aligners');
  const [doctor, setDoctor] = useState(initialDoctor || doctors[0]?.name || 'Dr. Parijat Pallav');

  // Tomorrow as default date
  const tomorrowStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  })();

  const [date, setDate] = useState(tomorrowStr);
  const [time, setTime] = useState('11:00');
  const [patientType, setPatientType] = useState<'New' | 'Existing'>('New');

  // Confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);
  const [isDuplicateWarning, setIsDuplicateWarning] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const isTuesday = date ? new Date(date + 'T12:00:00').getDay() === 2 : false;

  const formatTime12h = (t: string) => {
    const [hStr, mStr] = t.split(':');
    let h = parseInt(hStr, 10);
    const suffix = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${mStr} ${suffix}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim() || !date) {
      alert('Please fill in your Name, Phone Number, and Date.');
      return;
    }

    if (isTuesday) {
      alert('Attention: Balaji Dental Clinic is strictly CLOSED every Tuesday. Please select any date between Wednesday and Monday.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = bookAppointment({
        patientName: patientName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        treatment,
        doctor,
        date,
        time: formatTime12h(time),
        patientType,
        source: 'Website',
        age: age ? Number(age) : undefined
      });

      setBookedAppointment(result.appointment);
      setIsDuplicateWarning(result.isDuplicate);
      setIsSubmitting(false);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log(err);
      }
    }, 450);
  };

  const handleCopyId = () => {
    if (!bookedAppointment) return;
    navigator.clipboard.writeText(bookedAppointment.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleResetForm = () => {
    setBookedAppointment(null);
    setPatientName('');
    setPhone('');
    setAge('');
    setEmail('');
    if (onCloseModal) {
      onCloseModal();
    } else {
      const el = document.getElementById('home');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoBackToWebsite = () => {
    if (onCloseModal) {
      onCloseModal();
    } else {
      const el = document.getElementById('home');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`relative ${isModal ? 'p-0' : 'py-12 bg-white'}`} id="booking-section">
      <div className={`${isModal ? 'w-full' : 'max-w-4xl mx-auto px-4 sm:px-6'}`}>
        {!bookedAppointment ? (
          <div className={`${isModal ? 'bg-white' : 'bg-white rounded-2xl border border-sky-100/90 shadow-xl overflow-hidden'}`}>
            {/* Form Top Banner */}
            <div className={`bg-gradient-to-br from-sky-600 via-sky-600 to-sky-700 text-white text-left relative overflow-hidden ${isModal ? 'p-4 sm:p-5' : 'p-6 sm:p-8'}`}>
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-32 h-32 sm:w-44 sm:h-44 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="absolute left-1/3 bottom-0 translate-y-1/2 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

              {/* Header actions: Back button & Close button */}
              <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 relative z-10">
                <button
                  type="button"
                  onClick={handleGoBackToWebsite}
                  id="appointment-banner-back-button"
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-[11px] sm:text-xs font-bold transition-all backdrop-blur-xs cursor-pointer border border-white/30 active:scale-95"
                >
                  <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{isModal ? '← Back to Website' : '← Back to Homepage'}</span>
                </button>

                {isModal && onCloseModal && (
                  <button
                    type="button"
                    onClick={onCloseModal}
                    id="appointment-banner-close-btn"
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer flex items-center justify-center border border-white/30 active:scale-95 shrink-0"
                    aria-label="Close booking modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <h2 className={`${isModal ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-extrabold tracking-tight font-heading relative z-10`}>
                Book Your Dental Appointment
              </h2>
              <p className="text-xs sm:text-sm text-sky-100/90 mt-1 max-w-xl relative z-10">
                Experience hassle-free scheduling. Choose your preferred doctor, treatment, and time for a personalized consultation.
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className={`${isModal ? 'p-4 sm:p-6 space-y-4' : 'p-6 sm:p-8 space-y-6'} text-left`} id="appointment-booking-form">
              {/* Row 1: Patient Name, Phone & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Patient Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      id="input-patient-name"
                      className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98112 34567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="input-patient-phone"
                      className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Age <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min={0}
                      max={120}
                      inputMode="numeric"
                      placeholder="e.g. 32"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      id="input-patient-age"
                      className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Patient Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="patient@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="input-patient-email"
                      className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Patient Type
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPatientType('New')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        patientType === 'New'
                          ? 'bg-[#eaf3f9] border-[#005086] text-[#005086] shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#005086]" />
                      <span>New Patient</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPatientType('Existing')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        patientType === 'Existing'
                          ? 'bg-[#eaf3f9] border-[#005086] text-[#005086] shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <User className="w-3.5 h-3.5 text-[#005086]" />
                      <span>Existing / Follow-up</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3: Treatment & Preferred Doctor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Treatment Required
                  </label>
                  <select
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    id="select-treatment"
                    className="w-full px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005086]/30 focus:border-[#005086] transition-all font-medium"
                  >
                    {treatments.map((t) => (
                      <option key={t.id} value={t.title}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Doctor
                  </label>
                  <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    id="select-doctor"
                    className="w-full px-3.5 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005086]/30 focus:border-[#005086] transition-all font-medium"
                  >
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name} - {doc.title.split('&')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <CalendarIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      id="input-appointment-date"
                      className={`w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                        isTuesday
                          ? 'border-rose-300 ring-2 ring-rose-200'
                          : 'border-slate-200 focus:ring-[#005086]/30 focus:border-[#005086]'
                      }`}
                    />
                  </div>
                  {isTuesday && (
                    <p className="text-[11px] font-bold text-rose-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Closed on Tuesdays — pick another date.</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      id="input-appointment-time"
                      className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005086]/30 focus:border-[#005086] transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Source attribution notice & privacy consent */}
              <div className="flex items-start gap-2 pt-0.5 text-xs text-slate-500">
                <input
                  type="checkbox"
                  id="appointment-consent-checkbox"
                  defaultChecked
                  required
                  className="mt-0.5 rounded text-[#005086] focus:ring-[#005086]"
                />
                <label htmlFor="appointment-consent-checkbox">
                  I agree to receive appointment reminders and clinical communication from Balaji Dental Clinic via SMS/WhatsApp.
                </label>
              </div>

              {/* Clinic Schedule Strip */}
              <div className="p-2.5 sm:p-3 bg-sky-50/80 rounded-xl border border-sky-100 flex flex-wrap items-center gap-2 text-xs text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span className="text-[11px] sm:text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Wed – Mon: 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM</span>
                  <span> • </span>
                  <span className="font-bold text-rose-600">Tuesday Closed</span>
                </span>
              </div>

              {/* Action Buttons: Submit and Back/Cancel */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-appointment-button"
                  className="flex-1 w-full py-3 sm:py-3.5 px-6 rounded-xl bg-[#005086] hover:bg-[#003d66] active:scale-98 text-white font-bold text-sm sm:text-base transition-all shadow-md shadow-[#005086]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  <CalendarPlus className="w-5 h-5" />
                  <span>{isSubmitting ? 'Confirming Your Slot...' : 'BOOK APPOINTMENT'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGoBackToWebsite}
                  id="appointment-cancel-back-button"
                  className="w-full sm:w-auto py-3 sm:py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Go Back to Website</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Display */
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-2xl p-6 sm:p-8 text-center animate-fadeIn">
            {/* Top Success Badge */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Appointment Confirmed</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Thank You, {bookedAppointment.patientName}!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto mt-1 mb-6">
              Your appointment has been successfully scheduled and added to our Unified Clinic Management System.
            </p>

            {/* Duplicate Notice if detected */}
            {isDuplicateWarning && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-800 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Prior appointment detected for this phone number</p>
                  <p className="mt-0.5 text-amber-700">
                    Our reception desk has cross-referenced your profile with existing records to ensure seamless treatment continuity.
                  </p>
                </div>
              </div>
            )}

            {/* Generated Appointment Ticket Details */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 max-w-lg mx-auto text-left space-y-3.5 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Appointment ID</span>
                  <p className="text-base font-extrabold text-sky-700 font-mono">{bookedAppointment.id}</p>
                </div>
                <button
                  onClick={handleCopyId}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1 transition-all"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Date & Time</span>
                  <span className="font-bold text-slate-800 text-sm">
                    {bookedAppointment.date} at {bookedAppointment.time}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Doctor</span>
                  <span className="font-bold text-slate-800 text-sm">{bookedAppointment.doctor}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Treatment</span>
                  <span className="font-bold text-slate-800">{bookedAppointment.treatment}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Source</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold text-[11px]">
                    {bookedAppointment.source}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions with Prominent Back to Website */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleGoBackToWebsite}
                id="appointment-confirmed-back-website-btn"
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>← Back to Website</span>
              </button>

              <a
                href={`https://wa.me/919934885664?text=${encodeURIComponent(
                  `Hi Balaji Dental Clinic, I booked appointment ${bookedAppointment.id} for ${bookedAppointment.patientName} on ${bookedAppointment.date} (${bookedAppointment.treatment}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={handleResetForm}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
