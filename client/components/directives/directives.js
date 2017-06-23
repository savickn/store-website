
'use strict';

angular.module('passportAppDirectives', [])
	.directive('mongooseError', function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
				element.on('keydown', function() {
					return ngModel.$setValidity('mongoose', true);
				});
			}
		};
	})
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
	.directive('alertMessage', function(AlertService) {
		return {
			restrict: 'E',
			templateUrl : '../components/directives/views/alert.html',
			scope : {},
			link: function(scope, elem, attrs) {
				scope.$watch( function () { return AlertService.getAlert(); }, function (alert) {
			    scope.message = alert.message;
			    scope.type = alert.type;
		  	}, true);
			}
		};
	})
	.directive('flashMessage', function(FlashService) {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/alert.html',
			scope: {},
			link: function(scope, elem, attrs) {
				scope.$watch( function () { return FlashService.getMessage(); }, function (flash) {
			    scope.message = flash.message;
					scope.type = flash.type
		  	}, true);
			}
		}
	})
	.directive('toggleItemWishlist', function(Auth, WishlistService) {
		return {
			restrict: 'E',
			templateUrl : '../components/directives/views/toggleItemWishlist.html',
			scope: {
				productId: '@'
			},
			link: function(scope, elem, attrs) {
				var wishlist = Auth.getCurrentUser().wishlist;
				scope.state = wishlist.products.includes(scope.productId);

				function updateWishlist() {
					WishlistService.updateWishlist(wishlist._id, wishlist).then(function(wl) {
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
	.directive('nsEmail', function() {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/email.html',
			scope: {
				form: '=',
				model: '=',
				errors: '=',
				submitted: '='
			},
			link: function(scope, elem, attrs) {
				console.log(scope.form);
				console.log(scope.model);
				console.log(scope.errors);
				console.log(scope.submitted);
			}
		}
	})
	.directive('nsTimeoutButton', function($timeout) {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/timeoutButton.html',
			scope: {
				content: '@'
			},
			link: function(scope, elem, attrs) {
				scope.disabled = false;
				scope.disable = function() {
					scope.disabled = true;
					$timeout(() => {
						scope.disabled = false;
					}, 1000)
				}
			}
		};
	})
	//should be passed OUTPUT_VAR (e.g. address) and ADDRESS_LIST (e.g. addresses) which is used to set OUTPUT_VAR
	.directive('nsSelectAddress', function() {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/selectAddress.html',
			scope: {
				address: '=',
				addresses: '=',
				type: '@'
			},
			link: function(scope, elem, attrs) {
				scope.setAddress = function(adr) {
					scope.address = adr;
					scope.address.type = scope.type;
				};
			}
		};
	})
	//simply displays the ADDRESS passed to it
	.directive('nsShowAddress', function() {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/showAddress.html',
			scope: {
				address: '='
			},
			link: function(scope, elem, attrs) {}
		}
	})
	//used to add or update a particular ADDRESS that is passed to it
	.directive('nsAddAddress', function(DataService, AddressService, Auth) {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/newAddress.html',
			scope: {
				address: '=',
				errors: '<',
				cbFunc: '&'
			},
			link: function(scope, elem, attrs) {
				//check for favorite shipping address in Cookies
				scope.submitted = false;

				scope.countries = [];
		    scope.provinces = [];
		    scope.cities = [];

		    scope.populateCountries = function() {
	    		DataService.ajaxCountries().then(function(countries) {
		        scope.countries = countries;
		      });
		    };

		    scope.populateProvinces = function(country) {
	      	DataService.ajaxProvinces({country: country}).then(function(provinces) {
		      	scope.provinces = provinces;
		      });
		    };

		    scope.populateCities = function(province) {
		    	console.log(province);
		    };

		    scope.handleAddress = function(form, address, errors, submitted) {
		    	scope.submitted = true;
					if(form.$valid) {
		    		scope.cbFunc({form: form, address: address, errors: errors, submitted: submitted});
					};
				};

		    (function init() {
		      scope.populateCountries();
		      if(scope.address.country) {
		      	scope.populateProvinces(scope.address.country);
		      };
		    }) ();
			}
		}
	})
	.directive('nsSelectPayment', function() {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/selectPayment.html',
			scope: {
				payment: '=',
				payments: '='
			},
			link: function(scope, elem, attrs) {
				scope.setPayment = function(pay) {
					scope.payment = pay;
				};
			}
		}
	})
	.directive('nsShowPayment', function() {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/showPayment.html',
			scope: {
				payment: '='
			},
			link: function(scope, elem, attrs) {
				console.log(scope.payment);
			}
		}
	})
	.directive('nsAddPayment', function(Auth) {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/newPayment.html',
			scope: {
				payment: '='
			},
			link: function(scope, elem, attrs) {
				scope.paymentTypes = ['MasterCard', 'Visa', 'American Express'];
		  	scope.expiryMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
		  	scope.expiryYears = ['2017', '2018', '2019', '2020', '2021'];

				scope.addPaymentMethod = function(form, payment) {
					scope.submitted = true;
		  		if(form.$valid) {
		  			payment.expiryDate = new Date(payment.expiryYear, payment.expiryMonth);
		  			payment.user = Auth.getCurrentUser()._id;

		  			/*PaymentService.addMethod(payment).then(function(payment) {
			  			scope.submitted = false;
			  			scope.paymentMethods.pushUnique(payment);
			  			scope.payment = {};
			  		}).catch(function(err) {
			  			console.log(err);
			  		})*/
		  		}
		  	}
			}
		}
	})
	.directive('nsOrderView', function() {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/orderInfo.html',
			scope: {
				order: '='
			},
			link: function(scope, elem, attrs) {

			}
		}
	})
	.directive('nsReviewView', function(ReviewService, AlertService, Auth) {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/reviewView.html',
			scope: {
				review: '='
			},
			link: function(scope, elem, attrs) {
				scope.shortExists = scope.review.shortSummary < scope.review.summary;
				scope.short = scope.shortExists ? true : false;

				scope.setShort = function(val) {
					scope.short = val;
				}

				scope.rating = scope.review.rating;
				scope.isDuplicateLike = isDuplicateLike(scope.review);

				function isDuplicateLike(review) {
					var userId = Auth.getCurrentUser()._id;
					var state = false;

					review.upvotes.forEach(function(upvote) {
						if(upvote.userId === userId) {
							state = true;
						}
					});
					return state;
				};

				scope.upvoteReview = function(review) {
					var user = Auth.getCurrentUser();
					var newUpvote = {userName: user.name, userId: user._id};

					if(!isDuplicateLike(review)) {
						ReviewService.upvoteReview(review._id, newUpvote).then(function(review) {
							scope.review = review;
							scope.isDuplicateLike = isDuplicateLike(review);
							AlertService.setAlert("You liked this review!", "Success");
						}).catch(function(err) {
							AlertService.setAlert("This review could not be liked.", "Error");
						});
					} else {
						AlertService.setAlert("You have already liked this review once.", "Error");
					}
				};

				scope.removeUpvote = function(review) {
					var idx = -1;

					review.upvotes.forEach(function(upvote, index) {
						if(upvote.userId === Auth.getCurrentUser()._id) {
							idx = index;
						}
					});

					if(idx >= 0) {
						review.upvotes.splice(idx, 1);
						scope.updateReview(review);
					}
				};

				scope.updateReview = function(review) {
		      ReviewService.updateReview(review).then(function(updatedReview) {
		        scope.review = review;
		        scope.isDuplicateLike = isDuplicateLike(updatedReview);
		      });
		    };
			}
		}
	});







	/*scope.addAddress = function(form, address) {
		scope.submitted = true;
		scope.address.type = scope.type;
		scope.address.user = Auth.getCurrentUser()._id;

		if(form.$valid){
			AddressService.addAddress(address).then(function(address) {
				scope.submitted = false;
				if(scope.type === 'Billing') {
					Auth.setBillingAddress(address);
				} else if(scope.type === 'Shipping') {
					Auth.addShippingAddress(address);
				}
			}).catch(function(err) {
				err = err.data;
				scope.errors = {};

				angular.forEach(err.errors, function(error, field) {
					form[field].$setValidity('mongoose', false);
					scope.errors[field] = error.message;
				});
			});
		}
	};

	scope.updateAddress = function(form, address) {
		var addressId = address._id; //used to update currentUser
		AddressService.updateAddress(address).then(function(address) {
			scope.submitted = false;
			scope.address = address;
			if(scope.type === 'Billing') {
				Auth.setBillingAddress(address);
			}

		}).catch(function(err) {
			console.log(err);
		})
	};*/






/*

		    scope.populateCountries = function() {
		    	if(DataService.getCountries().length > 0) {
		    		scope.countries = DataService.getCountries;
		    	} else {
		    		DataService.ajaxCountries().then(function(countries) {
			        scope.countries = countries;
			        DataService.setCountries(countries);
			      });
		    	}
		    }

		    scope.populateProvinces = function(country) {
		      if(DataService.getSelectedCountry() === country) {
		      	scope.provinces = DataService.getProvinces(country);
		      } else {
		      	DataService.ajaxProvinces({country: country}).then(function(provinces) {
			      	scope.provinces = provinces;
			      	DataService.setProvinces(country, provinces);
			      });
		      }
		    }
*/



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
