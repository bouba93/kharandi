import React, { useState, useEffect } from 'react';
import { 
  Video, Calendar, Clock, Users, Link as LinkIcon, Plus, Copy, Check, 
  ExternalLink, Share2, AlertCircle, BookOpen, GraduationCap, 
  HelpCircle, Shield, Play, Search, Filter, PhoneCall, Download, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { InAppClassroom } from './InAppClassroom';

export interface ZoomMeeting {
  id: string;
  title: string;
  subject: string;
  level: string;
  teacherName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  durationMinutes: number;
  meetingUrl: string;
  meetingId: string;
  passcode?: string;
  description: string;
  isLive?: boolean;
  participantsCount?: number;
  isCustom?: boolean;
}

const INITIAL_ZOOM_MEETINGS: ZoomMeeting[] = [
  {
    id: 'zoom-live-1',
    title: 'Grand Direct BAC : Fonctions Logarithmes & Exponentielles',
    subject: 'Mathématiques',
    level: 'Terminale SM & SE',
    teacherName: 'Prof. Amadou Diallo (Lycée Kipé)',
    date: new Date().toISOString().split('T')[0],
    time: '17:00',
    durationMinutes: 90,
    meetingUrl: 'https://zoom.us/j/84920391192?pwd=KHARANDI2026',
    meetingId: '849 2039 1192',
    passcode: '2026BAC',
    description: 'Résolution pas-à-pas des sujets d’annales officielles avec astuces de rédaction pour maximiser les points au Baccalauréat.',
    isLive: true,
    participantsCount: 42
  },
  {
    id: 'zoom-live-2',
    title: 'Physique-Chimie BEPC : Électricité & Circuits Résistifs',
    subject: 'Physique-Chimie',
    level: '10ème Année (BEPC)',
    teacherName: 'Mme Fatoumata Barry',
    date: new Date().toISOString().split('T')[0],
    time: '18:30',
    durationMinutes: 60,
    meetingUrl: 'https://zoom.us/j/75218390145?pwd=BEPC2026',
    meetingId: '752 1839 0145',
    passcode: 'BREVET224',
    description: 'Maîtriser les lois des nœuds, lois d’Ohm et calculs d’énergie électrique selon le programme officiel MEPU-A.',
    isLive: false,
    participantsCount: 28
  },
  {
    id: 'zoom-live-3',
    title: 'SVT : Synthèse des Protéines & Hérédité Humaine',
    subject: 'Biologie / SVT',
    level: 'Terminale SS',
    teacherName: 'Prof. Souleymane Camara',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '16:00',
    durationMinutes: 75,
    meetingUrl: 'https://zoom.us/j/91038472910?pwd=SVT terminale',
    meetingId: '910 3847 2910',
    passcode: 'ADN2026',
    description: 'Schémas bilan détaillés, exercices types d’examen et questions récurrentes des sessions 2020-2025.',
    isLive: false,
    participantsCount: 19
  },
  {
    id: 'zoom-live-4',
    title: 'Français : Technique de la Dissertation Littéraire',
    subject: 'Français & Philosophie',
    level: 'Lycée (Toutes Séries)',
    teacherName: 'Dr. Ibrahima Sory Sow',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '17:30',
    durationMinutes: 80,
    meetingUrl: 'https://zoom.us/j/63820194829?pwd=DISSERTATION',
    meetingId: '638 2019 4829',
    passcode: 'PLUME224',
    description: 'Analyse du sujet, problématisation, plan dialectique et rédaction de l’introduction parfaite.',
    isLive: false,
    participantsCount: 35
  }
];

const STORAGE_KEY = 'kharandi_custom_zoom_meetings';

interface ZoomClassesProps {
  setActiveTab?: (tab: string) => void;
}

export const ZoomClasses: React.FC<ZoomClassesProps> = ({ setActiveTab }) => {
  const { userProfile } = useAuth();
  const [meetings, setMeetings] = useState<ZoomMeeting[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'create' | 'guide'>('upcoming');
  const [searchFilter, setSearchFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeMeeting, setActiveMeeting] = useState<ZoomMeeting | null>(null);

  // Quick Join modal/state
  const [directMeetingId, setDirectMeetingId] = useState('');
  const [directPasscode, setDirectPasscode] = useState('');

  // Create Meeting form state
  const [formTitle, setFormTitle] = useState('');
  const [formSubject, setFormSubject] = useState('Mathématiques');
  const [formLevel, setFormLevel] = useState('Terminale SM & SE');
  const [formTeacher, setFormTeacher] = useState(userProfile?.name || 'Enseignant Kharandi');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formTime, setFormTime] = useState('18:00');
  const [formDuration, setFormDuration] = useState('60');
  const [formUrl, setFormUrl] = useState('');
  const [formMeetingId, setFormMeetingId] = useState('');
  const [formPasscode, setFormPasscode] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Load custom meetings
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed: ZoomMeeting[] = saved ? JSON.parse(saved) : [];
      setMeetings([...INITIAL_ZOOM_MEETINGS, ...parsed]);
    } catch {
      setMeetings(INITIAL_ZOOM_MEETINGS);
    }
  }, []);

  const handleCopy = (text: string, id: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success(`${label} copié dans le presse-papier !`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleShareWhatsApp = (meeting: ZoomMeeting) => {
    const text = `🎓 *Classe Zoom Kharandi en direct*\n\n*${meeting.title}*\n📚 Matière : ${meeting.subject} (${meeting.level})\n👨‍🏫 Enseignant : ${meeting.teacherName}\n🗓 Date : ${meeting.date} à ${meeting.time} (Heure de Conakry)\n\n🔗 *Rejoindre sur Zoom :*\n${meeting.meetingUrl}\n\n🆔 ID Réunion : ${meeting.meetingId}\n🔑 Code secret : ${meeting.passcode || 'Aucun'}\n\n_Plateforme éducative Kharandi Guinée_`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleJoinDirect = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = directMeetingId.replace(/\s+/g, '');
    if (!cleanId) {
      toast.error('Veuillez renseigner un ID de réunion Zoom valide.');
      return;
    }
    const tempMeeting: ZoomMeeting = {
      id: `direct-${Date.now()}`,
      title: `Classe Virtuelle (ID ${cleanId})`,
      subject: 'Cours en Direct',
      level: 'Tous niveaux',
      teacherName: 'Professeur Hôte',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationMinutes: 60,
      meetingUrl: `https://zoom.us/j/${cleanId}${directPasscode ? `?pwd=${encodeURIComponent(directPasscode)}` : ''}`,
      meetingId: cleanId,
      passcode: directPasscode || undefined,
      description: 'Accès direct à la salle de classe virtuelle Kharandi.',
      isLive: true,
      participantsCount: 12
    };

    setActiveMeeting(tempMeeting);
    toast.success('Entrée dans la classe virtuelle Kharandi...');
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      toast.error('Veuillez indiquer un titre pour le cours.');
      return;
    }

    const cleanId = formMeetingId.trim() || `${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
    const generatedUrl = formUrl.trim() || `https://zoom.us/j/${cleanId.replace(/\s+/g, '')}${formPasscode ? `?pwd=${encodeURIComponent(formPasscode)}` : ''}`;

    const newMeeting: ZoomMeeting = {
      id: `custom-zoom-${Date.now()}`,
      title: formTitle.trim(),
      subject: formSubject,
      level: formLevel,
      teacherName: formTeacher.trim() || 'Enseignant Kharandi',
      date: formDate,
      time: formTime,
      durationMinutes: parseInt(formDuration) || 60,
      meetingUrl: generatedUrl,
      meetingId: cleanId,
      passcode: formPasscode.trim() || undefined,
      description: formDescription.trim() || 'Séance de cours et soutien en direct sur Zoom.',
      isLive: false,
      participantsCount: 1,
      isCustom: true
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed: ZoomMeeting[] = saved ? JSON.parse(saved) : [];
      const updated = [newMeeting, ...parsed];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setMeetings([newMeeting, ...meetings]);
      toast.success('Cours Zoom programmé avec succès !');
      setActiveSubTab('upcoming');

      // Reset form
      setFormTitle('');
      setFormUrl('');
      setFormMeetingId('');
      setFormPasscode('');
      setFormDescription('');
    } catch {
      toast.error('Erreur lors de la sauvegarde du cours.');
    }
  };

  const handleDeleteCustomMeeting = (id: string) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed: ZoomMeeting[] = saved ? JSON.parse(saved) : [];
      const updated = parsed.filter(m => m.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setMeetings(meetings.filter(m => m.id !== id));
      toast.success('Séance Zoom retirée.');
    } catch {
      toast.error('Erreur lors de la suppression.');
    }
  };

  const filteredMeetings = meetings.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          m.subject.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          m.teacherName.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesLevel = levelFilter === 'all' || m.level.toLowerCase().includes(levelFilter.toLowerCase());
    return matchesSearch && matchesLevel;
  });

  if (activeMeeting) {
    return (
      <InAppClassroom
        meeting={activeMeeting}
        userProfile={userProfile}
        onClose={() => setActiveMeeting(null)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* ── HERO BANNER KHARANDI x ZOOM ── */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#163B45] via-[#1A4B58] to-[#163B45] text-white p-6 sm:p-10 shadow-xl border border-white/10">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -top-12 w-64 h-64 rounded-full bg-blue-300/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Classes Virtuelles & Soutien en Direct</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg text-[#0B5CFF]">
                <Video size={28} className="fill-[#0B5CFF]" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-sm">
                Classes Zoom <span className="text-cyan-300">Kharandi</span>
              </h1>
            </div>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-medium">
              Suivez vos révisions en direct, assistez aux masterclass des meilleurs professeurs de Conakry et retrouvez vos répétiteurs en visioconférence HD avec tableau blanc partagé.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveSubTab('create')}
                className="flex items-center gap-2 bg-white text-[#0B5CFF] hover:bg-slate-100 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Plus size={16} /> Programmer un cours Zoom
              </button>
              <button
                onClick={() => setActiveSubTab('guide')}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <HelpCircle size={16} /> Guide de connexion
              </button>
            </div>
          </div>

          {/* Quick Join Card directly in Hero */}
          <div className="w-full lg:w-96 bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 shadow-lg text-white">
            <h3 className="text-sm font-black uppercase tracking-wider mb-2 flex items-center gap-2 text-cyan-200">
              <Play size={16} /> Rejoindre un cours rapide
            </h3>
            <p className="text-xs text-white/80 mb-4">
              Entrez l’ID de la réunion Zoom fourni par votre professeur ou votre école :
            </p>

            <form onSubmit={handleJoinDirect} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-white/90 mb-1">
                  ID de réunion Zoom (Meeting ID)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 849 2039 1192"
                  value={directMeetingId}
                  onChange={(e) => setDirectMeetingId(e.target.value)}
                  className="w-full bg-white text-slate-900 px-3.5 py-2.5 rounded-xl text-sm font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white/90 mb-1">
                  Code secret (optionnel)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 2026BAC"
                  value={directPasscode}
                  onChange={(e) => setDirectPasscode(e.target.value)}
                  className="w-full bg-white text-slate-900 px-3.5 py-2 rounded-xl text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black py-2.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink size={16} /> Rejoindre la session Zoom
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── NAVIGATION TABS ── */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setActiveSubTab('upcoming')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeSubTab === 'upcoming'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video size={16} className="text-[#0B5CFF]" />
            Cours & Masterclass ({filteredMeetings.length})
          </button>
          <button
            onClick={() => setActiveSubTab('create')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeSubTab === 'create'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus size={16} className="text-emerald-600" />
            Programmer un cours
          </button>
          <button
            onClick={() => setActiveSubTab('guide')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeSubTab === 'guide'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle size={16} className="text-amber-500" />
            Guide Zoom Guinée
          </button>
        </div>

        {/* Quick search / filters for upcoming tab */}
        {activeSubTab === 'upcoming' && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher matière, prof..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-white pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
              />
            </div>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
            >
              <option value="all">Tous les niveaux</option>
              <option value="Terminale">Terminales (BAC)</option>
              <option value="10ème">10ème Année (BEPC)</option>
              <option value="Lycée">Lycée général</option>
            </select>
          </div>
        )}
      </div>

      {/* ── TAB 1: UPCOMING MEETINGS ── */}
      {activeSubTab === 'upcoming' && (
        <div className="space-y-6">
          {filteredMeetings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-[#0B5CFF] rounded-2xl mx-auto flex items-center justify-center">
                <Video size={32} />
              </div>
              <h3 className="text-lg font-black text-slate-800">Aucun cours Zoom correspondant</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Modifiez vos filtres ou programmez une nouvelle séance de cours en direct pour vos élèves ou votre groupe de révision.
              </p>
              <button
                onClick={() => { setSearchFilter(''); setLevelFilter('all'); }}
                className="text-xs font-black text-[#0B5CFF] hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Decorative status badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider bg-blue-50 text-[#0B5CFF] border border-blue-200/60 px-3 py-1 rounded-full">
                        {meeting.subject}
                      </span>
                      <span className="text-[11px] font-extrabold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                        {meeting.level}
                      </span>
                    </div>

                    {meeting.isLive ? (
                      <span className="flex items-center gap-1.5 bg-rose-500 text-white text-[11px] font-black px-3 py-1 rounded-full animate-pulse shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-white" /> EN DIRECT
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Clock size={13} className="text-slate-400" /> {meeting.time}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 mb-4">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#0B5CFF] transition-colors leading-snug">
                      {meeting.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {meeting.description}
                    </p>
                  </div>

                  {/* Teacher & Session Details */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 border border-slate-100 mb-4 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 flex items-center gap-1.5">
                        <GraduationCap size={15} className="text-[#0B5CFF]" /> {meeting.teacherName}
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                        <Calendar size={13} /> {meeting.date}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">ID :</span>
                        <code className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-bold">
                          {meeting.meetingId}
                        </code>
                        <button
                          onClick={() => handleCopy(meeting.meetingId, `${meeting.id}-id`, 'ID Réunion')}
                          className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
                          title="Copier l'ID"
                        >
                          {copiedId === `${meeting.id}-id` ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                        </button>
                      </div>

                      {meeting.passcode && (
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-700">Code :</span>
                          <code className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-bold">
                            {meeting.passcode}
                          </code>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setActiveMeeting(meeting)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all shadow-sm cursor-pointer ${
                        meeting.isLive
                          ? 'bg-[#18bfd6] hover:bg-[#18bfd6]/90 text-slate-950 shadow-cyan-100'
                          : 'bg-[#163B45] hover:bg-[#163B45]/90 text-white'
                      }`}
                    >
                      <Video size={16} /> {meeting.isLive ? 'Suivre en Direct (Sur la plateforme)' : 'Rejoindre la classe Kharandi'}
                    </button>

                    <button
                      onClick={() => handleShareWhatsApp(meeting)}
                      className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                      title="Partager sur WhatsApp"
                    >
                      <Share2 size={16} />
                    </button>

                    {meeting.isCustom && (
                      <button
                        onClick={() => handleDeleteCustomMeeting(meeting.id)}
                        className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                        title="Supprimer la séance"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: PROGRAMMER UN COURS ZOOM ── */}
      {activeSubTab === 'create' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Programmer une séance de cours Zoom
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Créez une réunion Zoom pour vos élèves, vos séances de soutien ou vos révisions collectives.
            </p>
          </div>

          <form onSubmit={handleCreateMeeting} className="space-y-5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                Titre de la session *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Révision BAC : Équations Différentielles & Probabilités"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Matière *
                </label>
                <select
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
                >
                  <option value="Mathématiques">Mathématiques</option>
                  <option value="Physique-Chimie">Physique-Chimie</option>
                  <option value="Biologie / SVT">Biologie / SVT</option>
                  <option value="Français & Philosophie">Français & Philosophie</option>
                  <option value="Histoire & Géographie">Histoire & Géographie</option>
                  <option value="Anglais">Anglais</option>
                  <option value="Économie">Économie</option>
                  <option value="Calcul mental (Abacus)">Calcul mental (Abacus)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Niveau ciblé *
                </label>
                <select
                  value={formLevel}
                  onChange={(e) => setFormLevel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
                >
                  <option value="Terminale SM & SE">Terminale SM & SE</option>
                  <option value="Terminale SS">Terminale SS</option>
                  <option value="10ème Année (BEPC)">10ème Année (BEPC)</option>
                  <option value="6ème Année (CEE)">6ème Année (CEE)</option>
                  <option value="Collège général">Collège général</option>
                  <option value="Lycée général">Lycée général</option>
                  <option value="Universitaire">Universitaire</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Heure de début *
                </label>
                <input
                  type="time"
                  required
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Durée (minutes)
                </label>
                <select
                  value={formDuration}
                  onChange={(e) => setFormDuration(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
                >
                  <option value="45">45 minutes</option>
                  <option value="60">1 heure (60 min)</option>
                  <option value="90">1h30 (90 min)</option>
                  <option value="120">2 heures (120 min)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Nom de l’Enseignant / Répétiteur
                </label>
                <input
                  type="text"
                  placeholder="Ex: Prof. Amadou Diallo"
                  value={formTeacher}
                  onChange={(e) => setFormTeacher(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  ID de Réunion Zoom
                </label>
                <input
                  type="text"
                  placeholder="Ex: 852 9102 3840 (auto-généré si vide)"
                  value={formMeetingId}
                  onChange={(e) => setFormMeetingId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Lien complet de la réunion Zoom (optionnel)
                </label>
                <input
                  type="url"
                  placeholder="https://zoom.us/j/..."
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Code secret / Passcode (optionnel)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 2026BAC"
                  value={formPasscode}
                  onChange={(e) => setFormPasscode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                Objectifs pédagogiques & Consignes
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Avoir son cahier d'exercices et sa calculatrice à portée de main. Résolution des annales 2024."
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B5CFF]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveSubTab('upcoming')}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#0B5CFF] hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer"
              >
                <Plus size={16} /> Enregistrer et Publier la séance Zoom
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── TAB 3: GUIDE PRATIQUE ZOOM GUINÉE ── */}
      {activeSubTab === 'guide' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B5CFF] flex items-center justify-center font-black text-xl">
              1
            </div>
            <h3 className="text-base font-black text-slate-900">
              Télécharger Zoom gratuitement
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pour une expérience optimale sur smartphone ou ordinateur, installez l'application Zoom officielle :
            </p>
            <div className="space-y-2 pt-2">
              <a
                href="https://play.google.com/store/apps/details?id=us.zoom.videomeetings"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-slate-800 hover:text-[#0B5CFF] transition-colors border border-slate-100"
              >
                <span>📱 Android (Google Play Store)</span>
                <ExternalLink size={14} />
              </a>
              <a
                href="https://apps.apple.com/app/zoom-workplace/id546505307"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-slate-800 hover:text-[#0B5CFF] transition-colors border border-slate-100"
              >
                <span>🍏 iPhone / iPad (App Store)</span>
                <ExternalLink size={14} />
              </a>
              <a
                href="https://zoom.us/download"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-xs font-bold text-slate-800 hover:text-[#0B5CFF] transition-colors border border-slate-100"
              >
                <span>💻 PC Windows / Mac</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xl">
              2
            </div>
            <h3 className="text-base font-black text-slate-900">
              Astuces Réseau & Forfaits Guinée
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conseils pour économiser vos données mobiles (Orange, MTN, Moov) :
            </p>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span><strong>Coupez votre caméra :</strong> Écoutez l'enseignant et regardez son écran partagé, cela consomme 70% moins de mégas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span><strong>Audio via Internet :</strong> Lors de l'entrée dans la réunion, cliquez sur <em>« Rejoindre l'audio »</em> puis <em>« Données cellulaires ou Wi-Fi »</em>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span><strong>Pass Nuit ou Pass Éducation :</strong> Utilisez les forfaits adaptés pour les séances de 18h à 22h.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xl">
              3
            </div>
            <h3 className="text-base font-black text-slate-900">
              Interagir pendant la Masterclass
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pour profiter au maximum de votre cours en direct avec le professeur :
            </p>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span><strong>Lever la main :</strong> Utilisez la fonction <em>« Lever la main » (Raise Hand)</em> dans l'onglet Réactions pour poser une question.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span><strong>Chat écrit :</strong> Posez vos questions de calcul dans le chat de discussion sans interrompre la voix de l'enseignant.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-black">✓</span>
                <span><strong>Tableau blanc :</strong> Prenez des captures d'écran des théorèmes résolus pour les réviser plus tard dans Kharandi.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
