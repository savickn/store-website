'use strict';

angular.module('passportApp')
  .controller('PictureCtrl', function ($scope, $stateParams, PictureService) {
    $scope.currentPicture = {};

    PictureService.getPicture($stateParams.id).then(function(picture) {
    	$scope.currentPicture = picture;
    });
});