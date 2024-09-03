const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

module.exports = errorHandler;