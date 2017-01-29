'use strict';

angular.module('passportApp')
  .controller('OrderCollectionCtrl', function ($scope, Auth, OrderService) {
    $scope.orders = {};

    $scope.searchOrders = function(query) {
      OrderService.searchOrders(query).then(function(orders) {
        $scope.orders = orders;
      }).catch(function(err) {
        console.log(err);
      })
    }

  });
