const githubService = require('../services/GithubService');

exports.addUser = async (req, res, next) => {
  const { cloudApp, user } = req.body;
  try {
    let result;
    switch (cloudApp) {
      case 'github':
        result = await githubService.addUser(user);
        break;
      default:
        throw new Error('Unsupported cloud application');
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const githubUsers = await githubService.listUsers();
    res.status(200).json({ githubUsers });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { cloudApp, userId } = req.params;
  try {
    let result;
    switch (cloudApp) {
      case 'github':
        result = await githubService.deleteUser(userId);
        break;
      default:
        throw new Error('Unsupported cloud application');
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
