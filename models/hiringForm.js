// models/hiringForm.js
const mongoose = require("mongoose");

const hiringFormSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: String, required: true },
  jobProfile: { type: String, required: true },
  contactPhoneNumber: { type: String, required: true },
  experienceDescription: { type: String, required: true },
  uploadFile: { type: String },
});

const HiringForm = mongoose.model("HiringForm", hiringFormSchema);
module.exports = HiringForm;
