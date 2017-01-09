'use strict';

angular.module('passportApp')
  .controller('UserCollectionCtrl', function ($scope, $state, Auth, UserService) {
    $scope.users = [];
    $scope.query = {};

    $scope.formInactive = false;

    $scope.searchUsers = function(query) {
      if($scope.camForm.$valid) {
        $scope.formInactive = true;
        UserService.searchUsers(query).then(function(users) {
          $scope.formInactive = false;
          $scope.users = users;
          $state.transitionTo('users.search');
        }).catch(function(err) {
          console.log(err);
        })
      } else {
        console.log('invalid');
      }

    };
  });

