'use strict'

const express = require('express');
const router = express.Router();

// Middleware
// this is needed to upload images, see routes/Project.js to see an example
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './uploads'});

// Routes for Experience
const ExperienceController = require('../controllers/Experience'); // Declare Controller for the routes

router.post('/experience/save', ExperienceController.save);
router.get('/experience/all', ExperienceController.getAll);
router.get('/experience/:id?', ExperienceController.get);
router.put('/experience/:id', ExperienceController.update);
router.delete('/experience/:id', ExperienceController.delete);

module.exports = router;