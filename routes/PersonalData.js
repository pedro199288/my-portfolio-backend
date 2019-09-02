'use strict'

const express = require('express');
const router = express.Router();

// Middleware
// this is needed to upload images, see routes/Project.js to see an example
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './uploads'});

// Routes for PersonalData
const PersonalDataController = require('../controllers/PersonalData'); // Declare Controller for the routes

router.post('/personal-data/save', PersonalDataController.save);
router.get('/personal-data/all', PersonalDataController.getAll); // Gets all personal_data documents
router.get('/personal-data/:id?', PersonalDataController.get);
router.put('/personal-data/:id', PersonalDataController.update);
router.delete('/personal-data/:id', PersonalDataController.delete);



module.exports = router;