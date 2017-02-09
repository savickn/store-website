'use strict';

angular.module('passportApp')
  .controller('UserCollectionCtrl', function ($scope, $state, Auth, UserService) {
    $scope.users = [];
    $scope.userQuery = {};

    $scope.searchUsers = function(form, query) {
      $scope.submitted = true;
      if(form.$valid) {
        UserService.searchUsers(query).then(function(users) {
          $scope.users = users;
          $scope.submitted = false;
          $scope.userQuery = {};
        }).catch(function(err) {
          console.log(err);
        })
      }
    };
  });
