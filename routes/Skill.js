'use strict'

const express = require('express');
const router = express.Router();

// Middleware
// this is needed to upload images, see routes/Project.js to see an example
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './uploads'});

// Routes for Skill
const SkillController = require('../controllers/Skill'); // Declare Controller for the routes

router.post('/skill/save', SkillController.save);
router.get('/skill/all', SkillController.getAll);
router.get('/skill/:id?', SkillController.get);
router.put('/skill/:id', SkillController.update);
router.delete('/skill/:id', SkillController.delete);

module.exports = router;