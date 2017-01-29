
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

				//console.log(scope.productId);
				//console.log(wishlist);
				//console.log(scope.state);

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
				//console.log(scope.address);
				//console.log(scope.addresses);
				//console.log(scope.type);

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
			link: function(scope, elem, attrs) {
				console.log(scope.address);
			}
		}
	})
	//used to add or update a particular ADDRESS that is passed to it
	.directive('nsAddAddress', function(DataService, AddressService, Auth) {
		return {
			restrict: 'E',
			templateUrl: '../components/directives/views/newAddress.html',
			scope: {
				address: '=',
				type: '@',
				state: '@'/*,
				formErrors: '=',
				cbFunc: '&',
				stateFunc: '&'*/
			},
			link: function(scope, elem, attrs) {
				//check for favorite shipping address in Cookies
				//create shipping address selector
				//autofill billing address with user billing address

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

		    /*scope.handleAddress = function(form, address) {
		    	scope.submitted = true;

		    	//scope.stateFunc({billingState: 'Default'});
		    	scope.cbFunc({form: form, address: address});
		    };*/

		    scope.addAddress = function(form, address) {
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
						if(scope.type === 'Billing') {
							Auth.setBillingAddress(address);
						}

		      }).catch(function(err) {
		        console.log(err);
		      })
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
	.directive('alertMessage', function(AlertService) {
		return {
			restrict: 'E',
			templateUrl : '../components/directives/views/alert.html',
			scope : {},
			link: function(scope, elem, attrs) {
				scope.$watch( function () { return AlertService.alert; }, function (alert) {
				    scope.message = alert.message;
				    scope.type = alert.type;
			  	}, true);
			}
		};
	})

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
