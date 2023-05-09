import { Form, Seo, Navigation } from "./components";
import useDebouncedLocalStorage from "./utils/useDebouncedLocalStorage";
import { debounceDelay, noteName } from "./utils/constants";
import { ChangeEvent } from "react";

function App() {
  // note text
  const [noteText, setNoteText] = useDebouncedLocalStorage<string>(
    noteName,
    "",
    debounceDelay
  );

  // on change handler
  const noteChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(event.target.value);
  };

  return (
    <>
      <Seo
        title="OpenNote"
        description="OpenNote  is an open-source, offline-capable note-taking application, designed to capture and share your ideas freely and efficiently, anytime, anywhere."
      />
      <header>
        <Navigation text={noteText} />
      </header>
      <main>
        <Form onChange={noteChangeHandler}>{noteText}</Form>
      </main>
    </>
  );
}

export default App;
