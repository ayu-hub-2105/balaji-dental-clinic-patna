import React from 'react';
import {
  Stethoscope,
  Tv,
  Users,
  Award,
  FileCheck2,
  CalendarCheck,
  PhoneCall,
  Star,
  Heart
} from 'lucide-react';
import { ToothIcon } from './DentalIcons';

export const AboutSection: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const trustStats = [
    { icon: <Award className="w-5 h-5 text-amber-500" />, value: '16+', label: 'Years Experience' },
    { icon: <Users className="w-5 h-5 text-sky-500" />, value: '15,000+', label: 'Smiles Treated' },
    { icon: <Stethoscope className="w-5 h-5 text-emerald-500" />, value: '7', label: 'Specialist Doctors' },
    { icon: <Star className="w-5 h-5 text-rose-500 fill-rose-500" />, value: '5.0', label: 'Google Rating' }
  ];

  const patientTrustPillars = [
    {
      icon: <Stethoscope className="w-5 h-5 text-emerald-600" />,
      image: '/real_clinic/consultation_treatment_room.jpg',
      title: "Doctor's Consultation & Treatment Room"
    },
    {
      icon: <Tv className="w-5 h-5 text-sky-600" />,
      image: '/real_clinic/modern_operatory_tv.jpg',
      title: 'Modern Treatment Room with Entertainment Screen'
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      image: '/real_clinic/clinic_team_group.jpg',
      title: 'Our Dedicated Clinic Team'
    },
    {
      icon: <Award className="w-5 h-5 text-amber-600" />,
      image: '/real_clinic/invisalign_provider_wall.jpg',
      title: 'Certified Invisalign Provider'
    },
    {
      icon: <FileCheck2 className="w-5 h-5 text-rose-600" />,
      image: '/real_clinic/waiting_area_reception.webp',
      title: 'Waiting Area & Certified Excellence'
    },
    {
      icon: <Heart className="w-5 h-5 text-pink-600" />,
      image: '/real_clinic/smile_with_patient.webp',
      title: 'Celebrating a Smile Transformation with Our Patient'
    }
  ];

  return (
    <section id="about" className="py-14 md:py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 text-left">
          {/* Tag & Heading */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-200">
              <ToothIcon className="w-3.5 h-3.5 text-sky-600" />
              <span>Why Patna Trusts Balaji Dental Clinic</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              Why Choose Us?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Not just claims — standards you can see and verify chairside.
            </p>
          </div>

          {/* Visual Trust Stat Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {trustStats.map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight tabular-nums">{stat.value}</p>
                  <p className="text-[11px] text-slate-500 font-medium truncate">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* High-Trust Clinical Proof Cards — real clinic photos, hover to explore */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {patientTrustPillars.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-sky-300 transition-all duration-300 overflow-hidden text-left group"
              >
                <div className="h-36 sm:h-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="px-5 pb-5">
                  <div className="-mt-5 mb-2.5 w-10 h-10 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTA Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-slate-900 font-heading">
                Experience Transparent, Pain-Free Dental Care
              </h4>
              <p className="text-xs text-slate-500">
                100% Sterile Instruments Unsealed In Front of You • 3D Scan Smile Simulation Available
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Schedule Visit</span>
              </button>

              <a
                href="tel:+919934885664"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-800 font-bold text-xs sm:text-sm transition-all whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-sky-600" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
