export type AppointmentSource =
  | 'Website'
  | 'Dr. Klick'
  | 'Doctor Click'
  | 'DoctorClik'
  | 'Remedo'
  | 'Medo'
  | 'WhatsApp'
  | 'Phone'
  | 'Google'
  | 'Instagram'
  | 'Facebook'
  | 'Other';

export type AppointmentStatus =
  | 'Confirmed'
  | 'Pending'
  | 'Completed'
  | 'Cancelled'
  | 'In-Progress';

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  treatment: string;
  doctor: string;
  date: string;
  time: string;
  source: AppointmentSource;
  status: AppointmentStatus;
  patientType: 'New' | 'Existing';
  createdDate: string;
  notes?: string;
  isDuplicate?: boolean;
  duplicateOfId?: string;
  duplicateScore?: number;
  isDuplicateResolved?: boolean;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other';
  fee?: number;
  externalReferenceId?: string;
}

export type LeadSource = AppointmentSource | 'Live Chat';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Appointment Booked'
  | 'Visited'
  | 'Treatment Started'
  | 'Converted'
  | 'Lost'
  | 'Follow-up Required';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: LeadSource;
  status: LeadStatus;
  treatmentInterest: string;
  doctorPreference?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  estimatedValue?: number;
  assignedTo?: string;
  convertedAppointmentId?: string;
}

export type IntegrationStatus = 'Connected' | 'Disconnected' | 'Error' | 'Configuring';

export interface IntegrationConfig {
  id: string;
  name: string;
  type: 'Dr. Klick' | 'Doctor Click' | 'DoctorClik' | 'Remedo' | 'Medo' | 'Website' | 'WhatsApp' | 'Google' | 'Other';
  description: string;
  status: IntegrationStatus;
  baseUrl: string;
  apiKey: string;
  apiSecret: string;
  webhookUrl: string;
  webhookSecret: string;
  clinicId: string;
  doctorId: string;
  locationId: string;
  authMethod: 'API Key Header' | 'Bearer Token' | 'Basic Auth' | 'OAuth 2.0 (HMAC)';
  lastSynced: string;
  lastSuccessfulAppointment: string;
  totalIngested: number;
  isAutoSync: boolean;
  syncIntervalMinutes: number;
  documentationUrl?: string;
}

export interface IntegrationLog {
  id: string;
  timestamp: string;
  source: AppointmentSource;
  requestType: 'Webhook Ingestion' | 'REST Polling' | 'Manual Sync' | 'Health Check';
  appointmentId?: string;
  status: 'SUCCESS' | 'FAILED' | 'WARNING';
  responseCode: number;
  responseMessage: string;
  errorMessage?: string;
  payloadSummary: string;
  payloadJson?: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  photoUrl: string;
  bio: string;
  treatmentExpertise: string[];
  availabilityDays: string[];
  timings: string;
  rating: number;
  reviewCount: number;
  achievements: string[];
  isHeadDoctor?: boolean;
}

export type ContentCategory =
  | 'Videos'
  | 'Articles'
  | 'Dental Tips'
  | 'Social Media'
  | 'Patient Education';

export interface DoctorContentItem {
  id: string;
  title: string;
  category: ContentCategory;
  type: 'video' | 'article' | 'tip' | 'reel';
  author: string;
  publishDate: string;
  readOrWatchTime: string;
  thumbnail: string;
  videoUrl?: string;
  excerpt: string;
  fullContent?: string;
  views: number;
  likes: number;
  isFeatured: boolean;
  status: 'published' | 'draft' | 'scheduled';
  tags: string[];
}

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'Orthodontics' | 'Implantology' | 'Cosmetic' | 'General' | 'Endodontics' | 'Surgery';
  iconName: string;
  imageUrl: string;
  duration: string;
  priceRange: string;
  benefits: string[];
  procedureSteps: { stepNumber: number; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  isPopular?: boolean;
}

export interface PatientReview {
  id: string;
  patientName: string;
  treatment: string;
  rating: number;
  date: string;
  reviewText: string;
  verified: boolean;
  avatarUrl?: string;
  source: 'Google' | 'Website' | 'Practo' | 'Direct' | 'Justdial';
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  treatment: string;
  doctor: string;
  duration: string;
  patientAge: number;
  description: string;
  beforeImage: string;
  afterImage: string;
  category: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  category: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'reception' | 'system';
  senderName?: string;
  text: string;
  timestamp: string;
  quickOptions?: string[];
  isRead?: boolean;
}

export interface ChatSession {
  id: string;
  userName: string;
  userPhone?: string;
  userEmail?: string;
  messages: ChatMessage[];
  status: 'Active' | 'Resolved' | 'Converted to Lead' | 'Converted to Appointment';
  createdAt: string;
  lastMessageAt: string;
  unreadCount: number;
  assignedStaff?: string;
  notes?: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  acquisitionSource: AppointmentSource;
  firstVisitDate: string;
  lastVisitDate: string;
  totalAppointments: number;
  totalSpent: number;
  medicalHistoryNotes: string;
  allergies?: string;
  dentalConditions?: string[];
  status: 'Active' | 'Completed Treatment' | 'Inactive';
}

export type StaffRole = 'admin' | 'receptionist' | 'doctor' | 'content_manager';
