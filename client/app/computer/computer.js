
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
          },
          type: {
            value: 'Computer'
          }
        }
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

  /*.state('newProduct.computer', {
    url: '/computer',
    templateUrl: 'app/computer/new.html',
    controller: 'ComputerUploadCtrl',
    params: {
      type: 'Computer'
    },
    authenticate: true
  })*/

//resolve: {
        //  objId: function($stateParams) {
        //    return {computerId: $stateParams.id}
        //  }
        //}
