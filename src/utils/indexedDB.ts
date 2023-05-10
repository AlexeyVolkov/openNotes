import { openDB, IDBPDatabase } from "idb";
import { INote, INoteDatabase } from "./interface";
import { DB_NAME, DB_TABLE_NAME, DB_UNIQUE_KEY, DB_VERSION } from "./constants";

let databasePromise: Promise<IDBPDatabase<INoteDatabase>>;

async function initialize(dbName = DB_NAME) {
  if (!databasePromise) {
    databasePromise = openDB<INoteDatabase>(dbName, DB_VERSION, {
      upgrade(database) {
        database.createObjectStore(DB_TABLE_NAME, {
          keyPath: DB_UNIQUE_KEY,
        });
      },
    });
  }
}

async function putNote(note: INote) {
  const database = await databasePromise;
  if (database) {
    const transaction = database.transaction(DB_TABLE_NAME, "readwrite");
    const table = transaction.objectStore(DB_TABLE_NAME);
    await table.put(note);
    await transaction.done;
  }
}

async function getNote(): Promise<INote> {
  const database = await databasePromise;
  if (database) {
    const transaction = database.transaction(DB_TABLE_NAME, "readonly");
    const table = transaction.objectStore(DB_TABLE_NAME);
    const note = await table.get(1);
    await transaction.done;

    if (typeof note === "undefined") {
      console.error("note is undefined");
      throw new Error("note is undefined");
    }

    return note;
  } else {
    console.error("database is null");
    throw new Error("database is null");
  }
}

export const indexedDBStorage = {
  initialize,
  getNote,
  putNote,
};
