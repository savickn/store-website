'use strict';

angular.module('passportApp')
  .factory('PaymentService', function(Restangular) {
  	return {
  		addMethod: function(method) {
  			return Restangular.all('payments').post(method);
  		},
  		removeMethod: function(methodId) {
  			return Restangular.one('payments', methodId).remove();
  		}
  	}
  });
