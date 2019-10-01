'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The schema of a collection's document
const UserSchema = Schema({
    name: String,
    password: String,
});


module.exports = mongoose.model('user', UserSchema);