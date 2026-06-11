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

  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'تعذر جلب بيانات المستخدم');
};

// Backwards-compatible export expected by existing code.
export const getCurrentUser = getMe;

// Login user.
// POST /api/auth/login
export const login = async ({ email, password } = {}) => {
  if (!email || !password) throw new Error('Missing credentials');

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  return parseResponse(response, 'تعذر تسجيل الدخول');
};

// Sign up user.
// POST /api/auth/signup
export const signUp = async ({ email, password, ...rest } = {}) => {
  if (!email || !password) throw new Error('Missing credentials');

  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, ...rest }),
  });

  return parseResponse(response, 'تعذر إنشاء الحساب');
};
