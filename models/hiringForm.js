// models/hiringForm.js
const mongoose = require("mongoose");

const hiringFormSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: String, required: true },
  profileAppliedFor: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  experienceDescription: { type: String, required: true },
  uploadResume: { type: String, required: true },
});

const HiringForm = mongoose.model("HiringForm", hiringFormSchema);
module.exports = HiringForm;
