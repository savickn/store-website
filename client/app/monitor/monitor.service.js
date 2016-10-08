'use strict';

angular.module('passportApp')
  .factory('MonitorService', function (Restangular) {
  	return Restangular.service('monitors');
  });

