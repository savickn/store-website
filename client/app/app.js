'use strict';

angular.module('passportApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngCart',
  'ui.router',
  'ui.bootstrap',
  'restangular',
  'ngFileUpload',
  'passportAppFilters',
  'passportAppDirectives',
  'angularUtils.directives.dirPagination',
  'rzModule', //for price slider,
  'mgo-angular-wizard'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, 
      RestangularProvider) {
    
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    RestangularProvider.setBaseUrl('/api/');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });

    Array.prototype.pushUnique = function(item) {
      if (this.indexOf(item) == -1) {
        this.push(item);
        return true;
      }
      return false;
    }
    Array.prototype.remove = function(item) {
      var idx = this.indexOf(item);
      if(idx > -1) {
        this.splice(idx, 1);
        return true;
      }
      return false;
    }
  });
