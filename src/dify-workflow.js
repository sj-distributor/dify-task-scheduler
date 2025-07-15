const { DifyApi } = require('./dify-api');
const { config } = require('./config');

class DifyWorkflowTask {
  constructor(token) {
    this.token = token;
    this.result = null;
  }

  async run() {
    try {
      const client = new DifyApi(this.token, config.difyBaseUrl);
      const inputs = JSON.parse(config.difyInputs);
      
      const request = {
        inputs,
        response_mode: config.responseMode,
        user: config.difyUser,
      };
      
      const response = await client.executeWorkflow(request);
      this.result = response.data.outputs || JSON.stringify(response.data);
      
      return {
        success: true,
        result: this.result
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  toString() {
    return this.result || '';
  }
}

module.exports = { DifyWorkflowTask };