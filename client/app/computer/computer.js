
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
      .state('newcomputer', {
        url: '/computers/new',
        templateUrl: 'app/computer/new.html',
        controller: 'ComputerUploadCtrl'
      })
      .state('showcomputer', {
      	url: '/computers/:id',
      	templateUrl: 'app/computer/show.html',
      	controller: 'ComputerCtrl'
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