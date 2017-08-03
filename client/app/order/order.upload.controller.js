'use strict';

angular.module('passportApp')
  .controller('OrderUploadCtrl', function ($scope, $timeout, $state, Auth, OrderService, AlertService, ProductService,
    ngCart, DataService, AddressService, SaleService) {
    $scope.isAdmin = Auth.isAdmin();
    $scope.newShippingAddress = {};
    $scope.newBillingAddress = {};
    $scope.newPayment = {};

    //$scope.billingAddress = Auth.getBillingAddress()[0];
    $scope.billingAddresses = Auth.getBillingAddress();
    $scope.shippingAddresses = Auth.getShippingAddresses();
    $scope.paymentMethods = Auth.getPaymentMethods();

    $scope.newOrder = {
      customer: Auth.getCurrentUser()._id,
      products: ngCart.getItems(),
      shippingAddress: {},
      billingAddress: {},
      paymentMethod: {},
      promotions: []
    };

    /*(function getProductInfo() {
      for (let product of ngCart.getItems()) {

      }
    }) {};*/

    /////////////////////// VALIDATE NEW INFO //////////////////////////

    $scope.validateBilling = function(form, address, errors, submitted) {
      AddressService.validateAddress(address).then(function() {
        $scope.billingAddresses.push(address);
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
        $scope.newShippingAddress = {};
        submitted = false;
        $scope.shippingState = 'Select';
        AlertService.setAlert('Please select the newly added address.', 'Warning');
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

    $scope.clearAlert = function() {
      AlertService.clearAlert();
    }

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

    //WORKING
    function isApplicable(sale, productTypes) {
      for(let t of productTypes) {
        if(sale.validProducts.includes(t)) {
          return true;
        };
      };
      return false;
    };

    //WORKING
    function calcSalePrice(product, sales) {
      let salePrice = product._price;
      let mainPromo = null;
      let stackables = [];

      for(let s of sales) {
        // skips iteration if Product is discounted and Sale does not apply to discounted Products
        if(!s.appliesToDiscountedProducts && product.discount > 0) {
          continue;
        }
        // adds Sale if stackable
        if(s.stackable && !stackables.includes(s)) {
          stackables.push(s);
        } else { // handles primary Sales
          if(!mainPromo || s.discountRate > mainPromo.discountRate) {
            mainPromo = s;
          }
        }
      };
      // applies primary Sale
      if(mainPromo) {
        salePrice *= (1 - mainPromo.discountRate);
      }
      // applies stackables
      for(let s of stackables) {
        salePrice *= (1 - s.discountRate);
      }
      return salePrice;
    }

    function updateSubtotal() {
      let subtotal = 0
      for(let p of $scope.newOrder.products) {
        subtotal += p._salePrice || p._price;
      }
      $scope.newOrder.subTotal = subtotal;
    }

    $scope.applyPromotion = function(promoCode) {
      SaleService.applyPromotion(promoCode).then(function(response) {
        let sale = response.sale;
        console.log('sale', sale);
        $scope.newOrder.promotions.pushUnique(sale);

        for(let p of $scope.newOrder.products) {
          let productPromos = [];
          for(let s of $scope.newOrder.promotions) {
            if(isApplicable(s, [p._data.__t, p._data.brand])) {
              productPromos.pushUnique(s);
            }
          }
          p._salePrice = calcSalePrice(p, productPromos);
          if(p._salePrice === p._price) {
            p._salePrice = null;
          }
        }
        updateSubtotal();
      }).catch(function(err) {
        console.log(err);
      })
    }
  });
