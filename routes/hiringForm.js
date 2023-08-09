// routes/hiringForm.js
const express = require("express");
const router = express.Router();
const HiringForm = require("../models/hiringForm");

router.post("/submit", async (req, res) => {
  try {
    const formData = req.body; // Request body should contain the hiring form data
    const newForm = new HiringForm(formData);
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error submitting hiring form", error: error.message });
  }
});

module.exports = router;
