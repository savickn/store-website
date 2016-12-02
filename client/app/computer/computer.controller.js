
'use strict';

angular.module('passportApp')
  .controller('ComputerCtrl', function ($scope, $stateParams, $timeout, ComputerService, FlashService, 
      Auth, ngCart, ReviewService, AlertService, WishlistService) {
    $scope.isAdmin = Auth.isAdmin();
    $scope.isLoggedIn = Auth.isLoggedIn();

    $scope.$watch( function () { return AlertService.alert; }, function (alert) {
      $scope.message = alert.message;
      $scope.type = alert.type;
    }, true);

    $scope.currentProduct = {};
    $scope.previewImage = {};
    $scope.updateDisplayPic = false;

    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);

    ComputerService.getComputer($stateParams.id).then(function(computer) {
      $scope.currentProduct = computer;
      $scope.previewImage = computer.displayPicture;

      /*var publicProperties = getPublicProperties(computer);
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
      });*/

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
      ComputerService.updateComputer($scope.currentProduct).then(function(newComputer) {
        $scope.currentProduct = newComputer;
        $scope.previewImage = newComputer.displayPicture;
        $scope.updateDisplayPic = false;
        AlertService.setAlert("The computer was successfully updated.", "Success");
        $scope.computerEditForm.$setPristine();
      }, function(err) {
        console.log(err);
        AlertService.setAlert('The computer could not be updated.', "Error");
      });
    };

    $scope.setPreviewImage = function(picture) {
      $scope.previewImage = picture;
    }
 
    $scope.setDisplayPicture = function(pictureId) {
      $scope.currentProduct.displayPicture = pictureId;
      $scope.updateDisplayPic = true;
      AlertService.setAlert("Display picture set. Please click 'Save Changes' via the 'Edit' button to save these changes.", "Warning");
    }

    $scope.removeReview = function(review) {
      var idx = $scope.currentProduct.reviews.indexOf(review);

      ReviewService.removeReview(review._id).then(function() {
        $scope.currentProduct.reviews.splice(idx, 1);
      });
    };
  });

