export interface INoteInitials {
  title: string;
  content: string;
}

export interface INote extends INoteInitials {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteItemProps {
  note: INote;
}

export type TNotesContext = [
  notes: INote[],
  setNotes: (notes: INote[]) => void
];
