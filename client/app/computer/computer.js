
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('computers', {
        url: '/computers?page&pagecount',
        templateUrl: 'app/computer/index.html',
        controller: 'ComputerCollectionCtrl',
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
      .state('computers.new', {
        url: '/computers/new',
        templateUrl: 'app/computer/new.html',
        controller: 'ComputerUploadCtrl'
      })
      .state('computers.show', {
      	url: '/computers/:id',
      	templateUrl: 'app/computer/show.html',
      	controller: 'ComputerCtrl'
      });
  });

/* nested route
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