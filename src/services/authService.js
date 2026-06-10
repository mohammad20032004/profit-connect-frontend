// src/services/authService.js
import apiClient from '@/lib/apiClient';

/**
 * Fetches the current authenticated user's data.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<any>} The user data.
 */
export const getCurrentUser = (token) => {
  return apiClient('/auth/me', { token });
};

/**
 * Logs a user in.
 * @param {object} credentials - The user's credentials (e.g., email, password).
 * @returns {Promise<any>} The login response data, typically including a token.
 */
export const login = (credentials) => {
  return apiClient('/auth/login', { 
    method: 'POST', 
    body: credentials 
  });
};

/**
 * Signs a new user up.
 * @param {object} userData - The new user's information.
 * @returns {Promise<any>} The signup response data.
 */
export const signUp = (userData) => {
  return apiClient('/auth/signup', { 
    method: 'POST', 
    body: userData 
  });
};
