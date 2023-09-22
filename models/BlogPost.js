"use strict";

// Require libraries
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    datePosted:{
        type: Date,
        default: new Date()
    },
    image: {
        type: String,
        required: true
    }
});

const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
module.exports = BlogPost;
