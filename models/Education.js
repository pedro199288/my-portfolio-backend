'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The schema of a collection's document
const EducationSchema = Schema({
    key: String,
    date: {
        start: Date | String,
        end: Date | String,
    },
    center: String,
    name: String,
    clarification: String,
    link: String
});

module.exports = mongoose.model('education', EducationSchema, 'education');