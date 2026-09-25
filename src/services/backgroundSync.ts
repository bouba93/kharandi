/**
 * backgroundSync.ts — Service de synchronisation en arrière-plan pour Kharandi
 * Traite la file d'attente des actions effectuées hors-ligne dès que la connexion internet est rétablie.
 */

import { toast } from 'sonner';
import { getPendingSyncQueue, removePendingSyncItem } from './offlineStorage';
import { saveReadingProgress } from './content';
import { api } from '../config/api';

let isSyncing = false;

/**
 * Traite et envoie toutes les actions en attente accumulées hors-ligne
 */
export async function processPendingBackgroundSync(): Promise<{ syncedCount: number; errorsCount: number }> {
  if (isSyncing) return { syncedCount: 0, errorsCount: 0 };
  if (!navigator.onLine) return { syncedCount: 0, errorsCount: 0 };

  isSyncing = true;
  let syncedCount = 0;
  let errorsCount = 0;

  try {
    const queue = await getPendingSyncQueue();
    if (queue.length === 0) {
      isSyncing = false;
      return { syncedCount: 0, errorsCount: 0 };
    }

    console.log(`[BackgroundSync] Traitement de ${queue.length} action(s) en attente...`);

    for (const item of queue) {
      if (!item.id) continue;

      try {
        switch (item.actionType) {
          case 'SAVE_PROGRESS':
            if (item.payload?.docId) {
              await saveReadingProgress(
                item.payload.docId,
                item.payload.progress || 0,
                item.payload.isRead || false
              );
            }
            break;

          case 'MARK_READ':
            if (item.payload?.docId) {
              await saveReadingProgress(item.payload.docId, 100, true);
            }
            break;

          case 'BOOKMARK_COURSE':
            if (item.payload?.courseId) {
              await api.post(`/learning/documents/${item.payload.courseId}/bookmark/`, {});
            }
            break;

          case 'SUBMIT_QUIZ':
            if (item.payload?.quizId) {
              await api.post(`/learning/quizzes/${item.payload.quizId}/submit/`, item.payload.answers);
            }
            break;

          case 'SYNC_NOTES':
            if (item.payload?.courseId) {
              await api.post(`/learning/documents/${item.payload.courseId}/notes/`, { notes: item.payload.notes });
            }
            break;

          default:
            console.warn(`[BackgroundSync] Type d'action inconnu: ${item.actionType}`);
        }

        // Action synchronisée avec succès, la retirer de IndexedDB
        await removePendingSyncItem(item.id);
        syncedCount++;
      } catch (err) {
        console.error(`[BackgroundSync] Échec de synchronisation pour l'action ${item.id}:`, err);
        errorsCount++;
      }
    }

    if (syncedCount > 0) {
      toast.success(
        `Synchronisation réussie : ${syncedCount} action${syncedCount > 1 ? 's' : ''} enregistrée${syncedCount > 1 ? 's' : ''} hors-ligne à jour !`,
        { duration: 4000 }
      );
    }
  } catch (err) {
    console.error('[BackgroundSync] Erreur lors du traitement de la file d\'attente:', err);
  } finally {
    isSyncing = false;
  }

  return { syncedCount, errorsCount };
}

/**
 * Initialise les écouteurs d'événements pour déclencher la synchronisation en arrière-plan
 */
export function initBackgroundSyncService(): () => void {
  const handleOnline = () => {
    console.log('[BackgroundSync] Connexion rétablie. Lancement de la synchronisation...');
    processPendingBackgroundSync();
  };

  window.addEventListener('online', handleOnline);

  // Enregistrer le sync event dans le Service Worker si supporté et sécurisé
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready
      .then(async (registration: any) => {
        if (registration && registration.sync && typeof registration.sync.register === 'function') {
          try {
            await registration.sync.register('kharandi-sync-pending').catch((err: any) => {
              console.warn('[BackgroundSync] Enregistrement Sync SW ignoré (non supporté dans cette fenêtre/iframe):', err?.message || err);
            });
          } catch (e) {
            console.warn('[BackgroundSync] Exception lors de registration.sync:', e);
          }
        }
      })
      .catch(() => {});
  }

  // Tenter une synchronisation au démarrage si en ligne
  if (navigator.onLine) {
    setTimeout(() => {
      processPendingBackgroundSync();
    }, 2000);
  }

  return () => {
    window.removeEventListener('online', handleOnline);
  };
}
