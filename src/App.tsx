import AddNoteForm from "./Note/AddNoteForm";
import NotesList from "./Note/NoteList";
import { NotesProvider } from "./Storage/NotesProvider";
import { StorageProvider } from "./Storage/StorageProvider";
import { createStorage } from "./Storage/creator";

const storage = createStorage("indexedDB", "notes");
function App() {
  return (
    <StorageProvider storage={storage}>
      <NotesProvider>
        <main>
          <h1>Notes</h1>
          <NotesList />
        </main>
        <hr />
        <aside>
          <h2>Add Note</h2>
          <AddNoteForm />
        </aside>
      </NotesProvider>
    </StorageProvider>
  );
}

export default App;
