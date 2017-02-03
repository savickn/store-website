var Factory = require('rosie').Factory;


var computer = Factory.define('computer')
  .sequence('id')
  .attr('name', ['id'], function(id) {
    return 'Comp' + id;
  })
  .attr('description', 'a new computer')
  .attr('price', 500)
  .attr('brand', 'Acer')
  .attr('reviews', [])
  .attr('pictures', [])
  .attr('onSale', false)
  .attr('onlineOnly', false)
  .attr('featured', true)
  .attr('cpu', 'Intel i5-4750K')
  .attr('gpu', 'HD7950')
  .attr('motherboard', 'Intel')

module.exports = computer;
