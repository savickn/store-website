'use strict';

angular.module('passportApp')
.factory("AlertService", function($timeout) {
  var alert = {};

  return {
    getAlert: function() {
      return alert;
    },
    setAlert: function(message, type, duration = 10000) {
      alert.message = message;
      alert.type = type;
      $timeout(() => {
        this.clearAlert();
      }, duration);
    },
    clearAlert: function() {
      alert = {};
    }
  };
});




/*return {
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
};*/
