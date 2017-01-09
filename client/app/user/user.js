
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users?page&pagecount',
        templateUrl: 'app/user/home.html',
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
      .state('users.search', {
        url: '/',
        templateUrl: 'app/user/index.html'
      })
      .state('users.show', {
        url: '/:id',
        templateUrl: 'app/user/show.html',
        controller: 'UserCtrl'
      });
  });

/* nested route - must have <ui-view> in parent template, will embed the child within the parent template
      .state('computers.show', {
        url: '/:id',
        templateUrl: 'app/computer/show.html',
        controller: 'ComputerCtrl'
      });*/

//resolve: {
        //  objId: function($stateParams) {
        //    return {computerId: $stateParams.id}
        //  }
        //}