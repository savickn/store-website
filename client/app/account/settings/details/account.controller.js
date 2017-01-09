'use strict';

angular.module('passportApp')
  .controller('AccountCtrl', function ($scope, AlertService, UserService, Auth, $state) {
    //$scope.user = Auth.getCurrentUser();
    //console.log($scope.user);
    $scope.errors = {};
    $scope.userUpdates = {};


    $scope.countries = [];
    $scope.provinces = {};
    $scope.cities = {};


    $scope.setAsPrimaryAddress = function(primaryAddress) {
      //add to cookies

    };

		$scope.updateUser = function(form, userId, userUpdates) {
      $scope.submitted = true

      if(form.$valid) {
        UserService.updateUser(userId, userUpdates).then(function(user) {
          $scope.user = user;
          $scope.userUpdates = {};

          Auth.setCurrentUser(user);
          $scope.submitted = false;
          AlertService.setAlert("Your account was successfully updated.", "Success");
          $state.go('settings.account');
        }, function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
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
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword, $scope.user.confirmPassword)
        .then(function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch(function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
    };
  });




      /*$scope.user.shippingAddress = $scope.user.shippingAddress.map(function(address) {
        if(address._id === primaryAddress._id) {
          return address.primary = true;
        } else {
          return address;
        }
      })
      console.log($scope.user.shippingAddress);

      $scope.updateUser($scope.user);*/