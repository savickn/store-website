'use strict';

angular.module('passportApp')
  .controller('HistoryCtrl', function ($scope, Auth) {
    $scope.orders = Auth.getOrders();
    console.log($scope.orders);
  });
