import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: 'Untitled Resume',
      trim: true,
    },
    template: {
      type: String,
      enum: ['classic', 'modern', 'compact'],
      default: 'classic',
    },
    personal: {
      fullName: { type: String, default: '' },
      jobTitle: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      website: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
    },
    summary: {
      type: String,
      default: '',
    },
    experience: [
      {
        id: String,
        role: String,
        company: String,
        location: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        bullets: [String],
      },
    ],
    education: [
      {
        id: String,
        school: String,
        degree: String,
        location: String,
        startDate: String,
        endDate: String,
        gpa: String,
      },
    ],
    projects: [
      {
        id: String,
        name: String,
        technologies: String,
        link: String,
        description: String,
      },
    ],
    skills: [
      {
        category: String,
        items: [String],
      },
    ],
    certifications: [
      {
        id: String,
        name: String,
        issuer: String,
        date: String,
      },
    ],
  },
  { timestamps: true }
);

export const Resume = mongoose.model('Resume', resumeSchema);
