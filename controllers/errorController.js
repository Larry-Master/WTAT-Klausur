"use strict";

// Require libraries
const httpStatus = require("http-status-codes");

module.exports = {
  pageNotFoundError:
    (req,res) =>{
      res.status(httpStatus.NOT_FOUND);
      res.render('error', {
          bgimage: 'img/home-bg.jpg',
          heading: 'Error ' + httpStatus.NOT_FOUND + ': Page not found',
          subheading: 'Please check the URL'
      });
    },

    internalServerError:
      (error, req, res, next) => {
        console.log(`ERROR occurred: ${error.stack}`);
        res.status(httpStatus.INTERNAL_SERVER_ERROR);
        res.render('error', {
            bgimage: 'img/home-bg.jpg',
            heading: 'Error ' + httpStatus.INTERNAL_SERVER_ERROR + ': Internal Server Error',
            subheading: 'Please check the server console for more details'
        });
    }
  }
