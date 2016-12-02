'use strict';

angular.module('passportApp')
  .controller('AccountCtrl', function ($scope, AlertService, UserService, Auth, AddressService) {
    //$scope.user = Auth.getCurrentUser();
    //console.log($scope.user);

    $scope.changeEmail = function(form) {

    };

    $scope.setAsPrimaryAddress = function(updatedAddress) {
      $scope.user.shippingAddress = $scope.user.shippingAddress.map(function(address) {
        if(address._id === updatedAddress._id) {
          return address.primary = true;
        } else {
          return address;
        }
      })
      console.log($scope.user.shippingAddress);

      $scope.updateUser($scope.user);
    };

		$scope.updateUser = function(user) {
			console.log('clicked');

      UserService.updateUser(user).then(function(user) {
        $scope.user = newComputer;
        $scope.previewImage = newComputer.displayPicture;
        $scope.updateDisplayPic = false;
        $scope.computerEditForm.$setPristine();
        AlertService.setAlert("The computer was successfully updated.", "Success");
      }, function(err) {
        AlertService.setAlert(err, "Error");
      });
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword, $scope.user.confirmPassword)
        .then(function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch(function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
    };

    
  });
