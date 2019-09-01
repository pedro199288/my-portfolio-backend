'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The schema of a collection's document
var PersonalDataSchema = Schema({
    key: String,
    text: String,
    value: String,
    link: Boolean
});

module.exports = mongoose.model('personal_data', PersonalDataSchema, 'personal_data');