'use strict';

angular.module('passportApp')
  .factory('OrderService', function (Restangular) {
    
    return {
      /*getorders: function(options) {
        //if(options.page) { console.log(options.page) }
        //if(options.perPage) { console.log(options.perPage) }
        return restAngular.all('orders').getList({page: options.page, perPage: options.perPage}); 
      },*/
      getOrders: function() {
        return {};
      },
      getOrder: function(orderId) {
        return Restangular.one('orders', orderId).get(); 
      },
      addOrder: function(order) {
        return Restangular.all('orders').post(order);
      },
      updateOrder: function(order) {
        return Restangular.one('orders', order._id).customPUT(order);
      },
      removeOrder: function(orderId) {
        return Restangular.one('orders', orderId).remove();
      },
      searchOrders: function(searchObj) {
        return Restangular.all('orders').customGET('search', searchObj);
      }
    };
  });
