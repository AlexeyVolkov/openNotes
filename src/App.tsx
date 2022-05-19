import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Form from "./components/Form";
import useDebouncedLocalStorage from "./utils/useDebouncedLocalStorage";
import { debounceDelay, noteName } from "./utils/constants";
import styles from "./App.module.scss";
import Seo from "./components/Seo";
import Navigation from "./components/Navigation";
import packageJSON from "../package.json";

const App = () => {
  // note text
  const [noteText, setNoteText] = useDebouncedLocalStorage<string>(
    noteName,
    "",
    debounceDelay
  );

  // on change handler
  const noteChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(event.target.value);
  };

  return (
    <>
      <Seo title={packageJSON.name} description={packageJSON.description} />
      <header className={styles.header} id="top">
        <Navigation text={noteText} />
      </header>
      <main className="container">
        <Form onChange={noteChangeHandler}>{noteText}</Form>
      </main>
    </>
  );
};

export default App;
