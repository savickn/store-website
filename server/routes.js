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
  app.use('/api/computers', require('./api/computer'));
  app.use('/api/monitors', require('./api/monitor'));
  app.use('/api/keyboards', require('./api/keyboard'));
  app.use('/api/products', require('./api/product'));
  app.use('/api/rewards', require('./api/reward'));
  app.use('/api/orders', require('./api/order'));
  app.use('/api/addresses', require('./api/address'));
  app.use('/api/wishlists', require('./api/wishlist'));
  app.use('/api/sales', require('./api/sale'));
  app.use('/api/data', require('./api/data'));
  app.use('/api/payments', require('./api/payment'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // used to render Reset Password form after clicking Reset Email link
  /*app.route('/reset/:id')
    .get(function(req, res) {
      let viewFilePath = 'resetPassword';
      res.status(200);
      res.render(viewFilePath, {data: {token: req.query.resetToken}});
    });*/

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
