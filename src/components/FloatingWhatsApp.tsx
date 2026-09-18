import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  onBookClick?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = () => {
  const clinicPhone = '919934885664';
  const whatsappUrl = `https://wa.me/${clinicPhone}?text=${encodeURIComponent(
    'Hello Balaji Dental Clinic, I would like to inquire about dental treatment and consultation.'
  )}`;

  return (
    <div className="fixed bottom-32 sm:bottom-22 right-3 sm:right-6 z-40">
      {/* Direct WhatsApp Redirect Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-direct-button"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer relative group ring-4 ring-white/90"
        aria-label="Chat with Balaji Dental on WhatsApp (+91 99348 85664)"
        title="Chat on WhatsApp (+91 99348 85664)"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-pulse"></span>

        {/* Sleek Tooltip on hover */}
        <span className="absolute right-full mr-3 px-3.5 py-1.5 rounded-full bg-slate-900 text-white shadow-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:flex items-center gap-1.5">
          <span>WhatsApp Chat (+91 99348 85664)</span>
        </span>
      </a>
    </div>
  );
};

