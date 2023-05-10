import { ChangeEvent } from "react";
import { Form, Seo, Navigation } from "./components";
import { debounceDelay, defaultNote } from "./utils/constants";
import { INote } from "./utils/interface";
import useDebouncedIndexedDB from "./utils/indexedDB/useDebouncedIndexedDB";

function App() {
  const [note, setNote, isLoading] = useDebouncedIndexedDB(
    defaultNote,
    debounceDelay
  );

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextNote: INote = {
      ...note,
      text: event.target.value,
      updatedAt: new Date(),
      id: 1,
    };

    setNote(nextNote);
  };

  return (
    <>
      <Seo
        title="OpenNote"
        description="OpenNote is an open-source, offline-capable note-taking application, designed to capture and share your ideas freely and efficiently, anytime, anywhere."
      />
      <header className="leading-none">
        <Navigation text={note.text} />
      </header>
      <main>
        <Form onChange={onChange} disabled={isLoading}>
          {note.text}
        </Form>
      </main>
    </>
  );
}

export default App;
