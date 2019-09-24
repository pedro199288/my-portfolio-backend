'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The schema of a collection's document
const ContactSchema = Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
});


module.exports = mongoose.model('contact', ContactSchema, 'contact');