import { openDB } from 'idb';

const dbName = 'ComplaintsDB';
const storeName = 'complaints';

export async function initDB() {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
}

export async function addComplaints(complaints) {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  
  for (const complaint of complaints) {
    await store.add(complaint);
  }
  
  await tx.done;
}

export async function getAllComplaints() {
  const db = await initDB();
  return db.getAll(storeName);
}

export async function deleteComplaint(id) {
  const db = await initDB();
  await db.delete(storeName, id);
} 

export const deleteAllDatabases = async () => {
  const databases = await indexedDB.databases();
  databases.forEach(db => {
    indexedDB.deleteDatabase(db.name);
  });
  console.log('All databases deleted');
};

export async function deleteAllComplaints() {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  await store.clear();
  await tx.done;
}