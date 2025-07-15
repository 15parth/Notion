// src/routes/note.route.ts
import { Router } from 'express';
import * as noteController from '../controllers/noteController';

const router = Router();

router.get('/pages', noteController.getNotes);
router.post('/pages', noteController.createNote);
router.delete('/pages/:id', noteController.deleteNote);

export default router;
