import * as noteRepo from '../repositories/note.repositories';

export const createNote = async (title: string, content: string) => {
  return await noteRepo.createNote({ title, content });
};

export const getAllNotes = async () => {
  return await noteRepo.getAllNotes();
};

export const deleteNote = async (id: string) => {
  return await noteRepo.deleteNoteById(id);
};
