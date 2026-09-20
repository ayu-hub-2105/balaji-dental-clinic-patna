import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  CheckCircle,
  Quote,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Pause,
  Play,
  Sparkles
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { ToothIcon } from './DentalIcons';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useClinic();
  const [showModal, setShowModal] = useState(false);
  const [mobileReviewIndex, setMobileReviewIndex] = useState(0);
  const [desktopStartIndex, setDesktopStartIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [rotationKey, setRotationKey] = useState(0);

  // Auto-rotate reviews every 4.5 seconds with visible 3D box rotation,
  // pausing immediately when hovered or explicitly paused
  useEffect(() => {
    if (reviews.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setMobileReviewIndex((prev) => (prev + 1) % reviews.length);
      setDesktopStartIndex((prev) => (prev + 1) % reviews.length);
      setRotationKey((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(timer);
  }, [reviews.length, isPaused]);

  // Form state
  const [patientName, setPatientName] = useState('');
  const [treatment, setTreatment] = useState('Invisalign Clear Aligners');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const nextMobileReview = () => {
    setDirection(1);
    setMobileReviewIndex((prev) => (prev + 1) % reviews.length);
    setRotationKey((prev) => prev + 1);
  };

  const prevMobileReview = () => {
    setDirection(-1);
    setMobileReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setRotationKey((prev) => prev + 1);
  };

  const nextDesktopReview = () => {
    setDirection(1);
    setDesktopStartIndex((prev) => (prev + 1) % reviews.length);
    setRotationKey((prev) => prev + 1);
  };

  const prevDesktopReview = () => {
    setDirection(-1);
    setDesktopStartIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setRotationKey((prev) => prev + 1);
  };

  const currentMobileReview = reviews[mobileReviewIndex] || reviews[0];

  // Pick exactly 3 reviews starting from desktopStartIndex (wrapping around smoothly)
  const visibleDesktopReviews = [
    reviews[desktopStartIndex % reviews.length],
    reviews[(desktopStartIndex + 1) % reviews.length],
    reviews[(desktopStartIndex + 2) % reviews.length]
  ].filter(Boolean);

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
          <div className="w-full md:w-auto p-4 sm:p-5 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 shadow-xs">
            {/* Left: Score & Stars */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-extrabold text-lg shadow-xs shrink-0">
                5.0★
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-nowrap">
                  <span className="font-extrabold text-slate-900 text-lg leading-none whitespace-nowrap shrink-0">5.0 / 5.0</span>
                  <div className="flex text-amber-400 shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 shrink-0" />
                    ))}
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/place/Balaji+Dental+Clinic/@25.6171773,85.1257982,17z/data=!4m6!3m5!1s0x39ed5838210a770f:0xf917268ee4342675!8m2!3d25.6171773!4d85.1257982"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-sky-700 hover:text-sky-800 font-semibold flex items-center gap-1 hover:underline mt-1 whitespace-nowrap"
                >
                  <span>840+ Verified Google Reviews →</span>
                </a>
              </div>
            </div>

            {/* Right: Actions (Google Maps & Write Review) */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-sky-100 sm:border-l sm:pl-4">
              <a
                href="https://www.google.com/maps/place/Balaji+Dental+Clinic/@25.6171773,85.1257982,17z/data=!4m6!3m5!1s0x39ed5838210a770f:0xf917268ee4342675!8m2!3d25.6171773!4d85.1257982"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial text-center px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
              >
                Google Maps
              </a>
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 sm:flex-initial text-center px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-98 text-white text-xs font-bold transition-all cursor-pointer shadow-xs shadow-sky-600/20 whitespace-nowrap"
              >
                Write Review
              </button>
            </div>
          </div>
        </div>

        {/* Interactive 3D Rotation Control Bar & Live Progress Timer */}
        <div className="mb-6 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-left">
          {/* Left: Rotating Status & Progress Indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 ${isPaused ? '' : 'shadow-xs'}`}>
                <RotateCw className={`w-4 h-4 ${isPaused ? 'text-slate-400' : 'text-sky-600 animate-spin'}`} style={{ animationDuration: '4s' }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    3D Rotating Review Boxes
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isPaused ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {isPaused ? 'Paused (Reading)' : 'Active • 4.5s Flip'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Cards physically rotate on each review update • Hover card to pause
                </p>
              </div>
            </div>
          </div>

          {/* Center: Live countdown progress bar */}
          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs mx-auto">
            <span className="text-[10px] font-semibold text-slate-400">Next:</span>
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                key={`progress-${rotationKey}-${isPaused}`}
                className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 rounded-full"
                initial={{ width: '0%' }}
                animate={isPaused ? { width: '0%' } : { width: '100%' }}
                transition={isPaused ? { duration: 0 } : { duration: 4.5, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Right: Pause/Resume Toggle & Manual Rotate Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs active:scale-95"
              title={isPaused ? 'Resume auto 3D rotation' : 'Pause rotation so you can read comfortably'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Resume Auto-Flip</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                  <span>Pause to Read</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                nextDesktopReview();
                nextMobileReview();
              }}
              className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs shadow-sky-600/20 active:scale-95"
              title="Rotate cards immediately to next review"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Rotate Box ↻</span>
            </button>
          </div>
        </div>

        {/* Mobile View: 3D Rotating Review Box */}
        <div
          className="block md:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div style={{ perspective: 1200 }} className="min-h-[290px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentMobileReview.id + '-' + mobileReviewIndex}
                custom={direction}
                initial={{
                  rotateY: direction > 0 ? 80 : -80,
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  rotateY: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  rotateY: direction > 0 ? -80 : 80,
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.25, 1, 0.5, 1],
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                }}
                className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-md flex flex-col justify-between min-h-[290px] space-y-4 text-left relative overflow-hidden"
              >
                {/* Top Color Accent Band */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500" />
                
                {/* Watermark Quote */}
                <Quote className="w-14 h-14 text-sky-100/70 absolute top-4 right-4 pointer-events-none -scale-x-100 z-0" />

                <div className="space-y-3 relative z-10">
                  {/* Rating, Source Tag & Slide Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(currentMobileReview.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-extrabold text-slate-800">5.0</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isPaused && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-full animate-pulse">
                          Paused
                        </span>
                      )}
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                        via {currentMobileReview.source}
                      </span>
                      <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                        {mobileReviewIndex + 1}/{reviews.length}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-800 leading-relaxed italic">
                    "{currentMobileReview.reviewText}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-extrabold text-xs flex items-center justify-center shrink-0 border border-sky-200">
                      {currentMobileReview.patientName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1 truncate">
                        <span>{currentMobileReview.patientName}</span>
                        {currentMobileReview.verified && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      </h4>
                      <p className="text-xs text-sky-600 font-semibold truncate">{currentMobileReview.treatment}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">{currentMobileReview.date}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Navigation Bar with Previous, Next, and Pagination Dots */}
          <div className="mt-4 flex items-center justify-between px-1">
            <button
              onClick={prevMobileReview}
              aria-label="Previous Review"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-slate-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-[180px] px-2 py-1">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > mobileReviewIndex ? 1 : -1);
                    setMobileReviewIndex(idx);
                    setRotationKey((prev) => prev + 1);
                  }}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === mobileReviewIndex
                      ? 'w-6 bg-sky-600'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextMobileReview}
              aria-label="Next Review"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-slate-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop & Tablet View: Single-Row 3-Review 3D Rotating Boxes */}
        <div
          className="hidden md:block"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-3 gap-6 sm:gap-8 text-left" style={{ perspective: 1400 }}>
            {visibleDesktopReviews.map((rev, idx) => (
              <div key={`col-container-${idx}`} className="relative h-full" style={{ perspective: 1100 }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${rev.id}-${desktopStartIndex}-${idx}`}
                    custom={direction}
                    initial={{
                      rotateY: direction > 0 ? 80 : -80,
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{
                      rotateY: 0,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      rotateY: direction > 0 ? -80 : 80,
                      opacity: 0,
                      scale: 0.9,
                    }}
                    transition={{
                      duration: 0.65,
                      delay: idx * 0.12, // Staggered wave rotation across the 3 boxes
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'center center',
                    }}
                    className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-md hover:shadow-xl hover:border-sky-300 transition-all flex flex-col justify-between space-y-4 min-h-[250px] relative group overflow-hidden"
                  >
                    {/* Top Color Accent Band */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500" />

                    {/* Watermark Quote */}
                    <Quote className="w-14 h-14 text-sky-100/60 absolute top-4 right-4 pointer-events-none -scale-x-100 z-0" />

                    <div className="space-y-3 relative z-10">
                      {/* Rating & Source Tag */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="flex text-amber-400">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-xs font-extrabold text-slate-800">5.0</span>
                        </div>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                          via {rev.source}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic line-clamp-4">
                        "{rev.reviewText}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-extrabold text-xs flex items-center justify-center shrink-0 border border-sky-200">
                          {rev.patientName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1 truncate">
                            <span>{rev.patientName}</span>
                            {rev.verified && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                          </h4>
                          <p className="text-[11px] text-sky-600 font-medium truncate">{rev.treatment}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{rev.date}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop Navigation & Indicator Track */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prevDesktopReview}
              aria-label="Previous Reviews"
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer border border-slate-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Desktop Slide Dots & Status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > (desktopStartIndex % reviews.length) ? 1 : -1);
                      setDesktopStartIndex(idx);
                      setRotationKey((prev) => prev + 1);
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === (desktopStartIndex % reviews.length)
                        ? 'w-7 bg-sky-600'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
              {isPaused && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-full animate-pulse">
                  Hovered: Paused to read
                </span>
              )}
            </div>

            <button
              onClick={nextDesktopReview}
              aria-label="Next Reviews"
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer border border-slate-200"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">Rating</label>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {rating} of 5 Stars
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-nowrap w-full">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`flex-1 py-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        rating >= star
                          ? 'bg-amber-50 border-amber-300 text-amber-500 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-300 hover:bg-slate-100'
                      }`}
                      aria-label={`Rate ${star} star`}
                    >
                      <Star className="w-5 h-5 fill-current" />
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
