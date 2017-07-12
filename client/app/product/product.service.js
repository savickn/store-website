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
      getRecommended: function(productId, offset) {
        return Restangular.one('products', productId).customGET('recommended', {offset: offset});
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
