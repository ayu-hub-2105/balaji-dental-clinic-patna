import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  AlertTriangle,
  Navigation,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { ToothIcon } from './DentalIcons';
import { CLINIC_GOOGLE_MAPS_URL } from '../data/initialData';

export const ContactSection: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  return (
    <section id="contact" className="py-14 md:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-100">
            <ToothIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>Contact & Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Visit our modern clinic in Kidwaipuri, Patna, or call our direct helpline for consultations and urgent inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          {/* Main Location & Timings Box (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Clinic Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Clinic Address & Landmark</h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed font-medium">
                    House Number 7, Road Number 4, Sri Krishna Nagar, Kidwaipuri, Patna, Bihar – 800001
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Landmark: Near Bank of India, Boring Canal Road, Patna
                  </p>
                  <a
                    href={CLINIC_GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline mt-2.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps / Get Driving Route →</span>
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="pt-5 border-t border-slate-200/80 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Consultation Timings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5 text-xs sm:text-sm text-slate-700">
                    <p className="bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                      Morning: <span className="font-bold text-slate-900">10:00 AM – 2:00 PM</span>
                    </p>
                    <p className="bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                      Evening: <span className="font-bold text-slate-900">5:00 PM – 8:00 PM</span>
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-700">Wednesday – Monday</span>
                    <span className="font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                      Tuesday: Strictly CLOSED
                    </span>
                    <span className="text-sky-700 font-semibold bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                      Consultation Fee: ₹500
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Row */}
            <div className="pt-5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Direct Helpline</div>
                  <a href="tel:+919934885664" className="text-base font-extrabold text-sky-700 hover:text-sky-800">
                    +91 99348 85664
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/919934885664"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onBookClick}
                  className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Emergency Support & Priority Assistance Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-50 border border-amber-200 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider">Priority Dental Assistance</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-1">
                  Immediate Dental Emergency?
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                  Suffering from acute toothache, chipped or fractured tooth, broken braces bracket, or lost dental filling? We provide urgent same-day consultations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Emergency Assistance:</span>
                  <span className="text-emerald-700">Available During Clinic Hours</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Direct Hotline:</span>
                  <a href="tel:+919934885664" className="font-bold text-amber-900 underline">
                    +91 99348 85664
                  </a>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Clinic Status on Tuesday:</span>
                  <span className="text-rose-600 font-bold">Closed</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="tel:+919934885664"
                className="w-full py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>Call Urgent Clinic Helpline</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Google Maps & Route Section */}
        <div className="mt-12 bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-6 sm:p-8 border-b border-slate-200/80 bg-[#0284c7] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-100 text-xs font-bold mb-2">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>Find Us On Google Maps</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                Balaji Dental & Orthodontic Clinic, Patna
              </h3>
              <p className="text-xs sm:text-sm text-sky-100 mt-1 font-normal">
                House No. 7, Road No. 4, Sri Krishna Nagar, Kidwaipuri, Patna – 800001 (Near Bank of India, Boring Canal Road)
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a
                href={CLINIC_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
              <a
                href={CLINIC_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>View Google Photos & Reviews</span>
              </a>
              <button
                onClick={onBookClick}
                className="px-5 py-2.5 rounded-xl bg-white text-sky-900 hover:bg-sky-50 font-bold text-xs transition-all cursor-pointer shadow-xs"
              >
                Book Visit
              </button>
            </div>
          </div>

          {/* Embedded Map iFrame with Authentic Clinic Street Coordinates */}
          <div className="relative w-full h-[380px] sm:h-[450px] bg-slate-200">
            <iframe
              title="Balaji Dental Clinic Google Maps Location"
              src="https://maps.google.com/maps?q=25.6171773,85.1257982+(Balaji+Dental+Clinic)&t=&z=17&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Floating Verified Google Business Profile & Photo Preview */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl max-w-md text-left">
              <div className="flex items-start gap-3">
                <img
                  src="/real_clinic/clinic_google_maps_exterior.jpg"
                  alt="Balaji Dental Clinic Exterior Google Maps"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to internal clinic photo
                    (e.target as HTMLImageElement).src = '/real_clinic/gallery_op_1.webp';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs mb-0.5">
                    <span className="truncate">Balaji Dental Clinic</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold shrink-0">
                      Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    House 7, Road 4, Sri Krishna Nagar, Kidwaipuri, Patna.
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 text-[11px]">
                    <span className="text-emerald-700 font-bold">10am-2pm & 5pm-8pm</span>
                    <a
                      href={CLINIC_GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-sky-700 hover:underline"
                    >
                      5.0★ Google Profile →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
