// src/controllers/note.controller.ts
import { Request, Response } from 'express';
import * as noteService from '../services/note.services';
import { createNoteSchema } from '../validators/note.validator';
import { listNotesQuerySchema } from '../validators/noteQuery.validator';
import ValidationErrors from '../utils/errors/validationError';
import logger from '../utils/logger/logger';

export const createNote = async (req: Request, res: Response, next: Function) => {
  logger.info('POST /notes - createNote controller hit');

  const result = createNoteSchema.safeParse(req.body);
  if (!result.success) {
    logger.warn('Validation failed for createNote', { errors: result.error });
    return next(new ValidationErrors(result.error));
  }

  try {
    const { title, content } = result.data;
    const note = await noteService.createNote(title, content);
    logger.info('Note created', { title });

    res.status(201).json(note);
  } catch (error) {
    logger.error('Error in createNote controller', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  logger.info('GET /notes - getNotes controller hit');

  try {
    const query = listNotesQuerySchema.parse(req.query); // validate query params
    const { search, page, limit } = query;

    const notes = search
      ? await noteService.searchNotes(search, page, limit)
      : await noteService.getAllNotes(page, limit);

    logger.info(`Notes fetched`, { total: notes, search });

    res.status(200).json(notes);
  } catch (err: any) {
    logger.error('Error in getNotes controller', err);
    res.status(500).json({ error: err.message || 'Server Error' });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  logger.info('DELETE /notes/:id - deleteNote controller hit', { id });

  try {
    await noteService.deleteNote(id);
    logger.info(`Note deleted`, { id });

    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    logger.error(`Error in deleteNote controller`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
