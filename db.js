// db.js
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://vikas:qualimatrix@qualimatrix.6irk4ri.mongodb.net/qualimatrix-backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB successfully!');
});
