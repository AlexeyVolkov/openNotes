import { ChangeEvent, useRef, useState } from "react";
import { Form, Seo, Navigation } from "./components";
import { debounceDelay, defaultNote } from "./utils/constants";
import { INote } from "./utils/interface";
import useDebouncedIndexedDB from "./utils/indexedDB/useDebouncedIndexedDB";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function App() {
  const [note, setNote, isLoading] = useDebouncedIndexedDB(
    defaultNote,
    debounceDelay
  );
  const editor = useRef<ReactQuill>(null);
  const copyToClipboard = editor.current?.getEditor().getText() ?? "";

  const onWYSIWYGChange = (value: string) => {
    const nextNote: INote = {
      ...note,
      text: value,
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
        <Navigation
          className="py-2 border-b border-blackov"
          text={copyToClipboard}
        />
      </header>
      <main className="p-safe mt-2 flex justify-center items-center">
        <ReactQuill
          ref={editor}
          readOnly={isLoading}
          theme="bubble"
          className="
          mt-2
          text-2xl font-thin oldstyle-nums hyphens-auto text-justify 
          border-2 border-blackov rounded-lg p-4 mx-4 w-10/12"
          value={note.text}
          onChange={onWYSIWYGChange}
          placeholder="Write…"
          modules={{
            toolbar: [
              ["bold", "italic"], // toggled buttons
              ["code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
            ],
          }}
        />
      </main>
    </>
  );
}

export default App;
