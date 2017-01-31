var Factory = require('rosie').Factory;
var AddressFactory = require('../address/address.factory.js')

var user = Factory.define('user')
  .sequence('id')
  .sequence('name', function(i) { return 'user' + i; })
  .sequence('email', function(i) { return 'user' + i + '@example.com'; })
  .attr('onlineCredit', 0)
  .attr('role', 'user')
  .attr('phoneNumber', '645-765-4432')

  .attr('wishlist', {})
  //.attr('reward')
  //.attr('orders')
  //.attr('paymentMethods')
  .attr('billingAddress', {})
  //.attr('shippingAddresses')

  // Define `position` to depend on `id`.
  .attr('promotionalEmails', ['id'], function(id) {
    var values = [true, false];
    return values[id % values.length];
  })

//var user_wishlist = Factory.define('user-wishlist').extend('user')
//  .attr('state', 'disabled');

module.exports = user;
