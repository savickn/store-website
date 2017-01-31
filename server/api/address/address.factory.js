var Factory = require('rosie').Factory;

var address = Factory.define('address')
  .sequence('id')
  .attr('type', 'Billing')
  .attr('nickname', ['type'], function(type, id) {
    return type + id;
  })
  .attr('street')
  .attr('poBox')
  .attr('aptNum')
  .attr('postalCode')
  .attr('city')
  .attr('province')
  .attr('country')

  .attr('user')


module.exports = address;
