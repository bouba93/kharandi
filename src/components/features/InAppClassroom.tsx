import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, MessageSquare, Users, Hand, 
  FileText, X, Maximize2, Send, CheckCircle2,
  HelpCircle, Shield, Award, Clock, ArrowLeft,
  BookOpen, Download, Layout, Sparkles, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { ZoomMeeting } from './ZoomClasses';

interface InAppClassroomProps {
  meeting: ZoomMeeting;
  userProfile?: any;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: string;
  role: 'student' | 'teacher' | 'system';
  text: string;
  time: string;
}

export const InAppClassroom: React.FC<InAppClassroomProps> = ({
  meeting,
  userProfile,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'notes' | 'qa'>('chat');
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [hasRaisedHand, setHasRaisedHand] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(meeting.participantsCount || 34);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'Système Kharandi',
      role: 'system',
      text: `Bienvenue dans le direct de ${meeting.teacherName}. Respectez les règles de courtoisie.`,
      time: '17:00'
    },
    {
      id: 'm2',
      sender: meeting.teacherName,
      role: 'teacher',
      text: 'Bonjour à tous ! Installez-vous avec vos cahiers. Nous commençons la séance d’exercices.',
      time: '17:01'
    },
    {
      id: 'm3',
      sender: 'Mamadou (Conakry)',
      role: 'student',
      text: 'Bonjour Monsieur ! Est-ce qu’on abordera le sujet de la session 2024 ?',
      time: '17:02'
    },
    {
      id: 'm4',
      sender: meeting.teacherName,
      role: 'teacher',
      text: 'Oui tout à fait Mamadou, la deuxième partie est consacrée au sujet de l’an dernier.',
      time: '17:03'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(1450); // Live counter
  const [viewMode, setViewMode] = useState<'video' | 'whiteboard'>('video');
  const [iframeError, setIframeError] = useState(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  const cleanMeetingId = meeting.meetingId.replace(/\s+/g, '');
  // Zoom Web Client Join URL for embedded view
  const zoomWebUrl = `https://zoom.us/wc/join/${cleanMeetingId}?prefer=1&un=${encodeURIComponent(userProfile?.name || 'Élève Kharandi')}`;

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: userProfile?.name || 'Moi',
      role: 'student',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Teacher simulated response if asking question
    if (inputMessage.includes('?') || inputMessage.toLowerCase().includes('prof')) {
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            id: `reply-${Date.now()}`,
            sender: meeting.teacherName,
            role: 'teacher',
            text: 'Très bonne question ! Je vais réexpliquer ce point au tableau dans un instant.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 3000);
    }
  };

  const handleRaiseHand = () => {
    const nextState = !hasRaisedHand;
    setHasRaisedHand(nextState);
    if (nextState) {
      toast.success('Main levée ! Le professeur a été notifié.');
    } else {
      toast.info('Main baissée.');
    }
  };

  const handleToggleMic = () => {
    setIsMicOn(!isMicOn);
    toast(!isMicOn ? 'Micro activé (demande envoyée à l’hôte)' : 'Micro désactivé');
  };

  const handleToggleCam = () => {
    setIsCamOn(!isCamOn);
    toast(!isCamOn ? 'Caméra activée' : 'Caméra désactivée');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A] text-white flex flex-col h-screen w-screen overflow-hidden font-body">
      {/* ── TOP NAVBAR CLASSROOM ── */}
      <header className="h-16 bg-[#163B45] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            title="Quitter la classe"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
            <span className="text-xs font-black uppercase tracking-wider text-rose-400 bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 rounded-md hidden sm:inline-block">
              EN DIRECT
            </span>
          </div>

          <div className="min-w-0">
            <h2 className="font-extrabold text-sm sm:text-base text-white truncate leading-tight">
              {meeting.title}
            </h2>
            <p className="text-[11px] text-slate-300 truncate">
              {meeting.subject} ({meeting.level}) • Enseignant : <span className="font-bold text-[#18bfd6]">{meeting.teacherName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono font-bold">
            <Clock size={14} className="text-[#FAB304]" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold">
            <Users size={14} className="text-[#18bfd6]" />
            <span>{participantsCount} élèves</span>
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-md"
          >
            Quitter
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT GRID ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* LEFT / CENTER: STAGE VIDEO PLAYER */}
        <div className="flex-1 flex flex-col bg-slate-950 relative overflow-hidden">
          {/* VIEW MODE TOGGLE BANNER */}
          <div className="h-10 bg-slate-900 border-b border-white/10 px-4 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('video')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'video' ? 'bg-[#18bfd6] text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Video size={13} /> Flux Direct Prof
              </button>
              <button
                onClick={() => setViewMode('whiteboard')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'whiteboard' ? 'bg-[#18bfd6] text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layout size={13} /> Tableau Blanc
              </button>
            </div>

            <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
              ID Réunion : <span className="text-white font-bold">{meeting.meetingId}</span>
            </div>
          </div>

          {/* MAIN CANVAS / STAGE */}
          <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
            {viewMode === 'video' ? (
              !iframeError ? (
                <div className="w-full h-full relative">
                  <iframe
                    src={zoomWebUrl}
                    title="Zoom Live Meeting"
                    className="w-full h-full border-0"
                    allow="microphone; camera; fullscreen; display-capture"
                    onError={() => setIframeError(true)}
                  />
                  {/* Overlay fallback panel if embedded client needs explicit launch */}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Direct diffusé en haute définition</span>
                  </div>
                </div>
              ) : (
                /* INTERACTIVE HIGH-TECH VIRTUAL CLASSROOM CANVAS FALLBACK */
                <div className="w-full h-full relative flex flex-col justify-between p-6 bg-gradient-to-b from-slate-900 via-[#163B45]/40 to-slate-950">
                  {/* Simulated Teacher Screen / Presentation */}
                  <div className="relative z-10 max-w-3xl mx-auto w-full text-center space-y-4 my-auto">
                    <div className="w-20 h-20 rounded-3xl bg-[#163B45] border-2 border-[#18bfd6]/50 mx-auto flex items-center justify-center shadow-2xl text-[#FAB304]">
                      <Video size={36} />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Session en cours avec {meeting.teacherName}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">{meeting.title}</h3>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                      {meeting.description}
                    </p>
                  </div>

                  {/* Teacher Camera Overlay PiP */}
                  <div className="absolute bottom-6 right-6 w-48 h-32 rounded-2xl bg-slate-900 border-2 border-[#18bfd6] shadow-2xl overflow-hidden flex flex-col justify-end p-2 text-xs">
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-full bg-[#163B45] text-white font-black flex items-center justify-center mx-auto text-sm border border-white/20">
                          {meeting.teacherName.charAt(0)}
                        </div>
                        <p className="text-[10px] text-slate-300 mt-1 font-bold">{meeting.teacherName}</p>
                      </div>
                    </div>
                    <div className="relative z-10 bg-slate-950/80 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Prof
                    </div>
                  </div>
                </div>
              )
            ) : (
              /* WHITEBOARD STAGE MODE */
              <div className="w-full h-full p-6 bg-slate-900 flex flex-col">
                <div className="flex-1 bg-[#163B45]/30 border border-white/10 rounded-2xl p-6 relative overflow-hidden font-mono text-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-bold text-[#FAB304] text-xs flex items-center gap-2">
                      <Layout size={16} /> Tableau Blanc Interactif du Professeur
                    </span>
                    <span className="text-[11px] text-slate-400">Mis à jour en temps réel</span>
                  </div>
                  <div className="space-y-3 text-slate-200">
                    <p className="text-emerald-400 font-bold"># RAPPEL DU COURS & FORMULES CLÉS</p>
                    <p className="bg-black/40 p-3 rounded-xl border border-white/5 font-mono text-xs">
                      f(x) = ln(x)  ⇒  f'(x) = 1/x  (pour x &gt; 0)<br />
                      g(x) = e^x    ⇒  g'(x) = e^x
                    </p>
                    <p className="text-amber-300 text-xs">
                      💡 Remarque d'examen : Toujours préciser le domaine de définition Df avant de dériver !
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── BOTTOM CLASSROOM CONTROLS BAR ── */}
          <div className="h-16 bg-[#163B45] border-t border-white/10 px-4 sm:px-8 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMic}
                className={`p-3 rounded-2xl transition-all cursor-pointer ${
                  isMicOn ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title={isMicOn ? 'Couper le micro' : 'Activer le micro'}
              >
                {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>

              <button
                onClick={handleToggleCam}
                className={`p-3 rounded-2xl transition-all cursor-pointer ${
                  isCamOn ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title={isCamOn ? 'Couper la caméra' : 'Activer la caméra'}
              >
                {isCamOn ? <Video size={18} /> : <VideoOff size={18} />}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRaiseHand}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                  hasRaisedHand 
                    ? 'bg-[#FAB304] text-slate-950 shadow-lg scale-105' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                <Hand size={16} />
                <span>{hasRaisedHand ? 'Main Levée !' : 'Lever la main'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={`p-3 rounded-2xl transition-all cursor-pointer md:hidden ${
                  activeTab === 'chat' ? 'bg-[#18bfd6] text-slate-950' : 'bg-white/10 text-white'
                }`}
              >
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: CHAT, NOTES, & Q&A */}
        <div className="w-full md:w-80 lg:w-96 bg-[#163B45] border-l border-white/10 flex flex-col h-64 md:h-auto shrink-0">
          {/* TAB HEADERS */}
          <div className="flex items-center border-b border-white/10 p-2 gap-1 bg-black/20 shrink-0">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'chat' ? 'bg-[#18bfd6] text-slate-950 font-black' : 'text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare size={14} /> Tchat ({chatMessages.length})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'notes' ? 'bg-[#18bfd6] text-slate-950 font-black' : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText size={14} /> Notes & Fichiers
            </button>
          </div>

          {/* CHAT PANEL */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                {chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-2xl text-xs space-y-1 ${
                      msg.role === 'system'
                        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200 text-center'
                        : msg.role === 'teacher'
                        ? 'bg-[#18bfd6]/15 border border-[#18bfd6]/30 text-white ml-2'
                        : msg.sender === (userProfile?.name || 'Moi')
                        ? 'bg-white/15 text-white ml-4 border border-white/10'
                        : 'bg-black/30 text-slate-200 mr-4'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-75">
                      <span className="font-extrabold flex items-center gap-1">
                        {msg.role === 'teacher' && <span className="bg-[#FAB304] text-slate-950 px-1 rounded text-[9px] font-black">PROF</span>}
                        {msg.sender}
                      </span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>

              {/* CHAT INPUT FORM */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/20 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  placeholder="Posez une question en direct..."
                  className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#18bfd6]"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-[#18bfd6] text-slate-950 hover:bg-[#18bfd6]/90 disabled:opacity-40 rounded-xl transition-all cursor-pointer font-bold"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}

          {/* NOTES & DOCUMENTS PANEL */}
          {activeTab === 'notes' && (
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-black text-[#FAB304] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen size={14} /> Fiche de Synthèse du Cours
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Document officiel distribué par {meeting.teacherName} pour accompagner cette classe virtuelle.
                </p>
                <button
                  onClick={() => toast.success('Téléchargement du support de cours démarré !')}
                  className="mt-2 w-full py-2 bg-[#18bfd6] hover:bg-[#18bfd6]/90 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download size={14} /> Télécharger le PDF de la Leçon
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Programme de la Séance
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                  <li>Rappels théoriques et définitions indispensables</li>
                  <li>Méthode d'analyse des sujets type BAC/BEPC</li>
                  <li>Résolution d'un exercice complet d'annale</li>
                  <li>Questions / Réponses individuelles</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
