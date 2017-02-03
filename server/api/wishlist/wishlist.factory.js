var Factory = require('rosie').Factory;

var wishlist = Factory.define('wishlist')
  .sequence('id')
  .attr('products', [])
  .attr('private', false)
  .attr('user')

module.exports = wishlist;
