'use strict';

angular.module('passportApp')
  .controller('LoginController', function ($scope, $state, Auth, $window, FlashService, AlertService) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form, user) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: user.email,
          password: user.password
        }).then( function() {
          FlashService.setMessage('You have successfully logged into your account.', 'Success');
          $state.go('main');
        }).catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
