'use strict';

angular.module('passportApp')
  .controller('PictureCollectionCtrl', function ($scope, PictureService, Auth) {
    $scope.currentPictures = [];

    //retrieves collection of all pictures
    (function getPictures() {
      PictureService.getPictures().then(function(pictures) {
        $scope.currentPictures = pictures;
      }, function(err) {
        $scope.pictureErr = err;
      });
    } ());

    $scope.deletePicture = function(picture) {
      if(Auth.isAdmin()) {
    		PictureService.removePicture(picture._id).then(function() {
    			$scope.currentPictures.remove(picture);
    		});
    	}
    }
});