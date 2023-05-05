import { useEffect, useState } from "react";
import { Note } from "./types";
import NoteItem from "./NoteItem";
import { useStorage } from "../Storage/useStorage";

function NotesList() {
  const storage = useStorage();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      const allNotes = await storage.getAll();
      allNotes.length > 0 && setNotes(allNotes);
    }

    fetchNotes();
  }, [storage]);

  if (notes.length === 0) return <p>No notes found</p>;
  return (
    <ol>
      {notes.map(function renderNoteItem(note) {
        return (
          <li>
            <NoteItem key={note.id} note={note} />
          </li>
        );
      })}
    </ol>
  );
}

export default NotesList;
