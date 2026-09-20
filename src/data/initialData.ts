import {
  Appointment,
  BeforeAfterCase,
  BlogPost,
  ChatSession,
  Doctor,
  DoctorContentItem,
  IntegrationConfig,
  IntegrationLog,
  Lead,
  PatientProfile,
  PatientReview,
  Treatment
} from '../types';

import bracesBeforeOverbite from '../assets/images/braces_before_overbite_1788334694830.jpg';
import bracesAfterSmile from '../assets/images/braces_after_smile_1788334710509.jpg';
import crowdingBeforeBraces from '../assets/images/crowding_before_braces_1788334731836.jpg';

export const CLINIC_GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Balaji+Dental+Clinic/@25.6171821,85.1232233,17z/data=!3m1!4b1!4m6!3m5!1s0x39ed5838210a770f:0xf917268ee4342675!8m2!3d25.6171773!4d85.1257982!16s%2Fg%2F11g9jzz95f?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D';

export const initialDoctors: Doctor[] = [
  {
    id: 'dr-parijat-pallav',
    name: 'Dr. Parijat Pallav',
    title: 'Chief Orthodontist & Implant Specialist (MDS)',
    qualification: 'BDS, MDS (Orthodontics & Dentofacial Orthopaedics), FICOI (USA)',
    specialization: 'Invisalign Certified Diamond Provider, Advanced Dental Implants, Smile Designing, Orthodontic Braces',
    experienceYears: 16,
    photoUrl: '/real_clinic/dr_parijat_about.webp',
    bio: 'Dr. Parijat Pallav is the founder and Chief Specialist at Balaji Dental & Orthodontic Clinic. With over 16 years of clinical excellence, he is recognized among the top orthodontists and dental implant surgeons in Bihar. He has transformed over 12,000+ smiles using advanced Invisalign clear aligners, self-ligating ceramic braces, and computer-guided dental implants.',
    treatmentExpertise: [
      'Invisalign Clear Aligners',
      'Ceramic & Metal Braces',
      'Computer-Guided Dental Implants',
      'Full Mouth Rehabilitation',
      'Smile Designing & Veneers',
      'Dentofacial Orthopaedics'
    ],
    availabilityDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
    timings: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM (Wed-Mon) | Tuesday Closed',
    rating: 5.0,
    reviewCount: 1420,
    achievements: [
      'Certified Invisalign Diamond Provider',
      'Fellow of the International Congress of Oral Implantologists (FICOI, USA)',
      'Member of Indian Orthodontic Society (IOS)',
      '16+ Years Experience with 12,000+ Smiles'
    ],
    isHeadDoctor: true
  },
  {
    id: 'dr-kalptaru-kislay',
    name: 'Dr. Kalptaru Kislay',
    title: 'Consultant Specialist (MDS)',
    qualification: 'BDS, MDS',
    specialization: 'Prosthodontics, Fixed Crown & Bridge, Implant Prosthetics & Smile Designing',
    experienceYears: 10,
    photoUrl: '/doctors/dr_kalptaru_kislay.jpg',
    bio: 'Dr. Kalptaru Kislay (MDS) is a specialist consultant with over a decade of clinical experience in comprehensive dental rehabilitation, precision zirconia crowns, fixed bridges, and advanced aesthetic prosthetics.',
    treatmentExpertise: [
      'Zirconia Crowns & Bridges',
      'Implant Prosthetics',
      'Full Mouth Rehabilitation',
      'Dentures & Occlusal Rehabilitation',
      'Aesthetic Smile Designing'
    ],
    availabilityDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
    timings: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM (Wed-Mon) | Tuesday Closed',
    rating: 4.96,
    reviewCount: 680,
    achievements: [
      'Specialist in Full Mouth Fixed Restorations',
      'Excellence in CAD/CAM Zirconia Prosthetics',
      'Member of Indian Dental Association (IDA)'
    ]
  },
  {
    id: 'dr-alankrita-srivastava',
    name: 'Dr. Alankrita Srivastava',
    title: 'Consultant Specialist (MDS)',
    qualification: 'BDS, MDS (Conservative Dentistry & Endodontics)',
    specialization: 'Single-Sitting Microscopic Root Canal, Rotary Endodontics, Cosmetic Restorations',
    experienceYears: 9,
    photoUrl: '/doctors/dr_alankrita_srivastava.jpg',
    bio: 'Dr. Alankrita Srivastava (MDS) specializes in painless single-sitting root canal treatments and modern aesthetic restorations. Her gentle chairside manner and rotary endodontic technique ensure pain-free relief and long-term tooth preservation.',
    treatmentExpertise: [
      'Single-Sitting Rotary RCT',
      'Microscopic Endodontics',
      'Laser Teeth Whitening',
      'Tooth Re-treatments',
      'Composite Aesthetic Bonding'
    ],
    availabilityDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
    timings: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM (Wed-Mon) | Tuesday Closed',
    rating: 4.98,
    reviewCount: 740,
    achievements: [
      'Specialist in Painless Rotary Endodontics',
      'Over 5,000+ Successful Root Canals Completed',
      'Member of Federation of Operative Dentistry of India (FODI)'
    ]
  },
  {
    id: 'dr-rashmi',
    name: 'Dr. Rashmi',
    title: 'Dental Surgeon & Restorative Practitioner (BDS)',
    qualification: 'BDS',
    specialization: 'Preventive Dentistry, Teeth Scaling & Polishing, Aesthetic Fillings, Patient Care',
    experienceYears: 7,
    photoUrl: '/doctors/dr_rashmi.jpg',
    bio: 'Dr. Rashmi (BDS) is widely appreciated by patients for her gentle touch, comprehensive preventive care, ultrasonic scaling and polishing, and tooth-colored composite restorations.',
    treatmentExpertise: [
      'Ultrasonic Scaling & Polishing',
      'Aesthetic Tooth-Colored Fillings',
      'Preventive Oral Hygiene',
      'Painless Gum Care',
      'Routine Dental Checkups'
    ],
    availabilityDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
    timings: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM (Wed-Mon) | Tuesday Closed',
    rating: 4.95,
    reviewCount: 520,
    achievements: [
      'Commended by patients for gentle scaling & pain-free care',
      'Member of Indian Dental Association (IDA)',
      'Excellence in Preventive Oral Care'
    ]
  },
  {
    id: 'dr-srishty-rose',
    name: 'Dr. Srishty Rose',
    title: 'Dental Surgeon (BDS)',
    qualification: 'BDS',
    specialization: 'Pediatric Dentistry, Cosmetic Restorations, Preventive Dental Care, Oral Hygiene',
    experienceYears: 6,
    photoUrl: '/doctors/dr_srishty_rose.jpg',
    bio: 'Dr. Srishty Rose (BDS) brings gentle expertise to pediatric dental care, preventive fluoride and sealant treatments, tooth restorations, and routine oral health consultations.',
    treatmentExpertise: [
      'Pediatric Dental Care',
      'Aesthetic Fillings & Bonding',
      'Fluoride & Sealant Therapy',
      'Deep Teeth Cleaning',
      'Emergency Dental Relief'
    ],
    availabilityDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
    timings: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM (Wed-Mon) | Tuesday Closed',
    rating: 4.94,
    reviewCount: 460,
    achievements: [
      'Special focus on anxiety-free pediatric and young patient care',
      'Member of Indian Dental Association (IDA)',
      'Excellence in Dental Aesthetics & Care'
    ]
  },
  {
    id: 'dr-harsh-ranjan',
    name: 'Dr. Harsh Ranjan',
    title: 'Consultant Specialist (MDS)',
    qualification: 'BDS, MDS (Oral & Maxillofacial Surgery)',
    specialization: 'Painless Wisdom Tooth Extractions, Minor Oral Surgeries, Jaw Trauma, Bone Grafting',
    experienceYears: 9,
    photoUrl: '/doctors/dr_harsh_ranjan.jpg',
    bio: 'Dr. Harsh Ranjan (MDS) specializes in surgical dental procedures, atraumatic impacted wisdom tooth extractions, minor maxillofacial surgeries, and bone grafting with minimally invasive surgical protocols.',
    treatmentExpertise: [
      'Impacted Wisdom Tooth Surgeries',
      'Atraumatic Surgical Extractions',
      'Bone Grafting & Socket Preservation',
      'Cyst & Periapical Surgeries',
      'Dental Trauma Management'
    ],
    availabilityDays: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    timings: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM (By Appointment | Tuesday Closed)',
    rating: 4.97,
    reviewCount: 590,
    achievements: [
      'Association of Oral and Maxillofacial Surgeons of India (AOMSI)',
      'Painless Minimally Invasive Extraction Protocol',
      'Over 3,500+ Surgical Procedures'
    ]
  },
  {
    id: 'dr-piyush',
    name: 'Dr. Piyush',
    title: 'Consultant Specialist (MDS)',
    qualification: 'BDS, MDS (Periodontics & Oral Implantology)',
    specialization: 'Advanced Gum Therapy, Flap Surgery, Laser Periodontics & Dental Implants',
    experienceYears: 9,
    photoUrl: '/doctors/dr_piyush.jpg',
    bio: 'Dr. Piyush (MDS) specializes in periodontal tissue regeneration, advanced flap surgeries, laser-assisted gum contouring, and dental implant placements for lasting structural foundation.',
    treatmentExpertise: [
      'Periodontal Flap Surgeries',
      'Laser Gum Depigmentation',
      'Bone Regeneration & Grafting',
      'Dental Implant Placements',
      'Treatment of Bleeding & Receding Gums'
    ],
    availabilityDays: ['Wednesday', 'Friday', 'Saturday', 'Sunday'],
    timings: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM (By Appointment | Tuesday Closed)',
    rating: 4.96,
    reviewCount: 510,
    achievements: [
      'Member of Indian Society of Periodontology (ISP)',
      'Laser-Assisted Periodontics Certified',
      'Over 2,800+ Periodontal Interventions'
    ]
  }
];

export const initialTreatments: Treatment[] = [
  {
    id: 'invisalign-aligners',
    slug: 'invisalign-clear-aligners',
    title: 'Invisalign Clear Aligners',
    shortDesc: 'Virtually invisible, removable custom aligners engineered to straighten teeth smoothly without metal wires.',
    fullDesc: 'Invisalign is the modern, discreet alternative to traditional braces. Utilizing advanced 3D digital intraoral scanning with iTero and smart-track medical grade polymers, we map every micro-movement of your teeth before treatment begins. Eat whatever you want, brush normally, and enjoy a confident smile throughout your journey.',
    category: 'Orthodontics',
    iconName: 'Sparkles',
    imageUrl: '/treatments/invisalign_clear_aligner.jpg',
    duration: '6 to 18 Months',
    priceRange: '₹65,000 - ₹1,85,000',
    benefits: [
      '100% Nearly Invisible & Aesthetic',
      'Removable for meals & oral hygiene',
      '3D 3D Simulation of your future smile on Day 1',
      'Fewer clinic visits compared to metal braces',
      'Smooth edges with zero mouth ulceration'
    ],
    procedureSteps: [
      { stepNumber: 1, title: '3D Digital Intraoral Scan', desc: 'No gooey molds. High-precision 3D scan captures 6,000 frames per second.' },
      { stepNumber: 2, title: 'ClinCheck® Treatment Simulation', desc: 'Dr. Parijat designs your custom digital tooth movement roadmap.' },
      { stepNumber: 3, title: 'Custom Aligners Delivery', desc: 'Receive your set of medical-grade aligners with wear instructions (20-22 hrs/day).' },
      { stepNumber: 4, title: 'Progress Reviews & Vivera Retainers', desc: 'Bi-monthly quick reviews and retainers to lock your perfect smile in place.' }
    ],
    faqs: [
      { question: 'How long do I need to wear aligners each day?', answer: 'For optimal results, aligners should be worn 20 to 22 hours per day, removing them only to eat, drink hot beverages, and brush.' },
      { question: 'Is Invisalign painful?', answer: 'Most patients feel mild pressure for 24-48 hours when switching to a new tray, which is a normal sign that teeth are gently shifting into position.' }
    ],
    isPopular: true
  },
  {
    id: 'orthodontic-braces',
    slug: 'braces-ceramic-metal',
    title: 'Orthodontic Braces (Ceramic & Metal)',
    shortDesc: 'Comprehensive orthodontic correction with advanced low-friction self-ligating brackets and tooth-colored ceramic.',
    fullDesc: 'From severe crowding, crossbites, and deep bites to space closure, our orthodontic braces solutions deliver lasting functional balance and facial aesthetics. We use American Orthodontics & 3M self-ligating bracket systems for minimal friction and faster treatment timelines.',
    category: 'Orthodontics',
    iconName: 'Smile',
    imageUrl: '/treatments/braces_metal_ceramic.jpg',
    duration: '12 to 24 Months',
    priceRange: '₹28,000 - ₹75,000',
    benefits: [
      'Corrects severe skeletal and dental misalignments',
      'Option of clear ceramic brackets for discreet look',
      'Low-friction self-ligating technology saves 4-6 months',
      'Permanent, stable bite correction and jaw alignment'
    ],
    procedureSteps: [
      { stepNumber: 1, title: 'Orthodontic Cephalometric Analysis', desc: 'Digital lateral ceph X-ray and photographic profile mapping.' },
      { stepNumber: 2, title: 'Painless Bracket Bonding', desc: 'Precision placement of brackets using high-strength light-cured dental adhesive.' },
      { stepNumber: 3, title: 'Periodic Wire Tightening', desc: 'Monthly appointments to adjust nickel-titanium shape-memory archwires.' },
      { stepNumber: 4, title: 'Debonding & Retention', desc: 'Safe bracket removal, enamel polishing, and customized retainers.' }
    ],
    faqs: [
      { question: 'What is the difference between Metal and Ceramic braces?', answer: 'Ceramic braces use tooth-colored or clear porcelain brackets that blend naturally with your teeth, making them far less noticeable than silver metal brackets while offering identical strength.' }
    ],
    isPopular: true
  },
  {
    id: 'dental-implants',
    slug: 'dental-implants',
    title: 'Dental Implants (Permanent Teeth)',
    shortDesc: 'Lifetime titanium and zirconia root replacements that look, feel, and function exactly like natural teeth.',
    fullDesc: 'Dental implants are the gold standard for replacing missing single or multiple teeth. Placed securely into the jawbone, they prevent bone resorption, maintain youthful facial structure, and restore 100% natural chewing efficiency with lifetime warranty options.',
    category: 'Implantology',
    iconName: 'ShieldCheck',
    imageUrl: '/treatments/dental_implant_procedure.jpg',
    duration: '1 to 2 Sessions (Healing 3-4 months)',
    priceRange: '₹22,000 - ₹55,000 per implant',
    benefits: [
      'Preserves adjacent natural teeth (no grinding needed)',
      'Prevents jawbone shrinkage and facial sagging',
      'Eat all your favorite foods with full chewing force',
      'Highest clinical success rate (98.6%)'
    ],
    procedureSteps: [
      { stepNumber: 1, title: 'CBCT 3D Bone Scan', desc: 'Detailed 3D volumetric analysis of jawbone density and nerve paths.' },
      { stepNumber: 2, title: 'Computer-Guided Fixture Placement', desc: 'Painless insertion of medical-grade titanium fixture under local anesthesia.' },
      { stepNumber: 3, title: 'Osseointegration Period', desc: 'Bone biologically fuses with the titanium implant surface.' },
      { stepNumber: 4, title: 'Custom Zirconia Crown Fixation', desc: 'CAD/CAM milled screw-retained crown color-matched to natural teeth.' }
    ],
    faqs: [
      { question: 'How long do dental implants last?', answer: 'With proper brushing, flossing, and annual checkups, dental implants are designed to last a lifetime.' }
    ],
    isPopular: true
  },
  {
    id: 'laser-teeth-whitening',
    slug: 'laser-teeth-whitening',
    title: 'Laser Teeth Whitening',
    shortDesc: 'Instant 6-8 shades brighter smile in just 45 minutes with advanced cold-light laser activation.',
    fullDesc: 'Remove deep coffee, tea, smoking, and age-related yellow stains safely without damaging tooth enamel. Our clinic-grade Philips Zoom and cold blue laser whitening system delivers instant, dazzling brightness with specialized desensitizing agents for zero sensitivity.',
    category: 'Cosmetic',
    iconName: 'Zap',
    imageUrl: '/treatments/laser_teeth_whitening.jpg',
    duration: '45 Minutes',
    priceRange: '₹7,500 - ₹14,000',
    benefits: [
      'Up to 8 shades lighter in a single visit',
      'Safe on enamel with neutral pH formulation',
      'Includes gum barrier protection and anti-sensitivity varnish',
      'Long-lasting results lasting 1-3 years'
    ],
    procedureSteps: [
      { stepNumber: 1, title: 'Shade Assessment & Cleaning', desc: 'Baseline shade recording and ultrasonic polishing.' },
      { stepNumber: 2, title: 'Gingival Barrier Protection', desc: 'Light-cured protective barrier applied to gums.' },
      { stepNumber: 3, title: 'Laser Whitening Gel Cycles', desc: '3 x 15-minute intervals of laser-activated hydrogen peroxide gel.' },
      { stepNumber: 4, title: 'Fluoride Mineral Infusion', desc: 'Post-whitening enamel strengthener to prevent sensitivity.' }
    ],
    faqs: [
      { question: 'Will whitening weaken my teeth?', answer: 'No. Professional in-clinic laser whitening only targets organic pigment molecules within the microscopic enamel tubules and does not erode enamel structure.' }
    ],
    isPopular: true
  },
  {
    id: 'root-canal-treatment',
    slug: 'root-canal-treatment',
    title: 'Single-Sitting Root Canal (RCT)',
    shortDesc: '100% painless computerized rotary root canal procedure to rescue deeply infected teeth and relieve pain.',
    fullDesc: 'Forget the outdated myths about root canals. With electronic apex locators, high-torque rotary endodontics, and digital radiography, Dr. Sneha Verma completes root canals in a single 40-minute sitting with zero discomfort, preserving your natural tooth for decades.',
    category: 'Endodontics',
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800',
    duration: '40 - 50 Minutes',
    priceRange: '₹3,500 - ₹7,500',
    benefits: [
      'Immediate relief from severe toothache and infection',
      'Completed in one sitting under painless local anesthesia',
      'Retains natural tooth root to maintain jawbone health',
      'Hermetic 3D obturation prevents re-infection'
    ],
    procedureSteps: [
      { stepNumber: 1, title: 'Digital X-Ray & Anesthesia', desc: 'Precise visualization of canal anatomy and profound numbness.' },
      { stepNumber: 2, title: 'Micro-Infection Removal', desc: 'Gentle cleaning of infected pulp using flexible nickel-titanium rotary files.' },
      { stepNumber: 3, title: 'Laser / Ultrasonic Canal Irrigation', desc: 'Eradicates 99.9% of bacteria deep within lateral canals.' },
      { stepNumber: 4, title: 'Biocompatible Gutta-Percha Sealing', desc: 'Canals sealed tight, ready for core buildup and crown.' }
    ],
    faqs: [
      { question: 'Is a crown necessary after a root canal?', answer: 'Yes, after root canal therapy, a tooth becomes slightly brittle. A durable zirconia or ceramic crown protects it from cracking during heavy chewing.' }
    ],
    isPopular: true
  },
  {
    id: 'zirconia-crowns-bridges',
    slug: 'dental-crowns-bridges',
    title: 'Zirconia & Ceramic Crowns / Bridges',
    shortDesc: 'CAD/CAM custom-milled monolithic zirconia crowns with life-like translucency and unbreakable strength.',
    fullDesc: 'Restore fractured, decayed, or root-canal-treated teeth with ultra-strong, metal-free Zirconia and E.max porcelain crowns. Designed digitally on 3D computer software for micron-level fit and natural light translucency that matches surrounding teeth flawlessly.',
    category: 'Cosmetic',
    iconName: 'Crown',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    duration: '2 Appointments (3-5 days)',
    priceRange: '₹6,000 - ₹16,000 per unit',
    benefits: [
      '100% Metal-Free: No black gum line over time',
      'Diamond-level chip resistance and biocompatibility',
      'Up to 15 Years replacement warranty',
      'Precision CAD/CAM computer milling for exact bite'
    ],
    procedureSteps: [
      { stepNumber: 1, title: 'Tooth Preparation & 3D Scan', desc: 'Gentle conservative shaping and digital optical impression.' },
      { stepNumber: 2, title: 'Temporary Crown Placement', desc: 'Protect tooth while permanent crown is crafted in lab.' },
      { stepNumber: 3, title: 'CAD/CAM Laser Milling', desc: 'Multilayer zirconia disc robotically carved and sintered at 1500°C.' },
      { stepNumber: 4, title: 'Resin Cementation & Bite Check', desc: 'Permanent chemical bonding with micro-fine bite equilibration.' }
    ],
    faqs: [
      { question: 'How long do zirconia crowns last?', answer: 'Zirconia crowns typically last 15-20+ years or a lifetime with regular dental hygiene and checkups.' }
    ]
  },
  {
    id: 'wisdom-tooth-extraction',
    slug: 'wisdom-tooth-extraction',
    title: 'Painless Wisdom Tooth Extraction',
    shortDesc: 'Minimally invasive surgical removal of impacted wisdom teeth with quick recovery and minimal swelling.',
    fullDesc: 'Impacted or crooked third molars can cause painful gum swelling (pericoronitis), food lodgement, and crowding of front teeth. Dr. Amit Anand utilizes precision piezo-surgical instruments for atraumatic extractions with minimal post-operative downtime.',
    category: 'Surgery',
    iconName: 'Scissors',
    imageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800',
    duration: '30 - 45 Minutes',
    priceRange: '₹3,000 - ₹8,500',
    benefits: [
      'Prevents damage to adjacent second molar teeth',
      'Eliminates chronic jaw ache and recurring mouth infections',
      'Painless local anesthesia and atraumatic sectioning technique',
      'Quick 48-72 hour recovery with modern post-op protocols'
    ],
    procedureSteps: [
      { stepNumber: 1, title: 'Digital OPG / CBCT X-Ray', desc: 'Analyze root curvature and proximity to inferior alveolar nerve.' },
      { stepNumber: 2, title: 'Painless Local Anesthesia', desc: 'Profound numbness ensures you feel zero sharpness or pain.' },
      { stepNumber: 3, title: 'Gentle Tooth Sectioning', desc: 'Atraumatic division of tooth for smooth extraction without bone damage.' },
      { stepNumber: 4, title: 'PRP / Resorbable Sutures', desc: 'Accelerated healing membrane and dissolvable sutures.' }
    ],
    faqs: [
      { question: 'When can I resume normal eating?', answer: 'You can consume soft and cold foods (ice cream, yogurt, khichdi) on Day 1, gradually returning to normal diet after 3-4 days.' }
    ]
  },
  {
    id: 'laser-gum-surgery',
    slug: 'laser-gum-surgery',
    title: 'Laser Dentistry & Gum Therapy',
    shortDesc: 'Suture-free, bloodless laser treatment for bleeding gums, gummy smiles, and depigmentation.',
    fullDesc: 'Utilizing advanced diode soft-tissue lasers, we treat periodontal pockets, perform aesthetic gum contouring (gingivoplasty for gummy smiles), and gently vaporize dark melanin pigment without scalpel incisions or stitches.',
    category: 'Surgery',
    iconName: 'Flame',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    duration: '30 - 40 Minutes',
    priceRange: '₹4,000 - ₹18,000',
    benefits: [
      'No blades, no scalpels, and virtually zero bleeding',
      'Immediate sterilization of infected gum tissue',
      'Aesthetic smile transformation for excess gum exposure',
      'Faster healing with minimal discomfort'
    ],
    procedureSteps: [
      { stepNumber: 1, title: 'Periodontal Charting & Laser Calibration', desc: 'Map pocket depths and calibrate laser wavelength.' },
      { stepNumber: 2, title: 'Laser Decontamination', desc: 'Laser fiber gently sweeps subgingival pocket to eliminate bacteria.' },
      { stepNumber: 3, title: 'Biostimulation & Tissue Remodeling', desc: 'Low-level laser light triggers rapid collagen tissue regeneration.' }
    ],
    faqs: [
      { question: 'Is laser gum surgery painful?', answer: 'Most patients describe only a mild warm tingling sensation. Topical or very light anesthesia is sufficient.' }
    ]
  },
  {
    id: 'tooth-fillings-restorations',
    slug: 'tooth-fillings-restorations',
    title: 'Tooth Fillings & Cosmetic Bonding',
    shortDesc: 'Natural tooth-colored composite resin fillings that blend invisibly to restore minor cavities and chips.',
    fullDesc: 'Mercury-free, ultra-durable composite nano-hybrid restorations that match your tooth’s exact shade, translucency, and natural surface grooves. Strengthens weakened tooth structure while looking completely natural.',
    category: 'General',
    iconName: 'CheckCircle',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    duration: '20 - 30 Minutes',
    priceRange: '₹1,200 - ₹3,500',
    benefits: [
      '100% Mercury-free tooth colored resin',
      'Chemically bonds directly to natural tooth enamel',
      'Preserves maximum healthy tooth structure',
      'Instant light curing - eat immediately after'
    ],
    procedureSteps: [
      { stepNumber: 1, title: 'Gentle Cavity Cleaning', desc: 'Remove microscopic decay.' },
      { stepNumber: 2, title: 'Micro-Etch & Adhesive Prime', desc: 'Creates micro-porosities for permanent bond.' },
      { stepNumber: 3, title: 'Layered Composite Placement', desc: 'Shaded resin sculpted to restore tooth anatomy.' },
      { stepNumber: 4, title: 'Blue LED Light Cure & High Polish', desc: 'Hardened in 20 seconds and polished to glass-like luster.' }
    ],
    faqs: [
      { question: 'How long do composite fillings last?', answer: 'High-grade nano-hybrid composite fillings typically last 7 to 10+ years with good oral hygiene.' }
    ]
  },
  {
    id: 'full-mouth-rehab',
    slug: 'full-mouth-rehabilitation',
    title: 'Full Mouth Rehabilitation & Smile Design',
    shortDesc: 'Comprehensive multidisciplinary restoration of worn, broken, or missing teeth for optimal bite and youthful smile.',
    fullDesc: 'Designed for patients suffering from severe dental attrition, collapsed bite, chronic jaw pain (TMJ disorder), or multiple missing teeth. Combining orthodontics, dental implants, porcelain veneers, and crowns into an orchestrated transformation.',
    category: 'Cosmetic',
    iconName: 'HeartHandshake',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    duration: 'Custom Treatment Plan',
    priceRange: 'Consultation & Custom Quote',
    benefits: [
      'Restores collapsed vertical facial height for a 10-year younger look',
      'Resolves chronic jaw muscle strain and clicking TMJ pain',
      '100% harmonious smile line and confident chewing capability',
      'Executed by multidisciplinary team under Dr. Parijat Pallav'
    ],
    procedureSteps: [
      { stepNumber: 1, title: 'Digital Smile Design (DSD) & Face-Bow Analysis', desc: 'Facial aesthetics mapping with digital mockups.' },
      { stepNumber: 2, title: 'Phase I: Disease & Infection Elimination', desc: 'Gum health stabilization, extractions, or implants.' },
      { stepNumber: 3, title: 'Phase II: Bite Architecture & Temporaries', desc: 'Testing new bite height with provisional aesthetic teeth.' },
      { stepNumber: 4, title: 'Phase III: Final Zirconia/E.max Deliveries', desc: 'Precision aesthetic ceramic bonding.' }
    ],
    faqs: [
      { question: 'Am I a candidate for full mouth rehabilitation?', answer: 'If you have heavily worn, broken, or missing teeth causing difficulty chewing or jaw fatigue, a clinical assessment will determine your personalized roadmap.' }
    ]
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'BD-2026-00125',
    patientName: 'Rahul Sharma',
    phone: '+91 98112 34567',
    email: 'rahul.sharma88@gmail.com',
    treatment: 'Dental Implants',
    doctor: 'Dr. Parijat Pallav',
    date: '2026-09-02',
    time: '11:00 AM',
    source: 'Dr. Klick',
    status: 'Confirmed',
    patientType: 'New',
    createdDate: '2026-09-01 09:42 AM',
    notes: 'Inquiry via Dr. Klick portal. Missing lower first molar, seeking titanium implant.',
    age: 38,
    gender: 'Male',
    fee: 1000,
    externalReferenceId: 'DKLK-98421'
  },
  {
    id: 'BD-2026-00126',
    patientName: 'Priya Singh',
    phone: '+91 97184 55667',
    email: 'priya.singh@outlook.com',
    treatment: 'Invisalign Clear Aligners',
    doctor: 'Dr. Parijat Pallav',
    date: '2026-09-02',
    time: '04:30 PM',
    source: 'Website',
    status: 'Confirmed',
    patientType: 'New',
    createdDate: '2026-09-01 10:15 AM',
    notes: 'Booked directly on Balaji website. Wants 3D scan for clear aligners.',
    age: 26,
    gender: 'Female',
    fee: 800
  },
  {
    id: 'BD-2026-00127',
    patientName: 'Amit Kumar Roy',
    phone: '+91 98351 22334',
    email: 'amit.roy@techcorp.in',
    treatment: 'Single-Sitting Root Canal (RCT)',
    doctor: 'Dr. Sneha Verma',
    date: '2026-09-02',
    time: '12:15 PM',
    source: 'Remedo',
    status: 'Confirmed',
    patientType: 'New',
    createdDate: '2026-09-01 11:20 AM',
    notes: 'Referred from Remedo Healthcare app. Acute pain in upper right premolar.',
    age: 34,
    gender: 'Male',
    fee: 800,
    externalReferenceId: 'REMEDO-88219'
  },
  {
    id: 'BD-2026-00128',
    patientName: 'Ananya Das',
    phone: '+91 99342 88990',
    email: 'ananya.das@gmail.com',
    treatment: 'Laser Teeth Whitening',
    doctor: 'Dr. Sneha Verma',
    date: '2026-09-02',
    time: '06:00 PM',
    source: 'WhatsApp',
    status: 'Confirmed',
    patientType: 'New',
    createdDate: '2026-09-01 12:45 PM',
    notes: 'WhatsApp consultation. Wedding in 2 weeks, wants instant whitening.',
    age: 28,
    gender: 'Female',
    fee: 800
  },
  {
    id: 'BD-2026-00129',
    patientName: 'Vikram Malhotra',
    phone: '+91 98100 44556',
    email: 'vikram.m@gmail.com',
    treatment: 'Orthodontic Braces (Ceramic & Metal)',
    doctor: 'Dr. Parijat Pallav',
    date: '2026-09-02',
    time: '05:15 PM',
    source: 'Google',
    status: 'Confirmed',
    patientType: 'Existing',
    createdDate: '2026-08-31 03:20 PM',
    notes: 'Routine monthly braces wire adjustment appointment.',
    age: 19,
    gender: 'Male',
    fee: 500
  },
  {
    id: 'BD-2026-00130',
    patientName: 'Snehal Deshmukh',
    phone: '+91 94312 66778',
    email: 'snehal.d@gmail.com',
    treatment: 'Painless Wisdom Tooth Extraction',
    doctor: 'Dr. Amit Anand',
    date: '2026-09-03',
    time: '04:30 PM',
    source: 'Instagram',
    status: 'Pending',
    patientType: 'New',
    createdDate: '2026-09-01 02:10 PM',
    notes: 'Saw Dr. Parijat Instagram reel on wisdom teeth. Left lower jaw swelling.',
    age: 23,
    gender: 'Female',
    fee: 800
  },
  {
    id: 'BD-2026-00131',
    patientName: 'Rajeshwar Prasad',
    phone: '+91 98350 11223',
    email: 'rajeshwar.p@bihargov.in',
    treatment: 'Full Mouth Rehabilitation & Smile Design',
    doctor: 'Dr. Parijat Pallav',
    date: '2026-09-03',
    time: '10:30 AM',
    source: 'Phone',
    status: 'Confirmed',
    patientType: 'Existing',
    createdDate: '2026-08-30 11:00 AM',
    notes: 'Phone call to clinic desk. Reviewing mockups for full mouth zirconia rehabilitation.',
    age: 58,
    gender: 'Male',
    fee: 1000
  },
  {
    id: 'BD-2026-00132',
    patientName: 'Kavita Chawla',
    phone: '+91 99105 77889',
    email: 'kavita.chawla@gmail.com',
    treatment: 'Zirconia & Ceramic Crowns / Bridges',
    doctor: 'Dr. Sneha Verma',
    date: '2026-09-03',
    time: '11:45 AM',
    source: 'Website',
    status: 'Confirmed',
    patientType: 'New',
    createdDate: '2026-09-01 08:30 AM',
    notes: 'Wants aesthetic replacement for old metal-ceramic crown on front central incisor.',
    age: 42,
    gender: 'Female',
    fee: 800
  },
  {
    id: 'BD-2026-00133',
    patientName: 'Mohd. Farhan',
    phone: '+91 97714 33221',
    email: 'farhan.m@gmail.com',
    treatment: 'Invisalign Clear Aligners',
    doctor: 'Dr. Parijat Pallav',
    date: '2026-09-03',
    time: '06:30 PM',
    source: 'Dr. Klick',
    status: 'Confirmed',
    patientType: 'New',
    createdDate: '2026-09-01 01:15 PM',
    notes: 'Dr. Klick booked consultation for spacing between upper teeth.',
    age: 29,
    gender: 'Male',
    fee: 1000,
    externalReferenceId: 'DKLK-98442'
  },
  {
    id: 'BD-2026-00134',
    patientName: 'Deepak Mishra',
    phone: '+91 98352 99001',
    email: 'deepak.mishra@gmail.com',
    treatment: 'Dental Implants',
    doctor: 'Dr. Parijat Pallav',
    date: '2026-09-04',
    time: '11:15 AM',
    source: 'Remedo',
    status: 'Pending',
    patientType: 'New',
    createdDate: '2026-09-01 03:40 PM',
    notes: 'Remedo Practice booking. Needs evaluation for 2 lower molar implants.',
    age: 51,
    gender: 'Male',
    fee: 800,
    externalReferenceId: 'REMEDO-88235'
  },
  {
    id: 'BD-2026-00135',
    patientName: 'Meera Iyer',
    phone: '+91 98118 77665',
    email: 'meera.iyer@gmail.com',
    treatment: 'Laser Dentistry & Gum Therapy',
    doctor: 'Dr. Sneha Verma',
    date: '2026-09-04',
    time: '05:00 PM',
    source: 'Facebook',
    status: 'Confirmed',
    patientType: 'New',
    createdDate: '2026-08-31 06:10 PM',
    notes: 'Facebook ad campaign lead. Bleeding gums and deep cleaning needed.',
    age: 31,
    gender: 'Female',
    fee: 800
  },
  {
    id: 'BD-2026-00136',
    patientName: 'Sanjay Jha',
    phone: '+91 94314 55443',
    email: 'sanjay.jha@bankofindia.co.in',
    treatment: 'Tooth Fillings & Cosmetic Bonding',
    doctor: 'Dr. Sneha Verma',
    date: '2026-09-01',
    time: '10:00 AM',
    source: 'Website',
    status: 'Completed',
    patientType: 'Existing',
    createdDate: '2026-08-28 04:00 PM',
    notes: 'Completed composite filling on lower right second molar.',
    age: 46,
    gender: 'Male',
    fee: 1500
  },
  {
    id: 'BD-2026-00137',
    patientName: 'Ritu Agarwal',
    phone: '+91 98105 11998',
    email: 'ritu.agarwal@gmail.com',
    treatment: 'Invisalign Clear Aligners',
    doctor: 'Dr. Parijat Pallav',
    date: '2026-09-01',
    time: '05:30 PM',
    source: 'Dr. Klick',
    status: 'Completed',
    patientType: 'Existing',
    createdDate: '2026-08-27 11:30 AM',
    notes: 'Delivered aligner set #14 to #18.',
    age: 27,
    gender: 'Female',
    fee: 2500,
    externalReferenceId: 'DKLK-98210'
  },
  {
    id: 'BD-2026-00138',
    patientName: 'Gaurav Kulkarni',
    phone: '+91 98230 44551',
    email: 'gaurav.k@gmail.com',
    treatment: 'Single-Sitting Root Canal (RCT)',
    doctor: 'Dr. Sneha Verma',
    date: '2026-08-31',
    time: '12:00 PM',
    source: 'WhatsApp',
    status: 'Completed',
    patientType: 'New',
    createdDate: '2026-08-30 08:15 AM',
    notes: 'Emergency WhatsApp intake. RCT successfully completed.',
    age: 39,
    gender: 'Male',
    fee: 4500
  },
  // Sample potential duplicate appointment for detection feature
  {
    id: 'BD-2026-00139',
    patientName: 'Rahul Sharma',
    phone: '+91 98112 34567',
    email: 'rahul.sharma88@gmail.com',
    treatment: 'Dental Implants',
    doctor: 'Dr. Parijat Pallav',
    date: '2026-09-02',
    time: '11:30 AM',
    source: 'Website',
    status: 'Pending',
    patientType: 'New',
    createdDate: '2026-09-01 10:45 AM',
    notes: 'Same patient re-submitted booking on website 1 hour after Dr. Klick booking.',
    isDuplicate: true,
    duplicateOfId: 'BD-2026-00125',
    duplicateScore: 94,
    isDuplicateResolved: false,
    age: 38,
    gender: 'Male',
    fee: 800
  },
  {
    id: 'BD-2026-00140',
    patientName: 'Pooja Bhatt',
    phone: '+91 99110 33445',
    email: 'pooja.bhatt@gmail.com',
    treatment: 'Orthodontic Braces (Ceramic & Metal)',
    doctor: 'Dr. Parijat Pallav',
    date: '2026-09-05',
    time: '10:30 AM',
    source: 'Website',
    status: 'Confirmed',
    patientType: 'New',
    createdDate: '2026-09-01 11:10 AM',
    notes: 'Self-ligating ceramic braces consultation.',
    age: 21,
    gender: 'Female',
    fee: 800
  },
  {
    id: 'BD-2026-00141',
    patientName: 'Alok Ranjan',
    phone: '+91 98354 88776',
    email: 'alok.ranjan@gmail.com',
    treatment: 'Dental Implants',
    doctor: 'Dr. Parijat Pallav',
    date: '2026-09-05',
    time: '04:15 PM',
    source: 'Dr. Klick',
    status: 'Confirmed',
    patientType: 'New',
    createdDate: '2026-08-31 01:20 PM',
    notes: 'Inquiry for full arch lower implant bridge.',
    age: 62,
    gender: 'Male',
    fee: 1000,
    externalReferenceId: 'DKLK-98430'
  },
  {
    id: 'BD-2026-00142',
    patientName: 'Tanya Sen',
    phone: '+91 98115 66778',
    email: 'tanya.sen@gmail.com',
    treatment: 'Laser Teeth Whitening',
    doctor: 'Dr. Sneha Verma',
    date: '2026-09-05',
    time: '05:45 PM',
    source: 'Instagram',
    status: 'Confirmed',
    patientType: 'New',
    createdDate: '2026-08-30 02:40 PM',
    notes: 'Instagram story swipe up inquiry.',
    age: 24,
    gender: 'Female',
    fee: 800
  },
  {
    id: 'BD-2026-00143',
    patientName: 'Rameshwar Nath',
    phone: '+91 94310 99887',
    email: 'rameshwar.nath@gmail.com',
    treatment: 'Zirconia & Ceramic Crowns / Bridges',
    doctor: 'Dr. Sneha Verma',
    date: '2026-09-06',
    time: '11:00 AM',
    source: 'Remedo',
    status: 'Confirmed',
    patientType: 'New',
    createdDate: '2026-08-31 09:15 AM',
    notes: 'Remedo referral for 3-unit zirconia bridge.',
    age: 54,
    gender: 'Male',
    fee: 800,
    externalReferenceId: 'REMEDO-88241'
  }
];

export const initialIntegrations: IntegrationConfig[] = [
  {
    id: 'int-drklick',
    name: 'Dr. Klick Multi-Channel Sync',
    type: 'Dr. Klick',
    description: 'Bi-directional appointment sync & webhook ingestion for verified patient bookings from Dr. Klick platform.',
    status: 'Connected',
    baseUrl: 'https://api.drklick.com/v2/clinic-bridge',
    apiKey: 'dklk_live_pk_99481a8b72c91',
    apiSecret: 'dklk_sec_••••••••••••••••••••3f92',
    webhookUrl: 'https://balajidentalbraces.com/api/webhooks/drklick',
    webhookSecret: 'whsec_dklk_99214ab81',
    clinicId: 'BDC_PATNA_MAIN',
    doctorId: 'DOC_PARIJAT_PALLAV',
    locationId: 'LOC_CENTRAL_01',
    authMethod: 'API Key Header',
    lastSynced: '2 mins ago',
    lastSuccessfulAppointment: 'Today 09:42 AM (BD-2026-00125)',
    totalIngested: 284,
    isAutoSync: true,
    syncIntervalMinutes: 5,
    documentationUrl: 'https://developer.drklick.com/docs/api'
  },
  {
    id: 'int-remedo',
    name: 'Remedo Practice Partner Gateway',
    type: 'Remedo',
    description: 'Automated REST polling and webhook receiver for Remedo Healthcare clinic management and patient bookings.',
    status: 'Connected',
    baseUrl: 'https://partners.remedo.health/api/v2/provider-sync',
    apiKey: 'remedo_prod_auth_88319f2a',
    apiSecret: 'remedo_secret_••••••••••••••••7c11',
    webhookUrl: 'https://balajidentalbraces.com/api/webhooks/remedo',
    webhookSecret: 'whsec_remedo_77189bf',
    clinicId: 'REMEDO_CLINIC_88190',
    doctorId: 'DR_PALLAV_01',
    locationId: 'PATNA_METRO_EAST',
    authMethod: 'Bearer Token',
    lastSynced: '5 mins ago',
    lastSuccessfulAppointment: 'Today 11:20 AM (BD-2026-00127)',
    totalIngested: 194,
    isAutoSync: true,
    syncIntervalMinutes: 5,
    documentationUrl: 'https://remedo.health/developers'
  },
  {
    id: 'int-website',
    name: 'Balaji Official Website Engine',
    type: 'Website',
    description: 'Direct real-time form intake, instant appointment slot reservation, and automated patient SMS confirmation.',
    status: 'Connected',
    baseUrl: 'https://balajidentalbraces.com/api/v1',
    apiKey: 'bdc_internal_web_991823',
    apiSecret: 'bdc_sec_internal_live_2026',
    webhookUrl: 'https://balajidentalbraces.com/api/webhooks/website',
    webhookSecret: 'whsec_web_internal_01',
    clinicId: 'BALAJI_MAIN',
    doctorId: 'ALL_DOCTORS',
    locationId: 'MAIN_CAMPUS',
    authMethod: 'API Key Header',
    lastSynced: 'Active (Real-time)',
    lastSuccessfulAppointment: 'Today 10:15 AM (BD-2026-00126)',
    totalIngested: 412,
    isAutoSync: true,
    syncIntervalMinutes: 1
  },
  {
    id: 'int-whatsapp',
    name: 'WhatsApp Business Cloud API',
    type: 'WhatsApp',
    description: 'Direct conversational booking, automatic reminder pings, pre-appointment instructions, and quick chat routing.',
    status: 'Connected',
    baseUrl: 'https://graph.facebook.com/v19.0/9835000000/messages',
    apiKey: 'EAAO8192kL1...W98aL (Meta Graph Token)',
    apiSecret: 'wa_webhook_token_secret_99812',
    webhookUrl: 'https://balajidentalbraces.com/api/webhooks/whatsapp',
    webhookSecret: 'whsec_wa_2026_balaji',
    clinicId: 'WA_WABA_993510',
    doctorId: 'DOC_AUTO_ROUTE',
    locationId: 'PATNA_CAMPUS',
    authMethod: 'Bearer Token',
    lastSynced: '1 min ago',
    lastSuccessfulAppointment: 'Today 12:45 PM (BD-2026-00128)',
    totalIngested: 198,
    isAutoSync: true,
    syncIntervalMinutes: 1
  },
  {
    id: 'int-google',
    name: 'Google Business Profile & Reserve with Google',
    type: 'Google',
    description: 'Syncs appointments coming directly from Google Search, Maps listing, and Google Call Extensions.',
    status: 'Connected',
    baseUrl: 'https://mybusinessaccountmanagement.googleapis.com/v1',
    apiKey: 'AIzaSyD88192_GGL_BDC_2026',
    apiSecret: 'ggl_oauth_client_sec_•••••',
    webhookUrl: 'https://balajidentalbraces.com/api/webhooks/google',
    webhookSecret: 'whsec_ggl_maps_01',
    clinicId: 'GGL_LOC_BALAJI_DENTAL',
    doctorId: 'DOC_PALLAV_MAIN',
    locationId: 'CHITHKOHRA_PATNA',
    authMethod: 'OAuth 2.0 (HMAC)',
    lastSynced: '15 mins ago',
    lastSuccessfulAppointment: 'Yesterday 03:20 PM (BD-2026-00129)',
    totalIngested: 145,
    isAutoSync: true,
    syncIntervalMinutes: 15
  },
  {
    id: 'int-instagram',
    name: 'Instagram & Facebook Lead Ingestion',
    type: 'Other',
    description: 'Meta Graph API webhook listening to direct messages, lead generation forms, and story CTA clicks.',
    status: 'Connected',
    baseUrl: 'https://graph.facebook.com/v19.0/balaji.dental/leadgen',
    apiKey: 'EAAX88291...MetaLive',
    apiSecret: 'meta_leadgen_secret_••••••',
    webhookUrl: 'https://balajidentalbraces.com/api/webhooks/meta-leadgen',
    webhookSecret: 'whsec_meta_leadgen_881',
    clinicId: 'META_PAGE_BALAJI_DENTAL',
    doctorId: 'ALL',
    locationId: 'PATNA_HQ',
    authMethod: 'Bearer Token',
    lastSynced: '12 mins ago',
    lastSuccessfulAppointment: 'Today 02:10 PM (BD-2026-00130)',
    totalIngested: 88,
    isAutoSync: true,
    syncIntervalMinutes: 10
  }
];

export const initialIntegrationLogs: IntegrationLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-09-01 12:45:12 PM',
    source: 'WhatsApp',
    requestType: 'Webhook Ingestion',
    appointmentId: 'BD-2026-00128',
    status: 'SUCCESS',
    responseCode: 200,
    responseMessage: 'Appointment parsed from chat payload and created in unified DB.',
    payloadSummary: 'Patient: Ananya Das, Treatment: Laser Teeth Whitening, Doctor: Dr. Sneha Verma'
  },
  {
    id: 'log-002',
    timestamp: '2026-09-01 11:20:05 AM',
    source: 'Medo',
    requestType: 'Webhook Ingestion',
    appointmentId: 'BD-2026-00127',
    status: 'SUCCESS',
    responseCode: 200,
    responseMessage: 'Appointment synced successfully from Medo Partner API.',
    payloadSummary: 'Patient: Amit Kumar Roy, Phone: +91 98351 22334, Slot: 12:15 PM'
  },
  {
    id: 'log-003',
    timestamp: '2026-09-01 10:45:30 AM',
    source: 'Website',
    requestType: 'Webhook Ingestion',
    appointmentId: 'BD-2026-00139',
    status: 'WARNING',
    responseCode: 200,
    responseMessage: 'Possible duplicate detected against existing appointment BD-2026-00125. Flagged for review.',
    payloadSummary: 'Patient: Rahul Sharma, Matching Phone & Date, Duplicate Score: 94%'
  },
  {
    id: 'log-004',
    timestamp: '2026-09-01 10:15:02 AM',
    source: 'Website',
    requestType: 'Webhook Ingestion',
    appointmentId: 'BD-2026-00126',
    status: 'SUCCESS',
    responseCode: 200,
    responseMessage: 'Public booking form submitted and slot blocked.',
    payloadSummary: 'Patient: Priya Singh, Treatment: Invisalign, Doctor: Dr. Parijat Pallav'
  },
  {
    id: 'log-005',
    timestamp: '2026-09-01 09:42:18 AM',
    source: 'DoctorClik',
    requestType: 'Webhook Ingestion',
    appointmentId: 'BD-2026-00125',
    status: 'SUCCESS',
    responseCode: 200,
    responseMessage: 'Appointment BD-1024 synced from DoctorClik API.',
    payloadSummary: 'Patient: Rahul Sharma, ExternalRef: DCLK-98421, Doctor: Dr. Parijat Pallav'
  },
  {
    id: 'log-006',
    timestamp: '2026-09-01 08:15:00 AM',
    source: 'Medo',
    requestType: 'REST Polling',
    status: 'FAILED',
    responseCode: 401,
    responseMessage: 'Authentication token expired or rotated.',
    errorMessage: 'Invalid authentication token: Token signature mismatch on header [Authorization].',
    payloadSummary: 'Endpoint: GET /v1/partner/appointments/delta'
  },
  {
    id: 'log-007',
    timestamp: '2026-08-31 03:20:44 PM',
    source: 'Google',
    requestType: 'Webhook Ingestion',
    appointmentId: 'BD-2026-00129',
    status: 'SUCCESS',
    responseCode: 200,
    responseMessage: 'Reserve with Google booking received and confirmed.',
    payloadSummary: 'Patient: Vikram Malhotra, Braces Review, Doctor: Dr. Parijat Pallav'
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'lead-101',
    name: 'Siddharth Varma',
    phone: '+91 98112 88441',
    email: 'siddharth.v@gmail.com',
    source: 'Live Chat',
    status: 'New',
    treatmentInterest: 'Invisalign Clear Aligners',
    doctorPreference: 'Dr. Parijat Pallav',
    notes: 'Visitor asked on live chat about Invisalign cost in EMI installments.',
    createdAt: '2026-09-01 01:25 PM',
    updatedAt: '2026-09-01 01:25 PM',
    estimatedValue: 95000,
    assignedTo: 'Yuvraj (Reception)'
  },
  {
    id: 'lead-102',
    name: 'Tanvi Saxena',
    phone: '+91 97180 33221',
    email: 'tanvi.s@gmail.com',
    source: 'WhatsApp',
    status: 'Contacted',
    treatmentInterest: 'Laser Teeth Whitening',
    doctorPreference: 'Dr. Sneha Verma',
    notes: 'Shared pre-treatment guide over WhatsApp. Callback requested for Saturday morning.',
    createdAt: '2026-09-01 11:40 AM',
    updatedAt: '2026-09-01 12:10 PM',
    estimatedValue: 12000,
    assignedTo: 'Rohan (Coordinator)'
  },
  {
    id: 'lead-103',
    name: 'Manish Tyagi',
    phone: '+91 98350 44112',
    email: 'manish.tyagi@gmail.com',
    source: 'Website',
    status: 'Appointment Booked',
    treatmentInterest: 'Dental Implants',
    doctorPreference: 'Dr. Parijat Pallav',
    notes: 'Submitted quick inquiry. Converted to appointment BD-2026-00125.',
    createdAt: '2026-09-01 09:30 AM',
    updatedAt: '2026-09-01 09:42 AM',
    estimatedValue: 45000,
    assignedTo: 'Ajit Kumar (Reception)',
    convertedAppointmentId: 'BD-2026-00125'
  },
  {
    id: 'lead-104',
    name: 'Aakriti Sen',
    phone: '+91 94318 77556',
    email: 'aakriti.sen@gmail.com',
    source: 'Instagram',
    status: 'Follow-up Required',
    treatmentInterest: 'Orthodontic Braces',
    doctorPreference: 'Dr. Parijat Pallav',
    notes: 'Instagram direct message asking if ceramic braces stain with turmeric food.',
    createdAt: '2026-08-31 04:15 PM',
    updatedAt: '2026-09-01 10:00 AM',
    estimatedValue: 45000,
    assignedTo: 'Yuvraj (Reception)'
  },
  {
    id: 'lead-105',
    name: 'Harish Chandra',
    phone: '+91 98103 22119',
    email: 'harish.c@gmail.com',
    source: 'Google',
    status: 'Visited',
    treatmentInterest: 'Full Mouth Rehabilitation',
    doctorPreference: 'Dr. Parijat Pallav',
    notes: 'Completed in-person CBCT scan consultation. Reviewing proposal.',
    createdAt: '2026-08-29 02:00 PM',
    updatedAt: '2026-08-31 05:00 PM',
    estimatedValue: 180000,
    assignedTo: 'Dr. Parijat Pallav'
  }
];

export const initialDoctorContent: DoctorContentItem[] = [
  {
    id: 'content-01',
    title: 'Invisalign vs Traditional Braces: Which is Right for You in 2026?',
    category: 'Videos',
    type: 'video',
    author: 'Dr. Parijat Pallav',
    publishDate: 'Aug 28, 2026',
    readOrWatchTime: '7 mins watch',
    thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    excerpt: 'Dr. Parijat breaks down treatment duration, aesthetic visibility, lifestyle impact, and actual cost differences between clear aligners and modern self-ligating braces.',
    fullContent: 'In this detailed clinical masterclass, Dr. Parijat explains how modern 3D SmartTrack material in Invisalign allows even complex deep bite and rotated bicuspid corrections that previously required metal wires. He shares actual patient scan comparisons and explains when braces remain the superior biomechanical choice.',
    views: 4820,
    likes: 342,
    isFeatured: true,
    status: 'published',
    tags: ['Invisalign', 'Braces', 'Orthodontics', 'Smile Makeover']
  },
  {
    id: 'content-02',
    title: '5 Crucial Steps to Protect Your Dental Implants for a Lifetime',
    category: 'Articles',
    type: 'article',
    author: 'Dr. Parijat Pallav',
    publishDate: 'Aug 22, 2026',
    readOrWatchTime: '5 mins read',
    thumbnail: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    excerpt: 'While dental implants cannot develop cavities, peri-implant gum health is critical. Learn the gold-standard oral hygiene routine recommended by our implant team.',
    fullContent: `Dental implants are among modern dentistry’s greatest achievements, boasting a clinical success rate exceeding 98%. However, unlike natural teeth which are anchored by a flexible periodontal ligament, titanium implants are anchored directly to the bone via osseointegration.\n\n1. Use a Water Flosser: Traditional string floss can occasionally fray around subgingival implant collars. Pulsed water flossers cleanly flush out biofilm without scratching the abutment.\n2. Non-Abrasive Toothpaste: Avoid gritty whitening toothpastes containing high RDA abrasive silicas which can micro-scratch crown glazes.\n3. Night Guards for Clenchers: If you grind teeth during sleep, a custom soft-hard night guard cushions heavy bite loads.\n4. Bi-Annual Dental Cleanings: Specialized plastic/titanium-tipped ultrasonic scalers are used at Balaji Dental to ensure zero scratches to implant components.\n5. Vitamin D & Bone Health: Balanced systemic calcium and Vitamin D maintain dense jawbone density surrounding the implant root.`,
    views: 3150,
    likes: 219,
    isFeatured: true,
    status: 'published',
    tags: ['Dental Implants', 'Oral Care', 'Implant Maintenance', 'Hygiene']
  },
  {
    id: 'content-03',
    title: 'The Truth About Bleeding Gums: Why Ignoring It Leads to Bone Loss',
    category: 'Dental Tips',
    type: 'tip',
    author: 'Dr. Sneha Verma',
    publishDate: 'Aug 18, 2026',
    readOrWatchTime: '3 mins read',
    thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Gums should never bleed when brushing. Bleeding is the earliest cry for help from bacterial gingivitis before irreversible periodontitis begins.',
    fullContent: 'Many patients assume bleeding gums are caused by brushing too hard. In 90% of cases, it is actually caused by plaque bacterial colonies releasing endotoxins that inflame gum capillaries. A 30-minute ultrasonic scaling and laser decontamination at Balaji Dental reverses this completely in under a week.',
    views: 5410,
    likes: 480,
    isFeatured: false,
    status: 'published',
    tags: ['Gum Health', 'Laser Dentistry', 'Dental Hygiene', 'Gingivitis']
  },
  {
    id: 'content-04',
    title: 'Painless Wisdom Tooth Removal: What Actually Happens in the Chair',
    category: 'Patient Education',
    type: 'video',
    author: 'Dr. Amit Anand',
    publishDate: 'Aug 12, 2026',
    readOrWatchTime: '4 mins watch',
    thumbnail: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    excerpt: 'Step inside our surgical suite as Dr. Amit demonstrates computer-guided anesthesia and gentle ultrasonic tooth sectioning for a zero-pain extraction.',
    fullContent: 'Watch how modern local anesthetics block all pain pathways completely. Patients feel only light tactile pressure while the impacted tooth is gently mobilized without bone trauma.',
    views: 6890,
    likes: 512,
    isFeatured: false,
    status: 'published',
    tags: ['Wisdom Teeth', 'Oral Surgery', 'Painless Dentistry']
  },
  {
    id: 'content-05',
    title: 'Quick Reel: 3 Common Braces Mistakes to Avoid While Eating Out',
    category: 'Social Media',
    type: 'reel',
    author: 'Dr. Parijat Pallav',
    publishDate: 'Aug 05, 2026',
    readOrWatchTime: '60 secs',
    thumbnail: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Biting into whole apples? Chewing sticky caramels? Watch Dr. Parijat demonstrate the safe cutlery technique for braces wearers.',
    views: 12400,
    likes: 1140,
    isFeatured: false,
    status: 'published',
    tags: ['Reels', 'Braces Care', 'Orthodontics', 'Tips']
  }
];

export const initialReviews: PatientReview[] = [
  {
    id: 'rev-01',
    patientName: 'Rahul Sharma',
    treatment: 'Dental Implants & Zirconia Crown',
    rating: 5,
    date: '2 weeks ago',
    reviewText: 'Balaji Dental & Orthodontic Clinic is undoubtedly the finest dental center in Patna. Dr. Parijat Pallav is gentle, thorough, and highly professional. The computer-guided implant procedure was completely painless and the new tooth feels 100% natural!',
    verified: true,
    source: 'Google'
  },
  {
    id: 'rev-02',
    patientName: 'Pooja Sengupta',
    treatment: 'Invisalign Clear Aligners',
    rating: 5,
    date: '1 month ago',
    reviewText: 'Completed my Invisalign treatment with Dr. Parijat Pallav at his Sri Krishna Nagar clinic. Truly world-class aligner technology right here in Patna! The 3D ClinCheck roadmap was precise, and nobody even noticed I was wearing aligners. My smile is completely transformed.',
    verified: true,
    source: 'Justdial'
  },
  {
    id: 'rev-03',
    patientName: 'Dr. Alok Kumar (MBBS, MD)',
    treatment: 'Microscopic Single-Sitting Root Canal',
    rating: 5,
    date: '3 weeks ago',
    reviewText: 'As a medical doctor myself, I am extremely particular about sterilization and clinical hygiene. Balaji Dental Clinic exceeds all international standards with autoclave packaging and ISO protocols. Dr. Parijat and his team completed my root canal in 45 minutes with zero pain.',
    verified: true,
    source: 'Google'
  },
  {
    id: 'rev-04',
    patientName: 'Neha Verma',
    treatment: 'Laser Teeth Whitening & Smile Makeover',
    rating: 5,
    date: '2 months ago',
    reviewText: 'Got laser teeth whitening done at Balaji Dental and Braces. The clinic environment in Sri Krishna Nagar is so clean, calm and hygienic. Dr. Parijat made the entire process so relaxing. My smile went several shades brighter and looks so natural!',
    verified: true,
    source: 'Practo'
  },
  {
    id: 'rev-05',
    patientName: 'Sanjay Sinha',
    treatment: 'Ceramic Orthodontic Braces',
    rating: 5,
    date: '3 weeks ago',
    reviewText: 'Brought my daughter to Dr. Parijat Pallav for ceramic braces at Sri Krishna Nagar. We received clear explanations at every step, prompt appointments, and genuine care. Patna’s best orthodontics and braces clinic without a doubt.',
    verified: true,
    source: 'Justdial'
  },
  {
    id: 'rev-06',
    patientName: 'Amitesh Ray',
    treatment: 'Painless Wisdom Tooth Extraction',
    rating: 5,
    date: '1 month ago',
    reviewText: 'Extremely satisfied with the advanced technological equipment and gentle approach at Balaji Dental Clinic. Zero pain during surgery, and I was back at my desk within 24 hours. Best dental surgeon in Bihar!',
    verified: true,
    source: 'Google'
  }
];

export const initialBeforeAfterCases: BeforeAfterCase[] = [
  {
    id: 'case-01',
    title: 'Severe Overbite & Misaligned Teeth (Braces Transformation)',
    treatment: 'Ceramic Orthodontic Braces',
    doctor: 'Dr. Parijat Pallav (MDS Orthodontist)',
    duration: '12 Months',
    patientAge: 21,
    description: 'Correction of severe Class II deep overbite, forward protruding teeth, and arch irregularity using ceramic aesthetic braces. Restored optimal occlusion and facial balance.',
    beforeImage: bracesBeforeOverbite,
    afterImage: bracesAfterSmile,
    category: 'Orthodontics'
  },
  {
    id: 'case-02',
    title: 'Severe Dental Crowding & Crooked Teeth',
    treatment: 'Self-Ligating Braces & Aligners',
    doctor: 'Dr. Parijat Pallav',
    duration: '14 Months',
    patientAge: 24,
    description: 'Complex overlapping lower and upper anterior teeth straightened with non-extraction orthodontic expansion, achieving flawless arch alignment.',
    beforeImage: crowdingBeforeBraces,
    afterImage: bracesAfterSmile,
    category: 'Orthodontics'
  },
  {
    id: 'case-03',
    title: 'Single Front Tooth Immediate Implant & Crown',
    treatment: 'Computer-Guided Dental Implant (Zirconia)',
    doctor: 'Dr. Parijat Pallav',
    duration: 'Single Visit + 3 Months Final Crown',
    patientAge: 32,
    description: 'Traumatic fracture of upper central incisor restored with immediate titanium implant and custom CAD/CAM layered zirconia crown.',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    category: 'Implantology'
  },
  {
    id: 'case-04',
    title: 'Instant Laser Teeth Whitening & Enamel Glow',
    treatment: 'Laser Teeth Whitening',
    doctor: 'Dr. Sneha Verma',
    duration: '45 Minutes',
    patientAge: 29,
    description: 'Removal of heavy coffee and tea discoloration, bringing shade from A3.5 to ultra-bright B1 in one sitting.',
    beforeImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    category: 'Cosmetic'
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'blog-01',
    slug: 'clear-aligners-cost-process-benefits',
    title: 'Clear Aligners in 2026: Complete Cost, Treatment Timeline & Results Guide',
    excerpt: 'Everything you need to know about Invisalign and clear braces before booking your first 3D digital scan.',
    content: 'Discover why clear aligners have become the #1 choice for adults and teenagers looking to straighten their teeth comfortably...',
    author: 'Dr. Parijat Pallav',
    authorRole: 'Chief Orthodontist',
    date: 'Aug 29, 2026',
    category: 'Orthodontics',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    tags: ['Invisalign', 'Braces', 'Smile Guide']
  },
  {
    id: 'blog-02',
    slug: 'dental-implants-vs-bridges-which-is-better',
    title: 'Dental Implants vs Traditional Bridges: The Long-Term Comparison',
    excerpt: 'Why sacrificing healthy adjacent teeth for a bridge is no longer necessary in modern dental science.',
    content: 'For decades, fixed partial dentures (bridges) were the primary method to replace a missing tooth...',
    author: 'Dr. Parijat Pallav',
    authorRole: 'Implantologist',
    date: 'Aug 21, 2026',
    category: 'Implantology',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    tags: ['Implants', 'Crowns', 'Oral Health']
  },
  {
    id: 'blog-03',
    slug: 'root-canal-treatment-myths-debunked',
    title: '5 Common Root Canal Myths You Need to Stop Believing',
    excerpt: 'How modern rotary endodontics and computerized apex locators made root canals 100% painless.',
    content: 'Root canal therapy is designed to relieve pain, not cause it. Let us debunk the biggest misconceptions...',
    author: 'Dr. Sneha Verma',
    authorRole: 'Senior Endodontist',
    date: 'Aug 14, 2026',
    category: 'Endodontics',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800',
    tags: ['Root Canal', 'Painless Dentistry']
  }
];

export const initialChatSessions: ChatSession[] = [
  {
    id: 'chat-001',
    userName: 'Siddharth Varma',
    userPhone: '+91 98112 88441',
    userEmail: 'siddharth.v@gmail.com',
    status: 'Active',
    createdAt: '2026-09-01 01:20 PM',
    lastMessageAt: '2026-09-01 01:25 PM',
    unreadCount: 1,
    assignedStaff: 'Yuvraj (Reception)',
    notes: 'Interested in Invisalign for upper front teeth spacing.',
    messages: [
      {
        id: 'm1',
        sender: 'system',
        text: 'Welcome to Balaji Dental Clinic. How can our clinic team assist your smile today?',
        timestamp: '01:20 PM'
      },
      {
        id: 'm2',
        sender: 'user',
        text: 'Hi, I want to know about Invisalign treatment cost and whether you provide EMI options.',
        timestamp: '01:21 PM'
      },
      {
        id: 'm3',
        sender: 'reception',
        senderName: 'Yuvraj (Reception)',
        text: 'Hello Siddharth! Yes, Dr. Parijat Pallav is a certified Diamond Invisalign Provider. Our Invisalign plans start from ₹65,000 with 0% interest EMI options starting at ₹4,999/month. Would you like to schedule a 3D intraoral scan consultation?',
        timestamp: '01:23 PM'
      },
      {
        id: 'm4',
        sender: 'user',
        text: 'Yes please, can I come this Saturday around 4:30 PM?',
        timestamp: '01:25 PM'
      }
    ]
  },
  {
    id: 'chat-002',
    userName: 'Aarti Mishra',
    userPhone: '+91 98351 99002',
    status: 'Converted to Appointment',
    createdAt: '2026-09-01 10:00 AM',
    lastMessageAt: '2026-09-01 10:15 AM',
    unreadCount: 0,
    assignedStaff: 'Ajit Kumar (Reception)',
    notes: 'Successfully booked appointment BD-2026-00126 for Priya Singh / Aarti.',
    messages: [
      {
        id: 'm20',
        sender: 'system',
        text: 'Welcome to Balaji Dental Clinic. How can our dental team help you today?',
        timestamp: '10:00 AM'
      },
      {
        id: 'm21',
        sender: 'user',
        text: 'I have severe tooth sensitivity in cold water. Can I see Dr. Sneha today?',
        timestamp: '10:02 AM'
      },
      {
        id: 'm22',
        sender: 'reception',
        senderName: 'Ajit Kumar (Reception)',
        text: 'Certainly Aarti. We have reserved a priority consultation slot for you at 12:15 PM with Dr. Sneha Verma. Please check your confirmation SMS.',
        timestamp: '10:08 AM'
      }
    ]
  }
];

export const initialPatients: PatientProfile[] = [
  {
    id: 'PAT-001',
    name: 'Rahul Sharma',
    phone: '+91 98112 34567',
    email: 'rahul.sharma88@gmail.com',
    age: 38,
    gender: 'Male',
    acquisitionSource: 'DoctorClik',
    firstVisitDate: '2026-09-02',
    lastVisitDate: '2026-09-02',
    totalAppointments: 1,
    totalSpent: 1000,
    medicalHistoryNotes: 'No known systemic allergies. Missing tooth #30 (lower first molar). Seeking titanium implant.',
    status: 'Active',
    dentalConditions: ['Missing Molar', 'Bone Density Normal']
  },
  {
    id: 'PAT-002',
    name: 'Priya Singh',
    phone: '+91 97184 55667',
    email: 'priya.singh@outlook.com',
    age: 26,
    gender: 'Female',
    acquisitionSource: 'Website',
    firstVisitDate: '2026-09-02',
    lastVisitDate: '2026-09-02',
    totalAppointments: 1,
    totalSpent: 800,
    medicalHistoryNotes: 'Mild dental anxiety. Interested in clear aligners for aesthetic correction.',
    status: 'Active',
    dentalConditions: ['Upper Anterior Spacing']
  },
  {
    id: 'PAT-003',
    name: 'Vikram Malhotra',
    phone: '+91 98100 44556',
    email: 'vikram.m@gmail.com',
    age: 19,
    gender: 'Male',
    acquisitionSource: 'Google',
    firstVisitDate: '2025-11-15',
    lastVisitDate: '2026-09-02',
    totalAppointments: 8,
    totalSpent: 42000,
    medicalHistoryNotes: 'Active orthodontic treatment (Ceramic self-ligating brackets). Progress on track.',
    status: 'Active',
    dentalConditions: ['Class I Malocclusion', 'Crowding Corrected']
  },
  {
    id: 'PAT-004',
    name: 'Rajeshwar Prasad',
    phone: '+91 98350 11223',
    email: 'rajeshwar.p@bihargov.in',
    age: 58,
    gender: 'Male',
    acquisitionSource: 'Phone',
    firstVisitDate: '2026-01-10',
    lastVisitDate: '2026-09-03',
    totalAppointments: 5,
    totalSpent: 120000,
    medicalHistoryNotes: 'Controlled Hypertension (Takes Telmisartan 40mg). Full mouth rehabilitation phase II.',
    status: 'Active',
    dentalConditions: ['Generalized Severe Attrition', 'Collapsed Vertical Dimension']
  }
];
