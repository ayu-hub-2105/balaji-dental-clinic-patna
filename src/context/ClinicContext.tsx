import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Appointment,
  AppointmentSource,
  AppointmentStatus,
  BeforeAfterCase,
  BlogPost,
  ChatMessage,
  ChatSession,
  Doctor,
  DoctorContentItem,
  IntegrationConfig,
  IntegrationLog,
  Lead,
  LeadStatus,
  PatientProfile,
  PatientReview,
  StaffRole,
  Treatment
} from '../types';
import {
  initialAppointments,
  initialBeforeAfterCases,
  initialBlogPosts,
  initialChatSessions,
  initialDoctorContent,
  initialDoctors,
  initialIntegrationLogs,
  initialIntegrations,
  initialLeads,
  initialPatients,
  initialReviews,
  initialTreatments
} from '../data/initialData';

interface ClinicContextType {
  // Data State
  appointments: Appointment[];
  doctors: Doctor[];
  treatments: Treatment[];
  integrations: IntegrationConfig[];
  integrationLogs: IntegrationLog[];
  leads: Lead[];
  doctorContent: DoctorContentItem[];
  reviews: PatientReview[];
  beforeAfterCases: BeforeAfterCase[];
  blogPosts: BlogPost[];
  chatSessions: ChatSession[];
  currentChatSession?: ChatSession;
  patients: PatientProfile[];
  currentRole: StaffRole;
  setRole: (role: StaffRole) => void;

  // Appointment Actions
  bookAppointment: (
    data: {
      patientName: string;
      phone: string;
      email: string;
      treatment: string;
      doctor: string;
      date: string;
      time: string;
      patientType?: 'New' | 'Existing';
      notes?: string;
      source?: AppointmentSource;
      age?: number;
      gender?: 'Male' | 'Female' | 'Other';
    }
  ) => { appointment: Appointment; isDuplicate: boolean; duplicateOfId?: string };

  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  deleteAppointment: (id: string) => void;
  resolveDuplicate: (
    duplicateAppointmentId: string,
    action: 'merge' | 'keep_both' | 'ignore',
    targetPrimaryId?: string
  ) => void;

  // Third-Party Ingestion & Simulation
  ingestThirdPartyAppointment: (
    source: AppointmentSource,
    payload: {
      patientName: string;
      phone: string;
      email?: string;
      treatment: string;
      doctor: string;
      date: string;
      time: string;
      notes?: string;
      externalReferenceId?: string;
      fee?: number;
    }
  ) => Appointment;

  testIntegrationConnection: (integrationId: string) => { success: boolean; message: string; latencyMs: number };
  triggerWebhookSimulation: (integrationType: 'Dr. Klick' | 'Doctor Click' | 'DoctorClik' | 'Remedo' | 'Medo' | 'WhatsApp' | 'Google' | 'Website' | 'Other') => void;
  syncAllIntegrations: () => { success: boolean; timestamp: string };
  retryIntegrationLog: (logId: string) => void;
  updateIntegrationConfig: (id: string, updated: Partial<IntegrationConfig>) => void;
  toggleIntegration: (id: string) => void;

  // Lead Management
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => Lead;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  convertLeadToAppointment: (leadId: string, appointmentDate: string, appointmentTime: string) => void;

  // Live Chat
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  sendVisitorMessage: (text: string, options?: string[]) => void;
  sendStaffReply: (sessionId: string, text: string) => void;
  sendChatMessage: (text: string, sender?: 'user' | 'agent' | 'reception') => void;
  convertChatToLeadAction: (sessionId: string, treatmentInterest?: string) => void;
  convertChatToAppointmentAction: (sessionId: string, treatment: string, doctor: string, date: string, time: string) => void;

  // Content Hub
  addDoctorContent: (item: Omit<DoctorContentItem, 'id' | 'views' | 'likes'>) => void;
  updateDoctorContent: (id: string, item: Partial<DoctorContentItem>) => void;
  deleteDoctorContent: (id: string) => void;

  // Reviews & Patient Database
  addReview: (review: Omit<PatientReview, 'id' | 'date' | 'verified'>) => void;
  getPatientById: (id: string) => PatientProfile | undefined;
  getPatientByPhone: (phone: string) => PatientProfile | undefined;
  addPatient: (data: Omit<PatientProfile, 'id'>) => PatientProfile;
  updatePatient: (id: string, updates: Partial<PatientProfile>) => void;
  deletePatient: (id: string) => void;
  exportDatabaseCSV: () => void;
  exportDatabaseJSON: () => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

const STORAGE_KEYS = {
  APPOINTMENTS: 'balaji_appointments_v1',
  INTEGRATIONS: 'balaji_integrations_v1',
  LOGS: 'balaji_logs_v1',
  LEADS: 'balaji_leads_v1',
  CONTENT: 'balaji_content_v1',
  CHATS: 'balaji_chats_v1',
  PATIENTS: 'balaji_patients_v1',
  REVIEWS: 'balaji_reviews_v1',
  ROLE: 'balaji_role_v1'
};

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved or fallback to initial
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [integrations, setIntegrations] = useState<IntegrationConfig[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INTEGRATIONS);
    return saved ? JSON.parse(saved) : initialIntegrations;
  });

  const [integrationLogs, setIntegrationLogs] = useState<IntegrationLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    return saved ? JSON.parse(saved) : initialIntegrationLogs;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [doctorContent, setDoctorContent] = useState<DoctorContentItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTENT);
    return saved ? JSON.parse(saved) : initialDoctorContent;
  });

  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHATS);
    return saved ? JSON.parse(saved) : initialChatSessions;
  });

  const [patients, setPatients] = useState<PatientProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PATIENTS);
    return saved ? JSON.parse(saved) : initialPatients;
  });

  const [reviews, setReviews] = useState<PatientReview[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [currentRole, setRole] = useState<StaffRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as StaffRole) || 'admin';
  });

  const [activeChatId, setActiveChatId] = useState<string | null>('chat-001');

  // Static constants
  const doctors = initialDoctors;
  const treatments = initialTreatments;
  const beforeAfterCases = initialBeforeAfterCases;
  const blogPosts = initialBlogPosts;

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTEGRATIONS, JSON.stringify(integrations));
  }, [integrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(integrationLogs));
  }, [integrationLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(doctorContent));
  }, [doctorContent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chatSessions));
  }, [chatSessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  // Helper: Format current timestamp
  const getNowFormatted = () => {
    const d = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  // Helper: Detect duplicate appointments
  const checkForDuplicates = (
    phone: string,
    date: string,
    doctor: string,
    existingList: Appointment[]
  ): { isDuplicate: boolean; duplicateOfId?: string; score: number } => {
    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
    for (const apt of existingList) {
      if (apt.isDuplicateResolved) continue;
      const aptCleanPhone = apt.phone.replace(/[^0-9]/g, '').slice(-10);
      if (cleanPhone.length >= 8 && aptCleanPhone === cleanPhone) {
        if (apt.date === date) {
          return { isDuplicate: true, duplicateOfId: apt.id, score: 95 };
        }
        return { isDuplicate: true, duplicateOfId: apt.id, score: 75 };
      }
    }
    return { isDuplicate: false, score: 0 };
  };

  // Book Appointment
  const bookAppointment = (data: {
    patientName: string;
    phone: string;
    email: string;
    treatment: string;
    doctor: string;
    date: string;
    time: string;
    patientType?: 'New' | 'Existing';
    notes?: string;
    source?: AppointmentSource;
    age?: number;
    gender?: 'Male' | 'Female' | 'Other';
  }) => {
    const source = data.source || 'Website';
    const nextNum = appointments.length + 126;
    const generatedId = `BD-2026-${nextNum.toString().padStart(5, '0')}`;

    const dupCheck = checkForDuplicates(data.phone, data.date, data.doctor, appointments);

    const newAppointment: Appointment = {
      id: generatedId,
      patientName: data.patientName,
      phone: data.phone,
      email: data.email || 'patient@example.com',
      treatment: data.treatment,
      doctor: data.doctor || 'Dr. Parijat Pallav',
      date: data.date,
      time: data.time || '11:00 AM',
      source,
      status: 'Confirmed',
      patientType: data.patientType || 'New',
      createdDate: getNowFormatted(),
      notes: data.notes || `Direct booking via ${source}`,
      isDuplicate: dupCheck.isDuplicate,
      duplicateOfId: dupCheck.duplicateOfId,
      duplicateScore: dupCheck.score,
      isDuplicateResolved: !dupCheck.isDuplicate,
      age: data.age || 30,
      gender: data.gender || 'Female',
      fee: 800
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    // Create integration log entry
    const newLog: IntegrationLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      source,
      requestType: source === 'Website' ? 'Webhook Ingestion' : 'REST Polling',
      appointmentId: generatedId,
      status: dupCheck.isDuplicate ? 'WARNING' : 'SUCCESS',
      responseCode: 200,
      responseMessage: dupCheck.isDuplicate
        ? `Possible duplicate detected against ${dupCheck.duplicateOfId}. Flagged for clinic review.`
        : `Appointment ${generatedId} booked successfully via ${source}.`,
      payloadSummary: `Patient: ${data.patientName}, Treatment: ${data.treatment}, Doctor: ${data.doctor}`
    };
    setIntegrationLogs((prev) => [newLog, ...prev]);

    // Also register or update patient profile
    setPatients((prev) => {
      const cleanPhone = data.phone.replace(/[^0-9]/g, '').slice(-10);
      const existing = prev.find((p) => p.phone.replace(/[^0-9]/g, '').slice(-10) === cleanPhone);
      if (existing) {
        return prev.map((p) =>
          p.id === existing.id
            ? {
                ...p,
                totalAppointments: p.totalAppointments + 1,
                lastVisitDate: data.date,
                dentalConditions: Array.from(new Set([...(p.dentalConditions || []), data.treatment]))
              }
            : p
        );
      } else {
        const newPatient: PatientProfile = {
          id: `PAT-${(prev.length + 1).toString().padStart(3, '0')}`,
          name: data.patientName,
          phone: data.phone,
          email: data.email || 'patient@example.com',
          age: data.age || 30,
          gender: data.gender || 'Female',
          acquisitionSource: source,
          firstVisitDate: data.date,
          lastVisitDate: data.date,
          totalAppointments: 1,
          totalSpent: 800,
          medicalHistoryNotes: `Registered via ${source} for ${data.treatment}.`,
          status: 'Active',
          dentalConditions: [data.treatment]
        };
        return [newPatient, ...prev];
      }
    });

    return {
      appointment: newAppointment,
      isDuplicate: dupCheck.isDuplicate,
      duplicateOfId: dupCheck.duplicateOfId
    };
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  const resolveDuplicate = (
    duplicateAppointmentId: string,
    action: 'merge' | 'keep_both' | 'ignore',
    targetPrimaryId?: string
  ) => {
    if (action === 'merge' && targetPrimaryId) {
      setAppointments((prev) => {
        const dup = prev.find((a) => a.id === duplicateAppointmentId);
        return prev
          .map((a) => {
            if (a.id === targetPrimaryId && dup) {
              return {
                ...a,
                notes: `${a.notes || ''} [Merged from ${dup.id} (${dup.source}): ${dup.notes || ''}]`,
                isDuplicateResolved: true
              };
            }
            return a;
          })
          .filter((a) => a.id !== duplicateAppointmentId);
      });
    } else {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === duplicateAppointmentId
            ? { ...a, isDuplicateResolved: true, isDuplicate: action === 'keep_both' }
            : a
        )
      );
    }
  };

  // Ingest from Third-Party (supports both (source, payload) and ({ source, ...payload }))
  const ingestThirdPartyAppointment = (
    sourceOrPayload: any,
    maybePayload?: any
  ): any => {
    let source: AppointmentSource = 'Website';
    let payload: any = {};

    if (typeof sourceOrPayload === 'string') {
      source = sourceOrPayload as AppointmentSource;
      payload = maybePayload || {};
    } else if (typeof sourceOrPayload === 'object' && sourceOrPayload !== null) {
      source = (sourceOrPayload.source as AppointmentSource) || 'Website';
      payload = sourceOrPayload;
    }

    // Map legacy names
    if (source === ('DoctorClik' as any) || source === ('Doctor Click' as any)) source = 'Dr. Klick';
    if (source === ('Medo' as any)) source = 'Remedo';

    const nextNum = appointments.length + 126;
    const generatedId = `BD-2026-${nextNum.toString().padStart(5, '0')}`;
    const dupCheck = checkForDuplicates(payload.phone, payload.date, payload.doctor, appointments);

    const newApt: Appointment = {
      id: generatedId,
      patientName: payload.patientName,
      phone: payload.phone,
      email: payload.email || `${payload.patientName.toLowerCase().replace(/\s+/g, '')}@patient.med`,
      treatment: payload.treatment,
      doctor: payload.doctor,
      date: payload.date,
      time: payload.time,
      source,
      status: 'Confirmed',
      patientType: 'New',
      createdDate: getNowFormatted(),
      notes: payload.notes || `Synced from ${source} (Ref: ${payload.externalReferenceId || payload.externalId || 'AUTO'})`,
      externalReferenceId: payload.externalReferenceId || payload.externalId,
      fee: payload.fee || 1000,
      isDuplicate: dupCheck.isDuplicate,
      duplicateOfId: dupCheck.duplicateOfId,
      duplicateScore: dupCheck.score,
      isDuplicateResolved: !dupCheck.isDuplicate
    };

    setAppointments((prev) => [newApt, ...prev]);

    // Update integration metrics
    setIntegrations((prev) =>
      prev.map((int) => {
        const isMatch =
          int.type === source ||
          ((int.type === 'Dr. Klick' || int.type === 'Doctor Click') && (source === 'Dr. Klick' || source === 'Doctor Click' || source === 'DoctorClik')) ||
          (int.type === 'Remedo' && (source === 'Remedo' || source === 'Medo')) ||
          (int.type === 'Other' && source === 'Instagram');
        if (isMatch) {
          return {
            ...int,
            lastSynced: 'Just now',
            lastSuccessfulAppointment: `Today (${generatedId})`,
            totalIngested: int.totalIngested + 1
          };
        }
        return int;
      })
    );

    // Add log
    const log: IntegrationLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      source,
      requestType: 'Webhook Ingestion',
      appointmentId: generatedId,
      status: dupCheck.isDuplicate ? 'WARNING' : 'SUCCESS',
      responseCode: 200,
      responseMessage: `Inbound appointment processed from ${source} portal. Ref: ${payload.externalReferenceId || payload.externalId || 'AUTO'}`,
      payloadSummary: `Patient: ${payload.patientName}, Treatment: ${payload.treatment}, Ref: ${payload.externalReferenceId || payload.externalId || 'AUTO'}`
    };
    setIntegrationLogs((prev) => [log, ...prev]);

    // Return hybrid object for seamless caller compatibility
    return Object.assign(newApt, {
      appointment: newApt,
      isDuplicate: dupCheck.isDuplicate,
      duplicateOfId: dupCheck.duplicateOfId
    });
  };

  // Test integration connection
  const testIntegrationConnection = (integrationId: string) => {
    const target = integrations.find((i) => i.id === integrationId);
    if (!target) return { success: false, message: 'Integration not found', latencyMs: 0 };

    const latency = Math.floor(Math.random() * 80) + 45;
    const isSuccess = target.apiKey.length > 5;

    const newLog: IntegrationLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      source: (target.type === 'Other' ? 'Instagram' : target.type) as AppointmentSource,
      requestType: 'Health Check',
      status: isSuccess ? 'SUCCESS' : 'FAILED',
      responseCode: isSuccess ? 200 : 401,
      responseMessage: isSuccess
        ? `Handshake verified with ${target.name}. Latency: ${latency}ms.`
        : `Connection test failed: Invalid API credentials for ${target.name}.`,
      payloadSummary: `Endpoint: ${target.baseUrl}`
    };
    setIntegrationLogs((prev) => [newLog, ...prev]);

    return {
      success: isSuccess,
      message: isSuccess ? `Connection OK (${latency}ms)` : 'Authentication failed',
      latencyMs: latency
    };
  };

  // Simulate Webhook trigger from Dr. Klick, Remedo, WhatsApp, etc.
  const triggerWebhookSimulation = (
    integrationType: 'Dr. Klick' | 'Doctor Click' | 'DoctorClik' | 'Remedo' | 'Medo' | 'WhatsApp' | 'Google' | 'Website' | 'Other'
  ) => {
    const sampleNames = ['Rohan Kapoor', 'Shreya Banerjee', 'Vivek Singhania', 'Aditi Rao', 'Nitin Gadkari', 'Anushka Sen', 'Vikramaditya Verma'];
    const sampleTreatments = [
      'Invisalign Clear Aligners',
      'Dental Implants',
      'Laser Teeth Whitening',
      'Single-Sitting Root Canal (RCT)',
      'Orthodontic Braces (Ceramic)',
      'Zirconia & Ceramic Crowns / Bridges'
    ];
    const sampleDoctors = ['Dr. Parijat Pallav', 'Dr. Sneha Verma', 'Dr. Amit Anand'];

    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomTreatment = sampleTreatments[Math.floor(Math.random() * sampleTreatments.length)];
    const randomDoctor = sampleDoctors[Math.floor(Math.random() * sampleDoctors.length)];
    const randomPhone = `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`;

    const today = new Date();
    today.setDate(today.getDate() + Math.floor(Math.random() * 3) + 1);
    const dateStr = today.toISOString().split('T')[0];

    // Standardize source name
    let sourceName: AppointmentSource = 'Website';
    if (integrationType === 'Dr. Klick' || integrationType === 'Doctor Click' || integrationType === 'DoctorClik') {
      sourceName = 'Dr. Klick';
    } else if (integrationType === 'Remedo' || integrationType === 'Medo') {
      sourceName = 'Remedo';
    } else if (integrationType === 'Other') {
      sourceName = 'Instagram';
    } else {
      sourceName = integrationType as AppointmentSource;
    }

    const prefix = sourceName === 'Dr. Klick' || sourceName === 'Doctor Click' ? 'DKLK' : sourceName === 'Remedo' ? 'REMEDO' : sourceName.toUpperCase().slice(0, 4);

    ingestThirdPartyAppointment(sourceName, {
      patientName: randomName,
      phone: randomPhone,
      treatment: randomTreatment,
      doctor: randomDoctor,
      date: dateStr,
      time: '04:30 PM',
      externalReferenceId: `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`,
      notes: `Direct incoming appointment sync from ${sourceName} portal.`
    });
  };

  const syncAllIntegrations = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setIntegrations((prev) =>
      prev.map((item) => ({
        ...item,
        lastSynced: 'Just now'
      }))
    );
    const syncLog: IntegrationLog = {
      id: `sync-all-${Date.now()}`,
      timestamp,
      source: 'Website',
      requestType: 'Manual Sync',
      status: 'SUCCESS',
      responseCode: 200,
      responseMessage: 'Unified multi-channel sync completed: Remedo, Dr. Klick, and Website channels refreshed.',
      payloadSummary: 'Sync gateways: Remedo Gateway, Dr. Klick Sync Gateway, Balaji Website Engine, WhatsApp Cloud'
    };
    setIntegrationLogs((prev) => [syncLog, ...prev]);
    return { success: true, timestamp };
  };

  const retryIntegrationLog = (logId: string) => {
    setIntegrationLogs((prev) =>
      prev.map((l) =>
        l.id === logId
          ? {
              ...l,
              status: 'SUCCESS',
              responseCode: 200,
              errorMessage: undefined,
              responseMessage: `Retry manual sync successful. Re-authenticated at ${new Date().toLocaleTimeString()}.`
            }
          : l
      )
    );
  };

  const updateIntegrationConfig = (id: string, updated: Partial<IntegrationConfig>) => {
    setIntegrations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'Connected' ? 'Disconnected' : 'Connected',
              lastSynced: 'Just now'
            }
          : item
      )
    );
  };

  // Lead actions
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: getNowFormatted(),
      updatedAt: getNowFormatted()
    };
    setLeads((prev) => [newLead, ...prev]);

    // Also securely store in patients database
    setPatients((prev) => {
      const cleanPhone = leadData.phone.replace(/[^0-9]/g, '').slice(-10);
      const existing = prev.find((p) => p.phone.replace(/[^0-9]/g, '').slice(-10) === cleanPhone);
      if (existing) {
        return prev.map((p) =>
          p.id === existing.id
            ? {
                ...p,
                medicalHistoryNotes: `${p.medicalHistoryNotes || ''} | Latest Inquiry: ${leadData.notes || leadData.treatmentInterest || 'Website inquiry'}`.trim()
              }
            : p
        );
      } else {
        const normalizedSource: AppointmentSource =
          leadData.source === 'Live Chat' ? 'Website' : ((leadData.source as AppointmentSource) || 'Website');

        const newPatient: PatientProfile = {
          id: `PAT-${(prev.length + 1).toString().padStart(3, '0')}`,
          name: leadData.name,
          phone: leadData.phone,
          email: leadData.email || 'inquiry@balajidental.com',
          age: 30,
          gender: 'Other',
          acquisitionSource: normalizedSource,
          firstVisitDate: new Date().toISOString().split('T')[0],
          lastVisitDate: new Date().toISOString().split('T')[0],
          totalAppointments: 0,
          totalSpent: 0,
          medicalHistoryNotes: `Inquiry via ${leadData.source || 'Website'}: ${leadData.notes || leadData.treatmentInterest || 'Consultation request'}`,
          status: 'Active',
          dentalConditions: leadData.treatmentInterest ? [leadData.treatmentInterest] : []
        };
        return [newPatient, ...prev];
      }
    });

    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, updatedAt: getNowFormatted() } : l))
    );
  };

  const convertLeadToAppointment = (leadId: string, appointmentDate: string, appointmentTime: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    const source: AppointmentSource =
      lead.source === 'Live Chat' ? 'Website' : (lead.source as AppointmentSource);

    const { appointment } = bookAppointment({
      patientName: lead.name,
      phone: lead.phone,
      email: lead.email || '',
      treatment: lead.treatmentInterest || 'Dental Consultation',
      doctor: lead.doctorPreference || 'Dr. Parijat Pallav',
      date: appointmentDate,
      time: appointmentTime,
      source,
      notes: `Converted from Lead ${lead.id}. ${lead.notes}`
    });

    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: 'Appointment Booked',
              convertedAppointmentId: appointment.id,
              updatedAt: getNowFormatted()
            }
          : l
      )
    );
  };

  // Live Chat
  const currentChatSession = chatSessions.find((s) => s.id === (activeChatId || 'chat-001')) || chatSessions[0];

  const sendVisitorMessage = (text: string, options?: string[]) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let targetSession = chatSessions.find((s) => s.id === (activeChatId || 'chat-001'));
    if (!targetSession) {
      targetSession = {
        id: `chat-${Date.now()}`,
        userName: 'Website Visitor',
        status: 'Active',
        createdAt: getNowFormatted(),
        lastMessageAt: getNowFormatted(),
        unreadCount: 1,
        assignedStaff: 'Yuvraj (Reception)',
        messages: [
          {
            id: 'init-1',
            sender: 'system',
            text: 'Welcome to Balaji Dental Clinic. How can our clinic team assist your smile today?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      };
      setChatSessions((prev) => [targetSession!, ...prev]);
      setActiveChatId(targetSession.id);
    }

    setChatSessions((prev) =>
      prev.map((s) =>
        s.id === targetSession!.id
          ? {
              ...s,
              messages: [...s.messages, userMsg],
              lastMessageAt: getNowFormatted(),
              unreadCount: s.unreadCount + 1
            }
          : s
      )
    );

    // Detect phone numbers and register lead
    const phoneMatch = text.match(/(\+?91[\-\s]?)?[6789]\d{9}/);
    if (phoneMatch) {
      addLead({
        name: targetSession.userName || 'Live Chat Visitor',
        phone: phoneMatch[0],
        source: 'Live Chat',
        status: 'New',
        treatmentInterest: 'General Consultation',
        notes: `Captured phone number from chat: "${text}"`
      });
    }

      // Auto-respond with helpful clinic receptionist responses in English
    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyText =
        'Hello! Welcome to Balaji Dental & Orthodontic Clinic. I am Yuvraj from the front desk reception. How can I help you today? You can ask about Invisalign clear aligners, dental implants, emergency pain relief, clinic timings (10am-2pm & 5pm-8pm), or doctor consultation fee (₹500).';
      let quickOptions = [
        '✨ Invisalign Cost & Info',
        '🦷 Dental Implant Query',
        '🚨 Urgent Tooth Pain & Emergency',
        '🕒 Clinic Timings (10am-2pm & 5pm-8pm)',
        '💰 Consultation Fee ₹500',
        '📅 Book Appointment'
      ];

      if (phoneMatch) {
        replyText = `Thank you! We have noted your contact number (${phoneMatch[0]}). Our receptionist Yuvraj will call you shortly to confirm your appointment slot and answer any questions.`;
        quickOptions = ['Book Appointment', 'Chat on WhatsApp', 'Clinic Location'];
      } else if (
        lower.includes('fee') ||
        lower.includes('fees') ||
        lower.includes('500') ||
        lower.includes('consult') ||
        lower.includes('फीस') ||
        lower.includes('चार्ज')
      ) {
        replyText =
          'The doctor consultation fee is ₹500. This includes a comprehensive oral checkup, digital diagnostics, and personalized treatment planning by Dr. Parijat Pallav (Chief Orthodontist & Implantologist).';
        quickOptions = ['Book Appointment', 'Treatments & Costs', 'Clinic Timings'];
      } else if (
        lower.includes('tuesday') ||
        lower.includes('mangal') ||
        lower.includes('मंगल') ||
        lower.includes('tue')
      ) {
        replyText =
          '⚠️ Note: Balaji Dental Clinic is strictly CLOSED every Tuesday. We are open from Wednesday through Monday. You are welcome to reserve an appointment slot for any day from Wednesday to Monday.';
        quickOptions = ['Book for Wednesday', 'Clinic Timings', 'Consultation Fee ₹500'];
      } else if (
        lower.includes('time') ||
        lower.includes('timing') ||
        lower.includes('hours') ||
        lower.includes('open') ||
        lower.includes('close') ||
        lower.includes('कब') ||
        lower.includes('समय') ||
        lower.includes('टाइम')
      ) {
        replyText =
          '🕒 Clinic Timings & Working Hours:\n• Morning: 10:00 AM – 02:00 PM\n• Evening: 05:00 PM – 08:00 PM\n• Days: Wednesday to Monday\n• ❌ Every Tuesday: Strictly CLOSED\n\nDoctor Consultation Fee: ₹500';
        quickOptions = ['Book Appointment', 'Consultation Fee ₹500', 'Clinic Location'];
      } else if (
        lower.includes('price') ||
        lower.includes('cost') ||
        lower.includes('rate') ||
        lower.includes('खर्च') ||
        lower.includes('पैसा') ||
        lower.includes('चार्ज') ||
        lower.includes('service') ||
        lower.includes('सर्विस')
      ) {
        replyText =
          '💰 Key Treatments & Estimated Price List:\n• Doctor Consultation Fee: ₹500\n• Teeth Cleaning & Polishing (Scaling): ₹1,000 – ₹2,000\n• Tooth-Colored Composite Filling: ₹800 – ₹1,500\n• Single-Sitting Root Canal (RCT): ₹3,500 – ₹6,000\n• Dental Crowns & Caps (Zirconia / Ceramic): ₹3,000 – ₹9,000\n• Orthodontic Braces (Metal / Ceramic): ₹25,000 – ₹65,000\n• Invisalign Clear Aligners: Starting from ₹65,000 (0% Interest EMI available)\n• Titanium Dental Implants: ₹25,000 – ₹45,000\n• Wisdom Tooth Extraction & Minor Surgery: ₹1,500 – ₹4,500';
        quickOptions = ['✨ Invisalign Cost & Info', '🦷 Dental Implant Query', 'Book Appointment'];
      } else if (lower.includes('invisalign') || lower.includes('aligner')) {
        replyText =
          '✨ Invisalign Clear Aligners at Balaji Dental Clinic:\n• Provider: Dr. Parijat Pallav (Certified Diamond Invisalign Provider with 16+ yrs experience)\n• Packages start from ₹65,000 with 0% Interest EMI options starting at ₹4,999/month\n• Digital 3D iTero intraoral scan simulation with no messy impressions\n• Doctor Consultation Fee: ₹500\n\nWould you like to schedule an appointment for your 3D digital smile scan?';
        quickOptions = ['Book 3D Scan', '🦷 Dental Implant Query', '🚨 Urgent Tooth Pain & Emergency', 'Consultation Fee ₹500'];
      } else if (lower.includes('implant') || lower.includes('missing tooth') || lower.includes('teeth implant')) {
        replyText =
          '🦷 Dental Implants at Balaji Dental Clinic:\n• Permanent titanium implants with lifetime warranty\n• High-grade aesthetic ceramic & zirconia crowns\n• Guided painless implant placement by Dr. Parijat Pallav & Maxillofacial Surgeons\n• Starting from ₹25,000 to ₹45,000\n• Consultation Fee: ₹500\n\nWould you like to schedule a personal consultation slot?';
        quickOptions = ['Book Implant Consult', '✨ Invisalign Cost & Info', 'Clinic Timings', 'Call +91 99348 85664'];
      } else if (lower.includes('doctor') || lower.includes('parijat') || lower.includes('डॉक्टर') || lower.includes('sneha')) {
        replyText =
          '👨‍⚕️ Our Dental Specialists:\n• Dr. Parijat Pallav: Chief Orthodontist & Implantologist (BDS, MDS, 16+ yrs experience, Certified Diamond Invisalign Provider)\n• Dr. Sneha Verma: Senior Endodontist (MDS, Root Canal Specialist)\n• Dr. Amit Anand: Oral & Maxillofacial Surgeon (MDS, Wisdom Tooth & Surgery Specialist)';
        quickOptions = ['Consult Dr. Parijat', 'Consultation Fee ₹500', 'Clinic Timings'];
      } else if (lower.includes('address') || lower.includes('location') || lower.includes('where') || lower.includes('map') || lower.includes('पता') || lower.includes('कहाँ')) {
        replyText =
          '📍 Clinic Address:\nHouse No. 7, Road No. 4, Sri Krishna Nagar, Kidwaipuri, Patna, Bihar – 800001 (Near Bank of India / Boring Canal Road).\nDedicated parking is available.\nHelpline: +91 99348 85664';
        quickOptions = ['Open Google Maps', 'Book Appointment', 'Get WhatsApp Location'];
      } else if (lower.includes('pain') || lower.includes('emergency') || lower.includes('urgent') || lower.includes('दर्द') || lower.includes('root canal')) {
        replyText =
          '🚨 Urgent Tooth Pain & Emergency Care:\n• Immediate same-day priority appointment for acute tooth pain, trauma, bleeding, or swelling\n• Single-sitting pain-free root canal treatment (RCT) & dental relief\n• Consultation fee: ₹500\n• Emergency helpline: +91 99348 85664\n\nPlease call us right away or reserve an urgent appointment slot!';
        quickOptions = ['Call +91 99348 85664', 'Book Appointment', '✨ Invisalign Cost & Info', '🦷 Dental Implant Query'];
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'reception',
        senderName: 'Yuvraj (Receptionist)',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickOptions
      };

      setChatSessions((prev) =>
        prev.map((s) =>
          s.id === targetSession!.id
            ? {
                ...s,
                messages: [...s.messages, botMsg],
                lastMessageAt: getNowFormatted()
              }
            : s
        )
      );
    }, 700);
  };

  const sendStaffReply = (sessionId: string, text: string) => {
    const staffMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'reception',
      senderName: currentRole === 'doctor' ? 'Dr. Parijat Pallav' : 'Clinic Desk (Yuvraj)',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              messages: [...s.messages, staffMsg],
              lastMessageAt: getNowFormatted(),
              unreadCount: 0
            }
          : s
      )
    );
  };

  const sendChatMessage = (text: string, sender: 'user' | 'agent' | 'reception' = 'user') => {
    if (sender === 'user') {
      sendVisitorMessage(text);
    } else {
      sendStaffReply(activeChatId || 'chat-001', text);
    }
  };

  const convertChatToLeadAction = (sessionId: string, treatmentInterest?: string) => {
    const session = chatSessions.find((s) => s.id === sessionId);
    if (!session) return;

    addLead({
      name: session.userName || 'Live Chat Visitor',
      phone: session.userPhone || '+91 98350 00000',
      email: session.userEmail,
      source: 'Live Chat',
      status: 'New',
      treatmentInterest: treatmentInterest || 'General Consultation',
      notes: `Captured from live chat session ${sessionId}. Messages: ${session.messages.length}`
    });

    setChatSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: 'Converted to Lead' } : s))
    );
  };

  const convertChatToAppointmentAction = (
    sessionId: string,
    treatment: string,
    doctor: string,
    date: string,
    time: string
  ) => {
    const session = chatSessions.find((s) => s.id === sessionId);
    if (!session) return;

    bookAppointment({
      patientName: session.userName || 'Live Chat Patient',
      phone: session.userPhone || '+91 98350 00000',
      email: session.userEmail || '',
      treatment,
      doctor,
      date,
      time,
      source: 'Website',
      notes: `Booked via Live Chat interaction with Reception Desk.`
    });

    setChatSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: 'Converted to Appointment' } : s))
    );
  };

  // Content Hub
  const addDoctorContent = (item: Omit<DoctorContentItem, 'id' | 'views' | 'likes'>) => {
    const newItem: DoctorContentItem = {
      ...item,
      id: `content-${Date.now()}`,
      views: 0,
      likes: 0
    };
    setDoctorContent((prev) => [newItem, ...prev]);
  };

  const updateDoctorContent = (id: string, updated: Partial<DoctorContentItem>) => {
    setDoctorContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteDoctorContent = (id: string) => {
    setDoctorContent((prev) => prev.filter((item) => item.id !== id));
  };

  // Reviews
  const addReview = (reviewData: Omit<PatientReview, 'id' | 'date' | 'verified'>) => {
    const newRev: PatientReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verified: true
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  const getPatientById = (id: string) => patients.find((p) => p.id === id);
  const getPatientByPhone = (phone: string) => {
    const clean = phone.replace(/[^0-9]/g, '').slice(-10);
    return patients.find((p) => p.phone.replace(/[^0-9]/g, '').slice(-10) === clean);
  };

  const addPatient = (data: Omit<PatientProfile, 'id'>): PatientProfile => {
    const newId = `PAT-${(patients.length + 1).toString().padStart(3, '0')}`;
    const newPatient: PatientProfile = {
      ...data,
      id: newId
    };
    setPatients((prev) => [newPatient, ...prev]);
    return newPatient;
  };

  const updatePatient = (id: string, updates: Partial<PatientProfile>) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deletePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const exportDatabaseCSV = () => {
    const headers = [
      'Patient ID',
      'Name',
      'Phone',
      'Email',
      'Age',
      'Gender',
      'Acquisition Source',
      'Status',
      'First Visit',
      'Last Visit',
      'Total Appointments',
      'Total Spent (INR)',
      'Dental Conditions',
      'Medical History & Clinical Notes'
    ];

    const rows = patients.map((p) => [
      p.id,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      `"${p.phone || ''}"`,
      `"${p.email || ''}"`,
      p.age || '',
      p.gender || '',
      `"${p.acquisitionSource || 'Website'}"`,
      p.status || 'Active',
      p.firstVisitDate || '',
      p.lastVisitDate || '',
      p.totalAppointments || 0,
      p.totalSpent || 0,
      `"${(p.dentalConditions || []).join('; ').replace(/"/g, '""')}"`,
      `"${(p.medicalHistoryNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvString = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Balaji_Dental_Patient_Database_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportDatabaseJSON = () => {
    const payload = {
      clinic: 'Balaji Dental & Orthodontic Clinic',
      doctor: 'Dr. Parijat Pallav (MDS Orthodontics)',
      exportedAt: new Date().toISOString(),
      stats: {
        totalPatients: patients.length,
        totalAppointments: appointments.length,
        totalLeads: leads.length
      },
      patients,
      appointments,
      leads
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Balaji_Clinic_Full_Database_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <ClinicContext.Provider
      value={{
        appointments,
        doctors,
        treatments,
        integrations,
        integrationLogs,
        leads,
        doctorContent,
        reviews,
        beforeAfterCases,
        blogPosts,
        chatSessions,
        currentChatSession,
        patients,
        currentRole,
        setRole,
        bookAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        resolveDuplicate,
        ingestThirdPartyAppointment,
        testIntegrationConnection,
        triggerWebhookSimulation,
        syncAllIntegrations,
        retryIntegrationLog,
        updateIntegrationConfig,
        toggleIntegration,
        addLead,
        updateLeadStatus,
        convertLeadToAppointment,
        activeChatId,
        setActiveChatId,
        sendVisitorMessage,
        sendStaffReply,
        sendChatMessage,
        convertChatToLeadAction,
        convertChatToAppointmentAction,
        addDoctorContent,
        updateDoctorContent,
        deleteDoctorContent,
        addReview,
        getPatientById,
        getPatientByPhone,
        addPatient,
        updatePatient,
        deletePatient,
        exportDatabaseCSV,
        exportDatabaseJSON
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
