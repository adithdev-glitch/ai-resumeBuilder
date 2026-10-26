import { apiRequest } from './client';

export const authApi = {
  getMe: () => apiRequest('/auth/me', { method: 'GET' }),
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (credentials) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(credentials) }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
};
