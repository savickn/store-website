var Factory = require('rosie').Factory;
var AddressFactory = require('../address/address.factory.js')

var user = new Factory()
  .sequence('id')
  .attr('name', ['id'], function(i) { return 'user' + i; })
  .attr('email', ['id'], function(i) { return 'user' + i + '@example.com'; })
  .attr('password', 'password')
  //.attr('onlineCredit', 0)
  .attr('role', 'user')
  .attr('phoneNumber', '645-765-4432')

  .attr('wishlist')
  .attr('reward')
  .attr('orders')
  .attr('paymentMethods')
  .attr('billingAddress')
  .attr('shippingAddresses')

  .attr('promotionalEmails', ['id'], function(id) {
    var values = [true, false];
    return values[id % values.length];
  })

module.exports = user;
