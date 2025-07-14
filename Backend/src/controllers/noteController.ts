// src/controllers/note.controller.ts
import { Request, Response } from 'express';
import * as noteService from '../services/note.services';
import { createNoteSchema } from '../validators/note.validator';

export const createNote = async (req: Request, res: Response) => {
  try {
    const validated = createNoteSchema.parse(req.body); // ✅ validation

    const note = await noteService.createNote(validated.title, validated.content);
    res.status(201).json(note);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getNotes = async (_req: Request, res: Response) => {
  const notes = await noteService.getAllNotes();
  res.status(200).json(notes);
};

export const deleteNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  await noteService.deleteNote(id);
  res.status(200).json({ message: 'Note deleted' });
};
