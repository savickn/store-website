
'use strict';

angular.module('passportApp')
  .factory('PictureService', function (Restangular) {
    return {
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
  });
