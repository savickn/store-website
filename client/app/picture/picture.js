
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pictures', {
        url: '/pictures',
        templateUrl: 'app/picture/index.html',
        controller: 'PictureCollectionCtrl'
      })
      .state('pictures/show', {
      	url: '/pictures/:id',
      	templateUrl: 'app/picture/show.html',
      	controller: 'PictureCtrl'
      });
  });