
angular.module('passportApp')
  .controller('SaleCollectionCtrl', function($scope, SaleService) {
    $scope.activeSales = [];

    (function() {
      SaleService.getSales().then((sales) => {
        $scope.activeSales = sales;
        console.log(sales);
      })
    }) ();

    $scope.removeSale = function(sale) {
      console.log(sale);
    };
  })
