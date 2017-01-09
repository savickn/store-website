'use strict';

angular.module('passportApp')
  .controller('OrderUploadCtrl', function ($scope, $timeout,
      Auth, OrderService, AlertService) {
    $scope.isAdmin = Auth.isAdmin();

    ///////////////////////////////////////////////////////////////////////

    $scope.newOrder = {};

    //Add Orders
    $scope.addOrder = function() {
      if($scope.orderform.$valid) {
        
      }
    };

  });
