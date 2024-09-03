const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');

app.use(express.json());
app.use('/api', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});