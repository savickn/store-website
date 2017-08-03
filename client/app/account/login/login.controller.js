'use strict';

angular.module('passportApp')
  .controller('LoginController', function ($scope, $state, Auth, $window, FlashService, AlertService) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form, user) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.login(user).then(function() {
          FlashService.setMessage('You have successfully logged into your account.', 'Success');
          $state.go('main');
        }).catch( function(err) {
          $scope.errors = {};
          angular.forEach(err, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
