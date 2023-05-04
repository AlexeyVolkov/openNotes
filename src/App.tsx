import AddNoteForm from "./Note/AddNoteForm";
import NotesList from "./Note/NoteList";

function App() {
  return (
    <>
      <main>
        <h1>Notes</h1>
        <NotesList />
      </main>
      <hr />
      <aside>
        <h2>Add Note</h2>
        <AddNoteForm />
      </aside>
    </>
  );
}

export default App;
