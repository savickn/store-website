'use strict';

angular.module('passportApp')
  .controller('UserCollectionCtrl', function ($scope, $state, Auth, UserService) {
    $scope.users = [];
    $scope.userQuery = {};

    $scope.searchUsers = function(query) {
      $scope.submitted = true;
      if($scope.userSearchForm.$valid) {
        $scope.formInactive = true;
        UserService.searchUsers(query).then(function(users) {
          $scope.users = users;
          $state.transitionTo('users.search');
        }).catch(function(err) {
          console.log(err);
        })
      }
    };
  });

