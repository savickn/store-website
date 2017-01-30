'use strict';

angular.module('passportApp')
  .controller('CartCtrl', function ($scope, ngCart) {
  	$scope.itemCount = ngCart.getItems().length;
  })
