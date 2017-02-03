var Factory = require('rosie').Factory;

var review = Factory.define('review')
  .sequence('id')
  .attr('rating', 9)
  .attr('summary', ['id'], function(id) {
    return 'good product' + id;
  })
  .attr('verified', false)
  .attr('upvotes', [])
  .attr('author')
  .attr('product')


module.exports = review;
