'use strict';

angular.module('passportApp')
  .controller('OrderUploadCtrl', function ($scope, $timeout, Auth, OrderService, AlertService, ngCart) {
    $scope.isAdmin = Auth.isAdmin();

    $scope.products = ngCart.getItems();

    $scope.shippingAddresses = Auth.getShippingAddresses() || [];
    $scope.billingAddress = Auth.getCurrentUser().billingAddress || '';

    $scope.newOrder = {
      shippingAddress: {},
      billingAddress: {}
    };

    $scope.showValues = function() {
      console.log($scope.newOrder);
    }
    

    //Add Orders
    $scope.addOrder = function() {
      if($scope.orderForm.$valid) {
        
      }
    };

  });
