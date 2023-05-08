import { useEffect, useState } from "react";
import { INote, TNotesContext } from "../Note/types";
import { NotesContext } from "./useNotes";
import { useStorage } from "./useStorage";

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<INote[]>([]);
  const { getAll } = useStorage();

  useEffect(
    function getNotes() {
      getAll().then(function setNotesFromStorage(notes) {
        if (notes.length > 0) setNotes(notes);
      });

      return function cleanup() {
        setNotes([]);
      };
    },
    [getAll]
  );

  const value: TNotesContext = [notes, setNotes];
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
