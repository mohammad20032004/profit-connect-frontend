import apiClient from '@/lib/apiClient';

export const createCompany = ({ token, companyData }) => {
  return apiClient('/companies', {
    method: 'POST',
    token,
    body: companyData,
  });
};

export const getCompanies = (token) => {
  return apiClient('/companies', { token });
};

export const getCompanyById = ({ token, companyId }) => {
  return apiClient(`/companies/${companyId}`, { token });
};

/**
 * Toggles the follow status for a company.
 * @param {object} params - The parameters for the request.
 * @param {string} params.token - The JWT token for authentication.
 * @param {string} params.companyId - The ID of the company to follow/unfollow.
 * @returns {Promise<{ isFollowing: boolean, followersCount: number }>} The updated follow status and count.
 */
export const toggleCompanyFollow = ({ token, companyId }) => {
  return apiClient(`/companies/${companyId}/follow`, {
    method: 'POST',
    token,
  });
};

export const addCompanyAdmin = ({ token, companyId, newAdminId }) => {
  return apiClient(`/companies/${companyId}/admins`, {
    method: 'POST',
    token,
    body: { newAdminId },
  });
};

export const getPendingCompanies = (token) => {
  return apiClient('/admin/companies/pending', { token });
};

export const updateCompanyStatus = ({ token, companyId, status }) => {
  return apiClient(`/admin/companies/${companyId}/status`, {
    method: 'PUT',
    token,
    body: { status },
  });
};
