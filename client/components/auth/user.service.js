'use strict';

angular.module('passportApp')
  .factory('UserService', function (Restangular) {

    var restAngular =
      Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setFullResponse(true);
        //.setBaseUrl('api');
      });

    return {
      searchUsers: function(query) {
        return Restangular.all('users').customGET('search', query);
      },
      getUsers: function() {
        return Restangular.all('users').getList();
      },
      getUser: function(userId) {
        return Restangular.one('users', userId).get();
      },
      addUser: function(user) {
        return Restangular.all('users').post(user);
      },
      updateUser: function(userId, user) {
        return Restangular.one('users', userId).customPUT(user);
      },
      removeUser: function(userId) {
        return Restangular.one('users', userId).remove();
      },

      getMe: function() {
        return Restangular.one('users', 'me').get();
      },
      changePassword: function(userId, newPass) {
        return Restangular.one('users', userId).customPUT(newPass, 'password');
      },
      requestReset: function(userId) {
        return Restangular.one('users', userId).customGET('reset');
      },
      
      sendEmail: function(data) {
        return Restangular.all('users').customGET('email', data);
      }
    };
  });



/*
      changeEmail: function(userId, newEmail) {
        return Restangular.one('users', userId).customPUT(newEmail, 'email');
      },*/

  /*.factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });*/
