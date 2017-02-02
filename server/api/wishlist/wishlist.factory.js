var Factory = require('rosie').Factory;

var wishlist = Factory.define('wishlist')
  .sequence('id')
  .sequence('name', function(i) { return 'wishlist' + i; })
  .sequence('email', function(i) { return 'wishlist' + i + '@example.com'; })
  .attr('onlineCredit', 0)
  .attr('role', 'wishlist')
  .attr('phoneNumber', '645-765-4432')

  //.attr('wishlist', {})
  //.attr('reward')
  //.attr('orders')
  //.attr('paymentMethods')
  //.attr('billingAddress', {})
  //.attr('shippingAddresses')

  // Define `position` to depend on `id`.
  .attr('promotionalEmails', ['id'], function(id) {
    var values = [true, false];
    return values[id % values.length];
  })

//var wishlist_wishlist = Factory.define('wishlist-wishlist').extend('wishlist')
//  .attr('state', 'disabled');

module.exports = wishlist;
