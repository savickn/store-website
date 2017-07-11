angular.module('passportApp')
  .factory('PaginationCache', ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('pagination-cache');
  }]);
