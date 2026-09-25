/**
 * offlineStorage.ts — Kharandi IndexedDB Offline Storage Manager
 * Permet le stockage persistant et la synchronisation en arrière-plan des cours et données du tableau de bord.
 */

const DB_NAME = 'kharandi_offline_db';
const DB_VERSION = 1;

export interface OfflineCourse {
  id: string;
  title: string;
  description?: string;
  subject?: { id?: number | string; name: string; icon?: string };
  level?: string;
  doc_type?: string;
  file_url?: string | null;
  content?: string;
  slides?: any[];
  savedAt: number;
  progress?: number;
}

export interface PendingSyncAction {
  id?: number;
  actionType: 'SAVE_PROGRESS' | 'BOOKMARK_COURSE' | 'SUBMIT_QUIZ' | 'MARK_READ' | 'SYNC_NOTES';
  payload: any;
  createdAt: number;
}

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB non supporté sur ce navigateur.'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Store pour les données du dashboard (profil, stats, bulletins)
      if (!db.objectStoreNames.contains('dashboard_cache')) {
        db.createObjectStore('dashboard_cache', { keyPath: 'key' });
      }

      // Store pour les cours sauvegardés hors-ligne
      if (!db.objectStoreNames.contains('saved_courses')) {
        db.createObjectStore('saved_courses', { keyPath: 'id' });
      }

      // Store pour la file d'attente des actions à synchroniser en arrière-plan
      if (!db.objectStoreNames.contains('pending_sync_queue')) {
        db.createObjectStore('pending_sync_queue', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });

  return dbPromise;
}

// ─── Dashboard Cache Methods ──────────────────────────────────────────────────

export async function setCacheData<T = any>(key: string, value: T): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('dashboard_cache', 'readwrite');
      const store = tx.objectStore('dashboard_cache');
      store.put({ key, value, updatedAt: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn(`[IndexedDB] Impossible de sauvegarder en cache (${key}):`, err);
  }
}

export async function getCacheData<T = any>(key: string): Promise<T | null> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('dashboard_cache', 'readonly');
      const store = tx.objectStore('dashboard_cache');
      const request = store.get(key);
      request.onsuccess = () => {
        resolve(request.result ? request.result.value : null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn(`[IndexedDB] Impossible de lire le cache (${key}):`, err);
    return null;
  }
}

// ─── Offline Courses Methods ─────────────────────────────────────────────────

export async function saveOfflineCourse(course: OfflineCourse): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('saved_courses', 'readwrite');
      const store = tx.objectStore('saved_courses');
      store.put({ ...course, savedAt: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('[IndexedDB] Erreur lors de la sauvegarde du cours hors-ligne:', err);
    throw err;
  }
}

export async function getOfflineCourses(): Promise<OfflineCourse[]> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('saved_courses', 'readonly');
      const store = tx.objectStore('saved_courses');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Erreur lors de la récupération des cours hors-ligne:', err);
    return [];
  }
}

export async function getOfflineCourse(id: string): Promise<OfflineCourse | null> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('saved_courses', 'readonly');
      const store = tx.objectStore('saved_courses');
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn(`[IndexedDB] Erreur récupération cours (${id}):`, err);
    return null;
  }
}

export async function removeOfflineCourse(id: string): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('saved_courses', 'readwrite');
      const store = tx.objectStore('saved_courses');
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error(`[IndexedDB] Erreur suppression cours (${id}):`, err);
    throw err;
  }
}

// ─── Background Sync Queue Methods ───────────────────────────────────────────

export async function queuePendingSync(actionType: PendingSyncAction['actionType'], payload: any): Promise<number> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('pending_sync_queue', 'readwrite');
      const store = tx.objectStore('pending_sync_queue');
      const request = store.add({
        actionType,
        payload,
        createdAt: Date.now()
      });
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('[IndexedDB] Erreur ajout file de synchronisation:', err);
    throw err;
  }
}

export async function getPendingSyncQueue(): Promise<PendingSyncAction[]> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('pending_sync_queue', 'readonly');
      const store = tx.objectStore('pending_sync_queue');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Erreur lecture file de synchronisation:', err);
    return [];
  }
}

export async function removePendingSyncItem(id: number): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('pending_sync_queue', 'readwrite');
      const store = tx.objectStore('pending_sync_queue');
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error(`[IndexedDB] Erreur suppression item sync (${id}):`, err);
  }
}

export async function clearAllSyncQueue(): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('pending_sync_queue', 'readwrite');
      const store = tx.objectStore('pending_sync_queue');
      store.clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('[IndexedDB] Erreur vidage file de synchronisation:', err);
  }
}
