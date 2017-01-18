'use strict';

angular.module('passportApp')
.factory("DataService", function(Restangular) {
  return {
    getCountries: function() {
    	return Restangular.all('data').get('countries');
    },
    getProvinces: function(country) {
    	return Restangular.all('data').customGET('provinces', country);
    }
  };
});