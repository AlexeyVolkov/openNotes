import { ChangeEvent, useState, useEffect } from 'react'

import useDebounce from './utils/debounce'
import useLocalStorage from './utils/useLocalStorage'
import './App.scss'

const debounceDelay = 1 * 1000 // ms

function App() {
  // note text
  const [noteText, setNoteText] = useLocalStorage<string>('note-text', '')
  const [tempText, setTempText] = useState<string>(noteText)
  const debouncedNoteText = useDebounce<string>(tempText, debounceDelay)
  useEffect(() => {
    setNoteText(debouncedNoteText)
  }, [debouncedNoteText, setNoteText])
  // note date
  const [noteLastModifiedDate, setNoteLastModifiedDate] = useLocalStorage<Date>(
    'note-date',
    new Date()
  )
  const [tempLastModifiedDate, setTempLastModifiedDate] =
    useState<Date>(noteLastModifiedDate)
  const debouncedLastModifiedDate = useDebounce<Date>(
    tempLastModifiedDate,
    debounceDelay
  )
  useEffect(() => {
    setNoteLastModifiedDate(debouncedLastModifiedDate)
  }, [debouncedLastModifiedDate, setNoteLastModifiedDate])

  // Parse date
  const options: object = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const dateToShow: string = new Date(
    debouncedLastModifiedDate
  ).toLocaleDateString('en-US', options)

  // on change handler
  const noteChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTempText(event.target.value)
    setTempLastModifiedDate(new Date())
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
        defaultValue={debouncedNoteText}
      />
      <aside className='note-text__date'>{dateToShow}</aside>
    </form>
  )
}

export default App
