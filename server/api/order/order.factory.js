var Factory = require('rosie').Factory;

function addLeadingZeroes(number) {
  var num = number.toString();
  while(num.length < 10) {
    num = "0" + num;
  };
  return num;
};

var order = Factory.define('order')
  .sequence('id')
  .attr('orderNumber', ['id'], function(id) {
    return addLeadingZeroes(id);
  })
  .attr('subTotal' 1000)
  .attr('tax', 0.15)
  .attr('shippingCost', 10)
  .attr('shippingAddress')
  .attr('billingAddress')
  .attr('paymentMethod')

  .attr('orderDate', function() {
    return Date.now();
  })
  .attr('status', 'Awaiting Pre-Auth')
  .attr('products')
  .attr('giftee')
  .attr('customer')

module.exports = order;
