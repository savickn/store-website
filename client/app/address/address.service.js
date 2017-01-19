'use strict';

angular.module('passportApp')
  .factory('AddressService', function (Restangular) {
    
    return {
      addAddress: function(address) {
        return Restangular.all('addresses').post(address);
      },
      updateAddress: function(address) {
        return Restangular.one('addresses', address._id).customPUT(address);
      },
      removeAddress: function(addressId) {
        return Restangular.one('addresses', addressId).remove();
      }
    };
  });
