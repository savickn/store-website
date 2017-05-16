var Factory = require('rosie').Factory;

function addTrailingZeroes(number) {
  var num = number.toString();
  while(num.length < 16) {
    num += "0";
  }
  return num;
}

var payment = Factory.define('payment')
  .sequence('id')
  .attr('userName', ['id'], function(id) {
    return 'user payment ' + id;
  })
  .attr('cardType', ['id'], function() {
    var cards = ['MasterCard', 'Visa', 'American Express'];
    return cards[id % cards.length];
  })
  .attr('cardNumber', ['id', 'cardType'], function(id, cardType) {
    var numbers = {
        'MasterCard': '5',
        'Visa': '4',
        'American Express': '3'
    };
    var num = numbers[cardType].toString();
    num += id.toString();
    num = addTrailingZeroes(num);
    return num;
  })
  .attr('expiryDate', function() {
    return new Date('January', '2018');
  })
  .attr('user')

module.exports = payment;
