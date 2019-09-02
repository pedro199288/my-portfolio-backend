'use strict'

const express = require('express');
const router = express.Router();

// Middleware
// this is needed to upload images, see routes/Project.js to see an example
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './uploads'});

// Routes for Education
const EducationController = require('../controllers/Education'); // Declare Controller for the routes

router.post('/education/save', EducationController.save);
router.get('/education/all', EducationController.getAll);
router.get('/education/:id?', EducationController.get);
router.put('/education/:id', EducationController.update);
router.delete('/education/:id', EducationController.delete);

module.exports = router;