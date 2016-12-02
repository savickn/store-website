'use strict';

angular.module('passportApp')
  .controller('UsersCtrl', function ($scope, Auth, UserService) {
    $scope.users = [];

    // Use the User $resource to fetch all users
    UserService.getUsers().then(function(users){
      $scope.users = users;
    });

    $scope.delete = function(user) {
      UserService.removeUser(user._id).then(function(success) {
        $scope.users.remove(user);
      }).catch(function(err) {
        console.log(err);
      });
    };
  });


/* angular.forEach($scope.users, function(u, i) {
          if (u === user) {
            $scope.users.splice(i, 1);
          }
        });*/