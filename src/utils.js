/**
 * Parse semicolon-separated tokens string into array
 * @param {string} tokenString - Semicolon-separated tokens
 * @returns {string[]} Array of tokens
 */
function parseTokens(tokenString) {
  if (!tokenString) return [];
  return tokenString.split(';').map(token => token.trim()).filter(token => token.length > 0);
}

/**
 * Mask token for logging (show only first 10 characters)
 * @param {string} token - Full token string
 * @returns {string} Masked token
 */
function maskToken(token) {
  return token.substring(0, 10) + '...';
}

module.exports = {
  parseTokens,
  maskToken
};