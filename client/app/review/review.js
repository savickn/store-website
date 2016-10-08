'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reviews/show', {
        url: '/reviews/:id',
        templateUrl: 'app/review/review.html',
        controller: 'ReviewCtrl'
      });
  });