'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The schema of a collection's document
const SkillSchema = Schema({
    key: String,
    text: String,
    value: Number
});

module.exports = mongoose.model('skill', SkillSchema, 'skills');