'use strict';

angular.module('passportApp')
  .controller('AccountCtrl', function ($scope, AlertService, UserService, Auth, DataService, $state) {
    $scope.user = Auth.getCurrentUser();
    $scope.errors = {};

    $scope.userUpdates = {
      email: $scope.user.email,
      phoneNumber: $scope.user.phoneNumber,
      promotionalEmails: $scope.user.promotionalEmails
    };

		$scope.updateUser = function(form, userId, userUpdates) {
      $scope.submitted = true
      var updates = {};
      //used to filter out properties that didnt change
      for(let prop in userUpdates) {
        if(userUpdates[prop] !== $scope.user[prop]) {
          updates[prop] = userUpdates[prop];
        }
      };

      if(form.$valid && form.$dirty) {
        UserService.updateUser(userId, updates).then(function(user) {
          $scope.user = user;
          Auth.setCurrentUser(user);
          $scope.submitted = false;
          AlertService.setAlert("Your account was successfully updated.", "Success");
          //$state.go('settings.account');
        }, function(err) {
          err = err.data;
          $scope.errors = {};

          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
          AlertService.setAlert("Your account could not be updated. Please try again.", "Error");
        });
      }
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword, $scope.user.confirmPassword).then(function(user) {
          AlertService.setAlert('Password successfully changed.', 'Success');
        }).catch(function(err) {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          AlertService.setAlert('Password could not be changed. Please check error messages for details.', 'Error');
        });
      }
    };
  });



/*$scope.countries = [];
    $scope.provinces = [];
    $scope.cities = [];

    (function getCountries() {
      DataService.getCountries().then(function(countries) {
        $scope.countries = countries;
        //console.log(countries);
      })
    }) ();

    $scope.populateProvinces = function(country) {
      var country = {country: country};
      DataService.getProvinces(country).then(function(provinces) {
        $scope.provinces = provinces;
        console.log($scope.addressType);
        //console.log(provinces);
      })
    }

    $scope.populateCities = function(province) {
      console.log(province);
    }


    $scope.updateAddresses = function(form, userId, newAddress) {
      newAddress.type = $scope.addressType;
      if(newAddress.type === 'Billing') {
        $scope.userUpdates.billingAddress = [];
        $scope.userUpdates.billingAddress.pushUnique(newAddress);

        if(newAddress.saveAsShipping) {
          newShippingAddress = newAddress;
          newShippingAddress.type = 'Shipping';
          $scope.userUpdates.shippingAddresses = $scope.user.shippingAddresses;
          $scope.userUpdates.shippingAddresses.pushUnique(newAddress);
        }
      } else if(newAddress.type === 'Shipping') {
        $scope.userUpdates.shippingAddresses = $scope.user.shippingAddresses;
        $scope.userUpdates.shippingAddresses.pushUnique(newAddress);
      }
      $scope.updateUser(form, userId, $scope.userUpdates);
    }*/
