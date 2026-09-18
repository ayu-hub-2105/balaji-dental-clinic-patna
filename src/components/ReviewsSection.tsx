import React, { useState } from 'react';
import { Star, CheckCircle, Quote, Plus, X, MessageSquare } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { ToothIcon } from './DentalIcons';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useClinic();
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [patientName, setPatientName] = useState('');
  const [treatment, setTreatment] = useState('Invisalign Clear Aligners');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !reviewText.trim()) return;

    addReview({
      patientName: patientName.trim(),
      treatment,
      rating,
      reviewText: reviewText.trim(),
      source: 'Website'
    });

    setPatientName('');
    setReviewText('');
    setShowModal(false);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Google Score Card */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-200">
              <ToothIcon className="w-3.5 h-3.5 text-sky-600" />
              <span>Patient Stories & Ratings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Patient Reviews
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Authentic feedback from patients treated at Balaji Dental & Orthodontic Clinic.
            </p>
          </div>

          {/* Google / Justdial Reviews Badge */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 flex items-center gap-4 shrink-0 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-extrabold text-lg shadow-xs">
              5.0★
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-lg">5.0 / 5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <a
                href="https://www.google.com/maps/place/Balaji+Dental+Clinic/@25.6171773,85.1257982,17z/data=!4m6!3m5!1s0x39ed5838210a770f:0xf917268ee4342675!8m2!3d25.6171773!4d85.1257982"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-700 hover:text-sky-800 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>840+ Verified Google Reviews →</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://www.google.com/maps/place/Balaji+Dental+Clinic/@25.6171773,85.1257982,17z/data=!4m6!3m5!1s0x39ed5838210a770f:0xf917268ee4342675!8m2!3d25.6171773!4d85.1257982"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Google Maps
              </a>
              <button
                onClick={() => setShowModal(true)}
                className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Write Review
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating & Source Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                    via {rev.source}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{rev.patientName}</span>
                    {rev.verified && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                  </h4>
                  <p className="text-[11px] text-sky-600 font-medium">{rev.treatment}</p>
                </div>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">
              Share Your Experience
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Your feedback helps other patients make informed decisions about their dental health.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Verma"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Treatment Received</label>
                <input
                  type="text"
                  required
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-2 rounded-lg border flex items-center justify-center transition-all ${
                        rating >= star
                          ? 'bg-amber-50 border-amber-300 text-amber-500'
                          : 'bg-slate-50 border-slate-200 text-slate-300'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Review</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about your consultation, pain management, and doctor care..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
