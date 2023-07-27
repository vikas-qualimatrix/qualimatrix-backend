// routes/blogs.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');


// Middleware to check for a valid JWT
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Authentication required.' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token.' });
        }

        req.userId = decoded.userId;
        next();
    });
};

// Create a new blog
router.post('/blogs', async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all blogs
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Other CRUD operations (update, delete) for blogs can be added here

module.exports = router;
