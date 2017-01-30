'use strict';

angular.module('passportApp')
  .controller('RewardsCtrl', function ($scope, Auth, RewardService, AlertService) {
    $scope.createRewards = function() {
      if(!$scope.user.reward) {
        RewardService.createRewards({user: $scope.user._id}).then(function(reward) {
          $scope.user.reward = reward;
          AlertService.setAlert("You successfully registered for our rewards program. Your card number is ${reward.cardNumber}", "Success");
        }).catch(function(err) {
          console.log(err);
          AlertService.setAlert("The signup process for the rewards card was unsuccessful. Please try again later.", "Error");
        });
      } else {
        AlertService.setAlert("You are already registered for our rewards program.", "Error");
      }
		};
  });
