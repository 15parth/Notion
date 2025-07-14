// src/routes/note.route.ts
import { Router } from 'express';
import * as noteController from '../controllers/noteController';

const router = Router();

router.get('/', noteController.getNotes);
router.post('/', noteController.createNote);
router.delete('/:id', noteController.deleteNote);

export default router;
