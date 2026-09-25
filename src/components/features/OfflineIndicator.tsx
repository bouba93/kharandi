/**
 * OfflineIndicator.tsx — Composant d'alerte et de synchronisation hors-ligne pour Kharandi
 * Indique l'état de la connexion internet et donne un accès direct aux cours enregistrés dans IndexedDB.
 */

import React, { useState } from 'react';
import { WifiOff, RefreshCw, HardDriveDownload, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { useOffline } from '../../contexts/OfflineContext';

export const OfflineIndicator: React.FC<{ onOpenOfflineCourses?: () => void }> = ({ onOpenOfflineCourses }) => {
  const { isOnline, offlineCourses, manualSync } = useOffline();
  const [isSyncing, setIsSyncing] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await manualSync();
    setIsSyncing(false);
  };

  if (isOnline && dismissed) return null;

  if (!isOnline) {
    return (
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 max-w-md bg-amber-900/95 text-amber-100 border border-amber-700/60 backdrop-blur-md rounded-2xl shadow-2xl p-4 transition-all animate-in slide-in-from-bottom-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-800/80 rounded-xl text-amber-300 shrink-0">
            <WifiOff className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Mode Hors-Ligne
                <span className="px-2 py-0.5 text-[10px] bg-amber-700/80 text-amber-200 rounded-full font-semibold">
                  IndexedDB
                </span>
              </h4>
            </div>
            <p className="text-xs text-amber-200/90 mt-0.5 leading-relaxed">
              Vous n'avez pas de connexion internet. Vous pouvez réviser vos{' '}
              <strong className="text-white">{offlineCourses.length} cours enregistrés</strong> en toute autonomie.
            </p>

            {offlineCourses.length > 0 && onOpenOfflineCourses && (
              <button
                onClick={onOpenOfflineCourses}
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs rounded-xl transition shadow-sm"
              >
                <HardDriveDownload className="w-3.5 h-3.5" />
                Ouvrir mes cours hors-ligne ({offlineCourses.length})
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Si l'utilisateur a des cours enregistrés ou veut forcer une synchro en ligne
  return (
    <div className="hidden md:flex fixed bottom-4 right-4 z-40 items-center gap-2 bg-slate-900/90 border border-slate-800 backdrop-blur-md text-slate-300 text-xs px-3.5 py-2 rounded-2xl shadow-lg">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      <span>Accès hors-ligne actif ({offlineCourses.length} cours)</span>
      
      <button
        onClick={handleManualSync}
        disabled={isSyncing}
        title="Synchroniser la file d'attente hors-ligne"
        className="ml-1 p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-400' : ''}`} />
      </button>

      <button
        onClick={() => setDismissed(true)}
        className="p-1 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-300"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};
