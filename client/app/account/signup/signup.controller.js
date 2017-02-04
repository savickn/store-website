'use strict';

angular.module('passportApp')
  .controller('SignupController', function ($scope, $timeout, $location, $window, Auth, FlashService) {
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;

    $scope.register = function(form, user) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: user.name,
          email: user.email,
          password: user.password
        }).then(function(user) {
          FlashService.setMessage('You have successfully created an account.', 'Success');
          $location.path('/');
        }).catch(function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
            $timeout()
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
