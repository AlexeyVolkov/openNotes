import React, { ChangeEvent } from "react";

export type TProps = {
  children: React.ReactNode;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
};

function Form({ onChange, children, disabled = true }: TProps) {
  return (
    <form action="#" className="mt-2 flex justify-center items-center">
      <label htmlFor="note-text" className="sr-only">
        Note
      </label>
      <textarea
        name="note-text"
        id="note-text"
        onChange={onChange}
        value={String(children)}
        placeholder="Write..."
        rows={10}
        className="font-sans text-2xl font-thin slashed-zero oldstyle-nums hyphens-auto text-justify
        border-2 rounded-lg p-4 mx-4 w-10/12
        first-line:font-bold first-line:text-3xl first-line:leading-tight first-line:mt-4 first-line:mb-2"
        disabled={disabled}
      />
      <button type="submit" className="sr-only" disabled={disabled}>
        Save
      </button>
    </form>
  );
}

export default Form;
