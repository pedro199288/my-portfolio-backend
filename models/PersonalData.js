'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalDataSchema = Schema({
    key: String,
    text: String,
    value: String,
});

module.exports = mongoose.model('personal_data', PersonalDataSchema);