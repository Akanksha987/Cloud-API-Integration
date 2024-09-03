const CloudApp = require('./CloudApp'); 
class CalendlyService extends CloudApp {
  constructor(token) {
    super('https://api.calendly.com', token);
  }

  async listUsers() {
    return this.makeRequest('GET', '/users/me');
  }

  async inviteUserToOrganization(uuid, email) {
    const invitationData = { email }; 
    return this.makeRequest('POST', `/organizations/${uuid}/invitations`, invitationData);
  }

  async removeUserFromOrganization(uuid, userId) {
    return this.makeRequest('DELETE', `/organizations/${uuid}/invitations/${userId}`);
  }
}

module.exports = CalendlyService;
