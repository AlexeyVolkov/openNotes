import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { INote } from "./interface";
import { indexedDBStorage } from "./indexedDB";

function useDebouncedIndexedDB(
  initialValue: INote,
  debounceDelay: number
): [INote, (nextNote: INote) => void, boolean] {
  const [isLoadingFromDB, setIsLoadingFromDB] = useState(true);
  const [note, setNote] = useState<INote>(initialValue);
  const debouncedNote = useDebounce<INote>(note, debounceDelay);

  useEffect(
    function loadNoteFromIndexedDB() {
      indexedDBStorage.initialize();
      indexedDBStorage
        .getNote()
        .then(function setNoteFromIndexedDB(noteFromIndexedDB) {
          if (noteFromIndexedDB) {
            setNote(noteFromIndexedDB);
            setIsLoadingFromDB(false);
          }
        });
    },
    [setNote]
  );

  useEffect(
    function updateIndexedDB() {
      if (!isLoadingFromDB) {
        indexedDBStorage.putNote({
          ...debouncedNote,
          updatedAt: new Date(),
        });
      }
    },
    [debouncedNote, isLoadingFromDB]
  );

  return [note, setNote, isLoadingFromDB];
}

export default useDebouncedIndexedDB;
