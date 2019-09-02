'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The schema of a collection's document
const ExperienceSchema = Schema({
    key: String,
    date: {
        start: Date,
        end: Date,
    },
    company: String,
    rol: String,
    description: String
});

module.exports = mongoose.model('experience', ExperienceSchema, 'experience');