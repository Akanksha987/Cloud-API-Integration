const CloudApp = require('./CloudApp');

class DropboxService extends CloudApp {
  constructor(token) {
    super('https://api.dropboxapi.com/2', token);
    this.contentUrl = 'https://content.dropboxapi.com/2';
  }

  async listFiles(path = '') {
    return this.makeRequest('POST', '/files/list_folder', { path });
  }

  async uploadFile(path, fileContent) {
    return this.makeRequest('POST', '/files/upload', fileContent, {
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({
        path,
        mode: 'add',
        autorename: true,
        mute: false,
      }),
    });
  }

  async deleteFile(path) {
    return this.makeRequest('POST', '/files/delete_v2', { path });
  }
}

module.exports = DropboxService;
