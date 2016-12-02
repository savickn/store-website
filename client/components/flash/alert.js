'use strict';

angular.module('passportApp')
.factory("AlertService", function($timeout) {
  return {
    alert: {},
    setAlert: function(message, type) {
      this.alert.message = message;
      this.alert.type = type;
      $timeout(() => {
        this.clearAlert();
      }, 10000);
    },
    clearAlert: function() {
      this.alert = {};
    }
  };
});