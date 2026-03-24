const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const getPosts = async ({ token, page = 1, limit = 10 }) => {
  const response = await fetch(`${API_URL}/api/posts?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'تعذر جلب المنشورات');
  }

  return data;
};

export const createPost = async ({ token, postData }) => {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(postData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'تعذر إنشاء المنشور');
  }

  return data;
};

export const toggleLike = async ({ token, postId }) => {
  const response = await fetch(`${API_URL}/api/posts/${postId}/like`, {
    method: 'POST',
    headers: getAuthHeaders(token),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'تعذر تحديث الإعجاب');
  }

  return data;
};

export const addComment = async ({ token, postId, content }) => {
  const response = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ content }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'تعذر إضافة التعليق');
  }

  return data;
};
