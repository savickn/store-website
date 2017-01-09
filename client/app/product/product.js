
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