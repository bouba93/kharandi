/**
 * OfflineContext.tsx — Context React pour la gestion du mode hors-ligne et IndexedDB
 * Permet l'accès aux cours enregistrés et aux données du tableau de bord même sans connexion internet.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
  OfflineCourse,
  saveOfflineCourse,
  getOfflineCourses,
  removeOfflineCourse,
  getOfflineCourse,
  setCacheData,
  getCacheData,
  queuePendingSync,
  PendingSyncAction
} from '../services/offlineStorage';
import { initBackgroundSyncService, processPendingBackgroundSync } from '../services/backgroundSync';

interface OfflineContextType {
  isOnline: boolean;
  offlineCourses: OfflineCourse[];
  isLoadingOfflineData: boolean;
  saveCourseForOffline: (course: any) => Promise<boolean>;
  removeCourseFromOffline: (courseId: string) => Promise<boolean>;
  isCourseSavedOffline: (courseId: string) => boolean;
  cacheDashboardData: (key: string, data: any) => Promise<void>;
  getCachedDashboardData: <T = any>(key: string) => Promise<T | null>;
  queueActionForSync: (actionType: PendingSyncAction['actionType'], payload: any) => Promise<void>;
  manualSync: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [offlineCourses, setOfflineCourses] = useState<OfflineCourse[]>([]);
  const [isLoadingOfflineData, setIsLoadingOfflineData] = useState<boolean>(true);

  // Charger la liste des cours sauvegardés dans IndexedDB au démarrage
  const loadSavedCourses = useCallback(async () => {
    try {
      const courses = await getOfflineCourses();
      setOfflineCourses(courses);
    } catch (err) {
      console.error('[OfflineContext] Erreur chargement cours hors-ligne:', err);
    } finally {
      setIsLoadingOfflineData(false);
    }
  }, []);

  useEffect(() => {
    loadSavedCourses();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initialiser le service de synchronisation en arrière-plan
    const cleanupSync = initBackgroundSyncService();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      cleanupSync();
    };
  }, [loadSavedCourses]);

  // Vérifier si un cours est enregistré hors-ligne
  const isCourseSavedOffline = useCallback(
    (courseId: string): boolean => {
      return offlineCourses.some((c) => String(c.id) === String(courseId));
    },
    [offlineCourses]
  );

  // Enregistrer un cours pour l'accès hors-ligne dans IndexedDB
  const saveCourseForOffline = async (course: any): Promise<boolean> => {
    try {
      const formattedCourse: OfflineCourse = {
        id: String(course.id),
        title: course.title || course.name || 'Cours sans titre',
        description: course.description || course.excerpt || '',
        subject: course.subject || { name: 'Général' },
        level: course.level || 'Tous niveaux',
        doc_type: course.doc_type || 'COURS',
        file_url: course.file_url || course.external_url || null,
        content: course.content || '',
        slides: course.slides || [],
        savedAt: Date.now(),
        progress: course.progress || 0,
      };

      await saveOfflineCourse(formattedCourse);
      await loadSavedCourses();
      toast.success(`" ${formattedCourse.title} " sauvegardé pour l'accès hors-ligne !`);
      return true;
    } catch (err) {
      console.error('[OfflineContext] Échec de la sauvegarde du cours:', err);
      toast.error("Impossible de sauvegarder le cours en local.");
      return false;
    }
  };

  // Retirer un cours sauvegardé hors-ligne
  const removeCourseFromOffline = async (courseId: string): Promise<boolean> => {
    try {
      await removeOfflineCourse(String(courseId));
      await loadSavedCourses();
      toast.info("Cours retiré du stockage hors-ligne.");
      return true;
    } catch (err) {
      console.error('[OfflineContext] Erreur suppression cours hors-ligne:', err);
      toast.error("Erreur lors de la suppression du stockage local.");
      return false;
    }
  };

  // Mettre en cache les données du tableau de bord (profil, bulletins, cours suivis)
  const cacheDashboardData = async (key: string, data: any): Promise<void> => {
    await setCacheData(key, data);
  };

  // Récupérer les données du tableau de bord depuis IndexedDB
  const getCachedDashboardData = async <T = any,>(key: string): Promise<T | null> => {
    return await getCacheData<T>(key);
  };

  // Ajouter une action à la file d'attente pour synchronisation ultérieure quand la connexion revient
  const queueActionForSync = async (
    actionType: PendingSyncAction['actionType'],
    payload: any
  ): Promise<void> => {
    await queuePendingSync(actionType, payload);
    if (!isOnline) {
      toast.info("Action enregistrée hors-ligne. Elle sera synchronisée automatiquement à la reconnexion.");
    } else {
      processPendingBackgroundSync();
    }
  };

  // Déclencher manuellement la synchronisation
  const manualSync = async (): Promise<void> => {
    if (!isOnline) {
      toast.warning("Vous êtes actuellement hors-ligne. Connectez-vous à Internet pour synchroniser.");
      return;
    }
    const { syncedCount } = await processPendingBackgroundSync();
    if (syncedCount === 0) {
      toast.info("Toutes vos données sont déjà à jour !");
    }
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        offlineCourses,
        isLoadingOfflineData,
        saveCourseForOffline,
        removeCourseFromOffline,
        isCourseSavedOffline,
        cacheDashboardData,
        getCachedDashboardData,
        queueActionForSync,
        manualSync,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline doit être utilisé au sein d\'un OfflineProvider');
  }
  return context;
};
