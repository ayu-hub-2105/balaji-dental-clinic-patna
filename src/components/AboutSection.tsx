import React from 'react';
import { ShieldCheck, Sparkles, Microscope, HeartPulse, CheckCircle2, ArrowRight } from 'lucide-react';
import { ToothIcon } from './DentalIcons';

export const AboutSection: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-sky-600" />,
      title: 'NABH Grade Sterilization',
      desc: 'Class-B fractionated autoclaves ensuring 100% sterile patient safety.'
    },
    {
      icon: <Microscope className="w-5 h-5 text-sky-600" />,
      title: 'Painless Technology',
      desc: 'Rotary endodontics and dental lasers for gentle, comfort-focused care.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-sky-600" />,
      title: 'Invisalign Diamond Clinic',
      desc: 'Digital iTero 3D scanning with instant smile simulations.'
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-sky-600" />,
      title: 'Patient-First Care',
      desc: 'Transparent pricing, customized treatment plans, and zero hidden fees.'
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Brief Story & Vision */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-200">
              <ToothIcon className="w-3.5 h-3.5 text-sky-600" />
              <span>About Our Clinic</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              Clinical Excellence. <br />
              <span className="text-sky-600">Gentle Experience.</span>
            </h2>

            <div className="flex items-center gap-3.5 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <img
                src="/real_clinic/dr_parijat_about.webp"
                alt="Dr. Parijat Pallav"
                className="w-14 h-14 rounded-xl object-cover object-top border border-slate-200 shadow-xs shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900">Dr. Parijat Pallav</h4>
                  <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold">Chief Orthodontist</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">MDS (Orthodontics & Dentofacial Orthopaedics) • 16+ Yrs Exp</p>
              </div>
            </div>

            {/* Concise Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>15k+ Completed Cases</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>16+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Digital 3D Intraoral Scan</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>0% Interest EMI Option</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all cursor-pointer"
              >
                <span>Schedule Clinic Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Clean Feature Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-200 transition-all text-left space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center border border-sky-100">
                  {feat.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-900">{feat.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
