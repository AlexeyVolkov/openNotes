import { useEffect, useState } from "react";
import { useNotes } from "../Storage/useNotes";
import { useStorage } from "../Storage/useStorage";
import { INote, INoteInitials, NoteItemProps } from "./types";
import Modal from "../Modal/Modal";
import EditNoteForm from "./EditNoteForm";

function NoteItem({ note }: NoteItemProps) {
  const { remove, put } = useStorage();
  const [notes, setNotes] = useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(
    function checkShareAPI() {
      const canShare =
        "canShare" in window.navigator &&
        window.navigator.canShare({
          title: note.title,
          text: note.content,
        });
      setCanShare(canShare);
    },
    [note]
  );

  function handleShare(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    window.navigator.share({
      title: note.title,
      text: note.content,
    });
  }

  function handleCopy(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const text = `${note.title}:\n\n${note.content}`;
    navigator.clipboard.writeText(text);
  }

  function handleEdit(noteInitials?: INoteInitials) {
    if (
      typeof noteInitials === "undefined" ||
      noteInitials?.title.length === 0 ||
      noteInitials?.content.length === 0
    ) {
      return;
    }

    const nextNotes = notes.map(function updateNote(previousNote) {
      if (previousNote.id === note.id) {
        const nextNote: INote = {
          ...previousNote,
          ...noteInitials,
          updatedAt: new Date(),
        };

        put(nextNote);
        return nextNote;
      } else {
        return previousNote;
      }
    });

    setNotes(nextNotes);
    closeModalWindow();
  }

  function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const nextNotes = notes.filter(function findNoteById(stateNote) {
      return stateNote.id !== note.id;
    });

    setNotes(nextNotes);
    remove(note.id);
  }

  function toggleModal(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setIsModalOpen(!isModalOpen);
  }

  function closeModalWindow() {
    setIsModalOpen(false);
  }

  return (
    <section>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <form>
        <fieldset>
          <legend>Actions</legend>
          {canShare && <button onClick={handleShare}>Share</button>}
          {!canShare && <button onClick={handleCopy}>Copy text</button>}
          <button onClick={toggleModal}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </fieldset>
      </form>
      <Modal isOpen={isModalOpen}>
        <EditNoteForm note={note} onSubmit={handleEdit}>
          <button onClick={closeModalWindow}>Close</button>
        </EditNoteForm>
      </Modal>
    </section>
  );
}

export default NoteItem;
