
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        templateUrl: 'app/product/home.html'
      })
      .state('newProduct', {
        url: '/products/new',
        templateUrl: 'app/product/new.html'
      })
      .state('products.featured', {
        url: '/featured',
        templateUrl: 'app/product/featured.html',
        controller: function($scope, ProductService) {
        	$scope.featuredProducts = [];
          ProductService.getFeatured().then(function(products) {
        		$scope.featuredProducts = products;
        	});
        }
      })
  });



/*
  .state('products.test', {
    url: '/test',
    templateUrl: 'app/product/index.html',
    controller: 'ProductCollectionCtrl',
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

  function($scope, ProductService) {
          $scope.availableComputers = [];
          $scope.path = 'computers'
          $scope.type = 'Computer'

          ProductService.searchProducts({}).then(function(products) {
            $scope.availableComputers = products;
          });
        }*/
