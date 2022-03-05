import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Textarea from './components/Textarea/Textarea'
import useDebouncedLocalStorage from './utils/useDebouncedLocalStorage'
import {
  debounceDelay,
  localeOptions,
  localeTimezone,
  noteDate,
  noteName,
} from './utils/constants'
import styles from './App.module.scss'
import Seo from './components/Seo'
import Navigation from './components/Navigation'
import packageJSON from '../package.json'
import { shareAction } from './utils/share'

const App = () => {
  const [navigatorHack, setNavigatorHack] = useState<Navigator>()

  useEffect(() => {
    setNavigatorHack(window.navigator)
  }, [])
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

  const onShareText = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (
      navigatorHack &&
      typeof navigatorHack.canShare !== 'undefined' &&
      navigatorHack.canShare()
    ) {
      shareAction({
        text: noteText,
        title: packageJSON.name,
        url: document.URL,
      })
    } else {
      console.error("Your browser cannot share text, so it's just copied")
      navigator.clipboard.writeText(noteText)
    }
  }

  return (
    <>
      <Seo title={packageJSON.name} description={packageJSON.description} />
      <header className={styles.header} id='top'>
        <Navigation shareFunction={onShareText} />
      </header>
      <main className='container'>
        <Textarea dateToShow={dateToShow} onChange={noteChangeHandler}>
          {noteText}
        </Textarea>
      </main>
    </>
  )
}

export default App
