import React, { ChangeEvent } from 'react'
import styles from './Form.module.scss'

export type FormPropsType = {
  children: React.ReactNode
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

function Form({ onChange, children }: FormPropsType) {
  return (
    <form action="#" className="mt-2">
      <label htmlFor="note-text" className="form-label visually-hidden">
        Note
      </label>
      <textarea
        name="note-text"
        id="note-text"
        className={`form-control ${styles.textarea}`}
        onChange={onChange}
        value={String(children)}
        placeholder="Write..."
        rows={10}
      />
      <button type="submit" className="btn btn-primary visually-hidden">
        Save
      </button>
    </form>
  )
}

export default Form
