
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users?page&pagecount',
        templateUrl: 'app/user/index.html',
        controller: 'UserCollectionCtrl',
        params: {
          page: {
            value: '1',
            squash: true
          },
          pagecount: {
            value: '10',
            squash: true
          }
        }
      })
      .state('users.show', {
        url: '/:id',
        templateUrl: 'app/user/show.html',
        controller: 'UserCtrl'
      });
  });
