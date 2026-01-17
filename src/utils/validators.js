// Validation utility functions

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Saudi format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone number
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^(05|5)[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} True if value is not empty
 */
export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

