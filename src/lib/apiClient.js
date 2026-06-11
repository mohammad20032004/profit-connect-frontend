
'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
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

    // Check if the response is not JSON before trying to parse it
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        throw new Error(`Expected JSON response, but received ${contentType}. Response: ${textResponse}`);
    }

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
