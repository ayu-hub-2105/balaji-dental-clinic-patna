import React, { useState } from 'react';
import { Sparkles, Calendar, ChevronRight, ShieldCheck } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { ToothIcon } from './DentalIcons';

export const SmileTransformations: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => {
  const { beforeAfterCases } = useClinic();
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100

  const currentCase = beforeAfterCases[activeCaseIndex] || beforeAfterCases[0];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    let clientX = 0;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    const offset = clientX - container.left;
    const percentage = Math.max(5, Math.min(95, (offset / container.width) * 100));
    setSliderPos(percentage);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaf3f9] text-[#005086] text-xs font-bold uppercase tracking-wider border border-sky-200">
            <ToothIcon className="w-3.5 h-3.5 text-[#005086]" />
            <span>Before & After Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Smile Transformations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Real orthodontic before-and-after results for overbites, crowding, and smile makeovers.
          </p>

          {/* Case Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {beforeAfterCases.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPos(50);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCaseIndex === idx
                    ? 'bg-[#005086] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Before/After Split Viewer */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Slider Stage (7 cols) */}
            <div className="lg:col-span-7 relative bg-slate-950 overflow-hidden select-none min-h-[340px] sm:min-h-[440px]">
              <div
                className="relative w-full h-full cursor-ew-resize touch-none min-h-[340px] sm:min-h-[440px]"
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
              >
                {/* AFTER Image (Straight Smile) */}
                <img
                  src={currentCase.afterImage}
                  alt="After Braces Transformation"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* BEFORE Image (Overbite / Crowding / Braces) - Using pixel-perfect clip-path */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{
                    clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                  }}
                >
                  <img
                    src={currentCase.beforeImage}
                    alt="Before Braces Treatment"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Split Handle Divider Line */}
                <div
                  className="absolute top-0 bottom-0 pointer-events-none border-r-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-2xl border-2 border-[#005086] flex items-center justify-center text-[#005086] font-bold text-xs select-none">
                    ↔
                  </div>
                </div>

                {/* Dynamic Floating Labels */}
                <div className="absolute top-4 left-4 z-20 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-md">
                  BEFORE (Overbite / Misaligned)
                </div>
                <div className="absolute top-4 right-4 z-20 bg-[#005086]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-md">
                  AFTER (Straight Smile)
                </div>

                <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none z-20">
                  <span className="text-[11px] font-medium text-white/90 bg-black/60 px-3.5 py-1 rounded-full backdrop-blur-md shadow-sm">
                    Drag slider horizontally to compare before & after
                  </span>
                </div>
              </div>
            </div>

            {/* Case Details (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#eaf3f9] text-[#005086] text-xs font-bold border border-sky-100">
                  <Sparkles className="w-3.5 h-3.5 text-[#005086]" />
                  <span>{currentCase.treatment}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading leading-snug">
                  {currentCase.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {currentCase.description}
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Treating Doctor:</span>
                    <span className="font-bold text-slate-900">{currentCase.doctor}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Treatment Timeline:</span>
                    <span className="font-bold text-[#005086] bg-sky-100/60 px-2 py-0.5 rounded-md">{currentCase.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Patient Age:</span>
                    <span className="font-bold text-slate-800">{currentCase.patientAge} Years</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500 font-medium">Clinical Result:</span>
                    <span className="font-bold text-emerald-700">100% Arch Alignment</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onBookClick}
                  className="w-full py-3.5 rounded-xl bg-[#005086] hover:bg-[#003d66] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#005086]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Smile Assessment & 3D Scan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
