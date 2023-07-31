// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./db');
const blogRoutes = require('./routes/blogs');
const formRoutes = require('./routes/forms');
const authRoutes = require('./routes/auth');

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Use the routes
app.use('/api', blogRoutes);
app.use('/api', formRoutes);
app.use('/api/auth', authRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
