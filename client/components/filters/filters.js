'use strict';

angular.module('passportAppFilters', [])
	.filter('yesNo', function() {
    return function(input) {
      return input ? 'Yes' : 'No';
    }
	})
	.filter('productFilter', function() {
		return function(products, filterExpr) {
			var filtered = [];
			var nameMatch = new RegExp();

			products.forEach(function(product) {
				var fields = 0;
				var matches = 0;

				var checkMatch = function(fValue, pValue) {
					fields++;
					if(pValue === fValue) {
						matches++;
					}
				}

				for(var i in filterExpr) {
					if(filterExpr[i] === false) { 
						//console.log('false:' + filterExpr[i]);
						continue; 
					}
					
					if(Array.isArray(filterExpr[i])) {
						//console.log('Array:' + filterExpr[i]);
						if(filterExpr[i].length < 1) { 
							continue; 
						} else {
							fields++;
							filterExpr[i].forEach(function(value) {
								if(value === product[i]) {
									matches++;
								}
							})
						}
					}
					else if(typeof filterExpr[i] === 'string') {
						//console.log('string:' + filterExpr[i]);
						var stringMatch = new RegExp(filterExpr[i], "i");
						fields++;
						if(product[i].match(stringMatch)) {
							matches++;
						};
					} else {
						checkMatch(filterExpr[i], product[i]);
					}
				}
				
				/*console.log(product.name);
				console.log(fields);
				console.log(matches);*/

				if (fields === matches) {
					filtered.push(product);
				}
			});
			return filtered;
		}
	})
	.filter('priceFilter', function() {
		return function(products, priceExpr) {
			var filtered = [];
			products.forEach(function(product) {
				if(product.price >= priceExpr.minPrice && product.price <= priceExpr.maxPrice) {
					filtered.push(product);
				}
			});
			return filtered;
		}
	})
	.filter('capitalize', function() {
	    return function(s) {
	      return (angular.isString(s) && s.length > 0) ? s[0].toUpperCase() + s.substr(1).toLowerCase() : s;
	    }
	})
	.filter('isNotEmpty', function () {
        var bar;
        return function (obj) {
            for (bar in obj) {
                if (obj.hasOwnProperty(bar)) {
                    return true;
                }
            }
            return false;
        };
    });



	/*			for(var i in filterExpr) {
				if(filterExpr[i] === false || filterExpr[i].length < 1) {
					delete filterExpr[i];
				}
			}*/