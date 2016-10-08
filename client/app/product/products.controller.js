'use strict';

angular.module('passportApp')
  .controller('ProductsCtrl', function ($scope, $stateParams, ProductService) {
    $scope.computerErrors = "";
    $scope.featuredProducts = [];

    //Computer REST Resources
    ProductService.getFeatured().then(function(products) {
      $scope.featuredProducts = products;
    });
  });