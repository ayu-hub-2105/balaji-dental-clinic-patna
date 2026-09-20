import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowUp,
  Calendar,
  Clock,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Navigation,
  Stethoscope,
  ExternalLink
} from 'lucide-react';
import { BalajiLogo, ToothIcon } from './DentalIcons';

const TRUST_PILLARS = [
  {
    id: 'exp',
    title: '16+ Years Experience',
    desc: '15,000+ happy smiles crafted',
    icon: <Award className="w-5 h-5" />,
    colorBg: 'bg-amber-50',
    colorBorder: 'border-amber-200/80',
    colorText: 'text-amber-600'
  },
  {
    id: 'invisalign',
    title: 'Invisalign Diamond Clinic',
    desc: '3D iTero intraoral digital scans',
    icon: <Sparkles className="w-5 h-5" />,
    colorBg: 'bg-sky-50',
    colorBorder: 'border-sky-200/80',
    colorText: 'text-sky-600'
  },
  {
    id: 'sterilization',
    title: 'Class-B Sterilization',
    desc: '100% sterile infection protocol',
    icon: <ShieldCheck className="w-5 h-5" />,
    colorBg: 'bg-emerald-50',
    colorBorder: 'border-emerald-200/80',
    colorText: 'text-emerald-600'
  },
  {
    id: 'emi',
    title: '0% Interest EMI Option',
    desc: 'Easy monthly installments',
    icon: <CheckCircle2 className="w-5 h-5" />,
    colorBg: 'bg-indigo-50',
    colorBorder: 'border-indigo-200/80',
    colorText: 'text-indigo-600'
  }
];

export const Footer: React.FC<{
  onBookClick: () => void;
  onAdminToggle: () => void;
  onNavigate?: (view: string, hash?: string) => void;
  onDoctorClick?: (doctorName: string) => void;
}> = ({ onBookClick, onAdminToggle, onNavigate, onDoctorClick }) => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [isPillarPaused, setIsPillarPaused] = useState(false);

  // Auto-slide trust pillars every 3.5 seconds on mobile, pausing on hover/touch
  useEffect(() => {
    if (isPillarPaused) return;

    const timer = setInterval(() => {
      setActivePillarIndex((prev) => (prev + 1) % TRUST_PILLARS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPillarPaused]);

  const nextPillar = () => {
    setActivePillarIndex((prev) => (prev + 1) % TRUST_PILLARS.length);
  };

  const prevPillar = () => {
    setActivePillarIndex((prev) => (prev - 1 + TRUST_PILLARS.length) % TRUST_PILLARS.length);
  };

  const currentPillar = TRUST_PILLARS[activePillarIndex];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Feature & Trust Pillars Banner - Clean light slate background right after Google Maps */}
      <section className="bg-slate-50 border-t border-b border-slate-200/80 py-5 sm:py-8 text-left relative z-10" id="clinic-trust-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Auto-Slide View (Takes minimal space, auto-slides, pauses on touch/hover) */}
          <div
            className="block sm:hidden"
            onMouseEnter={() => setIsPillarPaused(true)}
            onMouseLeave={() => setIsPillarPaused(false)}
            onTouchStart={() => setIsPillarPaused(true)}
            onTouchEnd={() => setIsPillarPaused(false)}
          >
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3 min-h-[72px] transition-all duration-300">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-11 h-11 rounded-xl ${currentPillar.colorBg} border ${currentPillar.colorBorder} flex items-center justify-center ${currentPillar.colorText} shrink-0`}>
                  {currentPillar.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-900 leading-snug truncate">
                    {currentPillar.title}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {currentPillar.desc}
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-extrabold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 shrink-0">
                {activePillarIndex + 1}/{TRUST_PILLARS.length}
              </span>
            </div>

            {/* Mobile Controls & Indicator Dots */}
            <div className="flex items-center justify-between mt-2.5 px-1">
              <button
                onClick={prevPillar}
                aria-label="Previous feature"
                className="w-7 h-7 rounded-full bg-slate-200/70 hover:bg-slate-300 active:scale-95 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {TRUST_PILLARS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePillarIndex(idx)}
                    aria-label={`Go to ${p.title}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === activePillarIndex ? 'w-5 bg-sky-600' : 'w-1.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPillar}
                aria-label="Next feature"
                className="w-7 h-7 rounded-full bg-slate-200/70 hover:bg-slate-300 active:scale-95 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tablet & Desktop View (Full 4-column Grid) */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST_PILLARS.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all"
              >
                <div className={`w-11 h-11 rounded-xl ${item.colorBg} border ${item.colorBorder} flex items-center justify-center ${item.colorText} shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Streamlined Medical Blue Footer */}
      <footer className="bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#075985] text-white pt-10 sm:pt-12 pb-12 border-t border-sky-400/20 text-left shadow-2xl relative overflow-hidden">
        {/* Subtle Background Aesthetic Lighting */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main 5-Column Detailed Directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/15">
          {/* Column 1: Brand & Doctor Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <BalajiLogo variant="white" />

            <div
              onClick={() => onDoctorClick && onDoctorClick('Dr. Parijat Pallav')}
              role={onDoctorClick ? 'button' : undefined}
              tabIndex={onDoctorClick ? 0 : undefined}
              className={`p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2 text-left transition-all ${
                onDoctorClick ? 'cursor-pointer hover:bg-white/20 hover:border-amber-400/50 group' : ''
              }`}
              title="Click to view Dr. Parijat Pallav full profile"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <ToothIcon className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                      <span>Dr. Parijat Pallav</span>
                      <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">View Profile ↗</span>
                    </h4>
                    <p className="text-[11px] text-sky-200">MDS (Orthodontics & Dentofacial Orthopaedics)</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-sky-100/90 leading-relaxed pt-1 border-t border-white/10">
                Senior Consultant Orthodontist with 16+ years of clinical excellence in clear aligners, complex braces, and comprehensive dental rehabilitation in Patna.
              </p>
            </div>

            <p className="text-xs text-sky-100/80 leading-relaxed">
              Balaji Dental & Orthodontic Clinic is dedicated to providing painless, gentle, and transparent oral healthcare with advanced 3D diagnostics and international safety standards.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href="https://www.google.com/maps/place/Balaji+Dental+Clinic/@25.6171773,85.1257982,17z/data=!4m6!3m5!1s0x39ed5838210a770f:0xf917268ee4342675!8m2!3d25.6171773!4d85.1257982"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sky-100 hover:text-white border border-white/15 transition-colors shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-300" />
                <span>Google Maps Route</span>
              </a>

              <a
                href="https://wa.me/919934885664"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 hover:text-white border border-emerald-400/30 transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-300" />
                <span>WhatsApp Helpline</span>
              </a>

              <button
                type="button"
                onClick={onAdminToggle}
                id="footer-card-doctor-portal-button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold border border-amber-300 shadow-sm transition-all cursor-pointer active:scale-95"
                title="Doctor & Clinic Staff Portal (Patient Database, Appointments, Integrations)"
              >
                <Stethoscope className="w-3.5 h-3.5 text-slate-950" />
                <span>Doctor Portal</span>
              </button>
            </div>
          </div>

          {/* Column 2: Key Dental Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5 text-xs text-left">
            <h4 className="font-bold text-xs text-amber-300 tracking-wider uppercase flex items-center gap-1.5">
              <span>Treatments & Services</span>
            </h4>
            <ul className="space-y-2.5 text-sky-100">
              <li>
                <a href="#treatments" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Invisalign Clear Aligners</span>
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Ceramic & Self-Ligating Braces</span>
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Computer-Guided Dental Implants</span>
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Single-Sitting Painless RCT</span>
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Laser Teeth Whitening</span>
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Zirconia Crowns & Bridges</span>
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Painless Wisdom Tooth Removal</span>
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Pediatric Dental Care for Kids</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation & Patient Info (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5 text-xs text-left">
            <h4 className="font-bold text-xs text-amber-300 tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sky-100">
              <li>
                <a href="#home" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Why Choose Us</span>
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Our Doctors</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Smile Gallery</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('blog-articles') : window.location.href = '#blogs'}
                  className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Articles & Blog</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('dental-guidance') : null}
                  className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Dental Guidance & Tips</span>
                </button>
              </li>
              <li>
                <a href="#emi-calculator" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 text-amber-200 font-semibold">
                  <ChevronRight className="w-3 h-3 text-amber-300" />
                  <span>0% EMI Calculator</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('emergency') : window.location.href = '#emergency'}
                  className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 text-rose-200 font-semibold text-left cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-rose-300" />
                  <span>Emergency Care Guide (24/7)</span>
                </button>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Patient Reviews</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-sky-300" />
                  <span>Contact & Map</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Timings & Direct Helpdesk (3 cols) */}
          <div className="lg:col-span-3 space-y-4 text-xs text-left">
            <h4 className="font-bold text-xs text-amber-300 tracking-wider uppercase">
              Clinic Timings & Helpdesk
            </h4>

            <div className="space-y-3 text-sky-100 bg-white/10 p-4 rounded-2xl border border-white/15">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-white">Consultation Hours:</div>
                  <div>Morning: <span className="font-semibold text-white">10:00 AM – 2:00 PM</span></div>
                  <div>Evening: <span className="font-semibold text-white">5:00 PM – 8:00 PM</span></div>
                  <div className="text-[11px] text-sky-200 font-medium">Open: Wednesday – Monday</div>
                  <div className="text-[11px] text-rose-300 font-bold bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30 inline-block">
                    Tuesday: CLOSED (Every Tuesday Closed)
                  </div>
                  <div className="text-[11px] text-amber-200 font-medium">Consultation Fee: ₹500</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="text-white font-medium">House No. 7, Road No. 4, Sri Krishna Nagar,</span> Kidwaipuri, Patna, Bihar – 800001
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <div>
                  <a href="tel:+919934885664" className="hover:text-amber-200 font-bold text-white text-sm">
                    +91 99348 85664
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={onBookClick}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment Online</span>
              </button>
            </div>
          </div>
        </div>

        {/* Medical Panel Doctors Bar */}
        <div className="py-6 border-b border-white/15 text-left text-xs">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <p className="text-amber-300 font-bold text-[11px] uppercase tracking-wider">
              Balaji Dental Medical Team & Consultant Specialists:
            </p>
            <span className="text-[10px] text-sky-200 hidden sm:inline-block">
              (Click any doctor name to view full profile &amp; qualifications)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sky-100 text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => onDoctorClick && onDoctorClick('Dr. Parijat Pallav')}
              className="font-bold text-white bg-white/15 hover:bg-amber-400 hover:text-slate-950 px-3 py-1 rounded-lg border border-white/20 hover:border-amber-300 transition-all cursor-pointer flex items-center gap-1 shadow-xs"
              title="View Dr. Parijat Pallav profile"
            >
              <span>⭐ Dr. Parijat Pallav (MDS Orthodontics)</span>
              <span className="text-[10px] opacity-75">↗</span>
            </button>

            <button
              type="button"
              onClick={() => onDoctorClick && onDoctorClick('Dr. Kalptaru Kislay')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/20 text-sky-100 hover:text-white border border-white/10 hover:border-white/30 transition-all cursor-pointer flex items-center gap-1"
              title="View Dr. Kalptaru Kislay profile"
            >
              <span>• Dr. Kalptaru Kislay (MDS)</span>
              <span className="text-[10px] opacity-75">↗</span>
            </button>

            <button
              type="button"
              onClick={() => onDoctorClick && onDoctorClick('Dr. Alankrita Srivastava')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/20 text-sky-100 hover:text-white border border-white/10 hover:border-white/30 transition-all cursor-pointer flex items-center gap-1"
              title="View Dr. Alankrita Srivastava profile"
            >
              <span>• Dr. Alankrita Srivastava (MDS)</span>
              <span className="text-[10px] opacity-75">↗</span>
            </button>

            <button
              type="button"
              onClick={() => onDoctorClick && onDoctorClick('Dr. Rashmi')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/20 text-sky-100 hover:text-white border border-white/10 hover:border-white/30 transition-all cursor-pointer flex items-center gap-1"
              title="View Dr. Rashmi profile"
            >
              <span>• Dr. Rashmi (BDS)</span>
              <span className="text-[10px] opacity-75">↗</span>
            </button>

            <button
              type="button"
              onClick={() => onDoctorClick && onDoctorClick('Dr. Srishty Rose')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/20 text-sky-100 hover:text-white border border-white/10 hover:border-white/30 transition-all cursor-pointer flex items-center gap-1"
              title="View Dr. Srishty Rose profile"
            >
              <span>• Dr. Srishty Rose (BDS)</span>
              <span className="text-[10px] opacity-75">↗</span>
            </button>

            <button
              type="button"
              onClick={() => onDoctorClick && onDoctorClick('Dr. Harsh Ranjan')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/20 text-sky-100 hover:text-white border border-white/10 hover:border-white/30 transition-all cursor-pointer flex items-center gap-1"
              title="View Dr. Harsh Ranjan profile"
            >
              <span>• Dr. Harsh Ranjan (MDS)</span>
              <span className="text-[10px] opacity-75">↗</span>
            </button>

            <button
              type="button"
              onClick={() => onDoctorClick && onDoctorClick('Dr. Piyush')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/20 text-sky-100 hover:text-white border border-white/10 hover:border-white/30 transition-all cursor-pointer flex items-center gap-1"
              title="View Dr. Piyush profile"
            >
              <span>• Dr. Piyush (MDS)</span>
              <span className="text-[10px] opacity-75">↗</span>
            </button>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-sky-100 gap-4">
          <div className="text-[11px] text-sky-200 text-center sm:text-left leading-relaxed">
            <div>
              © {new Date().getFullYear()} Balaji Dental &amp; Orthodontic Clinic (balajidentalbraces.com). All rights reserved.
            </div>
            <div className="mt-1 flex items-center justify-center sm:justify-start gap-1.5 text-white/95">
              <span>Website Designed &amp; Developed by</span>
              <a
                href="https://www.aykasys.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-amber-300 hover:text-white underline underline-offset-2 transition-colors inline-flex items-center gap-1"
                title="Visit AykaSys - www.aykasys.com"
              >
                <span>AykaSys</span>
                <ExternalLink className="w-3 h-3 text-amber-300" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onAdminToggle}
              id="footer-doctor-portal-button"
              className="text-sky-200 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-900/60 hover:bg-sky-800/80 border border-sky-600/40"
              title="Open Doctor & Clinic Admin Portal (Remedo / Dr. Klick Sync)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Doctor & Staff Portal</span>
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  </>
);
};

