const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const uploadAvatar = async (token, file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${API_URL}/api/user/profile/avatar`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to upload avatar');
  }

  return data;
};
