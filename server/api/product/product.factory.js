var Factory = require('rosie').Factory;


var product = Factory.define('product')
  .sequence('id')
  .attr('name')
  .attr('description')
  .attr('price')
  .attr('brand')
  .attr('reviews', [])
  .attr('pictures', [])
  .attr('onSale')
  .attr('onlineOnly')
  .attr('featured')

module.exports = product;
