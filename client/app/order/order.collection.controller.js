'use strict';

angular.module('passportApp')
  .controller('OrderCollectionCtrl', function ($scope, $timeout, Auth, OrderService) {
    /*$scope.isAdmin = Auth.isAdmin();

    $scope.availableOrders = [];

    ///////////////////////////////////////////////////////////////////////////
    
    //PAGINATION
    $scope.paginationOptions = [1, 10, 25, 50];
    $scope.currentPage = 1;
    $scope.totalorders = 0;
    $scope.pageSize = 10;
    //getResultsPage($scope.currentPage, $scope.pageSize);
    
    $scope.pageChanged = function(newPage) {
      getResultsPage(newPage, $scope.pageSize);
    }

    $scope.sizeChanged = function(newSize) {
      $scope.pageSize = newSize;
    }

    function getResultsPage(pageNumber, pageSize) {
      var options = {
        page: pageNumber,
        perPage: pageSize
      };
      OrderService.getOrders(options).then(function(response) {
        $scope.availableorders = response.data;   
        $scope.totalorders = response.headers('total-orders');
        getorderInfo(response.data);
      });
    }

    /////////////////////////////////////////////////////////////////////////////

    //SEARCHING + SORTING
    $scope.sortType = 'name';
    $scope.sortReverse = false;

    $scope.filterExpr = {
      motherboard: [],
      gpu: [],
      cpu: [],
      brand: []
    };

    $scope.priceExpr = {
      minPrice: 1,
      maxPrice: 10000
    };

    $scope.getSearch = function(filterExpr) {
      orderService.searchorders(filterExpr).then(function(orders) {
        $scope.availableorders = orders;
        getorderInfo(orders);
      });
    };

    /////////////////////////////////////////////////////////////////

    //GET orderS
    $scope.searchOrders = function() {
      OrderService.getOrders().then(function(orders) {
        $scope.availableorders = orders;
        getorderInfo(orders);
      });
    }*/
  });

