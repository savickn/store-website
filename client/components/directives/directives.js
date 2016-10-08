
'use strict';

angular.module('passportAppDirectives', [])
	.directive('starRating',function() {
		return {
			restrict : 'A',
			template : '<ul class="rating">'
			   + ' <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
			   + '  <i class="fa fa-star-o"></i>'
			   + ' </li>'
			   + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
			  		scope.stars = [];
			  		for ( var i = 0; i < scope.max; i++) {
			   			scope.stars.push({
			    			filled : i < scope.ratingValue
			   			});
			  		}
			 	};
			 
		 		scope.toggle = function(index) {
			  		scope.ratingValue = index + 1;
			  		scope.onRatingSelected({
			   			rating : index + 1
			  		});
		 		};
		 
			 	scope.$watch('ratingValue', function(oldVal, newVal) {
			   		if (newVal) {
			    		updateStars();
			   		}
			  	});
			}
		};
	})
	.directive('toggleClass', function() {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            element.bind('click', function() {
	                if(element.attr("class") !== attrs.toggleClass) {
	                    element.addClass(attrs.toggleClass);
	                } else {
	                    element.removeClass(attrs.toggleClass);
	                }
	            });
	        }
	    };
	});

	/*.directive('addToCart', function() {
		return {
			restrict : 'E',
			template : '<ul class="rating">'
			   + ' <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
			   + '  <i class="fa fa-star-o"></i>'
			   + ' </li>'
			   + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
			  		scope.stars = [];
			  		for ( var i = 0; i < scope.max; i++) {
			   			scope.stars.push({
			    			filled : i < scope.ratingValue
			   			});
			  		}
			 	};
			 
		 		scope.toggle = function(index) {
			  		scope.ratingValue = index + 1;
			  		scope.onRatingSelected({
			   			rating : index + 1
			  		});
		 		};
		 
			 	scope.$watch('ratingValue', function(oldVal, newVal) {
			   		if (newVal) {
			    		updateStars();
			   		}
			  	});
			}
		};
	});*/
