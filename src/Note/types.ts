export interface INote {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export interface NoteItemProps {
  note: INote;
}

export type TNotesContext = [notes: INote[], addNote: (note: INote) => void];
