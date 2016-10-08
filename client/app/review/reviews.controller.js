'use strict';

angular.module('passportApp')
  .controller('ReviewsCtrl', function ($scope, $stateParams, Auth, ReviewService, AlertService) {

    $scope.alertMessage = AlertService.getAlertMessage();
    $scope.alertType = AlertService.getAlertType();
    $scope.rating = 1;
    //$scope.newReview = {};

    $scope.setRating = function(rating) {
      $scope.newRating = rating;
    }

    $scope.addReview = function() {
      if (!Auth.isAdmin()) {
        return;
      }
      var newReview = {summary: $scope.newSummary, rating: $scope.newRating, 
        author: Auth.getCurrentUser()._id, product: $scope.currentProduct._id};

      ReviewService.addReview(newReview).then(function(review) {
          $scope.$parent.currentProduct.reviews.push(review);
          $scope.newRating = '';
          $scope.newSummary = '';
          $scope.rating = 1;
          AlertService.setAlert("Your review was successfully saved.", "Success");
        }, function(err) {
          console.log(err);
          AlertService.setAlert("Review could not be saved. Please try again.", "Warning");
        });
    };
  });
