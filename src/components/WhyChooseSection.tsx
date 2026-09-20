import React from 'react';
import {
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  ArrowRight,
  PhoneCall,
  CalendarCheck
} from 'lucide-react';
import { ToothIcon } from './DentalIcons';

export const WhyChooseSection: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const features = [
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      bg: 'bg-amber-50',
      border: 'border-amber-200/80',
      title: '16+ Years Experience & 15,000+ Smiles',
      desc: 'Led by Chief Orthodontist Dr. Parijat Pallav (MDS), delivering trusted and predictable smile transformations across Patna and Bihar.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-sky-500" />,
      bg: 'bg-sky-50',
      border: 'border-sky-200/80',
      title: 'Certified Diamond Invisalign Provider',
      desc: 'Equipped with the 3D iTero intraoral digital scanner for invisible clear aligners, zero messy impressions, and simulated treatment outcomes.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      bg: 'bg-emerald-50',
      border: 'border-emerald-200/80',
      title: 'Class-B European Autoclave Sterilization',
      desc: 'Hospital-grade 100% infection control protocol with individualized pouch-sealed sterile instruments opened right in front of every patient.'
    },
    {
      icon: <Clock className="w-6 h-6 text-indigo-500" />,
      bg: 'bg-indigo-50',
      border: 'border-indigo-200/80',
      title: 'Single-Sitting Painless RCT & Laser Dentistry',
      desc: 'Computerized rotary endodontics and dental lasers ensure rapid, gentle root canal therapy and soft-tissue procedures without scalpel or bleeding.'
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-teal-500" />,
      bg: 'bg-teal-50',
      border: 'border-teal-200/80',
      title: 'Transparent Pricing & 0% Interest EMI',
      desc: 'Clear upfront treatment quotations with zero hidden costs, flexible payment plans, and zero-interest EMI options for braces, aligners, and implants.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-rose-500" />,
      bg: 'bg-rose-50',
      border: 'border-rose-200/80',
      title: 'Team of 7 Specialized MDS & BDS Doctors',
      desc: 'Dedicated consultants in Endodontics, Oral Surgery, Periodontics, Prosthodontics, and Pediatric dentistry under one hygienic clinic roof.'
    }
  ];

  return (
    <section id="why-choose" className="py-16 md:py-20 bg-slate-50/70 border-b border-slate-200/70 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-200">
            <ToothIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>Why Balaji Dental Clinic</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
            Why Patients Choose Us for <br />
            <span className="text-sky-600">Advanced, Painless Dental Care</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            From modern 3D digital diagnosis to compassionate, ethical treatment plans — discover why over 15,000 families trust Balaji Dental &amp; Orthodontic Clinic in Kankarbagh, Patna.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 text-left group"
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-2xl ${feat.bg} border ${feat.border} flex items-center justify-center transition-transform group-hover:scale-105`}>
                  {feat.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-sky-600">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mr-2"></span>
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Banner */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold font-heading">
              Ready to Experience Painless &amp; Modern Dentistry?
            </h3>
            <p className="text-xs sm:text-sm text-sky-100">
              Book your consultation with Dr. Parijat Pallav &amp; our specialist team today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={onBookClick}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 active:scale-98 text-sky-800 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-sky-600" />
              <span>Book Appointment</span>
            </button>

            <a
              href="tel:+919934885664"
              className="px-5 py-3 rounded-xl bg-sky-900/60 hover:bg-sky-900/80 active:scale-98 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-sky-300" />
              <span>+91 99348 85664</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
