import { Router } from 'express';
import {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  duplicateResume,
  deleteResume,
} from '../controllers/resumeController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', getResumes);
router.post('/', createResume);
router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.post('/:id/duplicate', duplicateResume);
router.delete('/:id', deleteResume);

export default router;
