
'use strict';

angular.module('passportApp')
  .controller('ComputerCtrl', function ($scope, $stateParams, $timeout, ComputerService, FlashService, 
      Auth, ngCart, ReviewService) {
    $scope.isAdmin = Auth.isAdmin();

    $scope.successMessages = "";
    $scope.failureMessages = "";

    $scope.currentProduct = {};
    $scope.previewImage = {};
    $scope.updateDisplayPic = false;

    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);

    ComputerService.getComputer($stateParams.id).then(function(computer) {
      $scope.currentProduct = computer;
      $scope.previewImage = computer.displayPicture;

      var publicProperties = getPublicProperties(computer);
      var keyNames = Object.keys(publicProperties);

      for(var x in publicProperties) {
        //console.log(x);
      }

      for(var x in keyNames) {
        //console.log(x);
      }

      $scope.currentProduct.publicProperties = keyNames.map(function(value, index) {
        return {
          key: value,
          value: publicProperties[index]
        }
      });

    });

    /*var getPublicProperties = function(obj) {
      var propertiesObj = obj;
      for(var x in propertiesObj) {
        console.log(x);
      }

      delete propertiesObj._id;
      delete propertiesObj.__t;

      var propertiesArray = Object.keys(propertiesObj).map(function(val) { return [val] }); 
      return propertiesArray;
    }*/

    $scope.updateComputer = function() {
      var updatedComputer = $scope.currentProduct;

      if(!$scope.updateDisplayPic) {
        delete updatedComputer.displayPicture;
      }
      delete updatedComputer.pictures;
      delete updatedComputer.reviews;
      
      ComputerService.updateComputer(updatedComputer).then(function(newComputer) {
        $scope.currentProduct = newComputer;
        $scope.previewImage = newComputer.displayPicture;
        $scope.updateDisplayPic = false;
        $scope.computerEditForm.$setPristine();
        $scope.successMessages = "The computer was successfully updated.";
        $timeout(function() {$scope.successMessages = ''}, 5000);
      }, function(err) {
        $scope.failureMessages = "The computer could not be updated.";
        $timeout(function() {$scope.failureMessages = ''}, 5000);
      });
    };

    $scope.setPreviewImage = function(picture) {
      $scope.previewImage = picture;
    }
 
    $scope.setDisplayPicture = function(pictureId) {
      $scope.currentProduct.displayPicture = pictureId;
      $scope.updateDisplayPic = true;
    }

    $scope.removeReview = function(review) {
      var idx = $scope.currentProduct.reviews.indexOf(review);

      ReviewService.removeReview(review._id).then(function() {
        $scope.currentProduct.reviews.splice(idx, 1);
      });
    };
  });

