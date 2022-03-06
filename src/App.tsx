import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Form from './components/Form'
import useDebouncedLocalStorage from './utils/useDebouncedLocalStorage'
import { debounceDelay, noteName } from './utils/constants'
import styles from './App.module.scss'
import Seo from './components/Seo'
import Navigation from './components/Navigation'
import packageJSON from '../package.json'

const App = () => {
  const [canIShareFile, setCanIShareFile] = useState<boolean>(false)
  const navigatorHack = window.navigator

  // note text
  const [noteText, setNoteText] = useDebouncedLocalStorage<string>(
    noteName,
    '',
    debounceDelay
  )
  useEffect(() => {
    if (
      navigatorHack &&
      typeof navigatorHack.canShare === 'function' &&
      navigatorHack.canShare({
        text: noteText,
        title: packageJSON.name,
        url: document.URL,
      })
    ) {
      setCanIShareFile(true)
    }
    return () => {
      setCanIShareFile(false)
    }
  }, [navigatorHack, noteText])

  // on change handler
  const noteChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(event.target.value)
  }

  const onShareText = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (navigatorHack && canIShareFile) {
      navigatorHack.share({
        text: noteText,
        title: packageJSON.name,
        url: document.URL,
      })
    } else {
      navigator.clipboard.writeText(noteText)
    }
  }

  return (
    <>
      <Seo title={packageJSON.name} description={packageJSON.description} />
      <header className={styles.header} id='top'>
        <Navigation shareFunction={onShareText} canIShareFile={canIShareFile} />
      </header>
      <main className='container'>
        <Form onChange={noteChangeHandler}>{noteText}</Form>
      </main>
    </>
  )
}

export default App
