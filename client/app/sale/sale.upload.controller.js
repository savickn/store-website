
'use strict';

angular.module('passportApp')
  .controller('SaleUploadCtrl', function ($scope, SaleService, Auth) {
    var newSale = {};

    $scope.addSale = function() {
      SaleService.addSale($scope.newSale).then(function() {
        console.log('success');
      })
    };
  });
