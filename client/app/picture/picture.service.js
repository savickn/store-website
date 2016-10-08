
'use strict';

angular.module('passportApp')
  .factory('PictureService', function (Restangular) {

    var restAngular = 
      Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setFullResponse(true);
        //.setBaseUrl('api');
      }); 

    var service = {
      getPictures: function() {
        return Restangular.all('pictures').getList(); 
      },
      getPicture: function(pictureId) {
        return Restangular.one('pictures', pictureId).get();
      },
      removePicture: function(pictureId) {
        return Restangular.one('pictures', pictureId).remove();
      }
    };
    
    return service;
  });
