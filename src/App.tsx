import { ChangeEvent } from 'react'

import debounce from './utils/debounce'
import useLocalStorage from './utils/useLocalStorage'
import './App.scss'

function App() {
  const [noteText, setNoteText] = useLocalStorage<string>('note-text', '')
  const [noteLastModifiedDate, setNoteLastModifiedDate] = useLocalStorage<Date>(
    'note-date',
    new Date()
  )
  const options: object = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const dateToShow: string = new Date(noteLastModifiedDate).toLocaleDateString(
    'en-US',
    options
  )

  const updateNoteText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(event.target.value)
    setNoteLastModifiedDate(new Date())
  }

  const noteChangeHandler = debounce(updateNoteText, 300)

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
        defaultValue={noteText}
      />
      <aside className='note-text__date'>{dateToShow}</aside>
    </form>
  )
}

export default App
