'use strict';

angular.module('passportApp')
  .controller('PictureUploadCtrl', function ($scope, $timeout, $stateParams, Restangular, Upload, 
      Auth, PictureService) {
    $scope.isAdmin = Auth.isAdmin();

    $scope.newPictures = [];
    $scope.pictureErr = '';

    ////////////////////////////////////////////////////////////////////////////////////////

    //ADD + REMOVE PICTURES
    $scope.uploadPic = function(productType, productId) {
      if($scope.pictureForm.file.$valid && Auth.isAdmin()) {
        $scope.newPictures.forEach(function(pic) {
          Upload.upload({
            url: '/api/pictures',
            method: 'POST',
            data: {file: pic, filename: pic.name, contentType: pic.type, size: pic.size,  
              productType: productType, product: productId}
          }).then(function (response) {
            $timeout(function () {
              $scope.status = "success";
              $scope.$parent.currentProduct.pictures.push(response.data);
            });
          }, function (err) {
            if (err.status > 0)
              $scope.errorMsg = err.status + ': ' + err.data;
          }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            pic.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
        })
      }
    }
    

  });


    /* retrieves pictures associated with a product on injection
    (function getPictures() {
      PictureService.getProductPictures(type, $stateParams.id).then(function(pictures) {
        $scope.currentPictures = pictures;
      });
    } ());*/