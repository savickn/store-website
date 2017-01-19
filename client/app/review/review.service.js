'use strict';

angular.module('passportApp')
  .factory('ReviewService', function (Restangular) {

    var service = {
      getReviews: function() {
        return Restangular.all('reviews').getList(); 
      },
      getReview: function(reviewId) {
        return Restangular.one('reviews', reviewId).get(); 
      },
      addReview: function(review) {
        return Restangular.all('reviews').post(review);
      },
      updateReview: function(review) {
        return Restangular.one('reviews', review._id).customPUT(review);
      },
      upvoteReview: function(reviewId, upvote) {
        return Restangular.one('reviews', reviewId).customPUT({upvote: upvote}, 'upvote')
      },
      removeReview: function(reviewId) {
        return Restangular.one('reviews', reviewId).remove();
      }
    };
    
    return service;
  });

