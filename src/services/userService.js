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

