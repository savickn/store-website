'use strict';

angular.module('passportApp')
  .factory('ComputerService', function (Restangular) {
    
    var restAngular = 
      Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setFullResponse(true);
        //.setBaseUrl('api');
      }); 

    var service = {
      getComputers: function(options) {
        //if(options.page) { console.log(options.page) }
        //if(options.perPage) { console.log(options.perPage) }
        return restAngular.all('computers').getList({page: options.page, perPage: options.perPage}); 
      },
      getComputer: function(computerId) {
        return Restangular.one('computers', computerId).get(); 
      },
      addComputer: function(computer) {
        return Restangular.all('computers').post(computer);
      },
      updateComputer: function(computer) {
        return Restangular.one('computers', computer._id).customPUT(computer);
      },
      removeComputer: function(computerId) {
        return Restangular.one('computers', computerId).remove();
      },
      searchComputers: function(searchObj) {
        return Restangular.all('computers').customPOST(searchObj, 'search');
      }
    };
    
    return service;
  });
