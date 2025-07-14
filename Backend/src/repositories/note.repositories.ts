// src/repositories/note.repository.ts
import Note from '../models/Note';

export const createNote = (data: { title: string; content: string }) => {
  return Note.create(data); // or new Note(data).save()
};

export const getAllNotes = () => {
  return Note.find();
};

export const deleteNoteById = (id: string) => {
  return Note.findByIdAndDelete(id);
};
