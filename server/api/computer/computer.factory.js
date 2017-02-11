var Factory = require('rosie').Factory;

var computer = new Factory()
  .sequence('id')
  .attr('name', ['id'], function(id) {
    return 'Comp' + id;
  })
  .attr('description', 'a new computer')
  .attr('price', ['id'], function(id) {
    return 100 * Number(id);
  })
  .attr('brand', ['id'], function(id) {
    let brands = ['Acer', 'Dell', 'Lenovo'];
    return brands[id % brands.length];
  })
  .attr('cpu', ['id'], function(id) {
    let cpus = ['i5-4750K', 'i7-6500', 'i7-6850K'];
    return cpus[id % cpus.length];
  })
  .attr('gpu', ['id'], function(id) {
    let gpus = ['GTX 1050', 'GTX 1060', 'GTX 1070'];
    return gpus[id % gpus.length];
  })
  .attr('motherboard', ['id'], function(id) {
    let mobos = ['Intel', 'AMD'];
    return mobos[id % mobos.length];
  })
  .attr('onSale', false)
  .attr('onlineOnly', false)
  .attr('featured', true)
  .attr('reviews')
  .attr('pictures')

module.exports = computer;
