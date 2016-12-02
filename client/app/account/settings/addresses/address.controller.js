'use strict';

angular.module('passportApp')
  .controller('AddressCtrl', function ($scope, Auth, AddressService) {

    $scope.addAddress = function(address) {
      if($scope.billingForm.$valid) {
        
      }
    };

    $scope.updateAddress = function(addressId, address) {

    };

    $scope.removeAddress = function(addressId) {
    	AddressService.removeAddress(addressId).then(function(id) {
    		Auth
    	}).catch(function(err) {
    		console.log(err);
    	});
    };
  });
