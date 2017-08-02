'use strict';

angular.module('passportApp')
  .controller('ActivationController', function($scope, $state, UserService, FlashService, AlertService) {
    (function activate() {
      UserService.activateAccount($state.params.id, $state.params.activationToken).then(function() {
        FlashService.setMessage('Your account was successfully activated. Please log in.', 'Success');
        $state.go('login');
      }).catch(function(err) {
        AlertService.setAlert('Your account could not be activated. Please try again later.', 'Error');
      });
    }) ();
  });
