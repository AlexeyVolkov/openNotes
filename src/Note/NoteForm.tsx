import React, { useId, useState } from "react";

import { INoteInitials } from "./types";

function NoteForm({
  onSubmit,
  submitText = "Submit",
  children,
  noteInitials,
}: {
  onSubmit: (note: INoteInitials) => void;
  submitText?: string;
  children?: React.ReactNode;
  noteInitials?: INoteInitials;
}) {
  const defaultTitle = noteInitials?.title || "";
  const defaultContent = noteInitials?.content || "";

  const [titleState, setTitle] = useState(defaultTitle);
  const [contentState, setContent] = useState(defaultContent);
  const titleId = useId();
  const contentId = useId();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newNote = {
      title: titleState,
      content: contentState,
    };

    onSubmit(newNote);

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
            value={titleState}
            onChange={handleTitleChange}
          />
        </dd>
        <dt>
          <label htmlFor={contentId}>Content</label>
        </dt>
        <dd>
          <textarea
            id={contentId}
            value={contentState}
            onChange={handleContentChange}
          ></textarea>
        </dd>
      </dl>
      <button type="submit">{submitText}</button>
      {children}
    </form>
  );
}

export default NoteForm;
