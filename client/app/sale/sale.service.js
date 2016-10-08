'use strict';

angular.module('passportApp')
  .factory('SaleService', function (Restangular) {
    
    var restAngular = 
      Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setFullResponse(true);
        //.setBaseUrl('api');
      }); 

    var service = {
      getSales: function() {
        return restAngular.all('sales').getList(); 
      },
      getSale: function(saleId) {
        return Restangular.one('sales', saleId).get(); 
      },
      addSale: function(sale) {
        return Restangular.all('sales').post(sale);
      },
      updateSale: function(sale) {
        return Restangular.one('sales', sale._id).customPUT(sale);
      },
      removeSale: function(saleId) {
        return Restangular.one('sales', saleId).remove();
      }
    };
    
    return service;
  });
