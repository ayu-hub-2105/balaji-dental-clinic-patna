import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, Calendar, ChevronDown, CheckCircle2, Sparkles, User, ShieldCheck, Stethoscope, BookOpen, Lightbulb, AlertTriangle } from 'lucide-react';
import { BalajiLogo, ToothIcon } from './DentalIcons';

export type ClinicView = 'home' | 'emergency' | 'blog-articles' | 'dental-guidance';

interface HeaderProps {
  onBookClick?: () => void;
  onAdminToggle: () => void;
  isAdminView: boolean;
  activeSection: string;
  currentView?: ClinicView;
  onNavigateView?: (view: ClinicView, hash?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onBookClick,
  onAdminToggle,
  isAdminView,
  activeSection,
  currentView = 'home',
  onNavigateView
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);

  // Mobile submenu toggles
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [mobileBlogExpanded, setMobileBlogExpanded] = useState(false);

  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blogTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setServicesDropdownOpen(false);
    setBlogDropdownOpen(false);
    if (onNavigateView) {
      onNavigateView('home', href);
    }
    if (isAdminView) {
      onAdminToggle();
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenView = (view: ClinicView, hash?: string) => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setServicesDropdownOpen(false);
    setBlogDropdownOpen(false);
    if (isAdminView) onAdminToggle();
    if (onNavigateView) {
      onNavigateView(view, hash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const aboutSubLinks = [
    {
      title: 'About Our Clinic',
      desc: 'Overview, NABH sterilization & clinic legacy in Patna',
      href: '#about',
      icon: <ShieldCheck className="w-4 h-4 text-sky-600" />
    },
    {
      title: 'Our Doctors (Dr. Parijat Pallav)',
      desc: 'Chief Orthodontist & specialist dental team profiles',
      href: '#doctors',
      icon: <User className="w-4 h-4 text-sky-600" />
    },
    {
      title: 'Why Choose Us',
      desc: '16+ yrs experience, 15k+ smiles & painless technology',
      href: '#about',
      icon: <CheckCircle2 className="w-4 h-4 text-sky-600" />
    },
    {
      title: 'Smile Transformations',
      desc: 'Real patient before & after braces & aligners gallery',
      href: '#gallery',
      icon: <Sparkles className="w-4 h-4 text-sky-600" />
    }
  ];

  const servicesSubLinks = [
    {
      title: 'Invisalign Clear Aligners',
      desc: 'Invisible, comfortable & removable smile aligners',
      href: '#treatments'
    },
    {
      title: 'Orthodontic Braces',
      desc: 'Self-ligating metal, ceramic & invisible lingual braces',
      href: '#treatments'
    },
    {
      title: 'Dental Implants',
      desc: 'Computer-guided permanent tooth replacement',
      href: '#treatments'
    },
    {
      title: 'Single-Sitting RCT',
      desc: 'Painless microscopic root canal therapy',
      href: '#treatments'
    },
    {
      title: 'Cosmetic Smile Makeover',
      desc: 'Zirconia crowns, veneers & gap corrections',
      href: '#treatments'
    },
    {
      title: 'Laser Teeth Whitening',
      desc: 'Safe, fast clinic whitening for brighter teeth',
      href: '#treatments'
    },
    {
      title: 'Pediatric & Family Dentistry',
      desc: 'Gentle preventative care for kids and adults',
      href: '#treatments'
    },
    {
      title: '0% EMI Cost Calculator',
      desc: 'Calculate easy monthly installments for Invisalign & Braces',
      href: '#emi-calculator'
    },
    {
      title: 'Emergency Dental First-Aid (24/7)',
      desc: 'Immediate pain relief protocols & priority clinic helpline',
      href: '#emergency',
      isEmergency: true
    },
    {
      title: 'View All Treatments & Pricing',
      desc: 'Complete catalog with transparent doctor fee & plans',
      href: '#treatments'
    }
  ];

  const blogSubLinks = [
    {
      title: 'Latest Articles & Guides',
      desc: 'Doctor-curated articles on oral hygiene, braces & recovery',
      view: 'blog-articles' as ClinicView,
      icon: <BookOpen className="w-4 h-4 text-sky-600" />
    },
    {
      title: 'Dental Guidance & Tips',
      desc: 'Doctor video hub, quick oral health tips & patient FAQs',
      view: 'dental-guidance' as ClinicView,
      icon: <Lightbulb className="w-4 h-4 text-amber-500" />
    }
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-200 shadow-md">
      {/* Single Clean Medical Sky Blue Navigation Header */}
      <nav
        className={`bg-[#0284c7] text-white transition-all duration-200 ${
          isScrolled ? 'py-2.5 sm:py-3 shadow-lg' : 'py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo on the left */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center cursor-pointer focus:outline-none group shrink min-w-0"
            id="brand-header-logo"
          >
            <BalajiLogo variant="white" />
          </a>

          {/* Desktop Navigation Links - Concise & Bold */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-bold text-white tracking-wide">
            {/* 1. Home */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              id="nav-link-home"
              className={`transition-colors whitespace-nowrap py-1 px-1.5 font-bold ${
                activeSection === 'home'
                  ? 'text-amber-300 border-b-2 border-amber-300'
                  : 'hover:text-amber-200 text-white'
              }`}
            >
              Home
            </a>

            {/* 2. About Us (with Rich Dropdown) */}
            <div
              className="relative group py-1"
              onMouseEnter={() => {
                if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
                setAboutDropdownOpen(true);
              }}
              onMouseLeave={() => {
                aboutTimeoutRef.current = setTimeout(() => {
                  setAboutDropdownOpen(false);
                }, 150);
              }}
            >
              <button
                onClick={() => handleNavClick('#about')}
                id="nav-link-about"
                className={`inline-flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer py-1 px-1.5 font-bold ${
                  activeSection === 'about' || activeSection === 'doctors' || activeSection === 'gallery'
                    ? 'text-amber-300 border-b-2 border-amber-300'
                    : 'hover:text-amber-200 text-white'
                }`}
                aria-expanded={aboutDropdownOpen}
              >
                <span>About Us</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-amber-300' : 'text-white/90'}`} />
              </button>

              {/* About Dropdown Menu */}
              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2.5 z-50 text-left animate-fadeIn">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-sky-800 uppercase tracking-wider border-b border-slate-100 mb-1">
                    About Balaji Dental Clinic
                  </div>
                  {aboutSubLinks.map((sub, idx) => (
                    <a
                      key={idx}
                      href={sub.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(sub.href);
                      }}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-sky-50 transition-colors group/item"
                    >
                      <div className="p-2 rounded-lg bg-sky-100/70 text-sky-700 group-hover/item:bg-sky-600 group-hover/item:text-white transition-colors shrink-0 mt-0.5">
                        {sub.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover/item:text-sky-700 transition-colors">
                          {sub.title}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          {sub.desc}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Services (with Rich Dropdown) */}
            <div
              className="relative group py-1"
              onMouseEnter={() => {
                if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                setServicesDropdownOpen(true);
              }}
              onMouseLeave={() => {
                servicesTimeoutRef.current = setTimeout(() => {
                  setServicesDropdownOpen(false);
                }, 150);
              }}
            >
              <button
                onClick={() => handleNavClick('#treatments')}
                id="nav-link-services"
                className={`inline-flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer py-1 px-1.5 font-bold ${
                  activeSection === 'treatments' || activeSection === 'doctor-content'
                    ? 'text-amber-300 border-b-2 border-amber-300'
                    : 'hover:text-amber-200 text-white'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-amber-300' : 'text-white/90'}`} />
              </button>

              {/* Services Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/3 mt-2 w-[480px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 text-left animate-fadeIn">
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100 mb-2">
                    <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">
                      Dental & Orthodontic Treatments
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                      0% EMI Available
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {servicesSubLinks.map((srv, idx) => {
                      if ((srv as any).isEmergency) {
                        return (
                          <button
                            key={idx}
                            onClick={() => handleOpenView('emergency')}
                            className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100/90 border border-rose-200 transition-colors group/srv text-left cursor-pointer"
                          >
                            <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                              <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                              <span>{srv.title}</span>
                            </div>
                            <div className="text-[11px] text-rose-600 leading-snug mt-0.5 pl-4.5 line-clamp-1">
                              {srv.desc}
                            </div>
                          </button>
                        );
                      }

                      return (
                        <a
                          key={idx}
                          href={srv.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(srv.href);
                          }}
                          className="p-2.5 rounded-xl hover:bg-sky-50 transition-colors group/srv text-left"
                        >
                          <div className="text-xs font-bold text-slate-900 group-hover/srv:text-sky-700 flex items-center gap-1.5">
                            <ToothIcon className="w-3 h-3 text-sky-600 shrink-0" />
                            <span>{srv.title}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 leading-snug mt-0.5 pl-4.5 line-clamp-1">
                            {srv.desc}
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 bg-sky-50/60 p-2 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-slate-600 text-[11px]">Need personalized guidance?</span>
                    <button
                      onClick={() => {
                        setServicesDropdownOpen(false);
                        if (onBookClick) onBookClick();
                      }}
                      className="text-sky-700 font-bold hover:underline text-[11px] cursor-pointer"
                    >
                      Book Consultation (₹500) →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Blog & Guidance (with Dropdown for Articles and Guidance Tips) */}
            <div
              className="relative group py-1"
              onMouseEnter={() => {
                if (blogTimeoutRef.current) clearTimeout(blogTimeoutRef.current);
                setBlogDropdownOpen(true);
              }}
              onMouseLeave={() => {
                blogTimeoutRef.current = setTimeout(() => {
                  setBlogDropdownOpen(false);
                }, 150);
              }}
            >
              <button
                onClick={() => handleOpenView('blog-articles')}
                id="nav-link-blog"
                className={`inline-flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer py-1 px-1.5 font-bold ${
                  currentView === 'blog-articles' || currentView === 'dental-guidance' || activeSection === 'blogs'
                    ? 'text-amber-300 border-b-2 border-amber-300'
                    : 'hover:text-amber-200 text-white'
                }`}
                aria-expanded={blogDropdownOpen}
              >
                <span>Blog</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${blogDropdownOpen ? 'rotate-180 text-amber-300' : 'text-white/90'}`} />
              </button>

              {/* Blog Dropdown Menu */}
              {blogDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2.5 z-50 text-left animate-fadeIn">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-sky-800 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Dental Guides & Articles
                  </div>
                  {blogSubLinks.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOpenView(sub.view)}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-sky-50 transition-colors group/item text-left cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-sky-100/70 group-hover/item:bg-sky-600 group-hover/item:text-white transition-colors shrink-0 mt-0.5">
                        {sub.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover/item:text-sky-700 transition-colors">
                          {sub.title}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          {sub.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Reviews */}
            <a
              href="#reviews"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#reviews');
              }}
              id="nav-link-reviews"
              className={`transition-colors whitespace-nowrap py-1 px-1.5 font-bold ${
                activeSection === 'reviews'
                  ? 'text-amber-300 border-b-2 border-amber-300'
                  : 'hover:text-amber-200 text-white'
              }`}
            >
              Reviews
            </a>
          </div>

          {/* Right Controls: Calling Number inside white background container */}
          <div className="shrink-0 flex items-center gap-1.5 sm:gap-3">
            {/* Calling Number CTA with white background - Compact on mobile, full on tablet/desktop */}
            <a
              href="tel:+919934885664"
              id="header-calling-number-cta"
              className="shrink-0 inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs md:text-sm font-extrabold text-slate-900 bg-white hover:bg-amber-300 hover:text-slate-950 rounded-lg sm:rounded-xl shadow-sm transition-all cursor-pointer"
              title="Call Balaji Dental Clinic (+91 99348 85664)"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-700 shrink-0" />
              <span className="font-extrabold tracking-tight whitespace-nowrap">
                <span className="hidden sm:inline">+91 </span>99348 85664
              </span>
            </a>

            {/* Mobile 3-line Hamburger Menu Toggle (Three Underline / ☰) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-button"
              className="lg:hidden shrink-0 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/20 hover:bg-white/30 active:bg-white/40 text-white border border-white/30 transition-all cursor-pointer flex items-center justify-center shadow-xs"
              aria-label="Toggle navigation menu"
              title="Toggle Menu (3 lines)"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Clean, organized for exactly the 5 sections) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0369a1] border-t border-white/15 px-4 pt-3 pb-6 space-y-1.5 animate-fadeIn text-left shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Direct Helpline Banner inside Mobile Menu */}
            <div className="pb-2 mb-2 border-b border-white/20">
              <a
                href="tel:+919934885664"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white text-slate-900 font-extrabold text-xs sm:text-sm shadow-md hover:bg-amber-300 transition-all"
              >
                <Phone className="w-4 h-4 text-sky-700 shrink-0" />
                <span>Call Helpline: +91 99348 85664</span>
              </a>
            </div>
            {/* 1. Home */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Home
            </a>

            {/* 2. About (Accordion) */}
            <div className="rounded-xl bg-white/5 overflow-hidden">
              <button
                onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>About</span>
                <ChevronDown className={`w-4 h-4 text-amber-300 transition-transform ${mobileAboutExpanded ? 'rotate-180' : ''}`} />
              </button>

              {mobileAboutExpanded && (
                <div className="px-3 pb-2.5 pt-1 space-y-1 bg-black/10">
                  {aboutSubLinks.map((sub, idx) => (
                    <a
                      key={idx}
                      href={sub.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(sub.href);
                      }}
                      className="block px-3 py-2 rounded-lg text-xs text-sky-100 hover:text-white hover:bg-white/10 transition-colors font-medium"
                    >
                      • {sub.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Services (Accordion) */}
            <div className="rounded-xl bg-white/5 overflow-hidden">
              <button
                onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 text-amber-300 transition-transform ${mobileServicesExpanded ? 'rotate-180' : ''}`} />
              </button>

              {mobileServicesExpanded && (
                <div className="px-3 pb-2.5 pt-1 space-y-1 bg-black/10">
                  {servicesSubLinks.map((srv, idx) => {
                    if ((srv as any).isEmergency) {
                      return (
                        <button
                          key={idx}
                          onClick={() => handleOpenView('emergency')}
                          className="w-full text-left block px-3 py-2 rounded-lg text-xs text-rose-200 hover:text-white hover:bg-rose-600/30 transition-colors font-bold cursor-pointer"
                        >
                          🚨 {srv.title}
                        </button>
                      );
                    }

                    return (
                      <a
                        key={idx}
                        href={srv.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(srv.href);
                        }}
                        className="block px-3 py-2 rounded-lg text-xs text-sky-100 hover:text-white hover:bg-white/10 transition-colors font-medium"
                      >
                        • {srv.title}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Blog & Guidance (Accordion) */}
            <div className="rounded-xl bg-white/5 overflow-hidden">
              <button
                onClick={() => setMobileBlogExpanded(!mobileBlogExpanded)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>Blog & Guidance</span>
                <ChevronDown className={`w-4 h-4 text-amber-300 transition-transform ${mobileBlogExpanded ? 'rotate-180' : ''}`} />
              </button>

              {mobileBlogExpanded && (
                <div className="px-3 pb-2.5 pt-1 space-y-1 bg-black/10">
                  {blogSubLinks.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOpenView(sub.view)}
                      className="w-full text-left block px-3 py-2 rounded-lg text-xs text-sky-100 hover:text-white hover:bg-white/10 transition-colors font-medium cursor-pointer"
                    >
                      • {sub.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Reviews */}
            <a
              href="#reviews"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#reviews');
              }}
              className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Reviews
            </a>

            {/* Call to action buttons */}
            <div className="pt-4 mt-3 border-t border-white/20 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onBookClick) onBookClick();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>

              <a
                href="tel:+919934885664"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/20 text-white text-sm font-semibold border border-white/30"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call: +91 99348 85664</span>
              </a>

              {/* Discreet Clinic Staff & Admin Portal inside Hamburger Drawer */}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAdminToggle();
                  }}
                  id="mobile-drawer-admin-button"
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 text-sky-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{isAdminView ? '← Back to Website' : 'Doctor & Staff Portal'}</span>
                  </div>
                  <span className="text-[11px] text-sky-200 opacity-80">Portal</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

