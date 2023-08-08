// models/form.js
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true,
    enum: ["contactUs", "hiring"],
  },
  // Define fields common to all forms
  title: String,
  description: String,
  // Other common fields
  // ...
  // Define dynamic fields based on form type
  dynamicFields: Object,
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
