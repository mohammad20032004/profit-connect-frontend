const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

const parseResponse = async (response, fallbackMessage) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
};

export const sendConnectionRequest = async ({ token, userId }) => {
  const response = await fetch(`${API_URL}/api/network/connect/${userId}`, {
    method: 'POST',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to send connection request');
};

export const acceptConnectionRequest = async ({ token, requestId }) => {
  const response = await fetch(`${API_URL}/api/network/accept/${requestId}`, {
    method: 'PUT',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to accept connection request');
};

export const rejectConnectionRequest = async ({ token, requestId }) => {
  const response = await fetch(`${API_URL}/api/network/reject/${requestId}`, {
    method: 'PUT',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to reject connection request');
};

export const getNetworkRequests = async (token) => {
  const response = await fetch(`${API_URL}/api/network/requests`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to load connection requests');
};

export const getConnections = async (token) => {
  const response = await fetch(`${API_URL}/api/network/connections`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to load connections');
};

export const removeConnection = async ({ token, userId }) => {
  const response = await fetch(`${API_URL}/api/network/remove/${userId}`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to remove connection');
};
