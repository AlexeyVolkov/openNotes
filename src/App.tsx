import AddNoteForm from "./Note/AddNoteForm";
import NotesList from "./Note/NoteList";
import { StorageProvider } from "./Storage/StorageProvider";
import { createStorage } from "./Storage/creator";

const storage = createStorage("indexedDB", "notes");
function App() {
  return (
    <StorageProvider storage={storage}>
      <main>
        <h1>Notes</h1>
        <NotesList />
      </main>
      <hr />
      <aside>
        <h2>Add Note</h2>
        <AddNoteForm />
      </aside>
    </StorageProvider>
  );
}

export default App;
