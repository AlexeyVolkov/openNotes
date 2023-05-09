import React, { ChangeEvent } from "react";

export type FormPropsType = {
  children: React.ReactNode;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

function Form({ onChange, children }: FormPropsType) {
  return (
    <form action="#">
      <label htmlFor="note-text">
        Note
      </label>
      <textarea
        name="note-text"
        id="note-text"
        onChange={onChange}
        value={String(children)}
        placeholder="Write..."
        rows={10}
      />
      <button type="submit">
        Save
      </button>
    </form>
  );
}

export default Form;
