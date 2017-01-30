'use strict';

angular.module('passportApp')
  .controller('OrderCollectionCtrl', function ($scope, Auth, OrderService) {
    $scope.orders = {};
    $scope.errors = {};

    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.searchOrders = function(query) {
      var options  = {
        page: $scope.currentPage,
        perPage: $scope.pageSize
      };
      OrderService.searchOrders(query, options).then(function(orders) {
        console.log(orders);
        $scope.orders = orders;
      }).catch(function(err) {
        console.log(err);
      })
    }

  });
