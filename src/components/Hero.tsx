import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone, MessageCircle, Star, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { ToothIcon } from './DentalIcons';
import { CLINIC_GOOGLE_MAPS_URL } from '../data/initialData';

interface HeroProps {
  onBookClick: () => void;
  onWhatsAppClick: () => void;
  onDoctorClick?: (doctorName: string) => void;
}

// Custom animated count-up hook
const useCounter = (target: number, duration: number = 2000, decimals: number = 0) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * target;
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString('en-IN');
};

const wordMotionVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 + i * 0.16,
      duration: 0.55,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export const Hero: React.FC<HeroProps> = ({ onBookClick, onWhatsAppClick, onDoctorClick }) => {
  const smilesCount = useCounter(15000, 2200);
  const yearsCount = useCounter(16, 1800);
  const ratingCount = useCounter(5.0, 1600, 1);

  return (
    <section id="home" className="relative bg-white pt-12 pb-16 sm:pt-16 md:pt-20 lg:pt-24 md:pb-24 overflow-hidden border-b border-slate-100">
      {/* Sleek subtle background tint */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Clear, Spacious Typography & CTAs with generous breathing room */}
          <div className="lg:col-span-7 space-y-7 sm:space-y-8 text-left pt-2 sm:pt-4">
            {/* Main Headline with vertical clearance */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.2] tracking-tight font-heading">
                <span className="inline-block">
                  <motion.span
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={wordMotionVariants}
                    className="inline-block mr-[0.28em]"
                  >
                    Welcome
                  </motion.span>
                  <motion.span
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={wordMotionVariants}
                    className="inline-block"
                  >
                    to
                  </motion.span>
                </span>{' '}
                <br />
                <span className="text-sky-600 inline-block">
                  <motion.span
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={wordMotionVariants}
                    className="inline-block mr-[0.28em]"
                  >
                    Balaji
                  </motion.span>
                  <motion.span
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={wordMotionVariants}
                    className="inline-block mr-[0.28em]"
                  >
                    Dental
                  </motion.span>
                  <motion.span
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    variants={wordMotionVariants}
                    className="inline-block"
                  >
                    Clinic
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* Supporting Subtext with elegant line-height */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Specialized orthodontics, Invisalign clear aligners, and pain-free multi-specialty dental care led by <strong className="font-semibold text-slate-800">Dr. Parijat Pallav (MDS)</strong> and a team of experienced MDS consultants and BDS surgeons.
            </p>

            {/* Doctor Team Quick Strip */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-slate-600">
              <span className="font-bold text-sky-800 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
                Medical Team (7 Doctors):
              </span>
              <span className="text-slate-700 font-medium">
                Dr. Parijat (MDS) • Dr. Kalptaru • Dr. Alankrita • Dr. Rashmi • Dr. Srishty • Dr. Harsh • Dr. Piyush
              </span>
            </div>

            {/* Primary & Secondary Action CTAs - Uncluttered & Spaced Out */}
            <div className="pt-5 sm:pt-7 flex flex-wrap items-center gap-3.5 sm:gap-4.5">
              <button
                onClick={onBookClick}
                id="hero-book-appointment-cta"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-sky-600 hover:bg-sky-700 active:scale-98 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-sky-600/25 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Book Appointment</span>
              </button>

              <button
                onClick={onWhatsAppClick}
                id="hero-whatsapp-cta"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                <span>WhatsApp Us</span>
              </button>

              <a
                href="tel:+919934885664"
                id="hero-call-now-cta"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-slate-700 hover:text-sky-600 font-bold text-sm sm:text-base transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>+91 99348 85664</span>
              </a>
            </div>

            {/* Key Stats Row with Live Count-Up Animation */}
            <div className="pt-8 sm:pt-10 border-t border-slate-100 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 tracking-tight tabular-nums">
                  {smilesCount}+
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">Happy Smiles</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 tracking-tight tabular-nums">
                  {yearsCount}+
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">Years Experience</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1 tabular-nums">
                  <span>{ratingCount}</span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">Google Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Doctor Showcase with Consultation Desk Photo - Perfectly Leveled with Left Column Stats */}
          <div className="lg:col-span-5 relative flex flex-col justify-between">
            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-100 relative overflow-hidden text-left flex flex-col justify-between space-y-3 sm:space-y-3.5">
              {/* Grand Doctor Photo Showcase (Focused & Zoomed on Dr. Parijat Pallav) */}
              <div
                onClick={() => onDoctorClick && onDoctorClick('Dr. Parijat Pallav')}
                className={`relative rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[16/11] sm:aspect-[16/10.5] bg-slate-900 group ${
                  onDoctorClick ? 'cursor-pointer hover:border-sky-400/80 transition-all' : ''
                }`}
                title="Click to view Dr. Parijat Pallav profile"
              >
                <img
                  src="/real_clinic/dr_parijat_consultation_desk.jpg"
                  alt="Dr. Parijat Pallav - Balaji Dental Clinic"
                  className="w-full h-full object-cover object-[center_32%] scale-135 sm:scale-145 group-hover:scale-150 transition-transform duration-500 origin-center"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle top badge */}
                <div className="absolute top-2.5 left-2.5 bg-sky-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-xs flex items-center gap-1.5">
                  <span>Chief Orthodontist</span>
                  <span className="text-amber-300 font-normal text-[10px]">• View Profile ↗</span>
                </div>

                {/* Bottom Overlay with Doctor Credentials */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 pt-10 bg-gradient-to-t from-slate-950/95 via-slate-900/75 to-transparent text-white">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight group-hover:text-amber-300 transition-colors">
                        Dr. Parijat Pallav
                      </h3>
                      <p className="text-[11px] sm:text-xs text-sky-200 font-semibold mt-0.5">
                        BDS, MDS (Orthodontics &amp; Dentofacial Orthopaedics)
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-bold text-xs shadow-xs">
                        <Star className="w-3 h-3 fill-slate-950" />
                        <span>5.0</span>
                      </div>
                      <p className="text-[10px] text-slate-300 font-medium mt-0.5">1,400+ Reviews</p>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1 font-medium">
                    16+ Years Clinical Excellence • Certified Diamond Invisalign Provider
                  </p>
                </div>
              </div>

              {/* Consultation CTA & Google Maps Action */}
              <div className="space-y-2 pt-0.5">
                <button
                  onClick={onBookClick}
                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consult with Dr. Parijat Pallav</span>
                </button>

                <a
                  href={CLINIC_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                  id="hero-google-maps-btn"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>View Clinic on Google Maps (Directions &amp; Photos) ↗</span>
                </a>
              </div>

              {/* Clean Trust Strip */}
              <div className="px-1 flex items-center justify-between text-[11px] text-slate-500 pt-0.5 border-t border-slate-100">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ISO Certified Clinic</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>3D Digital Scans</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
