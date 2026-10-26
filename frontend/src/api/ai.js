import { apiRequest } from './client';

export const aiApi = {
  improveBullet: ({ bullet, role }) =>
    apiRequest('/ai/improve', {
      method: 'POST',
      body: JSON.stringify({ bullet, role }),
    }),

  generateSummary: ({ experience, jobTitle }) =>
    apiRequest('/ai/summary', {
      method: 'POST',
      body: JSON.stringify({ experience, jobTitle }),
    }),

  tailorExperience: ({ experience, jobDescription, targetRole }) =>
    apiRequest('/ai/tailor', {
      method: 'POST',
      body: JSON.stringify({ experience, jobDescription, targetRole }),
    }),
};
