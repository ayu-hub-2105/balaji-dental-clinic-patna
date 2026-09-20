import React, { useState } from 'react';
import { AlertTriangle, Phone, Clock, ShieldAlert, CheckCircle, HelpCircle, HeartPulse, Calendar, ArrowRight, MessageCircle } from 'lucide-react';
import { ToothIcon } from './DentalIcons';

interface EmergencyCareSectionProps {
  onBookClick: () => void;
}

interface EmergencyScenario {
  id: string;
  title: string;
  severity: 'Immediate' | 'Urgent' | 'Semi-Urgent';
  icon: string;
  symptoms: string;
  firstAid: string[];
  whatAvoid: string[];
}

const EMERGENCY_SCENARIOS: EmergencyScenario[] = [
  {
    id: 'toothache',
    title: 'Severe Toothache or Facial Swelling',
    severity: 'Immediate',
    icon: 'pulse',
    symptoms: 'Throbbing dental pain, difficulty sleeping or chewing, swelling along the jawline or cheek.',
    firstAid: [
      'Rinse gently with warm salt water to clean the infected area.',
      'Apply a cold ice pack to the outside of your cheek for 15-minute intervals.',
      'Take recommended over-the-counter pain relief (Paracetamol or Ibuprofen).'
    ],
    whatAvoid: [
      'NEVER apply aspirin directly onto the tooth or gum tissue (it causes severe chemical burns).',
      'Avoid very hot, cold, or sugary foods.'
    ]
  },
  {
    id: 'knocked_out',
    title: 'Knocked-Out Permanent Tooth (Dental Trauma)',
    severity: 'Immediate',
    icon: 'tooth',
    symptoms: 'Tooth completely dislodged from the socket due to an accident, sports injury, or fall.',
    firstAid: [
      'Pick up the tooth by the CROWN only (never touch the delicate root surface).',
      'Gently rinse with clean milk or saline if dirty (do not scrub or dry with a towel).',
      'If possible, place the tooth back into its socket, or store it in a container of cold fresh milk.',
      'Reach Balaji Dental Clinic within 30 to 60 minutes for highest re-implantation success rate.'
    ],
    whatAvoid: [
      'Never store the tooth in tap water.',
      'Do not scrape the root surface.'
    ]
  },
  {
    id: 'braces_wire',
    title: 'Broken Braces Bracket or Poking Wire',
    severity: 'Urgent',
    icon: 'bracket',
    symptoms: 'Orthodontic archwire poking into the inner cheek or loose bracket sliding along the wire.',
    firstAid: [
      'Use the eraser end of a pencil to gently push the poking wire flat against the tooth.',
      'Apply a small pea-sized ball of orthodontic relief wax over the sharp protruding end.',
      'If the bracket has detached completely, keep it safely in an envelope and bring it to the clinic.'
    ],
    whatAvoid: [
      'Do NOT try to cut the archwire yourself with nail clippers (it can be swallowed).'
    ]
  },
  {
    id: 'broken_crown',
    title: 'Lost Filling, Crown, or Broken Tooth',
    severity: 'Semi-Urgent',
    icon: 'crown',
    symptoms: 'A filling fell out or dental crown came off while eating, exposing sensitive inner dentin.',
    firstAid: [
      'Retrieve the loose crown if possible and store it in a safe container.',
      'Apply dental temporary cement or sugar-free gum over the exposed sensitive area as a shield.',
      'Rinse with warm salt water after meals.'
    ],
    whatAvoid: [
      'Never use superglue or industrial adhesives to stick a crown back into your mouth.'
    ]
  }
];

export const EmergencyCareSection: React.FC<EmergencyCareSectionProps> = ({ onBookClick }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('toothache');

  const currentScenario = EMERGENCY_SCENARIOS.find((s) => s.id === activeScenarioId) || EMERGENCY_SCENARIOS[0];

  return (
    <section id="emergency" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-7xl h-96 bg-sky-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Emergency Action Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-12 border-b border-slate-800 text-left">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-500/30">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Dental Emergency & Same-Day Priority Care</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-white">
              Experiencing Severe Dental Pain?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Our dental emergency team provides priority same-day pain relief, emergency root canals, and trauma management in Patna.
            </p>
          </div>

          {/* Quick Helpline Cards */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+919934885664"
              id="emergency-call-btn"
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-lg shadow-rose-900/40 transition-all cursor-pointer active:scale-98"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline: +91 99348 85664</span>
            </a>

            <button
              onClick={onBookClick}
              id="emergency-book-priority-btn"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>Book Priority Slot</span>
            </button>
          </div>
        </div>

        {/* Timings & Tuesday Alert Strip */}
        <div className="mt-8 p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 text-left">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Emergency Hours:</strong> 10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM (Wed–Mon)
            </span>
          </div>
          <div className="text-[11px] font-bold text-rose-300 bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-500/30">
            ⚠️ Every Tuesday: Strictly CLOSED (Follow First-Aid instructions below)
          </div>
        </div>

        {/* Emergency First-Aid Guide Matrix */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
          {/* Left Tabs: Select Emergency Scenario (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Dental Emergency:
            </div>
            {EMERGENCY_SCENARIOS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveScenarioId(item.id)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  activeScenarioId === item.id
                    ? 'bg-sky-600/20 border-sky-400 text-white ring-1 ring-sky-400 shadow-md'
                    : 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white line-clamp-1">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Urgency: <span className="font-semibold text-rose-300">{item.severity}</span>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${activeScenarioId === item.id ? 'text-sky-400 translate-x-1' : 'text-slate-500'}`} />
              </button>
            ))}

            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 text-xs text-slate-400 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span>Consultation Fee: ₹500</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Emergency checkup includes digital intraoral diagnostics, symptom stabilization, and immediate pain medication prescription.
              </p>
            </div>
          </div>

          {/* Right Detail Card: Immediate Protocol & What to Avoid (8 cols) */}
          <div className="lg:col-span-8 bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-4">
              <div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                  {currentScenario.severity} Care Protocol
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5 font-heading">
                  {currentScenario.title}
                </h3>
              </div>
              <a
                href="tel:+919934885664"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Doctor Now</span>
              </a>
            </div>

            {/* Symptoms Alert */}
            <div className="p-3.5 bg-slate-900/60 rounded-2xl border border-slate-700/80 text-xs text-slate-300">
              <strong className="text-white">Common Symptoms:</strong> {currentScenario.symptoms}
            </div>

            {/* Immediate Action Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Immediate First-Aid Steps (Do This Right Now):</span>
              </h4>
              <div className="space-y-2">
                {currentScenario.firstAid.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-700/50 text-xs text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Avoid Warnings */}
            <div className="space-y-2 pt-2 border-t border-slate-700">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>What NOT to Do:</span>
              </h4>
              <div className="space-y-1.5">
                {currentScenario.whatAvoid.map((avoid, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-rose-200/90 bg-rose-950/20 p-2.5 rounded-xl border border-rose-500/20">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span>{avoid}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action at bottom */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">Clinic Address: House No. 7, Road No. 4, Sri Krishna Nagar, Kidwaipuri, Patna</span>
              <button
                type="button"
                onClick={onBookClick}
                className="text-sky-400 font-bold hover:text-sky-300 hover:underline cursor-pointer"
              >
                Schedule Same-Day Priority Slot →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
