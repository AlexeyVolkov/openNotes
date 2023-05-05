import { openDB, DBSchema, IDBPDatabase } from "idb";
import { Note } from "../Note/types";
import { IStorageMethods } from "./interface";

interface INotesDatabase extends DBSchema {
  notes: {
    key: number;
    value: Note;
    indexes: { [DB_INDEX_NAME]: string };
  };
}

const DB_NAME = "notes-db" as const;
const DB_VERSION = 1 as const;
const DB_TABLE_NAME = "notes" as const;
const DB_UNIQUE_KEY = "id" as const;
const DB_INDEX_NAME = "by-title" as const;
const DB_INDEX_KEY_PATH = "title" as const;

let database: IDBPDatabase<INotesDatabase>;

async function initializeDB(dbName = DB_NAME, storeName = DB_TABLE_NAME) {
  if (!database) {
    database = await openDB<INotesDatabase>(dbName, DB_VERSION, {
      upgrade(database) {
        database
          .createObjectStore(storeName, {
            keyPath: DB_UNIQUE_KEY,
          })
          .createIndex(DB_INDEX_NAME, DB_INDEX_KEY_PATH);
      },
    });
  }
}

async function putNoteToDB(note: Note) {
  if (database) {
    const transaction = database.transaction(DB_TABLE_NAME, "readwrite");
    const table = transaction.objectStore(DB_TABLE_NAME);
    await table.put(note);
    await transaction.done;
  }
}

async function getNote(id: number): Promise<Note | null> {
  const transaction = database.transaction(DB_TABLE_NAME, "readonly");
  const table = transaction.objectStore(DB_TABLE_NAME);
  const note = await table.get(id);
  await transaction.done;
  return note ?? null;
}

async function deleteNoteFromDB(noteId: number) {
  if (database) {
    const transaction = database.transaction(DB_TABLE_NAME, "readwrite");
    const table = transaction.objectStore(DB_TABLE_NAME);
    await table.delete(noteId);
    await transaction.done;
  }
}

async function getNotesFromDB(): Promise<Note[]> {
  if (database) {
    const transaction = database.transaction(DB_TABLE_NAME, "readonly");
    const table = transaction.objectStore(DB_TABLE_NAME);
    await transaction.done;
    return await table.getAll();
  } else {
    return [];
  }
}

async function searchNotesInDB(query: string): Promise<Note[]> {
  if (database) {
    const transaction = database.transaction(DB_TABLE_NAME, "readonly");
    const table = transaction.objectStore(DB_TABLE_NAME);
    const index = table.index(DB_INDEX_NAME);
    await transaction.done;
    return await index.getAll(query);
  } else {
    return [];
  }
}

export const indexedDBStorage: IStorageMethods = {
  initialize: initializeDB,
  getOne: getNote,
  getAll: getNotesFromDB,
  search: searchNotesInDB,
  put: putNoteToDB,
  update: putNoteToDB,
  delete: deleteNoteFromDB,
};
