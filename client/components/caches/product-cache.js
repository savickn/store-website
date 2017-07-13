angular.module('passportApp')
  .factory('ProductCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('product-cache');
  }]);
