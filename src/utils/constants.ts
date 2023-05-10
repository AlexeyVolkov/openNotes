import { INote } from "./interface";

export const debounceDelay = 0.5 * 1000;

// Database

export const DB_NAME = "notes-db";
export const DB_VERSION = 1;
export const DB_TABLE_NAME = "notes";
export const DB_UNIQUE_KEY = "id";

// Note
export const defaultNote: INote = {
  id: 1,
  text: "",
  updatedAt: new Date(),
};
