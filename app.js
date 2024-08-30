const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler');

dotenv.config({ path: path.resolve(__dirname, 'config', '.env') });

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
