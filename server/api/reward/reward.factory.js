var Factory = require('rosie').Factory;

function addLeadingZeroes(number) {
  var num = number.toString();
  while(num.length < 8) {
    num = "0" + num;
  };
  return num;
};

var reward = Factory.define('reward')
  .sequence('id')
  .attr('cardNumber', ['id'], addLeadingZeroes(id))
  .attr('points', 0)
  .attr('user')

module.exports = reward;
