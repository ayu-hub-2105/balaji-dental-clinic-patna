import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Calendar,
  Phone,
  Clock,
  MapPin,
  HelpCircle,
  CreditCard,
  UserCheck,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { CLINIC_GOOGLE_MAPS_URL } from '../data/initialData';

interface LiveChatWidgetProps {
  onBookClick: () => void;
  onWhatsAppClick: () => void;
  isOpen?: boolean;
  onToggleOpen?: (open: boolean) => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onBookClick,
  onWhatsAppClick,
  isOpen: controlledIsOpen,
  onToggleOpen
}) => {
  const { currentChatSession, sendVisitorMessage } = useClinic();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewBadge, setHasNewBadge] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isChatOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setChatOpen = (val: boolean) => {
    if (onToggleOpen) {
      onToggleOpen(val);
    } else {
      setInternalIsOpen(val);
    }
    if (val) setHasNewBadge(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [currentChatSession?.messages, isChatOpen, isTyping]);

  const quickTopicCards = [
    {
      id: 'invisalign',
      label: '✨ Invisalign Cost & Info',
      sub: 'Diamond Provider • 0% EMI',
      prompt: 'Hi, I want to know more about Invisalign clear aligners and pricing at Balaji Dental.'
    },
    {
      id: 'implant',
      label: '🦷 Dental Implant Query',
      sub: 'Permanent Tooth Replacement',
      prompt: 'Hi, I have a missing tooth and would like to inquire about dental implants.'
    },
    {
      id: 'emergency',
      label: '🚨 Urgent Tooth Pain & Emergency',
      sub: 'Same-Day Priority Relief',
      prompt: 'Hi Balaji Dental, I have severe tooth pain and need an urgent emergency appointment today.'
    },
    {
      id: 'timings',
      label: '🕒 Clinic Timings',
      sub: '10am-2pm & 5pm-8pm (Wed-Mon)',
      prompt: 'What are the clinic opening hours and timings?'
    },
    {
      id: 'fees',
      label: '💰 Consultation Fee',
      sub: '₹500 Doctor Consultation',
      prompt: 'What is the doctor consultation fee?'
    },
    {
      id: 'book',
      label: '📅 Book Appointment',
      sub: 'Reserve Doctor Slot',
      prompt: 'I want to book an appointment'
    }
  ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    sendVisitorMessage(text);
    setInputVal('');

    // Receptionist typing animation
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 600);
  };

  const handleOptionClick = (optionText: string) => {
    const lower = optionText.toLowerCase();
    if (
      lower.includes('book') ||
      lower.includes('बुक') ||
      lower.includes('slot') ||
      lower.includes('अपॉइंटमेंट') ||
      lower.includes('scan')
    ) {
      setChatOpen(false);
      onBookClick();
    } else if (lower.includes('whatsapp') || lower.includes('व्हाट्सएप')) {
      onWhatsAppClick();
    } else if (
      lower.includes('call') ||
      lower.includes('कॉल') ||
      lower.includes('+91') ||
      lower.includes('9934885664')
    ) {
      window.location.href = 'tel:+919934885664';
    } else if (
      lower.includes('maps') ||
      lower.includes('directions') ||
      lower.includes('मैप')
    ) {
      window.open(
        CLINIC_GOOGLE_MAPS_URL,
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      handleSend(optionText);
    }
  };

  const defaultMessages = [
    {
      id: 'init-welcome',
      sender: 'reception',
      senderName: 'Yuvraj (Front Desk Reception)',
      text: 'Hello! Welcome to Balaji Dental & Orthodontic Clinic.\n\nYou can ask about Invisalign clear aligners, dental implants, urgent tooth pain & emergencies, clinic timings (10:00 AM – 02:00 PM & 05:00 PM – 08:00 PM), consultation fee (₹500), or book an appointment right here.',
      timestamp: 'Active Now',
      quickOptions: [
        '✨ Invisalign Cost & Info',
        '🦷 Dental Implant Query',
        '🚨 Urgent Tooth Pain & Emergency',
        '🕒 Clinic Timings (10am-2pm & 5pm-8pm)',
        '💰 Consultation Fee ₹500',
        '📅 Book Appointment'
      ]
    }
  ];

  const messages =
    currentChatSession?.messages && currentChatSession.messages.length > 0
      ? currentChatSession.messages
      : defaultMessages;

  return (
    <>
      {/* Floating Chat Trigger Button (Both Mobile & Desktop) */}
      <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-2">
        {/* Mobile / Desktop Attention Pill (disappears once opened) */}
        {!isChatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            id="floating-live-chat-pill"
            className="hidden xs:flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-sky-100 hover:border-sky-300 text-slate-800 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-sky-500/20"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sky-900 font-extrabold text-[11px] sm:text-xs">
              Live Dental Chat • Fee ₹500
            </span>
          </button>
        )}

        {/* Circular Action Button */}
        <button
          onClick={() => setChatOpen(!isChatOpen)}
          id="floating-live-chat-button"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer relative group ring-4 ring-white/90"
          aria-label="Open Live Dental Helpdesk Chat"
        >
          {isChatOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6" />
          )}

          {/* Green active dot */}
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></span>

          {/* New message indicator */}
          {hasNewBadge && !isChatOpen && (
            <span className="absolute -top-1.5 -left-1 px-1.5 py-0.5 bg-amber-400 text-slate-950 text-[9px] font-black rounded-full border border-white shadow-xs">
              NEW
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Modal / Drawer */}
      {isChatOpen && (
        <div
          id="live-chat-modal-window"
          className="fixed inset-x-2 sm:inset-x-auto bottom-2 sm:bottom-22 sm:right-6 w-auto sm:w-[410px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-sky-200/80 overflow-hidden flex flex-col h-[85vh] sm:h-[580px] max-h-[92vh] z-50 text-left animate-fadeIn ring-1 ring-black/10"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-[#005086] p-3.5 sm:p-4 text-white flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                  alt="Receptionist Yuvraj"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/90 shadow-xs"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-sky-700 rounded-full"></span>
              </div>
              <div>
                <h4 className="text-sm font-black leading-tight flex items-center gap-1.5">
                  <span>Yuvraj (Reception Desk)</span>
                  <span className="text-[10px] bg-sky-500/60 px-1.5 py-0.2 rounded font-normal text-sky-100">
                    Online
                  </span>
                </h4>
                <p className="text-[11px] text-sky-100/90 leading-tight mt-0.5">
                  Balaji Dental Clinic • Patna
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setChatOpen(false)}
                id="live-chat-close-btn"
                className="p-1.5 sm:p-2 rounded-xl hover:bg-white/15 text-white/90 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Chat Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Clinic Notice Banner (Tuesday Closed & Consultation Fee) */}
          <div className="bg-amber-50 px-3 py-2 border-b border-amber-200/70 flex items-center justify-between text-[11px] text-amber-900 shrink-0">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Clinic is strictly CLOSED on Tuesdays</span>
            </div>
            <span className="font-extrabold text-sky-900 bg-amber-200/60 px-2 py-0.5 rounded-full border border-amber-300">
              Consultation: ₹500
            </span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-slate-50/70 text-xs">
            {/* Quick Query Cards Grid */}
            <div className="mb-2">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">
                Quick Assistance (Click to Ask):
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {quickTopicCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => {
                      if (card.id === 'book') {
                        setChatOpen(false);
                        onBookClick();
                      } else {
                        handleSend(card.prompt);
                      }
                    }}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:bg-sky-50 text-left transition-all shadow-2xs cursor-pointer group"
                  >
                    <div className="font-bold text-slate-800 text-[11px] group-hover:text-sky-800">
                      {card.label}
                    </div>
                    <div className="text-[9.5px] text-slate-500 font-medium truncate">
                      {card.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Feed */}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {m.sender !== 'user' && (
                    <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-slate-100">
                      <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[8.5px]">
                        BD
                      </span>
                      <span className="text-[10px] font-bold text-sky-700">
                        {m.senderName || 'Yuvraj (Balaji Reception)'}
                      </span>
                    </div>
                  )}

                  <p className="whitespace-pre-line text-xs">{m.text}</p>

                  {/* Optional Quick Action Buttons embedded in response */}
                  {m.quickOptions && m.quickOptions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {m.quickOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleOptionClick(opt)}
                          className="px-2 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-bold text-[10px] transition-colors cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9.5px] text-slate-400 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-2xl border border-slate-200 w-20 text-slate-400 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Direct Help Bar above input */}
          <div className="px-3 py-1.5 bg-slate-100/90 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 shrink-0">
            <a
              href="tel:+919934885664"
              className="font-bold text-sky-700 hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>Call: +91 99348 85664</span>
            </a>
            <button
              onClick={onWhatsAppClick}
              className="font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>WhatsApp Chat →</span>
            </button>
          </div>

          {/* Chat Input Bar */}
          <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
            <input
              type="text"
              id="live-chat-input"
              placeholder="Type your question (e.g. fee, timings, root canal...)"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 font-medium placeholder:text-slate-400"
            />
            <button
              onClick={() => handleSend()}
              id="live-chat-send-btn"
              disabled={!inputVal.trim()}
              className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-40 transition-all cursor-pointer shrink-0 shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
