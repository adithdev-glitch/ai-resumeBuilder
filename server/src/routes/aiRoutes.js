import { Router } from 'express';
import { improveBullet, generateSummary, tailorExperience } from '../controllers/aiController.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Apply AI rate limiting
router.use(aiRateLimiter);

router.post('/improve', improveBullet);
router.post('/summary', generateSummary);
router.post('/tailor', tailorExperience);

export default router;
