import React, { useState } from 'react';
import {
  Sparkles,
  Smile,
  ShieldCheck,
  Zap,
  Activity,
  Crown,
  Scissors,
  Flame,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  Clock,
  Tag,
  X,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { Treatment } from '../types';
import { ToothIcon } from './DentalIcons';

interface TreatmentsSectionProps {
  onBookTreatment: (treatmentTitle: string) => void;
  onOpenEmergency?: () => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({ onBookTreatment, onOpenEmergency }) => {
  const { treatments } = useClinic();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const categories = ['All', 'Orthodontics', 'Implantology', 'Cosmetic', 'Endodontics', 'Surgery', 'General'];

  const filteredTreatments =
    activeCategory === 'All'
      ? treatments
      : treatments.filter((t) => t.category === activeCategory);

  const getTreatmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-sky-600" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-sky-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-sky-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-sky-600" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-sky-600" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-sky-600" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-sky-600" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-sky-600" />;
      default:
        return <ToothIcon className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <section id="treatments" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-200">
            <ToothIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>Treatments & Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Advanced Dental Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Specialized care tailored for precision smile aesthetics, oral rehabilitation, and comfortable pain-free procedures.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Red Emergency Button in Services */}
            {onOpenEmergency && (
              <button
                onClick={onOpenEmergency}
                id="services-red-emergency-btn"
                className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-rose-600 hover:bg-rose-700 active:scale-95 text-white transition-all cursor-pointer shadow-sm shadow-rose-600/30 border border-rose-500 flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>🚨 Emergency (24/7)</span>
              </button>
            )}
          </div>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {filteredTreatments.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-sky-500/40 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Image & Popular Tag */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                {item.isPopular && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
                    Most Popular
                  </div>
                )}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-sky-800 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  {getTreatmentIcon(item.iconName)}
                  <span>{item.category}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Key specs */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>{item.duration}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold text-slate-700">{item.priceRange}</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedTreatment(item)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onBookTreatment(item.title)}
                    className="py-2 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Red Emergency Care Banner in Services Section */}
        {onOpenEmergency && (
          <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50 via-rose-100/60 to-rose-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/20">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-rose-950 flex items-center gap-2">
                  <span>Dental Emergency & Acute Tooth Pain?</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">24/7 Support</span>
                </h4>
                <p className="text-xs text-rose-800 leading-snug mt-0.5">
                  Access step-by-step immediate first-aid protocols, knocked-out tooth preservation, and priority clinic contact.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenEmergency}
              id="services-emergency-cta-banner-btn"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/20 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              <span>Open Emergency Care Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Detailed Treatment Modal */}
      {selectedTreatment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto text-left animate-fadeIn">
            <button
              onClick={() => setSelectedTreatment(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <span className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                {getTreatmentIcon(selectedTreatment.iconName)}
              </span>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                {selectedTreatment.category} Care
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 font-heading mb-2">
              {selectedTreatment.title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedTreatment.fullDesc}
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 bg-sky-50/70 p-4 rounded-2xl border border-sky-100 mb-6 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Expected Treatment Duration:</span>
                <span className="font-bold text-slate-800 text-sm">{selectedTreatment.duration}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Cost Estimate:</span>
                <span className="font-bold text-emerald-700 text-sm">{selectedTreatment.priceRange}</span>
              </div>
            </div>

            {/* Benefits List */}
            <div className="mb-6 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Key Benefits</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedTreatment.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Procedure */}
            <div className="mb-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Clinical Procedure Steps</h4>
              <div className="space-y-2.5">
                {selectedTreatment.procedureSteps.map((step) => (
                  <div key={step.stepNumber} className="flex gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="w-6 h-6 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                      {step.stepNumber}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{step.title}</p>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            {selectedTreatment.faqs.length > 0 && (
              <div className="mb-6 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Frequently Asked Questions</h4>
                {selectedTreatment.faqs.map((faq, i) => (
                  <div key={i} className="text-xs p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <p className="font-bold text-slate-900">Q: {faq.question}</p>
                    <p className="text-slate-600">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Footer CTAs */}
            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedTreatment(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const tTitle = selectedTreatment.title;
                  setSelectedTreatment(null);
                  onBookTreatment(tTitle);
                }}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-600/20 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Treatment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
