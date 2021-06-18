import React from 'react'
import './App.scss'

function App() {
  return (
    <form action='#' className='note-text h-100'>
      <label htmlFor='note-text' className='note-text__label'>
        Note
      </label>
      <textarea
        name='note-text'
        id='note-text'
        className='note-text__textarea h-100'
      ></textarea>
    </form>
  )
}

export default App
