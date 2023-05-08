import { useEffect, useState } from "react";
import { INote, TNotesContext } from "../Note/types";
import { NotesContext } from "./useNotes";
import { useStorage } from "./useStorage";

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<INote[]>([]);
  const { getAll, put } = useStorage();

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

  function addNote(note: INote) {
    note.id = new Date().getTime();

    setNotes([...notes, note]);
    put(note);
  }

  const value: TNotesContext = [notes, addNote];
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
