'use strict';

angular.module('passportApp')
  .factory('Auth', function Auth($location, $rootScope, $http, UserService, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      UserService.getMe().then(function(me) {
        currentUser = me;
      });
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          UserService.getMe().then(function(me) {
            currentUser = me;
          });
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /*
      ** used to update user info
      */

      refreshUser: function(user, cb) {
        return UserService.getMe().then(function(me) {
          currentUser = me;
          return currentUser;
        });
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return UserService.addUser(user).then(function(data) {
          console.log(data);
          $cookieStore.put('token', data.token);
          UserService.getMe().then(function(me) {
            currentUser = me;
          })
          return cb(data);
        });
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, confirmPassword, callback) {
        var cb = callback || angular.noop;

        if(newPassword != confirmPassword) {
          let err = new Error("The new password does not match!");
          return cb(err);
        }

        return UserService.changePassword(currentUser._id, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }).then(function(user) {
          return cb(user);
        }).catch(function(err) {
          return cb(err);
        });
      },

      /**
      ** Reset Password
      **/ 

      resetPassword: function(newPassword, confirmPassword, callback) {

      },

      /**
      ** Used to update client-side wishlist after adding or removeing from wishlist
      **/

      updateWishlist: function(wishlist) {
        currentUser.wishlist = wishlist;
      },

      /**
      ** Setter for user saved in service
      **/

      setCurrentUser: function(user) {
        console.log('current user set');
        currentUser = user;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
