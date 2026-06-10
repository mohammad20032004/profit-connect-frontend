import apiClient from '@/lib/apiClient';

/**
 * Fetches a paginated list of posts.
 * @param {object} params - The parameters for fetching posts.
 * @param {string} params.token - The JWT token for authentication.
 * @param {number} [params.page=1] - The page number to fetch.
 * @param {number} [params.limit=10] - The number of posts per page.
 * @returns {Promise<any>} A list of posts.
 */
export const getPosts = ({ token, page = 1, limit = 10 }) => {
  // apiClient can also handle query parameters, but for clarity, we build it here.
  const endpoint = `/posts?page=${page}&limit=${limit}`;
  return apiClient(endpoint, { token });
};

/**
 * Creates a new post.
 * @param {object} params - The parameters for creating a post.
 * @param {string} params.token - The JWT token for authentication.
 * @param {object} params.postData - The data for the new post.
 * @returns {Promise<any>} The newly created post.
 */
export const createPost = ({ token, postData }) => {
  return apiClient('/posts', { 
    method: 'POST', 
    body: postData, 
    token 
  });
};

/**
 * Toggles a like on a post.
 * @param {object} params - The parameters for toggling a like.
 * @param {string} params.token - The JWT token for authentication.
 * @param {string} params.postId - The ID of the post to like/unlike.
 * @returns {Promise<any>} The updated post like status.
 */
export const toggleLike = ({ token, postId }) => {
  return apiClient(`/posts/${postId}/like`, { 
    method: 'POST', 
    token 
  });
};

/**
 * Adds a comment to a post.
 * @param {object} params - The parameters for adding a comment.
 * @param {string} params.token - The JWT token for authentication.
 * @param {string} params.postId - The ID of the post to comment on.
 * @param {string} params.content - The content of the comment.
 * @returns {Promise<any>} The newly added comment.
 */
export const addComment = ({ token, postId, content }) => {
  return apiClient(`/posts/${postId}/comments`, { 
    method: 'POST', 
    body: { content }, 
    token 
  });
};
