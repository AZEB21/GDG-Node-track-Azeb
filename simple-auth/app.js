const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { PORT } = require('./env');
require('./config/db');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));