'use strict';

angular.module('passportApp')
  .controller('AddressCtrl', function ($scope, Auth, UserService, AddressService, AlertService) {
    $scope.isAdmin = Auth.isAdmin();
    $scope.formErrors = {};

    $scope.billingAddress = Auth.getBillingAddress()[0];
    $scope.shippingAddresses = Auth.getShippingAddresses();
    $scope.newAddress = {};

    $scope.billingState = 'Default';
    $scope.shippingState = 'Default';

    $scope.setBillingState = function(state) {
      $scope.billingState = state;
    }

    $scope.setShippingState = function(state) {
      $scope.shippingState = state;
    }

    $scope.setAsPrimaryAddress = function(primaryAddress) {
      //add to cookies

    };

    /*$scope.updateBilling = function(form, address) {
      console.log(form);
      console.log(address);
      Auth.setBillingAddress(address);
      Auth.updateUser().then(function(user) {
        console.log(user);
        $scope.billingAddress = user.billingAddress;
        AlertService.setAlert("Billing Address Updated.", "Success");
      }).catch(function(err) {
        err = err.data;
        $scope.formErrors = {};

        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.formErrors[field] = error.message;
        });
      })
    }*/


    $scope.removeAddress = function(addressId) {
      AddressService.removeAddress(addressId).then(function() {
        //also splice that address
        AlertService.setAlert('Address Removed!', 'Success');
      }).catch(function(err) {
        console.log(err);
      })
    };

  });





  /*$scope.updateBilling = function(form, address) {
    console.log(form);
    console.log(address);

    if(form.$valid) {
      var user = Auth.getCurrentUser()
      user.billingAddress = address;

      UserService.updateUser(user._id, user).then(function(user) {
        console.log(user);
        Auth.setCurrentUser(user);
        $scope.billingAddress = Auth.getBillingAddress();
        $scope.billingState = 'Default';
      }).catch(function(err) {
        err = err.data;
        $scope.errors = {};

        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
      })
    }
  }

  $scope.updateShipping = function(form, address) {

  }*/

  /*$scope.addAddress = function(form, address) {
    scope.submitted = true;
    scope.address.type = scope.type;
    scope.address.user = Auth.getCurrentUser()._id;

    if(form.$valid){
      AddressService.addAddress(address)
      .then(function(address) {
        scope.submitted = false;
        Auth.setBillingAddress(address);
        scope.address = {};
        //push to current User
        console.log(address);
      })
      .catch(function(err) {
        err = err.data;
        scope.errors = {};

        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          scope.errors[field] = error.message;
        });
      });
    }
  };*/



/*

$scope.addAddress = function(form, address) {
      $scope.options.submitted = true;

      AddressService.addAddress(address)
      .then(function(address) {
        //push to current User
        console.log(Address);
      })
      .catch(function(err) {
        err = err.data;
        $scope.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
      });
    };

    $scope.updateAddress = function(address) {
      var addressId = Address._id; //used to update currentUser
      AddressService.updateAddress(address).then(function(address) {
        //update currentUser
        AlertService.setAlert('Address Removed!', 'Success');
      }).catch(function(err) {
        console.log(err);
      })
    };

*/
