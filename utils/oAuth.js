const axios = require('axios');
const querystring = require('querystring');

const oauthConfig = {
  github: {
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  calendly: {
    authUrl: 'https://calendly.com/oauth/authorize',
    tokenUrl: 'https://calendly.com/oauth/token',
    clientId: process.env.CALENDLY_CLIENT_ID,
    clientSecret: process.env.CALENDLY_CLIENT_SECRET,
  },
  dropbox: {
    authUrl: 'https://dropbox.com/oauth/authorize',
    tokenUrl: 'https://dropbox.com/oauth/token',
    clientId: process.env.DROPBOX_CLIENT_ID,
    clientSecret: process.env.DROPBOX_CLIENT_SECRET,
  },
};

class OAuthConfig {
  static getAuthUrl(service) {
    const config = oauthConfig[service];
    if (!config) {
      throw new Error(`Unsupported service: ${service}`);
    }
    const { authUrl, clientId } = config;
    const redirectUri = `${process.env.BASE_URL}/api/${service}/callback`; // Adjust as needed
    return `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  }

  static async getOAuthToken(service, code) {
    const config = oauthConfig[service];
    if (!config) {
      throw new Error(`Unsupported service: ${service}`);
    }

    const { tokenUrl, clientId, clientSecret } = config;
    const response = await axios.post(tokenUrl, querystring.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      grant_type: 'authorization_code',
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data.access_token;
  }
}

module.exports = OAuthConfig;
