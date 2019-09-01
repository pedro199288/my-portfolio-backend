// PersonalData controller routes are here
'use strict'

const express = require('express');
const PersonalDataController = require('./../controllers/PersonalData');

const router = express.Router();

// Middleware
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', PersonalDataController.home);
router.post('/test', PersonalDataController.test);
router.post('/personal-data/save', PersonalDataController.save);
router.get('/personal-data/all', PersonalDataController.getAll);
router.get('/personal-data/:id?', PersonalDataController.get);
router.put('/personal-data/:id', PersonalDataController.update);
router.delete('/personal-data/:id', PersonalDataController.delete);
router.post('/upload-image/:id', multipartMiddleware, PersonalDataController.uploadImage);

module.exports = router;