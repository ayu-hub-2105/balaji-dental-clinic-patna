import React, { useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Star,
  User,
  X,
  Sparkles,
  ChevronRight,
  Camera,
  Users,
  ShieldCheck,
  ExternalLink,
  MapPin,
  Maximize2
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { Doctor } from '../types';
import { ToothIcon } from './DentalIcons';

interface DoctorSectionProps {
  onBookWithDoctor: (doctorName: string) => void;
}

interface ClinicPhoto {
  id: string;
  title: string;
  titleHindi?: string;
  category: 'operatory' | 'technology' | 'clinic';
  imageUrl: string;
  description: string;
  badge: string;
}

const clinicPhotos: ClinicPhoto[] = [
  {
    id: 'photo-exterior-board',
    title: 'Clinic Exterior & Main Signboard',
    titleHindi: 'क्लिनिक का मुख्य बोर्ड व प्रवेश',
    category: 'clinic',
    imageUrl: '/real_clinic/gallery_op_6.webp',
    description: 'Street-facing entrance of Balaji Dental Clinic featuring golden 3D acrylic signage, wooden panel facade, and sliding glass entrance.',
    badge: 'Clinic Exterior'
  },
  {
    id: 'photo-reception-desk',
    title: 'Reception Desk & Help Counter',
    titleHindi: 'क्लिनिक रिसेप्शन काउंटर',
    category: 'clinic',
    imageUrl: '/real_clinic/gallery_op_10.webp',
    description: 'Air-conditioned front reception counter with clinic staff assisting patients with registrations and appointment check-ins.',
    badge: 'Reception Desk'
  },
  {
    id: 'photo-instruments-tray',
    title: 'Precision Dental Instruments & Rotary Motors',
    titleHindi: 'डेंटल इंस्ट्रूमेंट्स व उपकरण',
    category: 'technology',
    imageUrl: '/real_clinic/gallery_op_9.webp',
    description: 'Digital apex locators, endodontic rotary motors, cordless LED curing units, and sterile handpieces ready on the workstation.',
    badge: 'Dental Instruments'
  },
  {
    id: 'photo-operatory-chair',
    title: 'Dental Operatory & Treatment Chair',
    titleHindi: 'डेंटल चेयर व ट्रीटमेंट यूनिट',
    category: 'operatory',
    imageUrl: '/real_clinic/gallery_op_2.webp',
    description: 'Ergonomic light-green dental chair equipped with overhead shadowless examination lamp, delivery tray, and dental X-ray arm.',
    badge: 'Dental Chair'
  },
  {
    id: 'photo-waiting-lounge-tv',
    title: 'Patient Waiting Lounge & Television',
    titleHindi: 'मरीजों का वेटिंग लाउंज',
    category: 'clinic',
    imageUrl: '/real_clinic/gallery_op_4.webp',
    description: 'Spacious patient waiting area with comfortable black leather armchairs, wall-mounted television, and clean drinking water.',
    badge: 'Waiting Lounge'
  },
  {
    id: 'photo-certificates-wall',
    title: 'Waiting Area & Doctor Credentials Wall',
    titleHindi: 'प्रतीक्षा कक्ष व प्रमाण-पत्र',
    category: 'clinic',
    imageUrl: '/real_clinic/gallery_op_5.webp',
    description: 'Comfortable waiting lounge displaying Dr. Parijat Pallav’s academic degrees, orthodontic certifications, and honors.',
    badge: 'Degrees Wall'
  },
  {
    id: 'photo-consultation-room',
    title: "Doctor's Private Consultation Chamber",
    titleHindi: 'डेंटल कंसल्टेशन रूम',
    category: 'clinic',
    imageUrl: '/real_clinic/clinic_google_maps_exterior.jpg',
    description: 'Modern consultation room with computer workstation displaying 3D dental scans and comfortable visitor chairs for patient discussion.',
    badge: 'Consultation Room'
  },
  {
    id: 'photo-scanner-xray',
    title: 'Digital Scanner & Portable X-Ray Unit',
    titleHindi: 'डिजिटल स्कैनर व एक्स-रे',
    category: 'technology',
    imageUrl: '/real_clinic/gallery_op_1.webp',
    description: 'High-speed digital intraoral scanner docking station, clinic laptop display, and portable wall-mounted dental X-ray equipment.',
    badge: 'Digital Technology'
  },
  {
    id: 'photo-dr-at-desk',
    title: 'Dr. Parijat Pallav at Clinical Desk',
    titleHindi: 'डॉ. पारिजात क्लिनिक डेस्क पर',
    category: 'clinic',
    imageUrl: '/real_clinic/gallery_op_3.webp',
    description: 'Dr. Parijat Pallav in scrubs reviewing orthodontic patient case records, smile models, and digital diagnostic charts.',
    badge: 'Doctor in Clinic'
  },
  {
    id: 'photo-dr-operatory',
    title: 'Doctor & Operatory Treatment Suite',
    titleHindi: 'डॉक्टर व डेंटल ऑपरेटर सुइट',
    category: 'operatory',
    imageUrl: '/real_clinic/gallery_op_7.webp',
    description: 'Clinical operatory setup with doctor workstation, motorized dental chair, laptop diagnostic screen, and clinical instruments.',
    badge: 'Operatory Suite'
  },
  {
    id: 'photo-glass-entrance',
    title: 'Glass Sliding Entrance & Reception View',
    titleHindi: 'मुख्य ग्लास प्रवेश द्वार व लॉबी',
    category: 'clinic',
    imageUrl: '/real_clinic/gallery_op_8.webp',
    description: 'Main glass entrance showcasing the reception desk, wall accreditations, and welcoming ambience of the clinic.',
    badge: 'Glass Entrance'
  },
  {
    id: 'photo-patient-family',
    title: 'Satisfied Patient Family & Healthy Smiles',
    titleHindi: 'संतुष्ट परिवार की मुस्कान',
    category: 'clinic',
    imageUrl: '/real_clinic/clinic_hero_real.webp',
    description: 'Smiling patients and families enjoying confident, healthy smiles after comprehensive dental care at Balaji Clinic.',
    badge: 'Patient Smiles'
  }
];

const clinicalSupportTeam = [
  {
    name: 'Ajit Kumar',
    role: 'Head Clinic Coordinator & Receptionist',
    experience: '8+ Years Experience',
    bio: 'Leads front desk operations, OPD schedule coordination, patient records management, and senior consultation workflow at Balaji Dental Clinic.',
    badge: 'Head Receptionist'
  },
  {
    name: 'Yuvraj',
    role: 'Clinic Receptionist & Patient Care Executive',
    experience: '4+ Years Experience',
    bio: 'Oversees daily patient check-ins, live chat helpdesk, WhatsApp appointment confirmations, and patient assistance.',
    badge: 'Front Desk Reception'
  },
  {
    name: 'Rajeev Sharma',
    role: 'Senior Orthodontic & Dental Assistant',
    experience: '8+ Years Experience',
    bio: 'Assists Dr. Parijat Pallav chairside during 3D intraoral scans, Invisalign fittings, bracket bonding, and wire changes.',
    badge: 'Chairside Support'
  },
  {
    name: 'Sunita Devi',
    role: 'Sterilization & Infection Control In-charge',
    experience: '5+ Years Experience',
    bio: 'Maintains zero-tolerance sterile standards using Class-B autoclaves, ultrasonic cleaning, and individualized patient instrument packs.',
    badge: 'Sterilization Protocol'
  },
  {
    name: 'Manoj Kumar',
    role: 'Dental Lab & Digital Imaging Technician',
    experience: '7+ Years Experience',
    bio: 'Coordinates customized dental models, retainers, and aligner delivery with leading dental prosthetic laboratories.',
    badge: 'Digital Dental Lab'
  }
];

export const DoctorSection: React.FC<DoctorSectionProps> = ({ onBookWithDoctor }) => {
  const { doctors } = useClinic();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [activeTab, setActiveTab] = useState<'doctors' | 'team' | 'photos'>('doctors');
  const [photoFilter, setPhotoFilter] = useState<'all' | 'operatory' | 'technology' | 'clinic'>('all');
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<ClinicPhoto | null>(null);

  const headDoctor = doctors.find((d) => d.isHeadDoctor) || doctors[0];
  const associateDoctors = doctors.filter((d) => !d.isHeadDoctor);

  const filteredPhotos =
    photoFilter === 'all'
      ? clinicPhotos
      : clinicPhotos.filter((p) => p.category === photoFilter);

  return (
    <section id="doctors" className="py-16 md:py-24 bg-white border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-200">
            <ToothIcon className="w-3.5 h-3.5 text-sky-600" />
            <span>Doctors, Team & Facilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Meet Our Doctors & Team
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Led by Dr. Parijat Pallav (MDS) alongside specialized MDS consultants and BDS dental surgeons dedicated to modern, painless dentistry in Patna.
          </p>

          {/* Navigation View Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'doctors'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Specialist Doctors ({doctors.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'team'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Clinical Support Team</span>
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'photos'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Clinic Tour & Photos ({clinicPhotos.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DOCTORS VIEW */}
        {activeTab === 'doctors' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Featured Chief Doctor Card (Dr. Parijat Pallav) */}
            <div className="bg-gradient-to-br from-sky-50/70 via-white to-sky-50/40 rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-sm text-left relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Doctor Photo & Specialty Seal */}
                <div className="lg:col-span-4 relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white aspect-[4/5] max-h-96 bg-slate-900 group">
                    <img
                      src={headDoctor.photoUrl || '/real_clinic/dr_parijat_about.webp'}
                      alt={headDoctor.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

                    <div className="absolute top-3 left-3 bg-sky-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Chief Specialist</span>
                    </div>

                    <div className="absolute bottom-3 inset-x-3 text-white text-center">
                      <div className="inline-block px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-sky-200 text-xs font-bold mb-1">
                        MDS (Orthodontics & Dentofacial Orthopaedics)
                      </div>
                      <div className="pt-2 border-t border-white/20 flex items-center justify-around text-[11px] text-slate-200">
                        <span className="font-semibold">16+ Yrs Exp</span>
                        <span>•</span>
                        <span className="font-semibold">12k+ Smiles</span>
                        <span>•</span>
                        <span className="font-semibold text-amber-300">★ 5.0 (1.4k+ Reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Doctor Details & Credentials */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                        Lead Orthodontist & Implantologist
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Invisalign Diamond Provider
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                      {headDoctor.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                      {headDoctor.qualification}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {headDoctor.bio}
                  </p>

                  {/* Core Treatment Specialties */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Specialized Clinical Focus
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {headDoctor.treatmentExpertise.map((item, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timings */}
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="font-semibold">{headDoctor.timings}</span>
                  </div>

                  {/* Doctor CTAs */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onBookWithDoctor(headDoctor.name)}
                      className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Appointment</span>
                    </button>

                    <button
                      onClick={() => setSelectedDoctor(headDoctor)}
                      className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      View Profile & Qualifications
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Associate Specialist Doctors Grid */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-left">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Our Team of Dental Specialists & Surgeons ({associateDoctors.length})
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Experienced MDS consultants & BDS practitioners providing comprehensive oral care
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 self-start sm:self-auto">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                  <span>All Doctors Available by Appointment</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {associateDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-5 rounded-3xl bg-slate-50/80 border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all text-left flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3.5">
                      <div className="flex gap-4 items-start">
                        <div className="relative shrink-0">
                          <img
                            src={doc.photoUrl}
                            alt={doc.name}
                            className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              // fallback to doctor avatar icon
                              (e.target as HTMLImageElement).src = '/real_clinic/dr_parijat_about.webp';
                            }}
                          />
                          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-sky-600 text-white text-[9px] font-bold shadow-xs">
                            {doc.qualification.includes('MDS') ? 'MDS' : 'BDS'}
                          </span>
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span>{doc.rating} ({doc.reviewCount}+)</span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                            {doc.name}
                          </h4>
                          <p className="text-xs font-semibold text-sky-600 truncate">{doc.title}</p>
                          <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{doc.qualification}</p>
                        </div>
                      </div>

                      {/* Specialization pills */}
                      <div className="pt-2 border-t border-slate-200/60">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Specialization</p>
                        <p className="text-xs text-slate-700 leading-snug font-medium line-clamp-2">
                          {doc.specialization}
                        </p>
                      </div>

                      {/* Timings */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span className="truncate">{doc.timings.split('|')[0]}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedDoctor(doc)}
                        className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Profile & Bio</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onBookWithDoctor(doc.name)}
                        className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Slot</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLINICAL SUPPORT TEAM VIEW */}
        {activeTab === 'team' && (
          <div className="space-y-8 animate-fadeIn text-left">
            <div className="p-6 bg-sky-50/60 rounded-3xl border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Dedicated Care & Clinical Assistants</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Our trained dental assistants, sterilization in-charge, and front-desk coordinators ensure a seamless, hygienic, and comforting visit for every patient.
                </p>
              </div>
              <button
                onClick={() => onBookWithDoctor(headDoctor.name)}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
              >
                Schedule Consultation
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {clinicalSupportTeam.map((member, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 text-[10px] font-bold">
                        {member.badge}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">{member.name}</h4>
                      <p className="text-xs font-semibold text-sky-600">{member.role}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{member.experience}</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Certified Patient Care</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REAL CLINIC & OPERATORIES TOUR PHOTOS */}
        {activeTab === 'photos' && (
          <div className="space-y-6 animate-fadeIn text-left">
            {/* Filter pills & Google Maps direct link badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setPhotoFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    photoFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Photos ({clinicPhotos.length})
                </button>
                <button
                  onClick={() => setPhotoFilter('operatory')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    photoFilter === 'operatory'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Dental Chairs & Operatories
                </button>
                <button
                  onClick={() => setPhotoFilter('technology')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    photoFilter === 'technology'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Instruments & Digital Scanners
                </button>
                <button
                  onClick={() => setPhotoFilter('clinic')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    photoFilter === 'clinic'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Reception, Waiting & Exterior
                </button>
              </div>

              <a
                href="https://www.google.com/maps/place/Balaji+Dental+Clinic/@25.6171773,85.1257982,17z/data=!4m6!3m5!1s0x39ed5838210a770f:0xf917268ee4342675!8m2!3d25.6171773!4d85.1257982"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 text-xs font-bold hover:bg-sky-100 transition-colors shrink-0"
              >
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>View Google Maps Listing & Reviews</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div
                    className="relative aspect-[16/11] bg-slate-900 overflow-hidden cursor-pointer"
                    onClick={() => setActiveLightboxPhoto(photo)}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-xs text-white text-xs font-bold flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge Photo</span>
                      </span>
                    </div>

                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold">
                        {photo.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                          {photo.title}
                        </h4>
                      </div>
                      {photo.titleHindi && (
                        <p className="text-xs font-semibold text-sky-700 mt-0.5">
                          {photo.titleHindi}
                        </p>
                      )}
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {photo.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <button
                        onClick={() => setActiveLightboxPhoto(photo)}
                        className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onBookWithDoctor(headDoctor.name)}
                        className="text-[11px] font-semibold text-slate-600 hover:text-slate-900"
                      >
                        Book Visit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Photo Modal */}
      {activeLightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveLightboxPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxPhoto(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] bg-black">
              <img
                src={activeLightboxPhoto.imageUrl}
                alt={activeLightboxPhoto.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-xs font-bold">
                  {activeLightboxPhoto.badge}
                </span>
              </div>
            </div>

            <div className="p-6 text-left space-y-2">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-xl font-bold text-slate-900">{activeLightboxPhoto.title}</h3>
                {activeLightboxPhoto.titleHindi && (
                  <span className="text-sm font-semibold text-sky-700">({activeLightboxPhoto.titleHindi})</span>
                )}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeLightboxPhoto.description}
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Balaji Dental & Orthodontic Clinic • Patna</span>
                <button
                  onClick={() => {
                    setActiveLightboxPhoto(null);
                    onBookWithDoctor(headDoctor.name);
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Book Appointment at this Clinic
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto text-left animate-fadeIn">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-start mb-6">
              <img
                src={selectedDoctor.photoUrl || '/real_clinic/dr_parijat_about.webp'}
                alt={selectedDoctor.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover object-top border border-slate-200 shadow-md shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold">
                  <span>{selectedDoctor.experienceYears}+ Years Clinical Practice</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading">{selectedDoctor.name}</h3>
                <p className="text-sm font-semibold text-sky-700">{selectedDoctor.title}</p>
                <p className="text-xs text-slate-500">{selectedDoctor.qualification}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Clinical Biography</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedDoctor.bio}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Key Accreditations & Memberships</h4>
                <ul className="space-y-1.5">
                  {selectedDoctor.achievements.map((ach, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Consultation Hours & Availability</h4>
                <p className="text-xs text-slate-600 font-medium">{selectedDoctor.timings}</p>
                <p className="text-xs text-sky-700 font-semibold mt-0.5">
                  Available on: {selectedDoctor.availabilityDays.join(', ')}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const doc = selectedDoctor.name;
                  setSelectedDoctor(null);
                  onBookWithDoctor(doc);
                }}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm"
              >
                Book Appointment with {selectedDoctor.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
