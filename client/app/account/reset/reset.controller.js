
angular.module('passportApp')
  .controller('ResetController', function($scope, $state, Auth, UserService, FlashService, AlertService) {
    $scope.resetPassword = function(form, reset) {
      if(form.$valid) {
        let payload = {
          newPassword: reset.newPassword,
          confirmPassword: reset.confirmPassword,
          resetToken: $state.params.resetToken
        };
        UserService.resetPassword($state.params.id, payload).then(function() {
          FlashService.setMessage('Your password was successfully reset. Please attempt to login.', 'Success');
          $state.go('login');
        }).catch(function(err) {
          AlertService.setAlert(err.data.msg, "Error");
          console.log(err);
        });
      };
    };

    $scope.requestPasswordReset = function(email) {
      UserService.requestReset(email).then(function(response) {
        AlertService.setAlert(response.msg, "Warning");
      }).catch(function(err) {
        console.log(err);
      })
    };
  });
