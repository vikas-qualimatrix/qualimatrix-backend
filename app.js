// index.js
require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const db = require('./db');
// const blogRoutes = require('./routes/blogs');
// const formRoutes = require('./routes/forms');
// const authRoutes = require('./routes/auth');

// // Middlewares
// app.use(bodyParser.json());
// app.use(cors());

// // Use the routes
// app.use('/api', blogRoutes);
// app.use('/api', formRoutes);
// app.use('/api/auth', authRoutes);
// app.get("/hell", function (req, res) {
//     res.send("helllllll")
// });

// Start server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

//const mongoose = require('mongoose');


const express = require("express")
const app = express()

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB successfully!');
// });


app.get("/", function (req, res) {
    res.send("Hello Vicky")
});

app.get("/test", function (req, res) {
    res.send("Testing Vicky")
});

app.get("/testing", function (req, res) {
    res.send("vikas")
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// app.listen(process.env.PORT || 5000);

module.exports = app;