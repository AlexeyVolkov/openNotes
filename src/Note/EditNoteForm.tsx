import { INote, INoteInitials } from "./types";
import NoteForm from "./NoteForm";

function EditNoteForm({
  children,
  note,
  onSubmit,
}: {
  children?: React.ReactNode;
  note: INote;
  onSubmit?: (noteInitials?: INoteInitials) => void;
}) {
  async function handleSubmit(noteInitials: INoteInitials) {
    if (typeof onSubmit !== "undefined") onSubmit(noteInitials);
  }

  return (
    <NoteForm
      onSubmit={handleSubmit}
      submitText="Update"
      noteInitials={{
        title: note.title,
        content: note.content,
      }}
    >
      {children}
    </NoteForm>
  );
}

export default EditNoteForm;
