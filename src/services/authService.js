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

/**
 * Fetches the currently authenticated user's complete profile data.
 * GET /api/auth/me
 */
export const getMe = async (token) => {
  if (!token) throw new Error('Missing auth token');

  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'تعذر جلب بيانات المستخدم');
};
