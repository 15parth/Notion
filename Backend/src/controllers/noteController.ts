// src/controllers/note.controller.ts
import { Request, Response } from 'express';
import * as noteService from '../services/note.services';
import { createNoteSchema } from '../validators/note.validator';
import { listNotesQuerySchema } from '../validators/noteQuery.validator';
import ValidationErrors from '../utils/errors/validationError';

export const createNote = async (req: Request, res: Response, next: Function) => {
const result = createNoteSchema.safeParse(req.body);

if (!result.success) {
  throw new ValidationErrors(result.error); // ✅ works correctly now
}

  // If validation passes, proceed with note creation logic
  const { title, content } = result.data;
  const note = await noteService.createNote(title, content);

  res.status(201).json(note);
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const query = listNotesQuerySchema.parse(req.query);  // validate query params
    const { search } = query;

    // If search parameter is passed, use searchNotes, else return all notes
    const notes = search 
      ? await noteService.searchNotes(search, query.page, query.limit)
      : await noteService.getAllNotes(query.page, query.limit);

    res.status(200).json(notes);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Server Error' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  await noteService.deleteNote(id);
  res.status(200).json({ message: 'Note deleted' });
};
