import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Network,
  MessageSquare,
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Check,
  X,
  RefreshCw,
  Zap,
  TrendingUp,
  MessageCircle,
  Phone,
  ArrowUpRight,
  Sparkles,
  FileText,
  Stethoscope,
  Globe,
  Share2,
  Sliders,
  ShieldCheck,
  Layers,
  ChevronDown,
  Database,
  Download,
  FileSpreadsheet,
  Trash2,
  Edit3,
  Eye,
  UserPlus,
  FileDown,
  Mail,
  ExternalLink,
  Filter
} from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';
import { Appointment, Lead, AppointmentSource, AppointmentStatus, IntegrationConfig, PatientProfile } from '../../types';
import { BalajiLogo } from '../DentalIcons';

export const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    appointments,
    leads,
    integrations,
    integrationLogs,
    updateAppointmentStatus,
    toggleIntegration,
    testIntegrationConnection,
    ingestThirdPartyAppointment,
    updateLeadStatus,
    convertLeadToAppointment,
    chatSessions,
    sendChatMessage,
    bookAppointment,
    resolveDuplicate,
    syncAllIntegrations,
    deleteAppointment,
    patients,
    addPatient,
    updatePatient,
    deletePatient,
    exportDatabaseCSV,
    exportDatabaseJSON
  } = useClinic();

  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'patients' | 'leads' | 'integrations' | 'chat'>('overview');

  // Patient Database Management State
  const [patientSearch, setPatientSearch] = useState('');
  const [patientGenderFilter, setPatientGenderFilter] = useState('All');
  const [patientSourceFilter, setPatientSourceFilter] = useState('All');
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [newPatientAge, setNewPatientAge] = useState(28);
  const [newPatientGender, setNewPatientGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [newPatientTreatment, setNewPatientTreatment] = useState('Invisalign Clear Aligners');
  const [newPatientSource, setNewPatientSource] = useState<AppointmentSource>('Website');
  const [newPatientNotes, setNewPatientNotes] = useState('');
  const [editingPatient, setEditingPatient] = useState<PatientProfile | null>(null);
  const [editingNoteText, setEditingNoteText] = useState('');
  const [selectedPatientHistory, setSelectedPatientHistory] = useState<PatientProfile | null>(null);

  // Appointment filters
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [doctorFilter, setDoctorFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<'All' | 'Today' | 'Upcoming' | 'Past'>('All');

  // Manual appointment modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualTreatment, setManualTreatment] = useState('Invisalign Clear Aligners');
  const [manualDoctor, setManualDoctor] = useState('Dr. Parijat Pallav');
  const [manualSource, setManualSource] = useState<AppointmentSource>('Remedo');
  const [manualDate, setManualDate] = useState(new Date().toISOString().split('T')[0]);
  const [manualTime, setManualTime] = useState('04:30 PM');

  // Clinical Notes Modal
  const [activeNotesApt, setActiveNotesApt] = useState<Appointment | null>(null);

  // Syncing & Notifications
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [simNotification, setSimNotification] = useState<string | null>(null);

  // Source Counts Calculation
  const remedoCount = appointments.filter((a) => a.source === 'Remedo' || (a.source as any) === 'Medo').length;
  const drKlickCount = appointments.filter((a) => a.source === 'Dr. Klick' || a.source === 'Doctor Click' || (a.source as any) === 'DoctorClik').length;
  const websiteCount = appointments.filter((a) => a.source === 'Website').length;
  const whatsappCount = appointments.filter((a) => a.source === 'WhatsApp').length;
  const phoneCount = appointments.filter((a) => a.source === 'Phone' || a.source === 'Walk-in' || a.source === 'Google').length;

  const todayStr = new Date().toISOString().split('T')[0];

  // Filtered Appointments Logic
  const filteredAppointments = appointments.filter((apt) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      apt.patientName.toLowerCase().includes(term) ||
      apt.phone.includes(term) ||
      apt.id.toLowerCase().includes(term) ||
      (apt.externalReferenceId && apt.externalReferenceId.toLowerCase().includes(term)) ||
      apt.treatment.toLowerCase().includes(term);

    const matchesSource =
      sourceFilter === 'All' ||
      (sourceFilter === 'Remedo' && (apt.source === 'Remedo' || (apt.source as any) === 'Medo')) ||
      (sourceFilter === 'Dr. Klick' && (apt.source === 'Dr. Klick' || apt.source === 'Doctor Click' || (apt.source as any) === 'DoctorClik')) ||
      (sourceFilter === 'Website' && apt.source === 'Website') ||
      (sourceFilter === 'WhatsApp' && apt.source === 'WhatsApp') ||
      (sourceFilter === 'Other' && (apt.source === 'Phone' || apt.source === 'Walk-in' || apt.source === 'Google'));

    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesDoctor = doctorFilter === 'All' || apt.doctor === doctorFilter;

    let matchesDate = true;
    if (dateFilter === 'Today') {
      matchesDate = apt.date === todayStr;
    } else if (dateFilter === 'Upcoming') {
      matchesDate = apt.date >= todayStr;
    } else if (dateFilter === 'Past') {
      matchesDate = apt.date < todayStr;
    }

    return matchesSearch && matchesSource && matchesStatus && matchesDoctor && matchesDate;
  });

  // Source badge styling helper for Light Theme
  const getSourceBadge = (source: string) => {
    if (source === 'Remedo' || source === 'Medo') {
      return {
        label: 'Remedo',
        className: 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100',
        dotColor: 'bg-purple-500'
      };
    }
    if (source === 'Dr. Klick' || source === 'Doctor Click' || source === 'DoctorClik') {
      return {
        label: 'Dr. Klick',
        className: 'bg-cyan-50 text-cyan-800 border-cyan-200 hover:bg-cyan-100',
        dotColor: 'bg-cyan-500'
      };
    }
    if (source === 'Website') {
      return {
        label: 'Website',
        className: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100',
        dotColor: 'bg-sky-500'
      };
    }
    if (source === 'WhatsApp') {
      return {
        label: 'WhatsApp',
        className: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100',
        dotColor: 'bg-emerald-500'
      };
    }
    return {
      label: source,
      className: 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200',
      dotColor: 'bg-slate-500'
    };
  };

  // Simulate third-party incoming booking
  const handleSimulateThirdParty = (sourceName: 'Remedo' | 'Dr. Klick' | 'Doctor Click' | 'Website' | 'WhatsApp') => {
    const mockPatients = [
      { name: 'Kavita Roy', treatment: 'Single-Sitting RCT', phone: '+91 98351 44820' },
      { name: 'Aditya Roy', treatment: 'Invisalign Clear Aligners', phone: '+91 94310 99281' },
      { name: 'Naveen Sinha', treatment: 'Dental Implants', phone: '+91 99342 11029' },
      { name: 'Deepak Joshi', treatment: 'Laser Teeth Whitening', phone: '+91 93341 87654' },
      { name: 'Priyanka Verma', treatment: 'Ceramic Crown Placement', phone: '+91 97714 55432' },
      { name: 'Rajeev Srivastava', treatment: 'Wisdom Tooth Extraction', phone: '+91 98352 11980' }
    ];

    const pick = mockPatients[Math.floor(Math.random() * mockPatients.length)];
    const canonicalSource = (sourceName === 'Doctor Click' ? 'Dr. Klick' : sourceName) as AppointmentSource;
    const prefix = canonicalSource === 'Remedo' ? 'REMEDO' : canonicalSource === 'Dr. Klick' ? 'DKLK' : canonicalSource === 'WhatsApp' ? 'WA' : 'WEB';
    const refId = `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`;

    const res = ingestThirdPartyAppointment(canonicalSource, {
      patientName: pick.name,
      phone: pick.phone,
      treatment: pick.treatment,
      doctor: 'Dr. Parijat Pallav',
      date: new Date().toISOString().split('T')[0],
      time: '05:30 PM',
      externalReferenceId: refId,
      notes: `Instant live booking received via ${canonicalSource} integration API.`
    });

    setSimNotification(
      `✓ Ingested new appointment from ${canonicalSource} for ${pick.name} (Ref: ${refId})`
    );
    setTimeout(() => setSimNotification(null), 4500);
  };

  // Sync all external integrations
  const handleSyncAllPortals = () => {
    setIsSyncingAll(true);
    setTimeout(() => {
      const res = syncAllIntegrations();
      setIsSyncingAll(false);
      setSimNotification(
        `✓ All 3 portals (Remedo, Dr. Klick, Balaji Website Engine) synced successfully at ${res.timestamp}`
      );
      setTimeout(() => setSimNotification(null), 4500);
    }, 700);
  };

  // Create manual appointment
  const handleCreateManualAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim() || !manualPhone.trim()) return;

    bookAppointment({
      patientName: manualName.trim(),
      phone: manualPhone.trim(),
      treatment: manualTreatment,
      doctor: manualDoctor,
      date: manualDate,
      time: manualTime,
      patientType: 'New',
      source: manualSource,
      notes: `Manual booking entered directly in Doctor Command Center (${manualSource}).`
    });

    setShowAddModal(false);
    setManualName('');
    setManualPhone('');
    setSimNotification(`✓ Appointment logged for ${manualName} under ${manualSource}`);
    setTimeout(() => setSimNotification(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex flex-col overflow-hidden text-left animate-fadeIn">
      {/* Top Header Bar - Clean & Spacious */}
      <header className="bg-white border-b border-slate-200 text-slate-900 px-6 py-3.5 flex items-center justify-between gap-4 shrink-0 shadow-xs">
        <div className="flex items-center gap-4">
          <BalajiLogo variant="light" />
          <div className="hidden sm:block border-l border-slate-200 pl-4">
            <h1 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Doctor Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Dr. Parijat Pallav • Balaji Dental Clinic Practice Command
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Live Sync Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Portals Connected</span>
          </div>

          {/* Sync Button */}
          <button
            onClick={handleSyncAllPortals}
            disabled={isSyncingAll}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border border-slate-200 disabled:opacity-50"
            title="Sync incoming appointments from Remedo, Dr. Klick, and Website"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin text-sky-600' : ''}`} />
            <span className="hidden sm:inline">{isSyncingAll ? 'Syncing...' : 'Sync Channels'}</span>
          </button>

          {/* New Appointment Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>

          {/* Exit Portal */}
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200"
            title="Return to public clinic website"
          >
            <span className="hidden sm:inline">Exit Portal</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Real-time Notification Banner */}
      {simNotification && (
        <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-bold text-center flex items-center justify-center gap-2 animate-fadeIn shadow-xs">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{simNotification}</span>
        </div>
      )}

      {/* Main Dashboard Layout */}
      <div className="flex-1 flex overflow-hidden bg-slate-50">
        {/* Left Sidebar Navigation - Spacious & Clean */}
        <aside className="w-16 sm:w-64 bg-white border-r border-slate-200 p-3 sm:p-5 flex flex-col justify-between shrink-0 shadow-xs">
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Clinic Dashboard</span>
              </div>
              <span
                className={`hidden sm:inline text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'overview'
                    ? 'bg-sky-700 text-white'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'appointments'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Appointments</span>
              </div>
              <span
                className={`hidden sm:inline text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'appointments'
                    ? 'bg-sky-700 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {appointments.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'patients'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Patient Records</span>
              </div>
              <span
                className={`hidden sm:inline text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'patients'
                    ? 'bg-sky-700 text-white'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {patients.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Inquiries &amp; Leads</span>
              </div>
              <span
                className={`hidden sm:inline text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'leads'
                    ? 'bg-sky-700 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('integrations')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'integrations'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Network className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Channel Sync</span>
              </div>
              <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Active
              </span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Reception Chat</span>
            </button>
          </nav>

          {/* Doctor Status Card */}
          <div className="hidden sm:block p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-slate-600 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700">Doctor on Duty</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-sm text-sky-900 font-extrabold">Dr. Parijat Pallav</p>
            <p className="text-[11px] text-slate-500 leading-snug">Chief Specialist • MDS Orthodontics</p>
          </div>
        </aside>

        {/* Center Main Content Area */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8 bg-slate-50 text-slate-800">
          {/* TAB 1: UNIFIED APPOINTMENTS (PRIMARY VIEW) */}
          {activeTab === 'appointments' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Top Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Appointments Schedule
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Manage patient appointments consolidated across Website, Remedo, Dr. Klick, and WhatsApp.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={handleSyncAllPortals}
                    disabled={isSyncingAll}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 border border-slate-300 shadow-xs cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin text-sky-600' : ''}`} />
                    <span>Refresh</span>
                  </button>

                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Log Booking</span>
                  </button>
                </div>
              </div>

              {/* Source Channel Filter Tabs */}
              <div className="flex items-center flex-wrap gap-2.5 pb-2">
                <button
                  onClick={() => setSourceFilter('All')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    sourceFilter === 'All'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>All Channels</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${sourceFilter === 'All' ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {appointments.length}
                  </span>
                </button>

                <button
                  onClick={() => setSourceFilter('Website')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    sourceFilter === 'Website'
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span>Website</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${sourceFilter === 'Website' ? 'bg-sky-700 text-white' : 'bg-sky-50 text-sky-700'}`}>
                    {websiteCount}
                  </span>
                </button>

                <button
                  onClick={() => setSourceFilter('Remedo')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    sourceFilter === 'Remedo'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>Remedo</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${sourceFilter === 'Remedo' ? 'bg-purple-700 text-white' : 'bg-purple-50 text-purple-700'}`}>
                    {remedoCount}
                  </span>
                </button>

                <button
                  onClick={() => setSourceFilter('Dr. Klick')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    sourceFilter === 'Dr. Klick' || sourceFilter === 'Doctor Click'
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-cyan-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  <span>Dr. Klick</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${sourceFilter === 'Dr. Klick' ? 'bg-cyan-700 text-white' : 'bg-cyan-50 text-cyan-700'}`}>
                    {drKlickCount}
                  </span>
                </button>

                <button
                  onClick={() => setSourceFilter('WhatsApp')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    sourceFilter === 'WhatsApp'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>WhatsApp</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${sourceFilter === 'WhatsApp' ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
                    {whatsappCount}
                  </span>
                </button>

                <button
                  onClick={() => setSourceFilter('Other')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                    sourceFilter === 'Other'
                      ? 'bg-slate-700 text-white border-slate-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>Phone / Walk-in</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${sourceFilter === 'Other' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {phoneCount}
                  </span>
                </button>
              </div>

              {/* Search and Filters Card - Spacious & Clean */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patient, phone, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-xs"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Date Filter */}
                <div>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-medium text-xs cursor-pointer"
                  >
                    <option value="All">All Dates</option>
                    <option value="Today">Today ({todayStr})</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Past">Past Records</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-medium text-xs cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In-Progress">In-Chair</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Doctor Filter */}
                <div>
                  <select
                    value={doctorFilter}
                    onChange={(e) => setDoctorFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-medium text-xs cursor-pointer"
                  >
                    <option value="All">All Doctors</option>
                    <option value="Dr. Parijat Pallav">Dr. Parijat Pallav (Chief)</option>
                    <option value="Dr. Sneha Verma">Dr. Sneha Verma</option>
                    <option value="Dr. Amit Anand">Dr. Amit Anand</option>
                  </select>
                </div>
              </div>

              {/* Counter feedback */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>
                  Showing <strong className="text-slate-900">{filteredAppointments.length}</strong> of{' '}
                  <strong className="text-slate-900">{appointments.length}</strong> appointments
                </span>
                {(sourceFilter !== 'All' || statusFilter !== 'All' || doctorFilter !== 'All' || dateFilter !== 'All' || searchTerm) && (
                  <button
                    onClick={() => {
                      setSourceFilter('All');
                      setStatusFilter('All');
                      setDoctorFilter('All');
                      setDateFilter('All');
                      setSearchTerm('');
                    }}
                    className="text-sky-600 hover:text-sky-700 font-bold underline cursor-pointer"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* Clean Table Layout */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[11px] border-b border-slate-200 font-bold">
                      <tr>
                        <th className="px-5 py-4">Patient</th>
                        <th className="px-5 py-4">Date & Time</th>
                        <th className="px-5 py-4">Treatment</th>
                        <th className="px-5 py-4">Doctor</th>
                        <th className="px-5 py-4">Channel</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-16 text-slate-400">
                            <Calendar className="w-10 h-10 mx-auto mb-2.5 text-slate-300" />
                            <p className="font-bold text-base text-slate-700">No appointments found</p>
                            <p className="text-xs text-slate-500 mt-1">
                              Try clearing your search query or choosing another channel filter.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((apt) => {
                          const badge = getSourceBadge(apt.source);
                          const isDuplicateUnresolved = apt.isDuplicate && !apt.isDuplicateResolved;

                          return (
                            <tr
                              key={apt.id}
                              className={`hover:bg-slate-50/80 transition-colors ${
                                isDuplicateUnresolved ? 'bg-amber-50/50' : ''
                              }`}
                            >
                              {/* Patient */}
                              <td className="px-5 py-4.5 align-middle">
                                <div className="font-bold text-slate-900 text-sm">
                                  {apt.patientName}
                                </div>
                                <div className="text-slate-500 flex items-center gap-3 mt-1">
                                  <a
                                    href={`tel:${apt.phone}`}
                                    className="hover:text-sky-600 flex items-center gap-1 font-mono text-slate-600 text-xs"
                                    title="Call patient"
                                  >
                                    <Phone className="w-3 h-3 text-slate-400" />
                                    <span>{apt.phone}</span>
                                  </a>

                                  <a
                                    href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                      `Namaste ${apt.patientName}, Balaji Dental Clinic confirms your visit on ${apt.date} at ${apt.time}.`
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-emerald-600 hover:text-emerald-700"
                                    title="WhatsApp Patient"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                </div>

                                {isDuplicateUnresolved && (
                                  <div className="mt-2 p-2 rounded-lg bg-amber-100/70 border border-amber-300 text-[11px] text-amber-900 flex items-center gap-2">
                                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                    <span>Duplicate slot detected.</span>
                                    <button
                                      onClick={() => resolveDuplicate(apt.id, 'merge', apt.duplicateOfId)}
                                      className="px-2 py-0.5 rounded bg-amber-500 text-white font-bold text-[10px] cursor-pointer"
                                    >
                                      Merge
                                    </button>
                                  </div>
                                )}
                              </td>

                              {/* Date & Time */}
                              <td className="px-5 py-4.5 align-middle whitespace-nowrap">
                                <div className="font-semibold text-slate-900 text-xs">
                                  {apt.date}
                                </div>
                                <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span>{apt.time}</span>
                                </div>
                              </td>

                              {/* Treatment */}
                              <td className="px-5 py-4.5 align-middle">
                                <span className="font-semibold text-slate-800 text-xs block">{apt.treatment}</span>
                                {apt.notes && (
                                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                    {apt.notes}
                                  </p>
                                )}
                              </td>

                              {/* Doctor */}
                              <td className="px-5 py-4.5 align-middle whitespace-nowrap">
                                <span className="text-slate-700 font-medium text-xs">{apt.doctor}</span>
                              </td>

                              {/* Source Channel */}
                              <td className="px-5 py-4.5 align-middle whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${badge.className}`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dotColor}`}></span>
                                  <span>{badge.label}</span>
                                </span>
                              </td>

                              {/* Status */}
                              <td className="px-5 py-4.5 align-middle whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                                    apt.status === 'Confirmed'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                      : apt.status === 'Completed'
                                      ? 'bg-sky-100 text-sky-800 border border-sky-200'
                                      : apt.status === 'In-Progress'
                                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                                  }`}
                                >
                                  {apt.status}
                                </span>
                              </td>

                              {/* Doctor Actions */}
                              <td className="px-5 py-4.5 align-middle text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                  {apt.status !== 'In-Progress' && apt.status !== 'Completed' && (
                                    <button
                                      onClick={() => updateAppointmentStatus(apt.id, 'In-Progress')}
                                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold cursor-pointer"
                                    >
                                      Start
                                    </button>
                                  )}

                                  {apt.status !== 'Completed' && (
                                    <button
                                      onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold cursor-pointer"
                                    >
                                      Done
                                    </button>
                                  )}

                                  <button
                                    onClick={() => setActiveNotesApt(apt)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                                    title="View Notes"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PATIENT DATABASE & CLINICAL RECORDS */}
          {activeTab === 'patients' && (
            <div className="space-y-6 max-w-7xl mx-auto text-left">
              {/* Top Title & Database Action Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading flex items-center gap-2">
                        <span>Patient Database &amp; Clinical Records</span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active Database
                        </span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Secure persistent storage of all registered patients, contact details, appointment histories, and doctor clinical notes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={exportDatabaseCSV}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 border border-slate-300 shadow-xs transition-colors cursor-pointer"
                    title="Download Patient Database as Excel-compatible CSV"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Export CSV (Excel)</span>
                  </button>

                  <button
                    type="button"
                    onClick={exportDatabaseJSON}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 border border-slate-300 shadow-xs transition-colors cursor-pointer"
                    title="Download full database backup in JSON format"
                  >
                    <FileDown className="w-4 h-4 text-sky-600" />
                    <span>Backup DB (JSON)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddPatientModal(true)}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Add New Patient</span>
                  </button>
                </div>
              </div>

              {/* Database Overview Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Patients</span>
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">{patients.length}</span>
                    <span className="text-xs text-emerald-600 font-semibold">Registered Records</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stored Bookings</span>
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Calendar className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">{appointments.length}</span>
                    <span className="text-xs text-slate-500">Across all channels</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Website Inquiries</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">{leads.length}</span>
                    <span className="text-xs text-indigo-600 font-semibold">CRM Leads</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Storage Engine</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs font-bold text-slate-900">Local &amp; Persistent DB</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Real-time auto-sync on change</div>
                  </div>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={patientSearch}
                      onChange={(e) => setPatientSearch(e.target.value)}
                      placeholder="Search patient by name, phone (+91), patient ID (PAT-001) or treatment..."
                      className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800"
                    />
                    {patientSearch && (
                      <button
                        type="button"
                        onClick={() => setPatientSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={patientGenderFilter}
                      onChange={(e) => setPatientGenderFilter(e.target.value)}
                      aria-label="Filter by Gender"
                      className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-700 font-medium"
                    >
                      <option value="All">All Genders</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>

                    <select
                      value={patientSourceFilter}
                      onChange={(e) => setPatientSourceFilter(e.target.value)}
                      aria-label="Filter by Patient Source"
                      className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-700 font-medium"
                    >
                      <option value="All">All Sources</option>
                      <option value="Website">Website</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Remedo">Remedo</option>
                      <option value="Dr. Klick">Dr. Klick</option>
                      <option value="Walk-in">Walk-in</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Patient Database Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700 border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        <th className="px-5 py-3.5">Patient ID &amp; Name</th>
                        <th className="px-4 py-3.5">Contact Details</th>
                        <th className="px-4 py-3.5">Treatment / Concerns</th>
                        <th className="px-4 py-3.5">Visits / History</th>
                        <th className="px-4 py-3.5">Medical History &amp; Notes</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {patients
                        .filter((p) => {
                          const term = patientSearch.toLowerCase();
                          const matchesSearch =
                            !term ||
                            p.name.toLowerCase().includes(term) ||
                            p.phone.includes(term) ||
                            p.id.toLowerCase().includes(term) ||
                            (p.email && p.email.toLowerCase().includes(term)) ||
                            (p.dentalConditions && p.dentalConditions.some((c) => c.toLowerCase().includes(term))) ||
                            (p.medicalHistoryNotes && p.medicalHistoryNotes.toLowerCase().includes(term));

                          const matchesGender = patientGenderFilter === 'All' || p.gender === patientGenderFilter;
                          const matchesSource = patientSourceFilter === 'All' || p.acquisitionSource === patientSourceFilter;
                          return matchesSearch && matchesGender && matchesSource;
                        })
                        .map((patient) => {
                          const cleanDigits = patient.phone.replace(/[^0-9]/g, '');
                          const waPhone = cleanDigits.startsWith('91') ? cleanDigits : `91${cleanDigits.slice(-10)}`;
                          const patientApts = appointments.filter(
                            (a) => a.phone.replace(/[^0-9]/g, '').slice(-10) === cleanDigits.slice(-10)
                          );

                          return (
                            <tr key={patient.id} className="hover:bg-sky-50/40 transition-colors">
                              {/* Patient ID & Name */}
                              <td className="px-5 py-4 align-top">
                                <div className="flex items-start gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0 text-xs">
                                    {patient.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-bold text-slate-900 text-sm">{patient.name}</div>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                      <span className="font-mono text-[10px] font-bold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
                                        {patient.id}
                                      </span>
                                      <span className="text-[11px] text-slate-500">
                                        {patient.gender} • {patient.age} yrs
                                      </span>
                                    </div>
                                    <div className="mt-1">
                                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                                        Source: {patient.acquisitionSource}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Contact Details */}
                              <td className="px-4 py-4 align-top">
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-2">
                                    <a
                                      href={`tel:${patient.phone}`}
                                      className="font-bold text-slate-900 hover:text-sky-600 transition-colors"
                                    >
                                      {patient.phone}
                                    </a>
                                  </div>
                                  {patient.email && (
                                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                                      <Mail className="w-3 h-3 text-slate-400" />
                                      <span className="truncate max-w-[160px]">{patient.email}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5 pt-1">
                                    <a
                                      href={`tel:${patient.phone}`}
                                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors"
                                      title="Call Patient"
                                    >
                                      <Phone className="w-3 h-3 text-sky-600" />
                                      <span>Call</span>
                                    </a>
                                    <a
                                      href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                                        `Namaste ${patient.name} ji, Balaji Dental & Orthodontic Clinic Patna se Dr. Parijat Pallav ke team se message.`
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-200 transition-colors"
                                      title="Send WhatsApp message"
                                    >
                                      <MessageCircle className="w-3 h-3 text-emerald-600" />
                                      <span>WhatsApp</span>
                                    </a>
                                  </div>
                                </div>
                              </td>

                              {/* Treatment / Conditions */}
                              <td className="px-4 py-4 align-top">
                                <div className="flex flex-wrap gap-1 max-w-[200px]">
                                  {patient.dentalConditions && patient.dentalConditions.length > 0 ? (
                                    patient.dentalConditions.map((cond, i) => (
                                      <span
                                        key={i}
                                        className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold"
                                      >
                                        {cond}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-slate-400 italic">General Consultation</span>
                                  )}
                                </div>
                              </td>

                              {/* Visits / History */}
                              <td className="px-4 py-4 align-top">
                                <div className="space-y-1">
                                  <div className="text-slate-900 font-bold">
                                    {patient.totalAppointments} {patient.totalAppointments === 1 ? 'Visit' : 'Visits'}
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    Last: {patient.lastVisitDate || 'Recent'}
                                  </div>
                                  {patientApts.length > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => setSelectedPatientHistory(patient)}
                                      className="text-[10px] font-bold text-sky-600 hover:text-sky-800 underline cursor-pointer"
                                    >
                                      View {patientApts.length} Appointments &rarr;
                                    </button>
                                  )}
                                </div>
                              </td>

                              {/* Medical History & Notes */}
                              <td className="px-4 py-4 align-top max-w-xs">
                                <div className="space-y-1.5">
                                  <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                                    {patient.medicalHistoryNotes || 'No special medical alerts registered.'}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingPatient(patient);
                                      setEditingNoteText(patient.medicalHistoryNotes || '');
                                    }}
                                    className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 hover:text-sky-600 cursor-pointer"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                    <span>Edit Clinical Note</span>
                                  </button>
                                </div>
                              </td>

                              {/* Actions */}
                              <td className="px-5 py-4 align-top text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedPatientHistory(patient)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                                    title="View Detailed Patient File"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (confirm(`Are you sure you want to remove ${patient.name} from the database?`)) {
                                        deletePatient(patient.id);
                                      }
                                    }}
                                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                                    title="Delete Patient Record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                {patients.length === 0 && (
                  <div className="py-12 text-center text-slate-500">
                    <Database className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm">No patient records found in database.</p>
                    <p className="text-xs text-slate-400 mt-1">Bookings and inquiries from the website will automatically populate here.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: EXECUTIVE CLINIC DASHBOARD & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Executive Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-sky-900 to-slate-900 text-white p-6 rounded-3xl shadow-sm">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-800/80 text-sky-200 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Clinic Portal Active • Dr. Parijat Pallav</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                    Clinic Executive Overview
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Live summary of appointments, patient records, channel integrations, and pending inquiries.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>View Appointments ({appointments.length})</span>
                  </button>
                  <button
                    onClick={handleSyncAllPortals}
                    disabled={isSyncingAll}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 border border-white/15"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
                    <span>Sync Channels</span>
                  </button>
                </div>
              </div>

              {/* Core Clinic Key Performance Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('appointments')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="uppercase tracking-wider">Appointments</span>
                    <Calendar className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-slate-900">{appointments.length}</span>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" /> All Sources
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Scheduled in clinic system</p>
                </div>

                <div
                  onClick={() => setActiveTab('patients')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="uppercase tracking-wider">Patient Records</span>
                    <Database className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-slate-900">{patients.length}</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      EMR Safe
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Full clinical dental histories</p>
                </div>

                <div
                  onClick={() => setActiveTab('leads')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="uppercase tracking-wider">Inquiries &amp; Leads</span>
                    <Users className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-slate-900">{leads.length}</span>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {leads.filter((l) => l.status === 'New').length} New
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Pending clinic follow-ups</p>
                </div>

                <div
                  onClick={() => setActiveTab('integrations')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-purple-300 hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="uppercase tracking-wider">Channel Integrations</span>
                    <Network className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-slate-900">3 Gateways</span>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Remedo, Dr. Klick &amp; Web</p>
                </div>
              </div>

              {/* Channel Distribution & Quick Status Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Channel Breakdown Box */}
                <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Bookings Ingested by Source</h3>
                      <p className="text-xs text-slate-500">Unified pipeline pulling from all booking partners</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('integrations')}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 cursor-pointer"
                    >
                      Configure Portals →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { name: 'Remedo', count: remedoCount, color: 'bg-purple-500', badge: 'bg-purple-50 text-purple-800 border-purple-200' },
                      { name: 'Dr. Klick', count: drKlickCount, color: 'bg-cyan-500', badge: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
                      { name: 'Website', count: websiteCount, color: 'bg-sky-500', badge: 'bg-sky-50 text-sky-800 border-sky-200' },
                      { name: 'WhatsApp', count: whatsappCount, color: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
                      { name: 'Phone/Walk-in', count: phoneCount, color: 'bg-amber-500', badge: 'bg-amber-50 text-amber-800 border-amber-200' }
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2 hover:bg-white hover:border-slate-300 transition-all"
                      >
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border text-center ${item.badge}`}>
                          {item.name}
                        </span>
                        <div className="flex items-baseline justify-between pt-1">
                          <span className="text-2xl font-extrabold text-slate-900">{item.count}</span>
                          <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Doctor Actions Box */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">Direct Actions</h3>
                    <p className="text-xs text-slate-500">Quick management shortcuts for today</p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setActiveTab('patients');
                        setShowAddPatientModal(true);
                      }}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Patient Record</span>
                      </span>
                      <span>+</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('appointments')}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Filter className="w-3.5 h-3.5 text-slate-500" />
                        <span>Filter Today's Schedule</span>
                      </span>
                      <span>→</span>
                    </button>

                    <button
                      onClick={exportDatabaseCSV}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span>Export Database (CSV)</span>
                      </span>
                      <span>⬇</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>All records synced and protected under clinical encryption.</span>
                  </div>
                </div>
              </div>

              {/* Recent Upcoming Appointments Preview */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Upcoming Appointments</h3>
                    <p className="text-xs text-slate-500">Next scheduled patients across all active channels</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 cursor-pointer"
                  >
                    View All ({appointments.length}) →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {appointments.slice(0, 5).map((apt) => {
                    const badge = getSourceBadge(apt.source);
                    return (
                      <div key={apt.id} className="py-3 flex items-center justify-between gap-3 text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center font-bold text-sky-700 text-xs">
                            {apt.patientName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">{apt.patientName}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.className}`}>
                                {badge.label}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">{apt.treatment} • {apt.phone}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs font-bold text-slate-800">{apt.time}</div>
                          <div className="text-[11px] text-slate-500">{apt.date}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CRM INQUIRIES & LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                    Patient CRM &amp; Callback Leads
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage inquiries from the website, Remedo chat, and phone calls. Convert directly into confirmed appointments.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['New', 'Contacted', 'Converted'].map((statusCol) => {
                  const leadsInCol = leads.filter((l) => l.status === statusCol);
                  return (
                    <div
                      key={statusCol}
                      className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200 flex flex-col space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="font-bold text-sm text-slate-900">{statusCol} Leads</span>
                        <span className="px-2 py-0.5 rounded-full bg-white text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs">
                          {leadsInCol.length}
                        </span>
                      </div>

                      <div className="space-y-3 flex-1 overflow-y-auto max-h-[580px]">
                        {leadsInCol.map((lead) => (
                          <div
                            key={lead.id}
                            className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2.5 text-xs text-left"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-slate-900">{lead.name}</h4>
                                <p className="text-slate-500 text-[11px]">{lead.phone}</p>
                              </div>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                                {lead.source}
                              </span>
                            </div>

                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                              <span className="font-semibold text-sky-700 block">{lead.treatment}</span>
                              <p className="text-slate-500 mt-0.5">{lead.notes || 'Inquiry registered.'}</p>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[10px] text-slate-400">
                                {lead.createdAt?.split('T')[0] || 'Today'}
                              </span>
                              <div className="flex items-center gap-1.5">
                                {lead.status !== 'Converted' && (
                                  <button
                                    onClick={() => convertLeadToAppointment(lead.id)}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer shadow-2xs"
                                  >
                                    <Sparkles className="w-3 h-3" />
                                    <span>Convert to Slot</span>
                                  </button>
                                )}
                                {lead.status === 'New' && (
                                  <button
                                    onClick={() => updateLeadStatus(lead.id, 'Contacted')}
                                    className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[10px] cursor-pointer"
                                  >
                                    Mark Contacted
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PORTALS & INTEGRATIONS HUB */}
          {activeTab === 'integrations' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                    Ecosystem Portals & Webhook Bridges
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Live bridges for <strong className="text-purple-700">Remedo</strong>, <strong className="text-cyan-700">Dr. Klick</strong>, and <strong className="text-sky-700">Website Engine</strong>.
                  </p>
                </div>

                <button
                  onClick={handleSyncAllPortals}
                  disabled={isSyncingAll}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
                  <span>Force Global Sync</span>
                </button>
              </div>

              {/* Integration Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.map((integ) => (
                  <div
                    key={integ.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-left flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border ${
                              integ.type === 'Remedo'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : integ.type === 'Dr. Klick' || integ.type === 'Doctor Click'
                                ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                                : 'bg-sky-50 text-sky-700 border-sky-200'
                            }`}
                          >
                            <Zap className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900">{integ.name}</h3>
                            <span className="text-[11px] text-slate-500 font-mono">
                              Channel: {integ.type} • {integ.totalIngested} Ingested
                            </span>
                          </div>
                        </div>

                        {/* Status badge */}
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>{integ.status}</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">{integ.description}</p>

                      {/* Technical Specs Box */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 font-mono text-[11px]">
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Webhook Ingestion URL:</span>
                          <span className="text-sky-700 font-semibold truncate max-w-[200px]">{integ.webhookUrl}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Auto Sync Interval:</span>
                          <span className="text-slate-800 font-bold">
                            {integ.syncIntervalMinutes ? `Every ${integ.syncIntervalMinutes}m` : 'Real-Time Webhook'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-600">
                          <span>Last Health Verification:</span>
                          <span className="text-emerald-700 font-bold">{integ.lastSynced || 'Just now'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Simulation & Ping Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => testIntegrationConnection(integ.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Ping Gateway</span>
                      </button>

                      {(integ.type === 'Remedo' || integ.id === 'int-remedo') && (
                        <button
                          onClick={() => handleSimulateThirdParty('Remedo')}
                          className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer shadow-2xs"
                        >
                          + Simulate Ingest
                        </button>
                      )}

                      {(integ.type === 'Dr. Klick' || integ.type === 'Doctor Click' || integ.id === 'int-drklick' || integ.id === 'int-doctorclik') && (
                        <button
                          onClick={() => handleSimulateThirdParty('Dr. Klick')}
                          className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold cursor-pointer shadow-2xs"
                        >
                          + Simulate Ingest
                        </button>
                      )}

                      {(integ.type === 'Website' || integ.id === 'int-website') && (
                        <button
                          onClick={() => handleSimulateThirdParty('Website')}
                          className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold cursor-pointer shadow-2xs"
                        >
                          + Simulate Ingest
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Real-time Ingestion Event Log Stream */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-900">Live Webhook Ingestion Log Stream</h3>
                  </div>
                  <span className="text-xs text-slate-500">Auto-logged</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-50 text-slate-600 text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2">Timestamp</th>
                        <th className="px-3 py-2">Source Gateway</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Payload Summary</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {integrationLogs.slice(0, 6).map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50">
                          <td className="px-3 py-2 text-slate-500">{log.timestamp}</td>
                          <td className="px-3 py-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                log.source === 'Remedo'
                                  ? 'bg-purple-100 text-purple-800'
                                  : log.source === 'Dr. Klick' || log.source === 'Doctor Click'
                                  ? 'bg-cyan-100 text-cyan-800'
                                  : 'bg-sky-100 text-sky-800'
                              }`}
                            >
                              {log.source === 'Doctor Click' ? 'Dr. Klick' : log.source}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                log.status === 'SUCCESS' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                              }`}
                            >
                              {log.status} ({log.responseCode})
                            </span>
                          </td>
                          <td className="px-3 py-2 text-slate-600 truncate max-w-md">{log.payloadSummary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LIVE CHAT INBOX */}
          {activeTab === 'chat' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                  Patient Reception Chat Inbox
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Respond to patient queries originating from the website floating chat widget.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                <div className="md:col-span-4 space-y-3 border-r border-slate-200 pr-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Active Conversations
                  </h3>
                  {chatSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-left cursor-pointer hover:bg-sky-50 hover:border-sky-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">
                          {session.userName || 'Guest Patient'}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1">
                        {session.messages[session.messages.length - 1]?.text || 'Active consultation'}
                      </p>
                      <span className="text-[10px] text-slate-400">{session.lastMessageAt}</span>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-8 space-y-4 flex flex-col justify-between min-h-[420px]">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex-1 space-y-3 overflow-y-auto max-h-[360px]">
                    {chatSessions[0]?.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}
                      >
                        <div
                          className={`p-3 rounded-2xl text-xs max-w-[80%] ${
                            msg.sender === 'user'
                              ? 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
                              : 'bg-sky-600 text-white shadow-2xs'
                          }`}
                        >
                          <span className="text-[10px] font-bold block mb-1 opacity-80">
                            {msg.sender === 'user' ? 'Patient' : (msg.senderName || 'Balaji Dental Reception')}
                          </span>
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1">{msg.timestamp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      id="admin-reply-input"
                      placeholder="Type a clinical reply as Doctor / Receptionist..."
                      className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 placeholder:text-slate-400"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          sendChatMessage(e.currentTarget.value.trim(), 'agent');
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('admin-reply-input') as HTMLInputElement;
                        if (input && input.value.trim()) {
                          sendChatMessage(input.value.trim(), 'agent');
                          input.value = '';
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold cursor-pointer shadow-xs"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Clinical Notes Modal - Light Theme */}
      {activeNotesApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 text-slate-900 shadow-2xl relative text-left">
            <button
              onClick={() => setActiveNotesApt(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-5 h-5 text-sky-600" />
              <h3 className="text-lg font-bold text-slate-900">Clinical Notes & Patient History</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{activeNotesApt.patientName}</span>
                  <span className="font-mono text-sky-700 font-bold">{activeNotesApt.id}</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Phone: {activeNotesApt.phone} • Source: <strong className="text-slate-700">{activeNotesApt.source}</strong>
                </p>
                <p className="text-sky-800 font-semibold">{activeNotesApt.treatment}</p>
                <p className="text-slate-500 text-[11px]">
                  Assigned to {activeNotesApt.doctor} on {activeNotesApt.date} at {activeNotesApt.time}
                </p>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Intake & Ingestion Notes:
                </label>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                  {activeNotesApt.notes || 'No preliminary notes recorded for this patient slot.'}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveNotesApt(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer border border-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Appointment Booking Modal - Light Theme */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 text-slate-900 shadow-2xl relative text-left">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">
              Log Manual Ingestion / Booking
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Record a booking under <strong className="text-purple-700">Remedo</strong>, <strong className="text-cyan-700">Dr. Klick</strong>, or direct phone walk-in.
            </p>

            <form onSubmit={handleCreateManualAppointment} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="e.g. Anand Kumar"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    placeholder="+91 98350 11223"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Source Portal</label>
                  <select
                    value={manualSource}
                    onChange={(e) => setManualSource(e.target.value as AppointmentSource)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-medium"
                  >
                    <option value="Remedo">Remedo (Health Partner)</option>
                    <option value="Dr. Klick">Dr. Klick (Multi-Channel)</option>
                    <option value="Website">Website (Direct Engine)</option>
                    <option value="WhatsApp">WhatsApp Inbound</option>
                    <option value="Phone">Phone Reception</option>
                    <option value="Walk-in">Clinic Walk-in</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Doctor</label>
                  <select
                    value={manualDoctor}
                    onChange={(e) => setManualDoctor(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  >
                    <option value="Dr. Parijat Pallav">Dr. Parijat Pallav (Chief)</option>
                    <option value="Dr. Sneha Verma">Dr. Sneha Verma (Endodontics)</option>
                    <option value="Dr. Amit Anand">Dr. Amit Anand (Surgeon)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={manualDate}
                    onChange={(e) => setManualDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={manualTime}
                    onChange={(e) => setManualTime(e.target.value)}
                    placeholder="e.g. 05:00 PM"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Treatment Requested</label>
                <input
                  type="text"
                  required
                  value={manualTreatment}
                  onChange={(e) => setManualTreatment(e.target.value)}
                  placeholder="e.g. Invisalign Clear Aligners"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold cursor-pointer border border-slate-200 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  Log &amp; Sync Ingestion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW PATIENT DIRECTLY TO DATABASE */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-slate-200 shadow-2xl animate-fadeIn text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg font-heading">
                    Add New Patient to Database
                  </h3>
                  <p className="text-xs text-slate-500">
                    Register a new patient record in Balaji Clinic database.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddPatientModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newPatientName || !newPatientPhone) return;
                addPatient({
                  name: newPatientName,
                  phone: newPatientPhone,
                  email: newPatientEmail || 'patient@balajidental.com',
                  age: Number(newPatientAge) || 28,
                  gender: newPatientGender,
                  acquisitionSource: newPatientSource,
                  firstVisitDate: new Date().toISOString().split('T')[0],
                  lastVisitDate: new Date().toISOString().split('T')[0],
                  totalAppointments: 1,
                  totalSpent: 800,
                  medicalHistoryNotes: newPatientNotes || 'Registered directly at Balaji Clinic reception.',
                  status: 'Active',
                  dentalConditions: [newPatientTreatment]
                });
                setShowAddPatientModal(false);
                setNewPatientName('');
                setNewPatientPhone('');
                setNewPatientEmail('');
                setNewPatientNotes('');
              }}
              className="space-y-4 pt-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newPatientPhone}
                    onChange={(e) => setNewPatientPhone(e.target.value)}
                    placeholder="+91 99348 85664"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newPatientEmail}
                    onChange={(e) => setNewPatientEmail(e.target.value)}
                    placeholder="patient@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={newPatientAge}
                    onChange={(e) => setNewPatientAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gender</label>
                  <select
                    value={newPatientGender}
                    onChange={(e) => setNewPatientGender(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="font-bold text-slate-700 block mb-1">Source</label>
                  <select
                    value={newPatientSource}
                    onChange={(e) => setNewPatientSource(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  >
                    <option value="Website">Website</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Walk-in">Walk-in</option>
                    <option value="Remedo">Remedo</option>
                    <option value="Dr. Klick">Dr. Klick</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Treatment / Dental Condition</label>
                <input
                  type="text"
                  value={newPatientTreatment}
                  onChange={(e) => setNewPatientTreatment(e.target.value)}
                  placeholder="e.g. Invisalign Clear Aligners, Root Canal Treatment"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Medical History &amp; Doctor Notes</label>
                <textarea
                  rows={3}
                  value={newPatientNotes}
                  onChange={(e) => setNewPatientNotes(e.target.value)}
                  placeholder="Any known allergies (penicillin, latex), systemic conditions (diabetes, BP), or treatment plan..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddPatientModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold cursor-pointer shadow-xs"
                >
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT CLINICAL NOTE */}
      {editingPatient && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full border border-slate-200 shadow-2xl animate-fadeIn text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-sky-600" />
                <h3 className="font-extrabold text-slate-900 text-base font-heading">
                  Edit Clinical Note: {editingPatient.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingPatient(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <p className="text-slate-500">
                Update clinical findings, medical history, diagnosis, prescriptions, or follow-up instructions:
              </p>
              <textarea
                rows={5}
                value={editingNoteText}
                onChange={(e) => setEditingNoteText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 leading-relaxed"
                placeholder="Write medical notes here..."
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPatient(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold cursor-pointer border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updatePatient(editingPatient.id, { medicalHistoryNotes: editingNoteText });
                    setEditingPatient(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: VIEW FULL PATIENT FILE & APPOINTMENT HISTORY */}
      {selectedPatientHistory && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full border border-slate-200 shadow-2xl animate-fadeIn text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 font-black text-lg flex items-center justify-center">
                  {selectedPatientHistory.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg font-heading">
                    {selectedPatientHistory.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      {selectedPatientHistory.id}
                    </span>
                    <span>{selectedPatientHistory.gender}, {selectedPatientHistory.age} years old</span>
                    <span>• Status: {selectedPatientHistory.status}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPatientHistory(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-5 text-xs">
              {/* Contact & Demographics Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block uppercase">Phone Number</span>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={`tel:${selectedPatientHistory.phone}`}
                      className="text-sm font-bold text-slate-900 hover:text-sky-600"
                    >
                      {selectedPatientHistory.phone}
                    </a>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block uppercase">Email</span>
                  <div className="text-slate-700 font-medium mt-1">
                    {selectedPatientHistory.email || 'No email registered'}
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block uppercase">Acquisition Source</span>
                  <div className="text-slate-700 font-medium mt-1">
                    {selectedPatientHistory.acquisitionSource}
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 font-semibold block uppercase">First Visit Date</span>
                  <div className="text-slate-700 font-medium mt-1">
                    {selectedPatientHistory.firstVisitDate || 'N/A'}
                  </div>
                </div>
              </div>

              {/* Medical History & Doctor Notes */}
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">
                    Clinical Notes &amp; Medical History
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPatient(selectedPatientHistory);
                      setEditingNoteText(selectedPatientHistory.medicalHistoryNotes || '');
                    }}
                    className="text-[11px] font-bold text-sky-700 hover:text-sky-900 underline cursor-pointer"
                  >
                    Edit Note
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-sky-100">
                  {selectedPatientHistory.medicalHistoryNotes || 'No specific clinical notes entered yet.'}
                </p>
              </div>

              {/* Linked Appointments */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-2.5">
                  Linked Clinic Appointments ({appointments.filter(
                    (a) => a.phone.replace(/[^0-9]/g, '').slice(-10) === selectedPatientHistory.phone.replace(/[^0-9]/g, '').slice(-10)
                  ).length})
                </h4>

                <div className="space-y-2">
                  {appointments
                    .filter(
                      (a) => a.phone.replace(/[^0-9]/g, '').slice(-10) === selectedPatientHistory.phone.replace(/[^0-9]/g, '').slice(-10)
                    )
                    .map((apt) => (
                      <div
                        key={apt.id}
                        className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>{apt.treatment}</span>
                            <span className="font-mono text-[10px] text-slate-500">({apt.id})</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {apt.date} at {apt.time} • Doctor: {apt.doctor}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            apt.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : apt.status === 'Confirmed'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>
                    ))}

                  {appointments.filter(
                    (a) => a.phone.replace(/[^0-9]/g, '').slice(-10) === selectedPatientHistory.phone.replace(/[^0-9]/g, '').slice(-10)
                  ).length === 0 && (
                    <p className="text-xs text-slate-400 italic py-2">
                      No explicit appointments recorded for this phone number yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPatientHistory(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer"
                >
                  Close File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
