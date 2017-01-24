'use strict';

angular.module('passportApp')
  .controller('OrderUploadCtrl', function ($scope, $timeout, Auth, OrderService, AlertService, ngCart) {
    $scope.isAdmin = Auth.isAdmin();

    $scope.products = ngCart.getItems();

    $scope.billingAddress = Auth.getBillingAddress() || {};
    $scope.shippingAddresses = Auth.getShippingAddresses();

    $scope.newOrder = {
      shippingAddress: {},
      billingAddress: {}
    };
    
    $scope.billingState = 'Default';
    $scope.shippingState = 'Default';

    $scope.setBillingState = function(state) {
      $scope.billingState = state;
    }

    $scope.setShippingState = function(state) {
      $scope.shippingState = state;
    }


    //Add Orders
    $scope.checkout = function(form, order) {
      if(form.$valid) {
        
      }
    };

  });
