'use strict';

angular.module('passportApp')
.factory("DataService", function(Restangular) {
  var countries = [];
  var selectedCountry = '';

  var provinces = [];
  var selectedProvince = '';

  var cities = [];

  return {
  	/*getCountries: function() {
  		return countries;
  	},
  	getSelectedCountry: function() {
  		return selectedCountry;
  	},
  	getProvinces: function() {
  		return provinces;
  	},
  	setCountries: function(countries) {
  		countries = countries;
  	},
  	setProvinces: function(country, provinces) {
  		selectedCountry = country;
  		provinces = provinces;
  	},*/
    ajaxCountries: function() {
    	return Restangular.all('data').get('countries');
    },
    ajaxProvinces: function(country) {
    	return Restangular.all('data').customGET('provinces', country);
    },
    ajaxTaxes: function(province) {
      return Restangular.all('data').customGET('taxes', {province: province});
    }
  };
});


    /*getCountries: function() {
    	return Restangular.all('data').get('countries');
    },
    getProvinces: function(country) {
    	return Restangular.all('data').customGET('provinces', country);
    }*/
