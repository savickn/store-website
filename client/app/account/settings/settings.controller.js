'use strict';

angular.module('passportApp')
  .controller('SettingsCtrl', function ($scope, UserService, Auth) {
    //$scope.Model = $scope.Model || {Name : "xxx"};
    $scope.errors = {};
    $scope.user = Auth.getCurrentUser();
  });
