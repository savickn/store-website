'use strict';

angular.module('passportApp')
  .factory('RewardService', function (Restangular) {
    return {
      getRewards: function(rewardId) {
        return Restangular.one('rewards', rewardId).get();
      },
      createRewards: function(reward) {
        return Restangular.all('rewards').post(reward);
      },
      updateRewards: function(reward) {
        return Restangular.one('rewards', reward._id).customPUT(reward);
      }
    };
  });
