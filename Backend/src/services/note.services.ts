// src/services/note.services.ts
import * as noteRepo from '../repositories/note.repositories';

export const createNote = async (title: string, content: string) => {
  return await noteRepo.createNote({ title, content });
};

export const getAllNotes = async (page: number, limit: number) => {
  return await noteRepo.paginateNotes(page, limit);
};

export const deleteNote = async (id: string) => {
  return await noteRepo.deleteNoteById(id);
};

// Search for notes with pagination and case-insensitive matching
export const searchNotes = async (searchParam: string, page: number, limit: number) => {
  return await noteRepo.paginateSearchNotes(searchParam, page, limit);
};
