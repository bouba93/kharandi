import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sparkles, 
  Zap, 
  BookOpen, 
  Video, 
  UserCheck, 
  Trophy, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Printer,
  Eye,
  X,
  AlertCircle,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getUserInvoices, 
  getSubscriptionUsage, 
  printInvoiceDocument, 
  Invoice, 
  SubscriptionUsage,
  recordNewInvoice
} from '../../services/billing';
import { toast } from 'sonner';

interface Props {
  initialTab?: 'usage' | 'invoices';
  onNavigateToPlans?: () => void;
}

export const SubscriptionUsageAndBilling: React.FC<Props> = ({ 
  initialTab = 'usage',
  onNavigateToPlans 
}) => {
  const { userProfile } = useAuth();
  const [tab, setTab] = useState<'usage' | 'invoices'>(initialTab);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [usage, setUsage] = useState<SubscriptionUsage | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (userProfile) {
      const invs = getUserInvoices(userProfile);
      setInvoices(invs);
      const usg = getSubscriptionUsage(userProfile);
      setUsage(usg);
    }
  }, [userProfile]);

  const handleDownloadInvoice = (inv: Invoice) => {
    setDownloadingId(inv.id);
    try {
      printInvoiceDocument(inv);
      toast.success(`Facture ${inv.id} prête pour le téléchargement PDF !`);
    } catch (e) {
      toast.error("Impossible d'ouvrir le document de facturation.");
    } finally {
      setTimeout(() => setDownloadingId(null), 800);
    }
  };

  const handleGenerateDemoInvoice = (planType: 'annuel' | 'palmares' | 'repetiteur') => {
    const targetUser = userProfile || {
      name: 'Élève Démo Kharandi',
      phone: '+224 620 12 34 56',
      email: 'demo@kharandi.gn',
      city: 'Conakry, Guinée',
      role: 'STUDENT'
    };
    
    let details: {
      planId: string;
      planName: string;
      amount: number;
      period: string;
      paymentMethod: 'Orange Money Guinée' | 'MTN Mobile Money' | 'Carte Bancaire' | 'Wallet Kharandi';
    } = {
      planId: 'annuel',
      planName: 'Offre Élève Premium Annuel (Kharandi 365)',
      amount: 45000,
      period: 'Annuel (365 jours)',
      paymentMethod: 'Orange Money Guinée',
    };
    if (planType === 'palmares') {
      details = {
        planId: 'palmares',
        planName: 'Pass Palmarès National des Écoles & Fiches d\'Évaluation',
        amount: 250000,
        period: 'Annuel (365 jours)',
        paymentMethod: 'MTN Mobile Money',
      };
    } else if (planType === 'repetiteur') {
      details = {
        planId: 'repetiteur',
        planName: 'Abonnement Répétiteur Certifié & Mise en relation',
        amount: 50000,
        period: 'Mensuel (30 jours)',
        paymentMethod: 'Orange Money Guinée',
      };
    }

    const newInv = recordNewInvoice(targetUser, details);
    setInvoices(getUserInvoices(targetUser));
    setUsage(getSubscriptionUsage(targetUser));
    toast.success(`Facture démo ${newInv.id} générée !`);
    setTab('invoices');
    setSelectedInvoice(newInv);
  };

  const formatGNF = (n: number) => new Intl.NumberFormat('fr-GN').format(n) + ' GNF';
  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return d;
    }
  };

  if (!usage) {
    return (
      <div className="p-8 text-center text-slate-400">
        Chargement des données d'abonnement et de facturation...
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {/* TABS SELECTOR */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setTab('usage')}
            className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              tab === 'usage'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap size={16} className={tab === 'usage' ? 'text-[#18bfd6]' : 'text-slate-400'} />
            <span>Consommation de l'Abonnement</span>
          </button>

          <button
            onClick={() => setTab('invoices')}
            className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              tab === 'invoices'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText size={16} className={tab === 'invoices' ? 'text-emerald-600' : 'text-slate-400'} />
            <span>Facturation & Reçus ({invoices.length})</span>
          </button>
        </div>

        {usage.status !== 'free' && (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200/70">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Abonnement Actif & En Règle</span>
          </div>
        )}
      </div>

      {/* TAB 1: CONSOMMATION DE L'ABONNEMENT */}
      {tab === 'usage' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* CARTE PRINCIPALE DE VALIDITÉ & COMPTE À REBOURS */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-8 shadow-xl border border-slate-700/50">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#18bfd6]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#fcb303]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#18bfd6] to-teal-600 flex items-center justify-center text-white font-black shadow-lg shadow-[#18bfd6]/30 shrink-0">
                  <CreditCard size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-full text-[#18bfd6] border border-white/10">
                      Formule Actuelle
                    </span>
                    {usage.status === 'expiring_soon' && (
                      <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        Expire Bientôt
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mt-1 text-white tracking-tight">
                    {usage.planName}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-0.5">
                    Période du <strong>{formatDate(usage.startDate)}</strong> au <strong>{formatDate(usage.endDate)}</strong>
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 block">
                    Temps Restant
                  </span>
                  <span className="text-2xl md:text-3xl font-black text-[#fcb303] leading-none">
                    {usage.status === 'free' ? 'Illimité' : `${usage.daysRemaining} j`}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#fcb303] flex items-center justify-center font-black">
                  <Clock size={20} />
                </div>
              </div>
            </div>

            {/* BARRE DE PROGRESSION DE LA CONSOMMATION TEMPORELLE */}
            <div className="relative z-10 pt-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>Consommation de la période ({usage.daysUsed} jours écoulés sur {usage.daysTotal} jours)</span>
                <span className="text-[#18bfd6] font-black">{usage.percentTimeUsed}% consommé</span>
              </div>

              <div className="w-full h-3.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#18bfd6] via-teal-400 to-[#fcb303] transition-all duration-700 shadow-sm"
                  style={{ width: `${Math.max(5, usage.percentTimeUsed)}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                <span>Début : {formatDate(usage.startDate)}</span>
                <span>Échéance : {formatDate(usage.endDate)}</span>
              </div>
            </div>
          </div>

          {/* DÉTAIL DES SERVICES & QUOTAS CONSOMMÉS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-black text-slate-900 text-lg">Services & Quotas Débloqués</h4>
                <p className="text-xs text-slate-500">Suivi en temps réel de votre consommation pédagogique</p>
              </div>
              <span className="text-xs font-extrabold text-[#18bfd6] bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
                Mise à jour en direct
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* IA Karamo */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-[#18bfd6]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h5 className="font-black text-sm text-slate-900">{usage.quotas.aiKaramo.label}</h5>
                      <span className="text-[11px] text-slate-500 font-medium">Explications instantanées des cours</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                    {usage.quotas.aiKaramo.limit === -1 ? 'Illimité' : `${usage.quotas.aiKaramo.limit} max`}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Questions posées ce mois</span>
                    <span className="text-purple-700 font-black">{usage.quotas.aiKaramo.used} questions</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-600 rounded-full" 
                      style={{ width: `${Math.min(100, (usage.quotas.aiKaramo.used / (usage.quotas.aiKaramo.limit === -1 ? 100 : usage.quotas.aiKaramo.limit)) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Sujets d'Examens CEE, BEPC, BAC */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-[#18bfd6]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h5 className="font-black text-sm text-slate-900">{usage.quotas.examSubjects.label}</h5>
                      <span className="text-[11px] text-slate-500 font-medium">Annales officielles avec corrigés types</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {usage.quotas.examSubjects.limit === -1 ? 'Accès Total' : `${usage.quotas.examSubjects.limit} max`}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Sujets consultés & travaillés</span>
                    <span className="text-emerald-700 font-black">{usage.quotas.examSubjects.used} annales</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full" 
                      style={{ width: `${Math.min(100, (usage.quotas.examSubjects.used / 50) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Classes Virtuelles Zoom */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-[#18bfd6]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Video size={20} />
                    </div>
                    <div>
                      <h5 className="font-black text-sm text-slate-900">{usage.quotas.zoomClasses.label}</h5>
                      <span className="text-[11px] text-slate-500 font-medium">Séances en visioconférence directe</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    {usage.quotas.zoomClasses.used} / {usage.quotas.zoomClasses.limit}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Séances consommées ce trimestre</span>
                    <span className="text-blue-700 font-black">
                      {usage.quotas.zoomClasses.limit - usage.quotas.zoomClasses.used} séances restantes
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${(usage.quotas.zoomClasses.used / usage.quotas.zoomClasses.limit) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Répétiteurs Débloqués */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:border-[#18bfd6]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <UserCheck size={20} />
                    </div>
                    <div>
                      <h5 className="font-black text-sm text-slate-900">{usage.quotas.tutorContacts.label}</h5>
                      <span className="text-[11px] text-slate-500 font-medium">Professeurs vérifiés & certifiés</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    {usage.quotas.tutorContacts.used} débloqués
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Mises en relation actives</span>
                    <span className="text-amber-700 font-black">Accès direct</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PALMARÈS DES ÉCOLES STATUT */}
          <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-600/10 border-2 border-amber-400/40 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fcb303] to-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Trophy size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-base">Palmarès National & Fiches d'Évaluation</h4>
                <p className="text-xs text-slate-600 font-medium">
                  {usage.quotas.schoolRankings.unlocked 
                    ? "Votre accès complet 365 jours est actif pour consulter tous les classements officiels."
                    : "Accédez au classement d'excellence et téléchargez les fiches d'évaluation (Pass annuel 250 000 GNF)."}
                </p>
              </div>
            </div>

            <button
              onClick={() => setTab('invoices')}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl font-black text-xs uppercase tracking-wider border border-slate-200 shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <FileText size={14} className="text-slate-600" />
              <span>Voir mes factures</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      )}

      {/* TAB 2: SYSTÈME DE FACTURATION & TÉLÉCHARGEMENT */}
      {tab === 'invoices' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                Historique de Facturation
              </h3>
              <p className="text-xs md:text-sm text-slate-500 font-medium">
                Consultez et téléchargez les factures et reçus officiels de vos abonnements Kharandi.
              </p>
            </div>
          </div>

          {invoices.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center space-y-3">
              <FileText size={48} className="text-slate-300 mx-auto" />
              <h4 className="font-black text-slate-800 text-lg">Aucune facture enregistrée</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Vos factures de souscription et reçus de paiement s'afficheront ici automatiquement dès votre premier abonnement.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs hover:border-[#18bfd6]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <FileText size={24} className="text-[#18bfd6]" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-black text-slate-900">{inv.id}</span>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 size={11} /> Payé & Validé
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          Réf : {inv.paymentReference}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base">{inv.planName}</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Émise le <strong>{formatDate(inv.date)}</strong> · Règlement : <strong>{inv.paymentMethod}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Montant TTC Réglé
                      </span>
                      <span className="text-lg font-black text-slate-900">
                        {inv.amount === 0 ? 'Gratuit (0 GNF)' : formatGNF(inv.amount)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        title="Aperçu de la facture"
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleDownloadInvoice(inv)}
                        disabled={downloadingId === inv.id}
                        className="px-4 py-2.5 bg-[#18bfd6] hover:bg-[#15adc1] text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-sm shadow-[#18bfd6]/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                      >
                        <Download size={15} />
                        <span>Télécharger la Facture</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NOTE DE SÉCURITÉ FISCALE ET CONFORMITÉ */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <ShieldCheck size={20} className="text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 font-medium leading-relaxed">
              <strong>Conformité fiscale & Garantie :</strong> Toutes les factures émises sur la plateforme Kharandi comportent les mentions légales réglementaires en République de Guinée (NIF, RCCM, référence unique de paiement Mobile Money) et font foi de reçu officiel d'inscription ou d'abonnement scolaire.
            </div>
          </div>
        </motion.div>
      )}

      {/* MODAL APERÇU DE FACTURE OFFICIELLE */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-slate-100 text-left relative"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>

              {/* INVOICE PREVIEW HEADER */}
              <div className="border-b border-slate-100 pb-6 mb-6 flex items-start justify-between gap-4 pr-12">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#18bfd6] to-teal-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                    K
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-900">KHARANDI ÉDUCATION GUINÉE</h3>
                    <p className="text-xs text-slate-500 font-bold">Plateforme Éducative Nationale · Rép. de Guinée</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
                    Facture Officielle
                  </span>
                  <div className="font-mono text-base font-black text-slate-900 mt-1">{selectedInvoice.id}</div>
                  <div className="text-xs text-slate-400 font-medium">{formatDate(selectedInvoice.date)}</div>
                </div>
              </div>

              {/* CLIENT & COMPANY INFOS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6 text-xs">
                <div>
                  <span className="font-black uppercase tracking-wider text-slate-400 block mb-1">Prestataire</span>
                  <div className="font-black text-slate-900">{selectedInvoice.company.name}</div>
                  <div className="text-slate-600">{selectedInvoice.company.address}</div>
                  <div className="text-slate-600">RCCM : {selectedInvoice.company.rccm} · NIF : {selectedInvoice.company.nif}</div>
                  <div className="text-slate-600">Tél : {selectedInvoice.company.phone}</div>
                </div>

                <div>
                  <span className="font-black uppercase tracking-wider text-slate-400 block mb-1">Client Bénéficiaire</span>
                  <div className="font-black text-slate-900">{selectedInvoice.client.name}</div>
                  <div className="text-slate-600">Profil : <strong>{selectedInvoice.client.role}</strong></div>
                  <div className="text-slate-600">Téléphone : {selectedInvoice.client.phone}</div>
                  <div className="text-slate-600">Email : {selectedInvoice.client.email}</div>
                </div>
              </div>

              {/* ITEMS TABLE */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-black uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Désignation</th>
                      <th className="p-3">Période</th>
                      <th className="p-3 text-center">Qté</th>
                      <th className="p-3 text-right">Total Net</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">
                        {selectedInvoice.planName}
                        <span className="block font-normal text-slate-500 text-[11px]">
                          Accès annuel illimité, IA Karamo, sujets officiels & bibliothèque.
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{selectedInvoice.period}</td>
                      <td className="p-3 text-center font-bold">1</td>
                      <td className="p-3 text-right font-black text-slate-900">
                        {formatGNF(selectedInvoice.amount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* TOTALS & PAYMENT INFO */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 mb-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-800 block">Règlement Effectué</span>
                  <div className="font-black text-sm text-cyan-950">✓ {selectedInvoice.paymentMethod}</div>
                  <div className="text-xs text-cyan-800 font-mono">Réf : {selectedInvoice.paymentReference}</div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-800 block">Montant Total Réglé</span>
                  <div className="text-2xl font-black text-cyan-950">{formatGNF(selectedInvoice.totalTTC)}</div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    Acquittée en totalité
                  </span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider hover:bg-slate-50 cursor-pointer"
                >
                  Fermer
                </button>
                <button
                  onClick={() => handleDownloadInvoice(selectedInvoice)}
                  className="px-6 py-2.5 bg-[#18bfd6] hover:bg-[#15adc1] text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#18bfd6]/20 cursor-pointer"
                >
                  <Download size={16} />
                  <span>Télécharger en PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
