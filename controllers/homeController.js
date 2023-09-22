"use strict";

// Require models
const BlogPost = require('../models/BlogPost');

module.exports = {
  showIndex:
    async (req,res) =>{
      const blogposts = await BlogPost.find({});
      // Uncomment for debugging
      // console.log(req.session);
      res.render('index',{
        bgimage: 'img/home-bg.jpg',
        heading: 'Clean Blog',
        subheading: 'A Blog Theme',
        blogposts: blogposts
      });
    }
}
