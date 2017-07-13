
'use strict';

angular.module('passportApp')
  .controller('ComputerCtrl', function ($scope, $state, $stateParams, ComputerService, ProductService, ReviewService,
    AlertService, Auth, PaginationCache, PictureService) {
    $scope.isAdmin = Auth.isAdmin();
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.viewState = 'Specs';
    $scope.moreProducts = true;

    $scope.currentProduct = {};
    $scope.previewImage = {};
    $scope.productId = $stateParams.id;
    $scope.updateDisplayPic = false;

    $scope.recommendedProducts = [];
    $scope.recommendedOffset = PaginationCache.get($stateParams.id) || 0;

    function getRecommended(productId) {
      ProductService.getRecommended(productId, $scope.recommendedOffset).then(function(response) {
        console.log(response);
        $scope.recommendedProducts = response.products;
        $scope.moreProducts = response.moreProducts;
        PaginationCache.put($stateParams.id, $scope.recommendedOffset);
      }).catch(function(err) {
        console.log(err);
      })
    }

    $scope.setViewState = function(state) {
      $scope.viewState = state;
    };

    $scope.isViewState = function(viewState) {
      return viewState === $scope.viewState ? true : false;
    }

    $scope.changeOffset = function(inc) {
      $scope.recommendedOffset += inc;
      if($scope.recommendedOffset < 0) {$scope.recommendedOffset = 0;}
      if($scope.recommendedOffset != PaginationCache.get($stateParams.id)) {
        getRecommended($scope.currentProduct._id);
      }
    }

    ComputerService.getComputer($stateParams.id).then(function(computer) {
      //console.log('computer', computer);
      $scope.currentProduct = computer;
      $scope.previewImage = computer.displayPicture;

      if($scope.recommendedOffset != PaginationCache.get($stateParams.id) || $scope.recommendedProducts.length < 1) {
        getRecommended(computer._id);
      }

      //$scope.categories = Object.keys(computer.publicProperties);

    }).catch(function(err) {
      console.log(err);
      AlertService.setAlert("This product no longer exists!", "Error");
      $state.go('/');
    });

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
      let idx = $scope.currentProduct.reviews.indexOf(review);
      ReviewService.removeReview(review._id).then(function() {
        $scope.currentProduct.reviews.splice(idx, 1);
      });
    };

    $scope.removePicture = function(picture) {
      let idx = $scope.currentProduct.pictures.indexOf(picture);
      PictureService.removePicture(picture._id).then(function() {
        $scope.currentProduct.pictures.splice(idx, 1);
      });
    };

  });
