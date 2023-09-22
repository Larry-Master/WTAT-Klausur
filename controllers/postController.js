"use strict";

// Require libraries
const path = require('path');

// Require models
const BlogPost = require('../models/BlogPost');

module.exports = {
  showPost:
    async (req,res) =>{
      const blogpost = await BlogPost.findById(req.params.id)
      res.render('post',{
          _id: blogpost._id,
          bgimage: blogpost.image,
          heading: blogpost.title,
          subheading: 'Posted by ' + blogpost.username + ' on ' + blogpost.datePosted.toDateString(),
          content: blogpost.content,
            // #add_fields_begin
          likes: blogpost.likes,
          dislikes: blogpost.dislikes,
          score: blogpost.score,
          username: blogpost.username,

            // #add_fields_end
      });
  },

  showCreate:
    (req,res) =>{
      if(res.locals.loggedIn){
          return res.render('create', {
              bgimage: '/img/contact-bg.jpg',
              heading: 'Create New Post',
              subheading: 'Please provide title, text and background image'
          });
      }
      res.redirect('/users/login')
    },

  create:
    async (req,res) =>{
      if (req.body.title == null) {
        req.flash("error", "Please provide a title for the post");
        res.redirect('/posts/new');
      } else if (req.body.content == null) {
        req.flash("error", "Please provide content for the post");
        res.redirect('/posts/new');
      } else if (req.files == null || req.files.image == null) {
        req.flash("error", "Please provide a background image");
        res.redirect('/posts/new');
      } else {
        let image = req.files.image;
        image.mv(path.resolve(__dirname,'..','public/img',image.name),
          async (error)=>{
              await BlogPost.create({
                  title: req.body.title,
                  content: req.body.content,
                  username: res.locals.currentUser.username,
                  image:'/img/' + image.name
              });
              res.redirect('/');
          });
        }
      },

  // #increment_begin
    incrementLikes: async (req, res) => {
    try {
      const blogpost = await BlogPost.findById(req.params.id);
      if (!blogpost) {
        return res.status(404).send('BlogPost not found');
      }

      blogpost.likes++;
      await blogpost.save();

      res.status(200).send('Likes incremented successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },


  incrementDislikes: async (req, res) => {
    try {
      const blogpost = await BlogPost.findById(req.params.id);
      if (!blogpost) {
        return res.status(404).send('BlogPost not found');
      }

      blogpost.dislikes++;
      await blogpost.save();

      res.status(200).send('Dislikes incremented successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }, // #increment_end

    //#delete_authorization_begin
    deletePost: async (req, res) => {
  try {
    const postId = req.params.id;
    const blogpost = await BlogPost.findById(postId);

    if (!blogpost) {
      return res.status(404).send('BlogPost not found');
    }

    // Check if the current user is the original author
    if (blogpost.username !== req.user.username) {
      return res.status(403).send('Unauthorized: You are not the author of this post');
    }

    // Proceed with deletion if authorized
    const deletedPost = await BlogPost.findByIdAndRemove(postId);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }

}, // #delete_authorization_end
  }
