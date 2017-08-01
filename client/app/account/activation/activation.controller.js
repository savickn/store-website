'use strict';

angular.module('passportApp')
  .controller('ActivationController', function($scope, $state, UserService, FlashService, AlertService) {
    console.log($state.params);

    /*$scope.activate = function() {
      UserService.activateAccount($state.params.id, $state.params.activationToken).then(function() {
        FlashService.setMessage('Your account was successfully activated.', 'Success');
        setTimeout(function() {
          console.log('go to login');
          //$state.go('login');
        }, 2000);
      }).catch(function(err) {
        AlertService.setAlert('Your account could not be activated. Please try again later.', 'Error');
      });
    }*/

    (function activate() {
      UserService.activateAccount($state.params.id, $state.params.activationToken).then(function() {
        FlashService.setMessage('Your account was successfully activated.', 'Success');
        setTimeout(function() {
          //console.log('go to login');
          $state.go('login');
        }, 2000);
      }).catch(function(err) {
        AlertService.setAlert('Your account could not be activated. Please try again later.', 'Error');
      });
    }) ();
  });
