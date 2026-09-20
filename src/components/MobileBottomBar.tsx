import React from 'react';
import { Phone, MessageCircle, Calendar, MessageSquare } from 'lucide-react';

interface MobileBottomBarProps {
  onBookClick: () => void;
  onWhatsAppClick: () => void;
  onChatClick?: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onBookClick,
  onWhatsAppClick,
  onChatClick
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-2xl flex items-center justify-between gap-1.5 safe-area-pb">
      {/* Call */}
      <a
        href="tel:+919934885664"
        id="mobile-bar-call-button"
        className="flex-1 py-2 px-1.5 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-800 font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors text-center"
      >
        <Phone className="w-4 h-4 text-[#005086]" />
        <span>Call</span>
      </a>

      {/* WhatsApp */}
      <button
        onClick={onWhatsAppClick}
        id="mobile-bar-whatsapp-button"
        className="flex-1 py-2 px-1.5 rounded-xl bg-emerald-50 active:bg-emerald-100 text-emerald-800 font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors shadow-2xs border border-emerald-200/60 cursor-pointer text-center"
      >
        <MessageCircle className="w-4 h-4 text-emerald-600" />
        <span>WhatsApp</span>
      </button>

      {/* Live Chat */}
      <button
        onClick={onChatClick}
        id="mobile-bar-live-chat-button"
        className="flex-1 py-2 px-1.5 rounded-xl bg-sky-50 active:bg-sky-100 text-sky-900 font-bold text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors shadow-2xs border border-sky-200/80 cursor-pointer relative text-center"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-sky-600" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <span>Live Chat</span>
      </button>

      {/* Book Appointment */}
      <button
        onClick={onBookClick}
        id="mobile-bar-book-button"
        className="flex-[1.3] py-2 px-2 rounded-xl bg-[#005086] active:bg-[#003d66] text-white font-extrabold text-[11.5px] flex items-center justify-center gap-1 transition-colors shadow-sm cursor-pointer text-center"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Slot</span>
      </button>
    </div>
  );
};
