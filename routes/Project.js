'use strict'

const express = require('express');
const router = express.Router();

// Middleware
// this is needed to upload images, see routes/Project.js to see an example
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './uploads'});

// Routes for Skill
const ProjectController = require('../controllers/Project'); // Declare Controller for the routes

router.post('/project/save', ProjectController.save);
router.get('/project/all', ProjectController.getAll);
router.get('/project/:id?', ProjectController.get);
router.put('/project/:id', ProjectController.update);
router.delete('/project/:id', ProjectController.delete);
router.post('/upload-image/:id', multipartMiddleware, PersonalDataController.uploadImage);

module.exports = router;