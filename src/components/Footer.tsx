import React from 'react';
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
  Navigation,
  Stethoscope,
  ExternalLink
} from 'lucide-react';
import { BalajiLogo, ToothIcon } from './DentalIcons';

export const Footer: React.FC<{
  onBookClick: () => void;
  onAdminToggle: () => void;
  onNavigate?: (view: string, hash?: string) => void;
}> = ({ onBookClick, onAdminToggle, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Feature & Trust Pillars Banner - Clean light slate background right after Google Maps */}
      <section className="bg-slate-50 border-t border-b border-slate-200/80 py-8 sm:py-10 text-left relative z-10" id="clinic-trust-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">16+ Years Experience</div>
                <div className="text-xs text-slate-500">15,000+ happy smiles crafted</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Invisalign Diamond Clinic</div>
                <div className="text-xs text-slate-500">3D iTero intraoral digital scans</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Class-B Sterilization</div>
                <div className="text-xs text-slate-500">100% sterile infection protocol</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">0% Interest EMI Option</div>
                <div className="text-xs text-slate-500">Easy monthly installments</div>
              </div>
            </div>
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

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0">
                  <ToothIcon className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">Dr. Parijat Pallav</h4>
                  <p className="text-[11px] text-sky-200">MDS (Orthodontics & Dentofacial Orthopaedics)</p>
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
          <p className="text-amber-300 font-bold text-[11px] uppercase tracking-wider mb-2">
            Balaji Dental Medical Team & Consultant Specialists:
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sky-100 text-[11px] sm:text-xs">
            <span className="font-bold text-white bg-white/15 px-2.5 py-0.5 rounded-md border border-white/20">
              ⭐ Dr. Parijat Pallav (MDS Orthodontics)
            </span>
            <span>• Dr. Kalptaru Kislay (MDS)</span>
            <span>• Dr. Alankrita Srivastava (MDS)</span>
            <span>• Dr. Rashmi (BDS)</span>
            <span>• Dr. Srishty Rose (BDS)</span>
            <span>• Dr. Harsh Ranjan (MDS)</span>
            <span>• Dr. Piyush (MDS)</span>
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

