const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const getAuthHeaders = (token) => ({
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

export const createConversation = async ({ token, recipientId }) => {
  const response = await fetch(`${API_URL}/api/messages/conversations`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ recipientId }),
  });

  return parseResponse(response, 'تعذر إنشاء المحادثة');
};

export const getConversations = async (token) => {
  const response = await fetch(`${API_URL}/api/messages/conversations`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  return parseResponse(response, 'تعذر جلب المحادثات');
};

export const getConversationMessages = async ({ token, conversationId, page = 1, limit = 30 }) => {
  const response = await fetch(
    `${API_URL}/api/messages/conversations/${conversationId}?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: getAuthHeaders(token),
    }
  );

  return parseResponse(response, 'تعذر جلب رسائل المحادثة');
};

export const sendMessage = async ({ token, conversationId, content }) => {
  const response = await fetch(`${API_URL}/api/messages/conversations/${conversationId}`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ content }),
  });

  return parseResponse(response, 'تعذر إرسال الرسالة');
};

export const getUnreadCount = async (token) => {
  const response = await fetch(`${API_URL}/api/messages/unread`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  return parseResponse(response, 'تعذر جلب عدد الرسائل غير المقروءة');
};

