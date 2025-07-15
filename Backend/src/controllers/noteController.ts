// src/controllers/note.controller.ts
import { Request, Response } from 'express';
import * as noteService from '../services/note.services';
import { createNoteSchema } from '../validators/note.validator';

export const createNote = async (req: Request, res: Response) => {
  try {
    const validated = createNoteSchema.parse(req.body); 

    const note = await noteService.createNote(validated.title, validated.content);
    res.status(201).json(note);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const notes = await noteService.getAllNotes(page, limit);
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
