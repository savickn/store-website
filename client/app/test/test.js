
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('test', {
        url: '/test',
        templateUrl: 'app/test/test.html',
        controller: 'TestCtrl'
      })
      .state('test.email', {
      	url: '/email',
        templateUrl: 'app/test/email.html',
      })
      .state('test.style', {
      	url: '/style',
        templateUrl: 'app/test/style.html',
      })
      .state('test.forms', {
      	url: '/forms',
      	templateUrl: 'app/test/forms.html'
      });
  });
