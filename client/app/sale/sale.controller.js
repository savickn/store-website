angular.module('passportApp')
  .controller('SaleCtrl', function($scope, SaleService) {

    $scope.removeSale = function(sale) {
      console.log(sale);
    };
  })
