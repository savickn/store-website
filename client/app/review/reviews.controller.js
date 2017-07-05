'use strict';

angular.module('passportApp')
  .controller('ReviewsCtrl', function ($scope, $stateParams, Auth, ReviewService, AlertService) {

    $scope.rating = 1;
    $scope.newReview = {};

    $scope.setRating = function(rating) {
      $scope.newReview.rating = rating;
    }

    $scope.addReview = function(form, newReview) {
      $scope.submitted = true;
      $scope.newReview.author = Auth.getCurrentUser()._id;
      $scope.newReview.product = $scope.currentProduct._id;

      ReviewService.addReview(newReview).then(function(review) {
        console.log('pass');
        $scope.submitted = false;
        $scope.$parent.currentProduct.reviews.push(review);
        $scope.newReview = {};
        $scope.rating = 1;
        AlertService.setAlert("Your review was successfully saved.", "Success");
      }).catch(function(err) {
        console.log('fail');
        err = err.data;
        $scope.errors = {};

        angular.forEach(err.errors, function(error, field) {
          //$scope.$parent.reviewForm[field].$setValidity('mongoose', false);
          //form[field].$setValidity('mongoose', false);
          //$scope.reviewForm[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
        AlertService.setAlert("Review could not be saved. Please try again.", "Warning");
      });

    };
  });
