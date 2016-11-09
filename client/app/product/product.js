
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('featured', {
        url: '/featured',
        templateUrl: 'app/product/index.html',
        controller: function($scope, ProductService) {
        	$scope.featuredProducts = [];
          ProductService.getFeatured().then(function(products) {
        		$scope.featuredProducts = products;
        	});
        }
      })
      .state('newproducts', {
        url: '/products/new',
        templateUrl: 'app/product/new.html',
        controller: function($scope) {
          $scope.productTypes = ['Computer', 'Monitor', 'Keyboard'];
        }
      })
  });