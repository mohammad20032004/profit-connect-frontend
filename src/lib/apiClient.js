'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * A centralized API client for making HTTP requests.
 * It handles URL construction, headers, body serialization, and error handling.
 *
 * @param {string} endpoint The API endpoint to call (e.g., '/auth/login').
 * @param {object} [options={}] Configuration options for the request.
 * @param {string} [options.method='GET'] The HTTP method.
 * @param {object} [options.body] The request body for POST/PUT/PATCH requests.
 * @param {string} [options.token] The JWT token for authentication.
 * @returns {Promise<any>} The JSON response from the API.
 * @throws {Error} Throws an error with a message from the API if the request fails.
 */
const apiClient = async (endpoint, { method = 'GET', body, token } = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Use the error message from the API if available, otherwise a generic one
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    // Re-throw the error to be caught by the calling function
    console.error('API Client Error:', error.message);
    throw error;
  }
};

export default apiClient;
