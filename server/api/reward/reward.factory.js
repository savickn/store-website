var Factory = require('rosie').Factory;

function addLeadingZeroes(number) {
  var num = number.toString();
  while(num.length < 8) {
    num = "0" + num;
  };
  return num;
};

var reward = new Factory()
  .sequence('id')
  .attr('cardNumber', ['id'], function(id) {
    return addLeadingZeroes(id);
  })
  .attr('points')
  .attr('user')

module.exports = reward;
