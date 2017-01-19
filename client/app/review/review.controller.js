'use strict';

angular.module('passportApp')
  .controller('ReviewCtrl', function ($scope, $stateParams, Auth, ReviewService, AlertService) {
    
    ReviewService.getReview($stateParams.id).then(function(review) {
      $scope.currentReview = review;
      $scope.rating = review.rating;

      $scope.isDuplicateLike = isDuplicateLike(review);
    });

    function isDuplicateLike(review) {
      var userId = Auth.getCurrentUser()._id;
      review.upvotes.forEach(function(upvote) {
        console.log(upvote.userId);
        if(upvote.userId == userId) {
          return true;
        }
      });
      return false; 
    };

    $scope.upvoteReview = function(review) {
      var user = Auth.getCurrentUser();
      var newUpvote = {userName: user.name, userId: user._id, date: Date.now};

      if(!isDuplicateLike(review)) {
        ReviewService.upvoteReview(review._id, newUpvote).then(function(review) {
          $scope.currentReview = review;
          AlertService.setAlert("You liked this review!", "Success");
        }).catch(function(err) {
          AlertService.setAlert("This review could not be liked.", "Error");
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