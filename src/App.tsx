import React from 'react'
import './App.scss'

// Hook
function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }
  return [storedValue, setValue] as const
}

function App() {
  const [noteText, setNoteText] = useLocalStorage<string>('note-text', '')
  const updateNoteText = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => setNoteText(event.target.value)

  return (
    <form action='#' className='note-text h-100'>
      <label htmlFor='note-text' className='note-text__label'>
        Note
      </label>
      <textarea
        name='note-text'
        id='note-text'
        className='note-text__textarea h-100'
        onChange={updateNoteText}
        value={noteText}
      />
    </form>
  )
}

export default App
