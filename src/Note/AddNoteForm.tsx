// AddNoteForm.tsx
import React, { useId, useState } from "react";

import { useNotes } from "../Storage/useNotes";
import { INote } from "./types";
import { useStorage } from "../Storage/useStorage";

function AddNoteForm() {
  const [notes, setNotes] = useNotes();
  const { put } = useStorage();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleId = useId();
  const contentId = useId();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newNote: INote = {
      id: Math.floor(new Date().valueOf()),
      title,
      content,
      createdAt: new Date(),
    };

    setNotes([...notes, newNote]);
    put(newNote);

    setTitle("");
    setContent("");
  };

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }
  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <dl>
        <dt>
          <label htmlFor={titleId}>Title</label>
        </dt>
        <dd>
          <input
            id={titleId}
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </dd>
        <dt>
          <label htmlFor={contentId}>Content</label>
        </dt>
        <dd>
          <textarea
            id={contentId}
            value={content}
            onChange={handleContentChange}
          ></textarea>
        </dd>
      </dl>
      <button type="submit">Add Note</button>
    </form>
  );
}

export default AddNoteForm;
