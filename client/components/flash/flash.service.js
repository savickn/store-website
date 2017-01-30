'use strict';

angular.module('passportApp')
.factory("FlashService", function($rootScope, $timeout) {
  var queue = [];
  var currentMessage = {};

  $rootScope.$on("$routeChangeSuccess", function() {
    currentMessage = queue.shift() || {};
    $timeout(() => {
      currentMessage = {};
    }, 10000)
  });

  return {
    getMessage: function() {
      return currentMessage;
    },
    setMessage: function(message, type) {
      var msg = {
        message: message,
        type: type
      };
      queue.push(msg);
    },
    clearMessage: function() {
      currentMessage = {};
    }
  };
});
