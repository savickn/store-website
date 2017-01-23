'use strict';

angular.module('passportApp')
  .controller('OrderUploadCtrl', function ($scope, $timeout, Auth, OrderService, AlertService, ngCart) {
    $scope.isAdmin = Auth.isAdmin();

    $scope.products = ngCart.getItems();

    $scope.billingAddress = Auth.getBillingAddress() || undefined;
    $scope.shippingAddresses = Auth.getShippingAddresses();

    $scope.newAddress = {};

    $scope.newOrder = {
      shippingAddress: {},
      billingAddress: {}
    };

    //Add Orders
    $scope.addOrder = function() {
      if($scope.orderForm.$valid) {
        
      }
    };

  });
