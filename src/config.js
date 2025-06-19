const dotenv = require('dotenv');

dotenv.config();

const config = {
  difyBaseUrl: process.env.DIFY_BASE_URL || 'https://api.dify.ai/v1',
  difyToken: process.env.DIFY_TOKEN || '',
  difyInputs: process.env.DIFY_INPUTS || '{}',
  difyUser: process.env.DIFY_USER || 'scheduler-user',
  responseMode: process.env.DIFY_RESPONSE_MODE || 'blocking',
};

module.exports = { config };