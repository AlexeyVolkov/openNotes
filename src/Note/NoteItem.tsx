import { NoteItemProps } from "./types";

function NoteItem({ note }: NoteItemProps) {
  return (
    <section>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <form>
        <fieldset>
          <legend>Actions</legend>
          <button>Share</button>
          <button>Edit</button>
          <button>Delete</button>
        </fieldset>
      </form>
    </section>
  );
}

export default NoteItem;
