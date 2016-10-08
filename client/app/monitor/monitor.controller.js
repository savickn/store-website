'use strict';

angular.module('passportApp')
  .controller('MonitorCtrl', function ($scope, $http, $stateParams, MonitorService) {
  	$scope.currentMonitor = {};
  	$scope.monitorReviews = [];

  	MonitorService.get($stateParams.id).then(function(monitor) {
  		$scope.currentMonitor = monitor;
  		$scope.monitorReviews = monitor.reviews;
  	});

    $scope.updateMonitor = function() {
      var updatedMonitor = $scope.currentMonitor;
      MonitorService.updateMonitor(updatedMonitor).then(function(newMonitor) {
        $scope.currentMonitor = newMonitor;
      });
    };
  });
