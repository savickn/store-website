'use strict';

angular.module('passportApp')
.factory("AlertService", function($timeout) {
  var newAlert = {};

  return {
    setAlert: function(message, type) {
      newAlert.message = message;
      newAlert.type = type;
      $timeout(function() {newAlert = {}}, 10000);
    },
    getAlertMessage: function() {
      return newAlert.message;
    },
    getAlertType: function() {
      return newAlert.type;
    }
  };
});