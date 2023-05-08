export interface INote {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export interface NoteItemProps {
  note: INote;
}

export type TNotesContext = [
  notes: INote[],
  setNotes: (notes: INote[]) => void
];
