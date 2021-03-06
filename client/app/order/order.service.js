'use strict';

angular.module('passportApp')
  .factory('OrderService', function (Restangular) {

    return {
      searchOrders: function(searchObj, pageObj) {
        return Restangular.all('orders').customGET('search', {search: searchObj, pagination: pageObj});
      },
      getOrder: function(orderId) {
        return Restangular.one('orders', orderId).get();
      },
      createOrder: function(order) {
        return Restangular.all('orders').post(order);
      },
      updateOrder: function(order) {
        return Restangular.one('orders', order._id).customPUT(order);
      },
      removeOrder: function(orderId) {
        return Restangular.one('orders', orderId).remove();
      }
    };
  });
