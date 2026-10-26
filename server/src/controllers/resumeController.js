import { Resume } from '../models/Resume.js';

export async function getResumes(req, res) {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ updatedAt: -1 });
    return res.json({ resumes });
  } catch {
    return res.status(500).json({ message: 'Failed to retrieve resumes.' });
  }
}

export async function getResumeById(req, res) {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found.' });
    }
    return res.json({ resume });
  } catch {
    return res.status(500).json({ message: 'Failed to retrieve resume.' });
  }
}

export async function createResume(req, res) {
  try {
    const payload = { ...req.body, user: req.user.id };
    delete payload._id;
    const resume = await Resume.create(payload);
    return res.status(201).json({ message: 'Resume created.', resume });
  } catch {
    return res.status(500).json({ message: 'Failed to create resume.' });
  }
}

export async function updateResume(req, res) {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found.' });
    }
    return res.json({ message: 'Resume saved.', resume });
  } catch {
    return res.status(500).json({ message: 'Failed to save resume.' });
  }
}

export async function duplicateResume(req, res) {
  try {
    const original = await Resume.findOne({ _id: req.params.id, user: req.user.id });
    if (!original) {
      return res.status(404).json({ message: 'Resume not found.' });
    }

    const copyData = original.toObject();
    delete copyData._id;
    delete copyData.createdAt;
    delete copyData.updatedAt;
    copyData.title = `${original.title} (Copy)`;

    const duplicated = await Resume.create(copyData);
    return res.status(201).json({ message: 'Resume duplicated.', resume: duplicated });
  } catch {
    return res.status(500).json({ message: 'Failed to duplicate resume.' });
  }
}

export async function deleteResume(req, res) {
  try {
    const deleted = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) {
      return res.status(404).json({ message: 'Resume not found.' });
    }
    return res.json({ message: 'Resume deleted.' });
  } catch {
    return res.status(500).json({ message: 'Failed to delete resume.' });
  }
}
