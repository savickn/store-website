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
            console.log(me);
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

      resetPassword: function(newPassword, confirmPassword, callback) {
        var cb = callback || angular.noop;

        return UserService.requestReset(currentUser._id, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }).then(function(user) {
          return cb(user);
        }).catch(function(err) {
          return cb(err);
        });
      },

      /*
      * Used to update the user
      */

      updateUser: function(callback) {
        var cb = callback || angular.noop;
        return UserService.updateUser(currentUser._id, currentUser).then(function(user) {
          console.log(user);
          currentUser = user;
          return cb(null, user);
        }).catch(function(err) {
          return cb(err);
        })
      },

      /**
      ** for handling the authenticated user
      **/

      getCurrentUser: function() {
        return currentUser;
      },

      setCurrentUser: function(user) {
        currentUser = user;
      },

      /**
      * for handling user's Shipping Addresses
      */

      getShippingAddresses: function() {
        return currentUser.shippingAddresses;
      },

      addShippingAddress: function(address) {
        currentUser.shippingAddresses.pushUnique(address);
      },

      removeShippingAddress: function(address) {
        currentUser.shippingAddresses.remove(address);
      },

      /*
      * for handling user's Billing Address
      */

      getBillingAddress: function() {
        return currentUser.billingAddress || {};
      },

      setBillingAddress: function(address) {
        currentUser.billingAddress = address;
      },

      /*
      * for handling user's paymentMethods
      */

      getPaymentMethods: function() {
        return currentUser.paymentMethods;
      },

      addPaymentMethod: function(payment) {
        currentUser.paymentMethods.pushUnique(payment);
      },

      removePaymentMethod: function(payment) {
        currentUser.paymentMethods.remove(payment);
      },

      /*
      * for handling user's wishlist
      */

      getWishlist: function() {
        return {
          _id: currentUser.wishlist._id,
          name: currentUser.name,
          products: currentUser.wishlist.products
        };
      },

      updateWishlist: function(wishlist) {
        currentUser.wishlist = wishlist;
      },

      /*
      * for handling user's order history
      */

      getOrders: function() {
        return currentUser.orders;
      },

      /*
       * for checking if auth user fulfills a specific role
       */

      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      isOwner: function(userId) {
        return (userId === currentUser._id) ? true : false;
      },

      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      //Waits for currentUser to resolve before checking if user is logged in
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
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });



            /*
      ** used to update user info
      */

      /*refreshUser: function(user, cb) {
        return UserService.getMe().then(function(me) {
          currentUser = me;
          return currentUser;
        });
      },*/
