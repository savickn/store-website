'use strict';

angular.module('passportApp')
  .controller('ReviewCtrl', function ($scope, $stateParams, Auth, ReviewService) {
    $scope.currentReview = {};
    $scope.reviewError = "";


    ReviewService.getReview($stateParams.id).then(function(review) {
      $scope.currentReview = review;
      $scope.rating = review.rating;
    });

    $scope.upvoteReview = function(review) {
      var author = Auth.getCurrentUser();
      var newUpvote = {author: author.name, authorId: author._id, 
        reviewId: review._id, date: Date.now};

      /*review.upvotes.push(newUpvote);
      ReviewService.updateReview(review).then(function(review) {
        $scope.currentReview = review;
      }, function(err) {
        $scope.reviewError = err;
      });*/

      if($scope.checkDuplicateLike(review) === false) {
        review.upvotes.push(newUpvote);
        ReviewService.updateReview(review).then(function(review) {
          $scope.currentReview = review;
        });
      } else {
        $scope.reviewError = "You have already liked this review.";
      }
    };

    $scope.checkDuplicateLike = function(review) {
      var unique = false;
      if(review.upvotes) {
        review.upvotes.forEach(function(upvote) {
        if(upvote.authorId === Auth.getCurrentUser()._id) {
          unique = true;
          return unique;
          //$scope.reviewError = "You cannot upvote a review more than once";
        }
        });
      }
      return unique;
    };

    $scope.removeUpvote = function(review) {
      var idx = -1;

      review.upvotes.forEach(function(upvote, index) {
        if(upvote.authorId === Auth.getCurrentUser()._id) {
          idx = index;
        }
      });

      if(idx >= 0) {
        review.upvotes.splice(idx, 1);
        ReviewService.updateReview(review).then(function(updatedReview) {
          $scope.currentReview = updatedReview;
          //$scope.reviewError = "Upvote Removed.";
        });
      }
    };

    $scope.updateReview = function() {
      var updatedReview = $scope.currentReview;
      ReviewService.updateReview(updatedReview).then(function(review) {
        $scope.currentReview = review;
      });
    };
  });
