"use strict";

// Require libraries
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Enable passport
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',UserSchema);
