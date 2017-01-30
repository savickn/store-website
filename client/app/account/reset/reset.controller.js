
angular.module('passportApp')
  .controller('ResetController', function($scope, $state, Auth, FlashService) {
    $scope.resetPassword = function() {
      Auth.resetPassword().then(function() {
        FlashService.setMessage('Your password was successfully reset. Please attempt to login.', 'Success');
        $state.go('login');
      }).catch(function(err) {
        console.log(err);
      });
    };

    $scope.requestPasswordReset = function() {

    };
  });
