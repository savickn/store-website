'use strict';

angular.module('passportApp')
  .factory('RewardService', function (Restangular) {
    
    var restAngular = 
      Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setFullResponse(true);
        //.setBaseUrl('api');
      }); 

    var service = {
      getComputer: function(rewardId) {
        return Restangular.one('rewards', rewardId).get(); 
      },
      createRewards: function(reward) {
        return Restangular.all('rewards').post(reward);
      },
      updateRewards: function(reward) {
        return Restangular.one('rewards', reward._id).customPUT(reward);
      }
    };
    
    return service;
  });
