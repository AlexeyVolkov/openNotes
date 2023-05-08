import { useNotes } from "../Storage/useNotes";
import { INote, INoteInitials } from "./types";
import { useStorage } from "../Storage/useStorage";
import NoteForm from "./NoteForm";

function AddNoteForm() {
  const [notes, setNotes] = useNotes();
  const { put } = useStorage();

  async function handleSubmit(note: INoteInitials) {
    const nextNote: INote = {
      ...note,
      id: Math.floor(new Date().valueOf()),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes([...notes, nextNote]);
    put(nextNote);
  }

  return <NoteForm onSubmit={handleSubmit} submitText="Add" />;
}

export default AddNoteForm;
