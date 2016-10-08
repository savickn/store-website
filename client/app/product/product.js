
'use strict';

angular.module('passportApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('featured', {
        url: '/featured',
        templateUrl: 'app/product/index.html',
        controller: function($scope, ProductService) {
        	ProductService.getFeatured().then(function(products) {
        		$scope.featuredProducts = products;
        	});
        }
      })
  });