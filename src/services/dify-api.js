const axios = require('axios');

class DifyApi {
  constructor(token, baseUrl) {
    this.token = token;
    this.baseUrl = baseUrl;
  }

  async executeWorkflow(request) {
    const url = `${this.baseUrl}/workflows/run`;
    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(url, request, { headers });
    return response.data;
  }
}

module.exports = { DifyApi };