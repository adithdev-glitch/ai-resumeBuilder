import {
  improveBulletService,
  generateSummaryService,
  tailorExperienceService,
} from '../services/geminiService.js';

export async function improveBullet(req, res) {
  try {
    const { bullet, role } = req.body;
    if (!bullet || !bullet.trim()) {
      return res.status(400).json({ message: 'Bullet text is required.' });
    }

    const result = await improveBulletService({ bullet, role });
    return res.json(result);
  } catch (err) {
    return res.status(502).json({
      message: err.message || "Couldn't reach the suggestion service. Your text is unchanged.",
    });
  }
}

export async function generateSummary(req, res) {
  try {
    const { experience, jobTitle } = req.body;
    const result = await generateSummaryService({ experience, jobTitle });
    return res.json(result);
  } catch (err) {
    return res.status(502).json({
      message: err.message || "Couldn't reach the suggestion service. Your text is unchanged.",
    });
  }
}

export async function tailorExperience(req, res) {
  try {
    const { experience, jobDescription, targetRole } = req.body;
    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ message: 'Job description is required.' });
    }

    const result = await tailorExperienceService({ experience, jobDescription, targetRole });
    return res.json(result);
  } catch (err) {
    return res.status(502).json({
      message: err.message || "Couldn't reach the suggestion service. Your text is unchanged.",
    });
  }
}
