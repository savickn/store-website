'use strict';

angular.module('passportApp')
  .controller('OrderUploadCtrl', function ($scope, $timeout, Auth, OrderService, AlertService, ngCart, $state, DataService, AddressService) {
    $scope.isAdmin = Auth.isAdmin();
    $scope.errors = {};
    $scope.newAddress = {};

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

    /////////////////////// VALIDATE NEW INFO //////////////////////////

    $scope.validateBilling = function(form, address, errors, submitted) {
      AddressService.validateAddress(address).then(function() {
        $scope.billingAddress = address;
        $scope.billingState = 'Select';
        submitted = false;
      }).catch(function(err) {
        err = err.data;
        errors = {};

        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          errors[field] = error.message;
        });
      })
    };

    $scope.validateShipping = function(form, address, errors, submitted) {
      AddressService.validateAddress(address).then(function() {
        $scope.shippingAddresses.pushUnique(address);
        $scope.shippingState = 'Select';
        submitted = false;
      }).catch(function(err) {
        err = err.data;
        errors = {};

        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          errors[field] = error.message;
        });
      })
    };

    /*$scope.validatePayment = function(form, address, errors, submitted) {
      AddressService.validateAddress(address).then(function() {
        $scope.shippingAddresses.pushUnique(address);
        $scope.shippingState = 'Select';
        submitted = false;
      }).catch(function(err) {
        err = err.data;
        errors = {};

        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          errors[field] = error.message;
        });
      })
    };*/

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
    $scope.shippingState = 'Select';
    $scope.paymentState = 'Select';

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
      console.log(order.products.length);

      /*order.products.forEach(function(product) {
        product = product._id;
      });*/
      console.log(order);
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
