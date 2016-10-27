'use strict';

angular.module('passportApp')
  .factory('SessionService', function ($location, $rootScope, $cookies) {
    var sessionStore = {};
    
    var session = {
    	addItem: function(key, value) {
    		sessionStore[key] = value;
    	},
    	getStore: function() {
    		return sessionStore;
    	}
    }

    return session;
  });

