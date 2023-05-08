import { useNotes } from "../Storage/useNotes";
import { useStorage } from "../Storage/useStorage";
import { NoteItemProps } from "./types";

function NoteItem({ note }: NoteItemProps) {
  const { remove } = useStorage();
  const [notes, setNotes] = useNotes();

  function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setNotes(
      notes.filter(function findNoteById(stateNote) {
        return stateNote.id !== note.id;
      })
    );
    remove(note.id);
  }
  return (
    <section>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <form>
        <fieldset>
          <legend>Actions</legend>
          <button>Share</button>
          <button>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </fieldset>
      </form>
    </section>
  );
}

export default NoteItem;
