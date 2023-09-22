"use strict";

// Require libraries
const passport = require('passport');

// Require models
const User = require('../models/User.js');

// Helper method
const getUserParams = body => {
    return {
      username: body.username,
      password: body.password
    };
  };

module.exports = {
  showLogin:
      (req,res) =>{
          res.render('login', {
            bgimage: '/img/contact-bg.jpg',
            heading: 'Login',
            subheading: 'Please enter user name and password'
          })
      },

  login:
      passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Failed to login.",
        successRedirect: "/",
        successFlash: "Logged in!"
      }),

  logout:
      (req,res) =>{
          req.session.destroy(()=>{
            res.redirect('/')
          })
      },

  showRegister:
      (req,res) =>{
          res.render('register',{
              bgimage: '/img/contact-bg.jpg',
              heading: 'Register a new account',
              subheading: 'Please enter user name and password'
          });
      },

  register:
      (req,res, next) =>{
          if (req.skip) next();

          let newUser = new User(getUserParams(req.body));

          User.register(newUser, req.body.password, (error, user) =>{
              if (user) {
                req.flash("success", `${user.username} created successfully!`);
                return res.redirect('/');
              } else {
                req.flash('error', error.message);
                req.flash('username', req.body.username);
                req.flash('password', req.body.password);
                return res.redirect('/users/register');
              }
          });
      }
}
