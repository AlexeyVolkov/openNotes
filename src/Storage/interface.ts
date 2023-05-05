import { Note } from "../Note/types";

export interface IStorageMethods {
  initialize(databaseName?: string): Promise<void>;
  getOne(id: number): Promise<Note | null>;
  getAll(): Promise<Note[]>;
  search(query: string): Promise<Note[]>;
  put(note: Note): Promise<void>;
  update(note: Note): Promise<void>;
  delete(id: number): Promise<void>;
}

export type TStorage = "indexedDB";
