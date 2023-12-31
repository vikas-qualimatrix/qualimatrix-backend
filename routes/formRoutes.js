// // routes/forms.js
// const express = require('express');
// const router = express.Router();
// const Form = require('../models/form');
// const jwt = require('jsonwebtoken');

// // Middleware to check for a valid JWT
// const authenticateUser = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//         return res.status(401).json({ error: 'Authentication required.' });
//     }

//     jwt.verify(token, 'your_secret_key', (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ error: 'Invalid token.' });
//         }

//         req.userId = decoded.userId;
//         next();
//     });
// };
// // Create a new form
// router.post('/forms', async (req, res) => {
//     try {
//         const form = new Form(req.body);
//         await form.save();
//         res.status(201).json(form);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// // Get all forms
// router.get('/forms', async (req, res) => {
//     try {
//         const forms = await Form.find();
//         res.json(forms);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Other CRUD operations (update, delete) for forms can be added here

// module.exports = router;

// routes/formRoutes.js
const express = require("express");
const router = express.Router();
const Form = require("../models/form");

// Create a new form submission
router.post("/submit", async (req, res) => {
  try {
    const formData = req.body; // Request body should contain the form data
    const newForm = new Form(formData);
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error submitting form", error: error.message });
  }
});

// Get all form submissions
// Get all form submissions based on formType
router.get("/submissions", async (req, res) => {
  const { formType } = req.query;

  try {
    let submissions;

    if (formType) {
      submissions = await Form.find({ formType });
    } else {
      submissions = await Form.find();
    }

    res.json(submissions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching submissions", error: error.message });
  }
});

module.exports = router;
