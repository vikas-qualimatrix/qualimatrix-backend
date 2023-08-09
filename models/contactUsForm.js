// models/contactUsForm.js
const mongoose = require("mongoose");

const contactUsFormSchema = new mongoose.Schema({
  contactName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  postcode: { type: String, required: true },
  contactPhoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  uploadFile: { type: String },
});

const ContactUsForm = mongoose.model("ContactUsForm", contactUsFormSchema);
module.exports = ContactUsForm;
