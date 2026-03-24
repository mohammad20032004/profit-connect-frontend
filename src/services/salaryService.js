const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const buildQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

const parseResponse = async (response, fallbackMessage) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
};

export const getSalaries = async (filters = {}) => {
  const response = await fetch(`${API_URL}/api/salaries${buildQueryString(filters)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return parseResponse(response, 'Failed to load salary data');
};

export const getSalaryOptions = async () => {
  const response = await fetch(`${API_URL}/api/salaries/options`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return parseResponse(response, 'Failed to load salary filter options');
};

export const getSalaryStats = async (filters = {}) => {
  const response = await fetch(`${API_URL}/api/salaries/stats${buildQueryString(filters)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return parseResponse(response, 'Failed to load salary statistics');
};
