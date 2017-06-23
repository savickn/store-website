
'use strict';

angular.module('passportApp')
  .controller('SaleUploadCtrl', function ($scope, SaleService, AlertService, Auth) {
    $scope.newSale = {};
    $scope.errors = {};
    $scope.categories = [];

    (function() {
      SaleService.getSaleInfo().then(function(saleInfo) {
        let categories = saleInfo.brands.concat(saleInfo.categories);
        $scope.categories = categories;
      }).catch(function(err) {
        console.log(err);
      })
    }) ();


    $scope.addSale = function(form, newSale) {
      $scope.submitted = true;
      if(form.$valid && Auth.isAdmin()) {
        SaleService.addSale(newSale).then(function(sale) {
          $scope.submitted = false;
          console.log(sale);
          AlertService.setAlert('Sale Created!','Success');
    			$scope.newSale = {};
    		}).catch(function(err) {
          err = err.data;
          $scope.errors = {};

          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
    		})
      };
    };
  });
