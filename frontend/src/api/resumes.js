import { apiRequest } from './client';

export const resumesApi = {
  getAll: () => apiRequest('/resumes', { method: 'GET' }),
  getById: (id) => apiRequest(`/resumes/${id}`, { method: 'GET' }),
  create: (data) => apiRequest('/resumes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/resumes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  duplicate: (id) => apiRequest(`/resumes/${id}/duplicate`, { method: 'POST' }),
  delete: (id) => apiRequest(`/resumes/${id}`, { method: 'DELETE' }),
};
