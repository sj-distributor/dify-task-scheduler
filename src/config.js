const dotenv = require('dotenv');
dotenv.config();

const config = {
  difyBaseUrl: process.env.DIFY_BASE_URL || 'https://ai-dashboard.solarifyai.com/v1',
  difyTokens: (process.env.DIFY_TOKENS || '').split(';').filter(Boolean),
  difyInputs: process.env.DIFY_INPUTS || '{}',
  difyUser: process.env.DIFY_USER || 'scheduler-user',
  responseMode: process.env.DIFY_RESPONSE_MODE || 'blocking',
};

module.exports = { config };