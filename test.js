"use strict";

// Require libraries
const mongoose = require('mongoose')

// Require models
const BlogPost = require('./models/BlogPost')

// Connect to db
mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser: true});

// Hard code blog post id for testing - TODO: adjust as necessary
var id = "605d16b1b0e8f94779dacaea"

BlogPost.findByIdAndDelete(id,{
    title:'updated title'
},(error,blogspot)=>{
    console.log(error,blogspot)
})
