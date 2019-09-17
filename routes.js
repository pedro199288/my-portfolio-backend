'use strict'

const express = require('express');
const router = express.Router();

// requires for controllers
const PersonalDataController = require('./controllers/PersonalData'); // Declare Controller for the routes
const SkillController = require('./controllers/Skill'); // Declare Controller for the routes
const ExperienceController = require('./controllers/Experience'); // Declare Controller for the routes
const EducationController = require('./controllers/Education'); // Declare Controller for the routes
const ProjectController = require('./controllers/Project'); // Declare Controller for the routes
const AuthController = require('./controllers/Auth');


// Middleware
// this is needed to upload images, see routes/Project.js to see an example
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './uploads'});

// Routes for PersonalData
router.post('/personal-data/save', PersonalDataController.save);
router.get('/personal-data/all', PersonalDataController.getAll);
router.get('/personal-data/:id', PersonalDataController.get);
router.put('/personal-data/:id', PersonalDataController.update);
router.delete('/personal-data/:id', PersonalDataController.delete);

// Routes for Skill
router.post('/skill/save', SkillController.save);
router.get('/skill/all', SkillController.getAll);
router.get('/skill/:id?', SkillController.get);
router.put('/skill/:id', SkillController.update);
router.delete('/skill/:id', SkillController.delete);

// Routes for Experience
router.post('/experience/save', ExperienceController.save);
router.get('/experience/all/:limit?', ExperienceController.getAll);
router.get('/experience/all', ExperienceController.getAll);
router.get('/experience/:id?', ExperienceController.get);
router.put('/experience/:id', ExperienceController.update);
router.delete('/experience/:id', ExperienceController.delete);

// Routes for Education
router.post('/education/save', EducationController.save);
router.get('/education/all/:limit?', EducationController.getAll);
router.get('/education/all', EducationController.getAll);
router.get('/education/:id?', EducationController.get);
router.put('/education/:id', EducationController.update);
router.delete('/education/:id', EducationController.delete);

// Routes for Project
router.post('/project/save', ProjectController.save);
router.get('/project/all/:limit?', ProjectController.getAll);
router.get('/project/all', ProjectController.getAll);
router.get('/project/:id?', ProjectController.get);
router.put('/project/:id', ProjectController.update);
router.delete('/project/:id', ProjectController.delete);
router.post('/project/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/project/get-image/:image', ProjectController.getImage);

// Route for authentication 
router.post('/auth', AuthController.auth);

module.exports = router;