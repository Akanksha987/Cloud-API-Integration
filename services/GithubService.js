const axios = require('axios');

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Authorization: `token ${process.env.GITHUB_API_KEY}` }
});

exports.addUser = async (user) => {
  const { username, repoOwner, repoName, permission } = user;

  if (!username || !repoOwner || !repoName) {
    throw new Error('Username, repoOwner, and repoName are required');
  }

  try {
    const response = await githubApi.put(
      `/repos/${repoOwner}/${repoName}/collaborators/${username}`,
      { permission: permission || 'push' }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add user: ${error.response ? error.response.data.message : error.message}`);
  }
};

exports.listUsers = async () => {
  const response = await githubApi.get('/users');
  return response.data;
};

exports.deleteUser = async (userId) => {
  const { username, repoOwner, repoName } = userId;

  if (!username || !repoOwner || !repoName) {
    throw new Error('Username, repoOwner, and repoName are required');
  }

  try {
    const response = await githubApi.delete(
      `/repos/${repoOwner}/${repoName}/collaborators/${username}`
    );
    return { message: 'User removed successfully', status: response.status };
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.response ? error.response.data.message : error.message}`);
  }
};
