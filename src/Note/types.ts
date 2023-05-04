export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export interface NoteItemProps {
  note: Note;
}
