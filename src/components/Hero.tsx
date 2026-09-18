import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone, MessageCircle, Star, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { ToothIcon } from './DentalIcons';
import { CLINIC_GOOGLE_MAPS_URL } from '../data/initialData';

interface HeroProps {
  onBookClick: () => void;
  onWhatsAppClick: () => void;
}

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

export const Hero: React.FC<HeroProps> = ({ onBookClick, onWhatsAppClick }) => {
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

            {/* Key Stats Row */}
            <div className="pt-8 sm:pt-10 border-t border-slate-100 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 tracking-tight">15,000+</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Happy Smiles</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 tracking-tight">16+</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Years Experience</div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
                  <span>5.0</span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">Google Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Doctor Showcase with Initial Official Photo */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-100 relative overflow-hidden text-left space-y-4">
              {/* Grand Doctor Photo Showcase */}
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[4/3] sm:aspect-[16/12] bg-slate-900 group">
                <img
                  src="/real_clinic/dr_parijat_about.webp"
                  alt="Dr. Parijat Pallav - Balaji Dental Clinic"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Bottom Overlay with Doctor Credentials */}
                <div className="absolute bottom-0 inset-x-0 p-4 pt-12 bg-gradient-to-t from-slate-950/95 via-slate-900/75 to-transparent text-white">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                        Dr. Parijat Pallav
                      </h3>
                      <p className="text-xs text-sky-200 font-semibold mt-0.5">
                        BDS, MDS (Orthodontics & Dentofacial Orthopaedics)
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
                  <p className="text-[11px] text-slate-300 mt-1 font-medium">
                    16+ Years Clinical Excellence • Certified Diamond Invisalign Provider
                  </p>
                </div>
              </div>

              {/* Clinic Highlights Bento */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">16+ Years</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Clinical Practice</p>
                </div>
                <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100">
                  <p className="text-base sm:text-lg font-extrabold text-sky-700 font-heading">Diamond</p>
                  <p className="text-[11px] text-sky-700 mt-0.5">Invisalign Provider</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">100% Sterile</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">ISO Safety Protocols</p>
                </div>
                <a
                  href={CLINIC_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 hover:bg-amber-100 transition-colors block group"
                  title="View verified rating on Google Maps"
                >
                  <div className="flex items-center gap-1">
                    <p className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">5.0 ★</p>
                  </div>
                  <p className="text-[11px] text-amber-900 font-bold mt-0.5 group-hover:underline">Google Reviews ↗</p>
                </a>
              </div>

              {/* Team Roster Avatars */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center -space-x-2">
                  <img src="/real_clinic/dr_parijat_about.webp" alt="Dr. Parijat Pallav" className="w-8 h-8 rounded-full border-2 border-white object-cover object-top shadow-2xs" />
                  <img src="/doctors/dr_kalptaru_kislay.jpg" alt="Dr. Kalptaru Kislay" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-2xs" />
                  <img src="/doctors/dr_alankrita_srivastava.jpg" alt="Dr. Alankrita Srivastava" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-2xs" />
                  <img src="/doctors/dr_rashmi.jpg" alt="Dr. Rashmi" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-2xs" />
                  <img src="/doctors/dr_srishty_rose.jpg" alt="Dr. Srishty Rose" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-2xs" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-sky-600 text-white text-[10px] font-bold flex items-center justify-center shadow-2xs">
                    +2
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-800">7 Specialist Doctors</p>
                  <a href="#doctors" className="text-[10px] text-sky-600 font-bold hover:underline">
                    View All Doctor Profiles →
                  </a>
                </div>
              </div>

              {/* Consultation CTA & Google Maps Action */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={onBookClick}
                  className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with Dr. Parijat (₹500)</span>
                </button>

                <a
                  href={CLINIC_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                  id="hero-google-maps-btn"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>View Clinic on Google Maps (Directions & Photos) ↗</span>
                </a>
              </div>

              {/* Clean Trust Strip */}
              <div className="px-1 flex items-center justify-between text-xs text-slate-500 pt-0.5">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ISO Certified Clinic</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
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
