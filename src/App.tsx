import React, { useState, useEffect } from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { Header, ClinicView } from './components/Header';
import { Hero } from './components/Hero';
import { QuickAppointment } from './components/QuickAppointment';
import { AboutSection } from './components/AboutSection';
import { DoctorSection } from './components/DoctorSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { DoctorContentHub } from './components/DoctorContentHub';
import { SmileTransformations } from './components/SmileTransformations';
import { ReviewsSection } from './components/ReviewsSection';
import { CostEmiCalculator } from './components/CostEmiCalculator';
import { EmergencyCareSection } from './components/EmergencyCareSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LiveChatWidget } from './components/LiveChatWidget';
import { MobileBottomBar } from './components/MobileBottomBar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { X, Calendar, ArrowLeft, AlertCircle, BookOpen, Lightbulb } from 'lucide-react';

function MainWebsite() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentView, setCurrentView] = useState<ClinicView>('home');

  // Booking modal popup state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [modalDoctor, setModalDoctor] = useState('');
  const [modalTreatment, setModalTreatment] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Lock body scroll when modal or admin is open to prevent background scrolling and layout jumping
  useEffect(() => {
    if (bookingModalOpen || isAdminOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [bookingModalOpen, isAdminOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (bookingModalOpen) setBookingModalOpen(false);
        if (isAdminOpen) setIsAdminOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookingModalOpen, isAdminOpen]);

  // Intersection observer for active nav highlight
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      const sections = [
        'home',
        'about',
        'doctors',
        'treatments',
        'gallery',
        'reviews',
        'contact'
      ];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleOpenBooking = (treatment = '', doctor = '') => {
    setModalTreatment(treatment);
    setModalDoctor(doctor);
    setBookingModalOpen(true);
  };

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/919934885664?text=${encodeURIComponent(
        'Hi Balaji Dental & Orthodontic Clinic, I would like to inquire about dental treatments and appointments.'
      )}`,
      '_blank'
    );
  };

  const handleNavigateView = (view: ClinicView, hash?: string) => {
    setCurrentView(view);
    if (view === 'home') {
      if (hash) {
        setTimeout(() => {
          const target = document.querySelector(hash);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased relative selection:bg-sky-500 selection:text-white pb-24 md:pb-0">
      {/* Header */}
      <Header
        onBookClick={() => handleOpenBooking()}
        onAdminToggle={() => setIsAdminOpen(!isAdminOpen)}
        isAdminView={isAdminOpen}
        activeSection={activeSection}
        currentView={currentView}
        onNavigateView={handleNavigateView}
      />

      {/* Main Website Sections */}
      <main>
        {currentView === 'home' && (
          <>
            <Hero
              onBookClick={() => handleOpenBooking()}
              onWhatsAppClick={handleWhatsAppClick}
            />

            <AboutSection onBookClick={() => handleOpenBooking()} />

            <DoctorSection
              onBookWithDoctor={(doctorName) => handleOpenBooking('', doctorName)}
            />

            {/* Advanced Dental Solutions (with Red Emergency Button) */}
            <TreatmentsSection
              onBookTreatment={(treatmentTitle) => handleOpenBooking(treatmentTitle, '')}
              onOpenEmergency={() => handleNavigateView('emergency')}
            />

            <SmileTransformations onBookClick={() => handleOpenBooking()} />

            <CostEmiCalculator onBookTreatment={(treatmentTitle) => handleOpenBooking(treatmentTitle, '')} />

            <ReviewsSection />

            <ContactSection onBookClick={() => handleOpenBooking()} />
          </>
        )}

        {/* Dedicated View: Emergency Dental Care Page */}
        {currentView === 'emergency' && (
          <div className="bg-slate-50 min-h-screen py-6 md:py-10 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <button
                  onClick={() => handleNavigateView('home', '#treatments')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl transition-colors cursor-pointer border border-sky-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Services & Treatments</span>
                </button>
                <div className="flex items-center gap-2 text-xs text-rose-700 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
                  <span>24/7 Priority Emergency Dental Care Helpline</span>
                </div>
              </div>
            </div>

            <EmergencyCareSection onBookClick={() => handleOpenBooking()} />
          </div>
        )}

        {/* Dedicated View: Latest Articles & Dental Blog */}
        {currentView === 'blog-articles' && (
          <div className="bg-slate-50 min-h-screen py-6 md:py-10 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <button
                  onClick={() => handleNavigateView('home')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl transition-colors cursor-pointer border border-sky-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Main Website</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 hidden sm:inline">Also check:</span>
                  <button
                    onClick={() => handleNavigateView('dental-guidance')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer border border-amber-200"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Doctor Video Guidance & FAQs →</span>
                  </button>
                </div>
              </div>
            </div>

            <BlogSection onBookClick={() => handleOpenBooking()} />
          </div>
        )}

        {/* Dedicated View: Dental Guidance & Tips */}
        {currentView === 'dental-guidance' && (
          <div className="bg-slate-50 min-h-screen py-6 md:py-10 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <button
                  onClick={() => handleNavigateView('home')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl transition-colors cursor-pointer border border-sky-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Main Website</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 hidden sm:inline">Also check:</span>
                  <button
                    onClick={() => handleNavigateView('blog-articles')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer border border-sky-200"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                    <span>Read Latest Articles & Guides →</span>
                  </button>
                </div>
              </div>
            </div>

            <DoctorContentHub onBookClick={() => handleOpenBooking()} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onBookClick={() => handleOpenBooking()}
        onAdminToggle={() => setIsAdminOpen(true)}
        onNavigate={(view) => handleNavigateView(view as ClinicView)}
      />

      {/* Floating Interactive Assistants */}
      <FloatingWhatsApp onBookClick={() => handleOpenBooking()} />
      <LiveChatWidget
        onBookClick={() => handleOpenBooking()}
        onWhatsAppClick={handleWhatsAppClick}
        isOpen={isChatOpen}
        onToggleOpen={(open) => setIsChatOpen(open)}
      />

      {/* Mobile Bottom Fixed Bar */}
      <MobileBottomBar
        onBookClick={() => handleOpenBooking()}
        onWhatsAppClick={handleWhatsAppClick}
        onChatClick={() => setIsChatOpen(true)}
      />

      {/* Global Booking Modal */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs overflow-y-auto overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setBookingModalOpen(false);
            }
          }}
          id="booking-modal-overlay"
        >
          {/* Centering wrapper: min-h-full flex items-start sm:items-center justify-center guarantees the top is NEVER pushed off-screen */}
          <div className="min-h-full flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 py-4 sm:py-8">
            <div
              className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full shadow-2xl relative my-auto animate-fadeIn border border-slate-100 overflow-hidden text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <QuickAppointment
                initialTreatment={modalTreatment}
                initialDoctor={modalDoctor}
                onCloseModal={() => setBookingModalOpen(false)}
                isModal={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Admin Dashboard Overlay */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ClinicProvider>
      <MainWebsite />
    </ClinicProvider>
  );
}
