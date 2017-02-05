var Factory = require('rosie').Factory;

var address = new Factory()
  .sequence('id')
  .attr('nickname', ['id'], function(type, id) {
    return 'billing' + id;
  })
  .attr('street', ['id'], function(id) {
    return 'street' + id;
  })
  .attr('postalCode', 'm9f2h2')
  .attr('city', ['id'], function(id) {
    return 'city' + id;
  })
  .attr('country', ['id'], function(id) {
    var countryList = ['Canada', 'USA'];
    return countryList[id % 2];
  })
  .attr('province', ['id', 'country'], function(id, country) {
    var provinceList = {
    	'Canada': ['Alberta', 'British Columbia', 'Saskachewan', 'Manitoba', 'Ontario'],
    	'USA': ['New York', 'California', 'Colorado']
    };
    var provinces = provinceList[country];
    return provinces[id % provinces.length];
  })

module.exports = address;
