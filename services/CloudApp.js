const axios = require('axios');
const logger = require('../utils/logger');

class CloudApp {
  constructor(baseURL, token) {
    if (this.constructor === CloudApp) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.client = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async makeRequest(method, url, data = {}) {
    try {
      const response = await this.client({
        method,
        url,
        data,
      });
      return response.data;
    } catch (error) {
      logger.error(`Error in ${method} request to ${url}: ${error.message}`);
      throw error;
    }
  }
}

module.exports = CloudApp;
