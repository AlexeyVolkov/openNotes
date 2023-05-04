// NotesList.tsx
import { useState } from "react";
import { Note } from "./types";
import NoteItem from "./NoteItem";

const defaultNotes: Note[] = [
  {
    id: 1,
    title: "Note 1",
    content: "Content 1",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Note 2",
    content: "Content 2",
    createdAt: new Date(),
  },
];

function NotesList() {
  const [notes, setNotes] = useState<Note[]>(defaultNotes);

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
