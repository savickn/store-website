'use strict';

angular.module('passportApp')
  .controller('RewardsCtrl', function ($scope, Auth, RewardService, AlertService) {

    $scope.$watch( function () { return AlertService.alert; }, function (alert) {
      $scope.message = alert.message;
      $scope.type = alert.type;
    }, true);

    $scope.createRewards = function() {
      if(!$scope.user.reward) {
        RewardService.createRewards({user: $scope.user._id})
        .then(function() {
          Auth.refreshUser().then(function(user) {
            $scope.user = user;
            AlertService.setAlert("You successfully registered for our rewards program. Your card number is ${user.reward.cardNumber}", "Success");
          });
        })
        .catch(function(err) {
          console.log(err);
          AlertService.setAlert(err, "Error");
          /*err.errors.forEach(function(err) {
            console.log(err);
          })*/
          //form.cardNumber.$setValidity('mongoose', false);
          //$scope.message = '';
        });
      } else {
        AlertService.setAlert("You are already registered for our rewards program.", "Error");
      }
		};
  });
