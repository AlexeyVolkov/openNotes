import { INote } from "../Note/types";

export interface IStorageMethods {
  initialize(databaseName?: string): Promise<void>;
  getOne(id: number): Promise<INote | null>;
  getAll(): Promise<INote[]>;
  put(note: INote): Promise<void>;
  update(note: INote): Promise<void>;
  remove(id: number): Promise<void>;
}

export type TStorage = "indexedDB";
