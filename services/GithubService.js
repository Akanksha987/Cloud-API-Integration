const CloudApp = require('./CloudApp');

class GithubService extends CloudApp {
  constructor(token) {
    super('https://api.github.com', token);
  }

  async addUser(user) {
    return this.makeRequest('POST', '/users', user);
  }

  async listUsers() {
    return this.makeRequest('GET', '/users');
  }

  async deleteUser(userId) {
    return this.makeRequest('DELETE', `/users/${userId}`);
  }
}

module.exports = GithubService;
