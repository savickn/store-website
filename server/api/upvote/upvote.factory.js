var Factory = require('rosie').Factory;

var upvote = Factory.define('upvote')
  .sequence('id')
  .attr('date', function() {return Date.now()})
  .attr('userName')
  .attr('userId')

module.exports = upvote;
