'use strict';

angular.module('passportApp')
  .controller('UserCtrl', function ($scope, $stateParams, $state, Auth, UserService, RewardService) {
    $scope.user = {};

    $scope.addPoints = true;


    UserService.getUser($stateParams.id).then(function(user) {
      $scope.user = user;
    });

    $scope.resetPassword = function() {

    };

    $scope.updateUserInfo = function(user) {
      UserService.updateUser(user).then(function(user) {
        $scope.user = user;
      }).catch(function(err) {
        console.log(err);
      });
    };

    $scope.updateRewardPoints = function(rewardCard, points) {
      rewardCard.points += $scope.addPoints?points:(-points);;

      RewardService.updateRewards(rewardCard).then(function(rewardCard) {
        $scope.user.reward = rewardCard;
        Auth.setCurrentUser($scope.user);
      });
    };

    $scope.removeUser = function() {
      UserService.removeUser(user._id).then(function(success) {
        $state.transitionTo('users');
      }).catch(function(err) {
        console.log(err);
      });
    };
  });
