// models/form.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: String,
    description: String,
    // Add other form-related fields here
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form;
