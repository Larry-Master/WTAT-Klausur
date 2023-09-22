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
    },
    // #add_fields_begin
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    }

});

// Define a virtual field for the "score"
BlogPostSchema.virtual('score').get(function () {
  return this.likes - this.dislikes;
});

// #add_fields_end
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
module.exports = BlogPost;
