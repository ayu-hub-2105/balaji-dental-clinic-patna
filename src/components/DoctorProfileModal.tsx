import React from 'react';
import { Doctor } from '../types';
import { X, CheckCircle, Calendar, Clock, Star, Award, Sparkles } from 'lucide-react';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookWithDoctor: (doctorName: string) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  onClose,
  onBookWithDoctor,
}) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto text-left animate-fadeIn">
        <button
          onClick={onClose}
          aria-label="Close Doctor Profile"
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row gap-5 items-start mb-6">
          <img
            src={doctor.photoUrl || '/real_clinic/dr_parijat_about.webp'}
            alt={doctor.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top border border-slate-200 shadow-md shrink-0"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/real_clinic/dr_parijat_about.webp';
            }}
          />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold">
                <Award className="w-3 h-3 text-sky-600" />
                <span>{doctor.experienceYears}+ Years Experience</span>
              </span>
              {doctor.isHeadDoctor && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Chief Specialist</span>
                </span>
              )}
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading">{doctor.name}</h3>
            <p className="text-sm font-semibold text-sky-700">{doctor.title}</p>
            <p className="text-xs text-slate-500">{doctor.qualification}</p>
            <div className="flex items-center gap-1 text-xs text-amber-600 font-bold pt-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{doctor.rating}</span>
              <span className="text-slate-400 font-normal">({doctor.reviewCount}+ verified reviews)</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700">
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Clinical Biography</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{doctor.bio}</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-2">Specializations &amp; Treatments</h4>
            <div className="flex flex-wrap gap-1.5">
              {doctor.treatmentExpertise.map((trt, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-100 text-xs font-semibold"
                >
                  {trt}
                </span>
              ))}
            </div>
          </div>

          {doctor.achievements && doctor.achievements.length > 0 && (
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Key Accreditations &amp; Memberships</h4>
              <ul className="space-y-1.5">
                {doctor.achievements.map((ach, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-sky-700">
              <Clock className="w-3.5 h-3.5" />
              <span>Consultation Hours &amp; Availability</span>
            </h4>
            <p className="text-xs text-slate-700 font-medium">{doctor.timings}</p>
            <p className="text-xs text-sky-800 font-semibold">
              Available Days: {doctor.availabilityDays.join(', ')}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              const docName = doctor.name;
              onClose();
              onBookWithDoctor(docName);
            }}
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm cursor-pointer transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment with {doctor.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
