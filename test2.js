"use strict";

// Require libraries
const mongoose = require('mongoose')

// Require models
const BlogPost = require('./models/BlogPost')

// Connect to db
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

// Create a new BlogPost
BlogPost.create({
    title: 'Test Post',
    desc: 'This is a test.',    
}, (error, blogpost) =>{
    console.log(error,blogpost)
})
