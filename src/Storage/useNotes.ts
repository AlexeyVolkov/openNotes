import { createContext, useContext } from "react";
import { TNotesContext } from "../Note/types";

export const NotesContext = createContext<TNotesContext>([
  [],
  function () {
    return;
  },
]);

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === null) {
    throw new Error("useNotes must be used within a StorageProvider");
  }
  return context;
}
