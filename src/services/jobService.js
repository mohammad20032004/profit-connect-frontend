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

const buildQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
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

export const getJobs = async (filters = {}) => {
  const queryString = buildQueryString(filters);
  const response = await fetch(`${API_URL}/api/jobs${queryString}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  return parseResponse(response, 'Failed to load jobs');
};

export const createJob = async ({ token, jobData }) => {
  const response = await fetch(`${API_URL}/api/jobs`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(jobData),
  });

  return parseResponse(response, 'Failed to create job');
};

export const applyToJob = async ({ token, jobId, applicationData }) => {
  const response = await fetch(`${API_URL}/api/jobs/${jobId}/apply`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(applicationData),
  });

  return parseResponse(response, 'Failed to submit application');
};

export const getJobApplicants = async ({ token, jobId }) => {
  const response = await fetch(`${API_URL}/api/jobs/${jobId}/applicants`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to load applicants');
};

export const updateApplicationStatus = async ({ token, applicationId, status }) => {
  const response = await fetch(`${API_URL}/api/jobs/applications/${applicationId}/status`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify({ status }),
  });

  return parseResponse(response, 'Failed to update application status');
};

export const getMyApplications = async (token) => {
  const response = await fetch(`${API_URL}/api/jobs/my-applications`, {
    method: 'GET',
    headers: getHeaders(token),
  });

  return parseResponse(response, 'Failed to load job applications');
};
