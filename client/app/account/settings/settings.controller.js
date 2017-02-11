'use strict';

angular.module('passportApp')
  .controller('SettingsCtrl', function ($scope, $mdSidenav, Auth) {
    //$mdSidenav('leftNav').toggle();
    $scope.true = true;
    $scope.errors = {};
    $scope.user = Auth.getCurrentUser();
  });
