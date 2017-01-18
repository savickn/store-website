
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products.computers', {
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
      .state('newProduct.computer', {
        url: '/computer',
        templateUrl: 'app/computer/new.html',
        controller: 'ComputerUploadCtrl',
        params: {
          type: 'Computer'
        },
        authenticate: true
      })

      .state('newcomputer', {
        url: '/products/computers/new',
        templateUrl: 'app/computer/new.html',
        controller: 'ComputerUploadCtrl',
        authenticate: true
      })

      .state('showComputer', {
      	url: '/products/computers/:id',
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