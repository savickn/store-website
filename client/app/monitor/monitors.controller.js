'use strict';

angular.module('passportApp')
  .controller('MonitorsCtrl', function ($scope, $http, MonitorService) {
  	$scope.monitorErrors = "";
  	$scope.availableMonitors = [];

  	//Computer REST Resources
    MonitorService.getList().then(function(monitors) {
      $scope.availableMonitors = monitors;   
    });

    $scope.addMonitor = function() {
      var newMonitor = {name: $scope.newName, description: $scope.newDescription, 
        brand: $scope.newBrand, price: $scope.newPrice, onSale: $scope.newOnSale, 
        featured: $scope.newFeatured, onlineOnly: $scope.newOnlineOnly, 
        vertRes: $scope.newVertRes, horzRes: $scope.newHorzRes, 
        input: $scope.newInput, screenSize: $scope.newScreenSize};
    
      MonitorService.post(newMonitor).then(function(monitor) {
        $scope.availableMonitors.push(monitor);

        $scope.newName = '';
        $scope.newDescription = '';
        $scope.newBrand = '';
        $scope.newPrice = '';
        $scope.newInput = '';
        $scope.newVertRes = '';
        $scope.newHorzRes = '';
        $scope.newScreenSize = '';
        $scope.newFeatured = false;
        $scope.newOnlineOnly = false;
        $scope.newOnSale = false;
      }, function(err) {
        console.log(err);
      });
    };

    $scope.deleteMonitor = function(monitor) {
      var idx = $scope.availableMonitors.indexOf(monitor._id);

      MonitorService.remove(monitor).then(function() {
        $scope.availableMonitors.splice(idx, 1);
      });
    };

  });

