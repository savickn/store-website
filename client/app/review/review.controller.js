'use strict';

angular.module('passportApp')
  .controller('ReviewCtrl', function ($scope, $stateParams, Auth, ReviewService, AlertService) {
    
    ReviewService.getReview($stateParams.id).then(function(review) {
      $scope.currentReview = review;
      $scope.rating = review.rating;

      $scope.isDuplicateLike = isDuplicateLike(review);
    });

    function isDuplicateLike(review) {
      review.upvotes.forEach(function(upvote) {
        if(upvote.authorId === Auth.getCurrentUser()._id) {
          return true;
        } 
      });
      return false; 
    };

    $scope.upvoteReview = function(review) {
      var author = Auth.getCurrentUser();
      var newUpvote = {author: author.name, authorId: author._id, date: Date.now};

      if(isDuplicateLike(review) === false) {
        review.newUpvote = newUpvote;

        ReviewService.updateReview(review).then(function(review) {
          $scope.currentReview = review;
          AlertService.setAlert("You liked this review!", "Success");
        });
      } else {
        AlertService.setAlert("You have already liked this review once.", "Error");
      }
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


/*
review.upvotes.forEach(function(upvote) {
          if(upvote.authorId === Auth.getCurrentUser()._id) {
            return true;
            //$scope.reviewError = "You cannot upvote a review more than once";
          } 
        });
*/