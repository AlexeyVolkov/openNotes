import { ChangeEvent } from 'react'

import useDebouncedLocalStorage from '../../utils/useDebouncedLocalStorage'
import './Textarea.scss'

import {
  debounceDelay,
  localeOptions,
  localeTimezone,
  noteDate,
  noteName,
} from './constants'

const Textarea = () => {
  // note text
  const [noteText, setNoteText] = useDebouncedLocalStorage<string>(
    noteName,
    '',
    debounceDelay
  )
  // note date
  const [noteLastModifiedDate, setNoteLastModifiedDate] =
    useDebouncedLocalStorage<Date>(noteDate, new Date(), debounceDelay)
  // Parse date
  const dateToShow: string = new Date(noteLastModifiedDate).toLocaleDateString(
    localeTimezone,
    localeOptions
  )
  // on change handler
  const noteChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(event.target.value)
    setNoteLastModifiedDate(new Date())
  }

  return (
    <form action='#' className='note-text h-100'>
      <label htmlFor='note-text' className='note-text__label'>
        Note
      </label>
      <textarea
        name='note-text'
        id='note-text'
        className='note-text__textarea h-100'
        onChange={noteChangeHandler}
        value={noteText}
      />
      <aside className='note-text__date'>{dateToShow}</aside>
    </form>
  )
}

export default Textarea
