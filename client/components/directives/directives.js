
'use strict';

angular.module('passportAppDirectives', [])
	.directive('starRating', function() {
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
	})
	.directive('toggleItemWishlist', function(Auth, WishlistService) {
		return {
			restrict: 'E',
			templateUrl : '../components/directives/views/toggleItemWishlist.html',
			scope: {
				productId: '@'
				//wishlistId: '@',
				//wishlist: '=',
				//state: '@'
			},
			link: function(scope, elem, attrs) {
				var wishlist = Auth.getCurrentUser().wishlist;
				scope.state = wishlist.products.includes(scope.productId);

				function updateWishlist() {
					WishlistService.updateWishlist(wishlist._id, wishlist).then(function(wishlist) {
		      			Auth.updateWishlist(wishlist);
		      			scope.state = !scope.state;
		        	}).catch(function(err) {
		        		console.log(err);
		        	});					
				};

				scope.addToWishlist = function(productId) {
					if(wishlist.products.pushUnique(productId)) {
						updateWishlist();
					}
				};

				scope.removeFromWishlist = function(productId) {
					if(wishlist.products.remove(productId)) {
						updateWishlist();
					}
				};
			}
		};
	})
	.directive('nsSelectAddress', function(Auth) {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/selectAddress.html',
			scope: {
				address: '=',
				addresses: '@',
				type: '@'
			},
			link: function(scope, elem, attrs) {
				//console.log(scope.address);
				//console.log(scope.addresses);
				//console.log(scope.type);

				//scope.addresses = Auth.getCurrentUser().shippingAddresses
				scope.setAddress = function(adr) {
					scope.address = adr;
					scope.address.type = scope.type;
				};
			}
		};
	})
	.directive('nsAddress', function(DataService) {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/address.html',
			scope: {
				address: '=',
				type: '@'
			},
			link: function(scope, elem, attrs) {
				//check for favorite shipping address in Cookies
				//create shipping address selector
				//autofill billing address with user billing address

				scope.countries = [];
			    scope.provinces = [];
			    scope.cities = [];

			    (function getCountries() {
			      DataService.getCountries().then(function(countries) {
			        scope.countries = countries;
			        //console.log(countries);
			      })
			    }) ();

			    scope.populateProvinces = function(country) {
			      DataService.getProvinces({country: country}).then(function(provinces) {
			        scope.provinces = provinces;
			        //console.log($scope.addressType);
			        //console.log(provinces);
			      })
			    }

			    scope.populateCities = function(province) {
			    	console.log(province);
			    }




			}
		}
	})
	.directive('alertMessage', function(AlertService) {
		return {
			restrict: 'E',
			templateUrl : '../components/directives/views/alert.html',
			scope : {
				//message : '@',
				//type: '@'
			},
			link: function(scope, elem, attrs) {
				scope.$watch( function () { return AlertService.alert; }, function (alert) {
				    scope.message = alert.message;
				    scope.type = alert.type;
			  	}, true);
			}
		};
	})



	/*.directive('testWishlist', function(Auth) {
		return {
			restrict: 'E',
			template: '<div ng-if="state">{{productId}}: {{wishlistId}}</div>',
			scope: {
				productId: '@',
				state: '@'
			},
			link: function(scope, element, attrs) {
				scope.wishlistId = Auth.getCurrentUser().name;
				console.log(scope.wishlistId);
			}
		};
	});*/



