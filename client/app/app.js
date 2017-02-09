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
  'mgo-angular-wizard',
  `ngMaterial`
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,
      RestangularProvider) {

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('spinnerInterceptor');
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

  .factory('spinnerInterceptor', function($rootScope, $q, $timeout) {
    return {
      request: function(config) {
        //console.log('request');
        //console.log(config);
        $rootScope.$broadcast('$postingStart', config.url);
        return $q.resolve(config);
      },
      response: function(response) {
        //console.log('response');
        //console.log(response);
        $rootScope.$broadcast('$postingEnd', response.config.url);
        return $q.resolve(response);
      },
      responseError: function(response) {
        $rootScope.$broadcast('$postingEnd', response.config.url);
        return $q.reject(response);
      }
    };
  })

  .run(function ($rootScope, $location, $timeout, Auth, AlertService, $mdDialog) {
    var showing = false;

    function showWait() {
      if(showing) return;
      $mdDialog.show({
        template: '<md-dialog id="plz_wait" style="background-color:transparent;box-shadow:none">' +
        '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
        '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
        '</div>' +
        '</md-dialog>',
        parent: angular.element(document.body),
        clickOutsideToClose: false,
        fullscreen: false
      }).then(function(answer) {
        showing = false;
      });
    }

    $rootScope.$on('$postingStart', function(event, url) {
      if (!$rootScope.postingStartTimer) {
        $rootScope.postingStartTimer = $timeout(function() {
          showWait();
          showing = true;
        }, 250);
      }
    });

    $rootScope.$on('$postingEnd', function(event, url) {
      if ($rootScope.postingStartTimer) {
        $timeout.cancel($rootScope.postingStartTimer);
        $rootScope.postingStartTimer = false;
        if(!showing) return;
        $mdDialog.cancel();
      }
    });

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });

    //clears alert on route change
    $rootScope.$on('$stateChangeSuccess', function (event, next) {
      AlertService.clearAlert();
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
