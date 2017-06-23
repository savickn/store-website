'use strict';

angular.module('passportApp')
  .factory('SaleService', function (Restangular) {

    /*var rest =
      Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setFullResponse(false);
      });*/

    return {
      getSaleInfo: function() {
        return Restangular.all('sales').customGET('new');
      },
      /*newSale: function() {
        return fetch('api/sales/new').then((response) => {
          console.log(response)
          response.json();
        });
      },*/
      applyPromotion: function(code) {
        return Restangular.all('sales').customGET('apply', {promoCode: code});
      },
      getSales: function() {
        return Restangular.all('sales').getList();
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
  });
