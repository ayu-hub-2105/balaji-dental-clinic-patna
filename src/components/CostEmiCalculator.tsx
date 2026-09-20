import React, { useState } from 'react';
import { Calculator, CreditCard, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle, Phone, Calendar, X } from 'lucide-react';
import { ToothIcon } from './DentalIcons';

interface CostEmiCalculatorProps {
  onBookTreatment: (treatmentName: string) => void;
}

interface TreatmentEmiOption {
  id: string;
  name: string;
  baseCost: number;
  popular?: boolean;
  category: string;
  description: string;
  features: string[];
}

const EMI_TREATMENTS: TreatmentEmiOption[] = [
  {
    id: 'invisalign',
    name: 'Invisalign Clear Aligners',
    baseCost: 65000,
    popular: true,
    category: 'Orthodontics',
    description: 'Custom US-imported clear aligners with 3D digital simulation by Diamond Invisalign Provider Dr. Parijat Pallav.',
    features: ['100% Invisible & Removable', 'Includes 3D Digital Scan', 'Zero Dietary Restrictions', '0% Interest EMI Available']
  },
  {
    id: 'braces',
    name: 'Orthodontic Braces (Metal / Ceramic)',
    baseCost: 28000,
    category: 'Orthodontics',
    description: 'World-class orthodontic brackets for tooth straightening, gap closure, and bite correction.',
    features: ['High-Grade 3M American Orthodontics', 'Ceramic / Metal Options', 'Flexible Payment Milestones', 'Complete Post-Retention Care']
  },
  {
    id: 'implant',
    name: 'Titanium Dental Implant (with Crown)',
    baseCost: 32000,
    popular: true,
    category: 'Implantology',
    description: 'Permanent replacement for missing teeth with computer-guided titanium fixture and zirconia crown.',
    features: ['Lifetime Manufacturer Warranty', 'Natural Chewing Strength', 'Prevents Jawbone Loss', 'Same-Day Temporary Available']
  },
  {
    id: 'rct_crown',
    name: 'Single-Sitting RCT + Zirconia Crown',
    baseCost: 7500,
    category: 'Endodontics',
    description: 'Painless digital root canal therapy finished in a single sitting, crowned with unbreakable multilayer zirconia.',
    features: ['Painless Rotary Endodontics', '10-Year Crown Warranty', 'Single Appointment Completion', 'Digitally Color-Matched']
  },
  {
    id: 'smile_makeover',
    name: 'Cosmetic Smile Makeover (Veneers / Caps)',
    baseCost: 45000,
    category: 'Cosmetic',
    description: 'Hollywood smile design with ultra-thin porcelain veneers, closing gaps and correcting discoloration.',
    features: ['Digital Smile Design Preview', 'Ultra-Thin E-Max Porcelain', 'Stain-Resistant Surface', 'Natural Translucency']
  }
];

export const CostEmiCalculator: React.FC<CostEmiCalculatorProps> = ({ onBookTreatment }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('invisalign');
  const [customAmount, setCustomAmount] = useState<number>(65000);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [tenureMonths, setTenureMonths] = useState<number>(12);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 0%, 10%, 20%, 30%

  const currentTreatment = EMI_TREATMENTS.find((t) => t.id === selectedTreatmentId) || EMI_TREATMENTS[0];
  const treatmentCost = isCustom ? customAmount : currentTreatment.baseCost;

  // Calculate down payment and financed loan amount
  const downPayment = Math.round((treatmentCost * downPaymentPercent) / 100);
  const financedAmount = treatmentCost - downPayment;
  // At 0% interest, EMI is financedAmount / tenureMonths
  const monthlyEmi = Math.round(financedAmount / tenureMonths);

  const handleSelectTreatment = (item: TreatmentEmiOption) => {
    setSelectedTreatmentId(item.id);
    setIsCustom(false);
    setCustomAmount(item.baseCost);
  };

  return (
    <section id="emi-calculator" className="py-10 sm:py-14 bg-gradient-to-b from-white via-sky-50/30 to-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Compact, Sleek Teaser Card (takes very little space on mobile) */}
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-sky-900 via-slate-900 to-slate-950 text-white shadow-xl border border-sky-800/40 relative overflow-hidden text-left">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider border border-amber-400/30">
                <CreditCard className="w-3.5 h-3.5" />
                <span>0% Interest EMI Plans</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight font-heading">
                Treatment Cost &amp; EMI Calculator
              </h2>
              <p className="text-xs sm:text-sm text-sky-100/80 leading-relaxed">
                Check estimated pricing and customized monthly installments for Invisalign, Braces, Implants, and Smile Makeovers with zero hidden charges.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-emerald-300 font-semibold">
                <span>✓ 0% Interest Rate</span>
                <span>•</span>
                <span>✓ Instant Approval</span>
                <span>•</span>
                <span>✓ EMI from ₹1,800/mo</span>
              </div>
            </div>

            {/* Action Buttons: Prominent Yellow Calculator Button + Book Consultation */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                id="open-emi-calculator-btn"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 text-slate-950" />
                <span>Calculate Cost &amp; EMI Now</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                type="button"
                onClick={() => onBookTreatment('Consultation')}
                id="emi-card-book-consultation-btn"
                className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-98 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-sky-300" />
                <span>Book Consultation (₹500)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Featured Calculator Modal (Opens on button click) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 relative max-h-[92vh] flex flex-col overflow-hidden text-left my-auto">
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold shadow-xs">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                    Treatment Cost &amp; 0% Interest EMI Calculator
                  </h3>
                  <p className="text-[11px] text-slate-500 hidden sm:block">
                    Transparent pricing • Approved partners: Bajaj Finserv, Pine Labs &amp; No-Cost Credit Card
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
                aria-label="Close calculator"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Column: Treatment Selector & Sliders (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Step 1: Select Treatment */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        1. Select Treatment or Procedure
                      </label>
                      <span className="text-[11px] text-sky-700 font-semibold bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                        Doctor Consultation: ₹500
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {EMI_TREATMENTS.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectTreatment(item)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                            selectedTreatmentId === item.id && !isCustom
                              ? 'bg-sky-50/80 border-sky-600 ring-2 ring-sky-500/20 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          {item.popular && (
                            <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-extrabold text-[9px] uppercase tracking-wider">
                              Popular
                            </span>
                          )}
                          <div className="text-xs font-bold text-slate-900 line-clamp-1 pr-10">
                            {item.name}
                          </div>
                          <div className="text-xs font-extrabold text-sky-700 mt-1">
                            Starting ₹{item.baseCost.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            EMI from ₹{Math.round(item.baseCost / 12).toLocaleString('en-IN')}/mo
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Treatment Cost Slider / Custom Amount */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        2. Estimated Treatment Cost
                      </label>
                      <div className="text-base font-extrabold text-sky-900 bg-sky-50 px-3 py-1 rounded-xl border border-sky-200">
                        ₹{treatmentCost.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <input
                      type="range"
                      min="5000"
                      max="150000"
                      step="2500"
                      value={treatmentCost}
                      onChange={(e) => {
                        setIsCustom(true);
                        setCustomAmount(Number(e.target.value));
                      }}
                      className="w-full accent-sky-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-medium">
                      <span>₹5,000</span>
                      <span>₹75,000</span>
                      <span>₹1,50,000</span>
                    </div>
                  </div>

                  {/* Step 3: Tenure Selector */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                      3. Choose EMI Duration (Tenure)
                    </label>
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                      {[3, 6, 9, 12, 18].map((months) => (
                        <button
                          key={months}
                          type="button"
                          onClick={() => setTenureMonths(months)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                            tenureMonths === months
                              ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-600/30'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {months} Mo
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Down Payment Selector */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        4. Down Payment
                      </label>
                      <span className="text-xs font-bold text-slate-700">
                        {downPaymentPercent}% (₹{downPayment.toLocaleString('en-IN')})
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 10, 20, 30].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setDownPaymentPercent(pct)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                            downPaymentPercent === pct
                              ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-600/30'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {pct === 0 ? 'Zero (0%)' : `${pct}% Upfront`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Financing Partners Banner */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">EMI Partners:</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-slate-700 text-[11px]">
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200">Bajaj Finserv</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200">Pine Labs</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200">No-Cost Credit Card</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Calculated Monthly EMI Summary Card (5 cols) */}
                <div className="lg:col-span-5 bg-gradient-to-b from-sky-900 to-slate-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden text-left">
                  <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-sky-500/15 rounded-full blur-2xl pointer-events-none"></div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>0% Interest EMI Calculated</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">
                    Your Estimated Monthly Plan
                  </h4>
                  <p className="text-xs text-sky-200/80 mb-5">
                    Based on {tenureMonths} monthly installments for {isCustom ? 'Custom Treatment' : currentTreatment.name}.
                  </p>

                  {/* Big Hero EMI Figure */}
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-xs mb-5">
                    <div className="text-[11px] uppercase tracking-wider text-sky-200 font-bold">
                      Monthly Installment (EMI)
                    </div>
                    <div className="text-3xl font-extrabold text-amber-300 mt-1 tracking-tight">
                      ₹{monthlyEmi.toLocaleString('en-IN')}
                      <span className="text-xs text-sky-200 font-normal"> / month</span>
                    </div>
                    <div className="text-[11px] text-emerald-300 font-medium mt-1 flex items-center gap-1">
                      <span>✓ 0% Interest Rate • Instant Approval</span>
                    </div>
                  </div>

                  {/* Financial Breakdown Table */}
                  <div className="space-y-2 text-xs text-sky-100/90 pb-4 border-b border-white/10">
                    <div className="flex justify-between">
                      <span>Total Treatment Cost:</span>
                      <span className="font-bold text-white">₹{treatmentCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Upfront Down Payment:</span>
                      <span className="font-bold text-white">₹{downPayment.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Financed Loan Amount:</span>
                      <span className="font-bold text-white">₹{financedAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tenure Duration:</span>
                      <span className="font-bold text-white">{tenureMonths} Months</span>
                    </div>
                    <div className="flex justify-between text-amber-300 font-bold pt-1">
                      <span>Doctor Consultation Fee:</span>
                      <span>₹500 (At Clinic)</span>
                    </div>
                  </div>

                  {/* Key Features Bullet Points */}
                  {!isCustom && (
                    <div className="py-3 space-y-1 text-xs text-sky-100">
                      <div className="font-bold text-white text-xs mb-1">Included in this plan:</div>
                      {currentTreatment.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Direct Booking CTA inside Modal */}
                  <div className="pt-3 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        onBookTreatment(isCustom ? 'Consultation' : currentTreatment.name);
                      }}
                      id="emi-modal-book-treatment-btn"
                      className="w-full py-3 px-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-slate-950" />
                      <span>Book Consultation with this Plan</span>
                    </button>

                    <div className="text-[11px] text-center text-sky-200/70">
                      Clinic closed on Tuesdays • Consultation Fee: ₹500
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
