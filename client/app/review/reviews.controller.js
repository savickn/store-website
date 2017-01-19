'use strict';

angular.module('passportApp')
  .controller('ReviewsCtrl', function ($scope, $stateParams, Auth, ReviewService, AlertService) {

    $scope.rating = 1;
    $scope.newReview = {};

    $scope.setRating = function(rating) {
      $scope.newReview.rating = rating;
    }

    $scope.addReview = function(newReview) {
      $scope.newReview.author = Auth.getCurrentUser()._id;
      $scope.newReview.product = $scope.currentProduct._id;

      ReviewService.addReview(newReview).then(function(review) {
          $scope.$parent.currentProduct.reviews.push(review);
          $scope.newReview = {};
          $scope.rating = 1;
          AlertService.setAlert("Your review was successfully saved.", "Success");
        }).catch(function(err) {
          AlertService.setAlert("Review could not be saved. Please try again.", "Warning");
        });
    };
  });
