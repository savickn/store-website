'use strict';

angular.module('passportApp')
  .controller('CartCtrl', function ($scope, ngCart, $state) {
  	$scope.itemCount = ngCart.getItems().length;
    $scope.goToCheckout = function(itemCount) {
      if(itemCount > 0) $state.go('newOrder');
    }
  })
