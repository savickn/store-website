'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController'
      })
      .state('activate', {
        url: '/activate/:id?activationToken',
        templateUrl: 'app/account/activation/activate.html',
        controller: 'ActivationController'
      })
      .state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'app/account/reset/forgotPassword.html',
        controller: 'ResetController'
      })
      .state('resetPassword', {
        url: '/resetPassword/:id?resetToken',
        templateUrl: 'app/account/reset/resetPassword.html',
        controller: 'ResetController'
      });
  });
