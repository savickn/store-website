'use strict';

angular.module('passportApp')
  .controller('OrderCollectionCtrl', function ($scope, Auth, OrderService) {
    $scope.orders = {};
    $scope.errors = {};
    $scope.orderQuery = {};

    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.searchOrders = function(form, query) {
      $scope.submitted = true;
      var options  = {
        page: $scope.currentPage,
        perPage: $scope.pageSize
      };
      if(form.$valid) {
        OrderService.searchOrders(query, options).then(function(orders) {
          $scope.submitted = false;
          $scope.orders = orders;
          $scope.orderQuery = {};
        }).catch(function(err) {
          console.log(err);
        })
      };
    };
  });
