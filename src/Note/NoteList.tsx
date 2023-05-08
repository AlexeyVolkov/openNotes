import NoteItem from "./NoteItem";
import { useNotes } from "../Storage/useNotes";

function NotesList() {
  const [notes] = useNotes();

  if (notes.length === 0) return <p>No notes found</p>;
  return (
    <ol reversed>
      {notes
        .sort(function sortByCreatedAt(a, b) {
          return b.createdAt.getTime() - a.createdAt.getTime();
        })
        .map(function renderNoteItem(note) {
          return (
            <li key={note.id}>
              <NoteItem key={note.id} note={note} />
            </li>
          );
        })}
    </ol>
  );
}

export default NotesList;
