import { ChangeEvent } from 'react'

import Textarea from './components/Textarea/Textarea'
import useDebouncedLocalStorage from './utils/useDebouncedLocalStorage'
import {
  debounceDelay,
  localeOptions,
  localeTimezone,
  noteDate,
  noteName,
} from './utils/constants'

import './App.scss'

const App = () => {
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
    <Textarea dateToShow={dateToShow} onChange={noteChangeHandler}>
      {noteText}
    </Textarea>
  )
}

export default App
