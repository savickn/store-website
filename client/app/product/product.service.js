'use strict';

angular.module('passportApp')
  .factory('ProductService', function (Restangular) {
    var restAngular =
      Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setFullResponse(true);
      });

    return {
      getFeatured: function() {
        return Restangular.all('products').customGET('featured');
      },
      getRecommended: function(productId) {
        return Restangular.one('products', productId).customGET('recommended');
      },
      addProduct: function(product) {
      	return Restangular.all('products').post(product);
      },
      searchProducts: function(searchObj, pageObj) {
        return restAngular.all('products').customGET('search', {search: searchObj, pagination: pageObj});
      },
      removeProduct: function(productId) {
        return Restangular.one('products', productId).remove();
      }
    };
  });
