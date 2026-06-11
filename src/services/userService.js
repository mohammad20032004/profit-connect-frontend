const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

const parseResponse = async (response, fallbackMessage) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || fallbackMessage);
  }
  return data;
};

export const getUserById = async ({ token, userId }) => {
  if (!token) throw new Error('Missing auth token');
  if (!userId) throw new Error('Missing userId');

  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'تعذر جلب بيانات المستخدم');
};

/**
 * Follow a user.
 * POST /api/users/:userId/follow
 */
export const followUser = async ({ token, userId }) => {
  const response = await fetch(`${API_URL}/api/users/${userId}/follow`, {
    method: 'POST',
    headers: getHeaders(token),
  });
  return parseResponse(response, 'Failed to follow user');
};

/**
 * Unfollow a user.
 * DELETE /api/users/:userId/follow
 */
export const unfollowUser = async ({ token, userId }) => {
  const response = await fetch(`${API_URL}/api/users/${userId}/follow`, {
    method: 'DELETE',
    headers: getHeaders(token),
  });
  return parseResponse(response, 'Failed to unfollow user');
};
