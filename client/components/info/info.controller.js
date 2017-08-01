'use strict';

angular.module('passportApp')
  .controller('InfoCtrl', function ($scope, AlertService, Auth, UserService) {
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isActive = Auth.isActive();

    $scope.sendActivationEmail = function() {
      UserService.requestActivation(Auth.getCurrentUser()._id).then(function(response) {
        AlertService.setAlert(response.msg, "Warning");
      }).catch(function(err) {
        console.log(err);
      })
    };
  });
