// src/services/authService.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'تعذر جلب بيانات المستخدم');
  }

  return data;
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'حدث خطأ أثناء تسجيل الدخول');
  }

  return data;
};

export const signUp = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  // رمي خطأ واضح إذا فشل الطلب ليلتقطه المكون
  if (!response.ok) {
    throw new Error(data.message || 'حدث خطأ أثناء التسجيل');
  }

  return data; // إرجاع البيانات الصافية في حال النجاح
};
