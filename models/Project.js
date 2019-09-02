'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The schema of a collection's document
const ProjectSchema = Schema({
    key: String,
    name: String,
    company: String,
    tools: [String],
    description: String,
    website: String,
    image: String,
});

module.exports = mongoose.model('project', ProjectSchema, 'projects');