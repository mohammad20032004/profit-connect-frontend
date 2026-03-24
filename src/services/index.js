// Export all service functions from here
export {
  addCompanyAdmin,
  createCompany,
  getCompanies,
  getCompanyById,
  getPendingCompanies,
  toggleCompanyFollow,
  updateCompanyStatus,
} from './companyService';
export { getCurrentUser, login, signUp } from './authService';
export {
  applyToJob,
  createJob,
  getJobApplicants,
  getJobs,
  getMyApplications,
  updateApplicationStatus,
} from './jobService';
export {
  acceptConnectionRequest,
  getConnections,
  getNetworkRequests,
  rejectConnectionRequest,
  removeConnection,
  sendConnectionRequest,
} from './networkService';
export { getSalaries, getSalaryOptions, getSalaryStats } from './salaryService';
export { addComment, createPost, getPosts, toggleLike } from './postService';
