import { Router } from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/noteController';

const router = Router();

router.get('/pages', getNotes);

router.post('/pages', createNote);

router.delete('/pages/:id', deleteNote);

export default router;
