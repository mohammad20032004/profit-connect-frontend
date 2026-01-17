// Utility functions for formatting data

/**
 * Format a date to a readable string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale string (default: 'ar-SA')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'ar-SA') => {
  if (!date) return '';
  return new Date(date).toLocaleDateString(locale);
};

/**
 * Format a number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'SAR')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'SAR') => {
  if (amount === null || amount === undefined) return '';
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

