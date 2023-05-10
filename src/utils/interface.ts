import { DBSchema } from "idb";
import { DB_TABLE_NAME } from "./constants";

export type IStorageMethods = {
  initialize: (dbName: string) => Promise<void>;
  getNote: () => Promise<INote | null>;
  putNote: (note: INote) => Promise<void>;
};

export type TIndexedDBContext = [
  notes: INote | null,
  setNotes: (note: INote) => Promise<void>
];

export interface INote {
  id: number;
  text: string;
  updatedAt: Date;
}

export interface INoteDatabase extends DBSchema {
  [DB_TABLE_NAME]: {
    key: INote["id"];
    value: INote;
  };
}
