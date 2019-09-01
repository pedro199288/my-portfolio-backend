'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The schema of a collection's document
const PersonalDataSchema = Schema({
    key: String,
    text: String,
    value: String,
    image: String,
});

module.exports = mongoose.model('personal_data', PersonalDataSchema, 'personal_data');