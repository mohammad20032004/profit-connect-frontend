const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const getHeaders = (token, withJson = true) => {
  const headers = {};

  if (withJson) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const parseResponse = async (response, fallbackMessage) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
};

export const createCompany = async ({ token, companyData }) => {
  const response = await fetch(`${API_URL}/api/companies`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(companyData),
  });

  return parseResponse(response, 'Failed to create company');
};

export const getCompanies = async (token) => {
  const response = await fetch(`${API_URL}/api/companies`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to load companies');
};

export const getCompanyById = async ({ token, companyId }) => {
  const response = await fetch(`${API_URL}/api/companies/${companyId}`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to load company');
};

export const toggleCompanyFollow = async ({ token, companyId }) => {
  const response = await fetch(`${API_URL}/api/companies/${companyId}/follow`, {
    method: 'POST',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to update company follow status');
};

export const addCompanyAdmin = async ({ token, companyId, newAdminId }) => {
  const response = await fetch(`${API_URL}/api/companies/${companyId}/admins`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({ newAdminId }),
  });

  return parseResponse(response, 'Failed to add company admin');
};

export const getPendingCompanies = async (token) => {
  const response = await fetch(`${API_URL}/api/admin/companies/pending`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to load pending companies');
};

export const updateCompanyStatus = async ({ token, companyId, status }) => {
  const response = await fetch(`${API_URL}/api/admin/companies/${companyId}/status`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify({ status }),
  });

  return parseResponse(response, 'Failed to update company status');
};
