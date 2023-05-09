import { openDB, DBSchema, IDBPDatabase } from "idb";
import { INote } from "../Note/types";
import { IStorageMethods } from "./interface";

interface INotesDatabase extends DBSchema {
  notes: {
    key: number;
    value: INote;
  };
}

const DB_NAME = "notes-db" as const;
const DB_VERSION = 1 as const;
const DB_TABLE_NAME = "notes" as const;
const DB_UNIQUE_KEY = "id" as const;

let databasePromise: Promise<IDBPDatabase<INotesDatabase>>;

async function initializeDB(dbName = DB_NAME, storeName = DB_TABLE_NAME) {
  if (!databasePromise) {
    databasePromise = openDB<INotesDatabase>(dbName, DB_VERSION, {
      upgrade(database) {
        database.createObjectStore(storeName, {
          keyPath: DB_UNIQUE_KEY,
        });
      },
    });
  }
}

async function putNoteToDB(note: INote) {
  const database = await databasePromise;
  if (database) {
    const transaction = database.transaction(DB_TABLE_NAME, "readwrite");
    const table = transaction.objectStore(DB_TABLE_NAME);
    await table.put(note);
    await transaction.done;
  }
}

async function getNote(id: number): Promise<INote | null> {
  const database = await databasePromise;
  if (database) {
    const transaction = database.transaction(DB_TABLE_NAME, "readonly");
    const table = transaction.objectStore(DB_TABLE_NAME);
    const note = await table.get(id);
    await transaction.done;
    return note ?? null;
  } else {
    return null;
  }
}

async function deleteNoteFromDB(noteId: number) {
  const database = await databasePromise;
  if (database) {
    const transaction = database.transaction(DB_TABLE_NAME, "readwrite");
    const table = transaction.objectStore(DB_TABLE_NAME);
    await table.delete(noteId);
    await transaction.done;
  }
}

async function getNotesFromDB(): Promise<INote[]> {
  await initializeDB();
  const database = await databasePromise;
  if (database) {
    const transaction = database.transaction(DB_TABLE_NAME, "readonly");
    const table = transaction.objectStore(DB_TABLE_NAME);
    const notes = await table.getAll();
    await transaction.done;
    return notes;
  } else {
    console.log("no database");
    return [];
  }
}

export const indexedDBStorage: IStorageMethods = {
  initialize: initializeDB,
  getOne: getNote,
  getAll: getNotesFromDB,
  put: putNoteToDB,
  update: putNoteToDB,
  remove: deleteNoteFromDB,
};