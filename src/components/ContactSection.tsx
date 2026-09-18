import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  MessageCircle
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { ToothIcon } from './DentalIcons';
import { CLINIC_GOOGLE_MAPS_URL } from '../data/initialData';

export const ContactSection: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const { addLead } = useClinic();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [treatment, setTreatment] = useState('Invisalign Consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    addLead({
      name: name.trim(),
      phone: phone.trim(),
      treatment,
      source: 'Website',
      notes: message.trim() || 'Requested fast callback via contact section',
      status: 'New'
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setMessage('');
  };

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
            Visit our modern clinic or request an immediate callback from our care team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          {/* Left 6 cols: Clinic Details, Timings & Emergency */}
          <div className="lg:col-span-6 space-y-6">
            {/* Main Location Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
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
                    href="https://www.google.com/maps/place/Balaji+Dental+Clinic/@25.6171773,85.1257982,17z/data=!4m6!3m5!1s0x39ed5838210a770f:0xf917268ee4342675!8m2!3d25.6171773!4d85.1257982"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline mt-2.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps / Get Driving Route</span>
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="pt-4 border-t border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Consultation Timings</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                    Morning: <span className="font-bold text-slate-800">10:00 AM – 2:00 PM</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Evening: <span className="font-bold text-slate-800">5:00 PM – 8:00 PM</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Working Days: <span className="font-semibold text-slate-800">Wednesday – Monday</span>
                  </p>
                  <p className="text-xs font-bold text-rose-600 mt-1 inline-flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    <span>Tuesday: Strictly CLOSED (All day)</span>
                  </p>
                  <p className="text-xs text-sky-700 font-medium mt-1">
                    Doctor Consultation Fee: <span className="font-bold">₹500</span>
                  </p>
                </div>
              </div>

              {/* Direct Phones */}
              <div className="pt-4 border-t border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Direct Helpline & WhatsApp</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm font-bold text-slate-800">
                    <a href="tel:+919934885664" className="hover:text-sky-700 text-sky-600">
                      +91 99348 85664
                    </a>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">drparijatpallav@gmail.com • balajidentalbraces.com</p>
                </div>
              </div>
            </div>

            {/* Emergency Dental Protocol Banner */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-amber-900">Immediate Dental Emergency?</h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Severe toothache, fractured tooth, or urgent braces adjustment? Call our direct clinic helpline for prompt assistance.
                </p>
                <a
                  href="tel:+919934885664"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 underline mt-1"
                >
                  Call Urgent Helpline (+91 99348 85664)
                </a>
              </div>
            </div>
          </div>

          {/* Right 6 cols: Fast Callback Request Form (Feeds Unified CRM Leads) */}
          <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div>
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">Fast Response Desk</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-1">
                Request a Callback
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Leave your number and our clinical coordinator will call you back promptly.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleCallbackSubmit} className="space-y-4 text-xs" id="callback-request-form">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Singh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Treatment of Interest</label>
                  <select
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30 font-medium"
                  >
                    <option value="Invisalign Consultation">Invisalign Clear Aligners</option>
                    <option value="Dental Implants Inquiry">Dental Implants</option>
                    <option value="Single Sitting RCT">Root Canal Treatment (RCT)</option>
                    <option value="Laser Teeth Whitening">Laser Teeth Whitening</option>
                    <option value="General Checkup">General Dental Checkup</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Any Specific Query (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Let us know your preferred time or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Instant Callback</span>
                </button>
              </form>
            ) : (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-950">Callback Request Received</h4>
                <p className="text-xs text-emerald-800">
                  Our front-desk team has logged your inquiry. We will reach out shortly!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-emerald-700 underline cursor-pointer"
                >
                  Submit another request
                </button>
              </div>
            )}
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
