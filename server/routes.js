/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Links basic routes to Express router, e.g. '/api/things' with 'thing/index.js'
  app.use('/api/users', require('./api/user'));
  app.use('/api/pictures', require('./api/picture'));
  app.use('/api/reviews', require('./api/review'));
  app.use('/api/upvotes', require('./api/upvote'));
  app.use('/api/computers', require('./api/computer'));
  app.use('/api/monitors', require('./api/monitor'));
  app.use('/api/keyboards', require('./api/keyboard'));
  app.use('/api/products', require('./api/product'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
