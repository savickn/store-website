'use strict';

angular.module('passportApp')
  .controller('OrderUploadCtrl', function ($scope, $timeout, Auth, OrderService, AlertService, ngCart, $state, DataService) {
    $scope.isAdmin = Auth.isAdmin();

    $scope.billingAddress = Auth.getBillingAddress()[0];
    $scope.shippingAddresses = Auth.getShippingAddresses();
    $scope.paymentMethods = Auth.getPaymentMethods();

    $scope.newOrder = {
      customer: Auth.getCurrentUser()._id,
      products: ngCart.getItems(),
      shippingAddress: {},
      billingAddress: {},
      paymentMethod: {}
    };

    //make AJAX calls to determine tax/shipping costs
    $scope.getOrderInfo = function(order) {
      $scope.newOrder.subTotal = 0;
      $scope.newOrder.products.forEach(function(product) {
        $scope.newOrder.subTotal += product._price;
      })

      if($scope.newOrder.subTotal > 50) {
        $scope.newOrder.shippingCost = 0;
      } else {
        $scope.newOrder.shippingCost = 10;
      }

      DataService.ajaxTaxes($scope.newOrder.shippingAddress.province.toString()).then(function(taxRate) {
        $scope.newOrder.tax = $scope.newOrder.subTotal * Number(taxRate);
        $scope.newOrder.total = $scope.newOrder.subTotal + $scope.newOrder.tax + $scope.newOrder.shippingCost;
      }).catch(function(err) {
        console.log(err);
        //$scope.getOrderInfo(order);
      })
    };

    $scope.setBillingAsShipping = function(same) {
      if(same) {
        $scope.newOrder.billingAddress = $scope.newOrder.shippingAddress;
      } else {
        $scope.newOrder.billingAddress = {};
      }
    };

    $scope.billingState = 'Default';
    $scope.shippingState = 'Default';
    $scope.paymentState = 'Default';

    $scope.setBillingState = function(state) {
      $scope.billingState = state;
    }

    $scope.setShippingState = function(state) {
      $scope.shippingState = state;
    }

    $scope.setPaymentState = function(state) {
      $scope.paymentState = state;
    }

    //Add Orders
    $scope.checkout = function(form, order) {
      OrderService.createOrder(order).then(function(order) {
        console.log('success');
        console.log(order);
        ngCart.empty();
        $state.go('settings');
      }).catch(function(err) {
        console.log('failure');
        console.log(err);
      })
    };

  });
