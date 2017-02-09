var Factory = require('rosie').Factory;

var wishlist = new Factory()
  .sequence('id')
  .attr('products')
  .attr('private')
  .attr('user')

module.exports = wishlist;
