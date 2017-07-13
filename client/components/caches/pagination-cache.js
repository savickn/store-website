angular.module('passportApp')
  .factory('PaginationCache', ['$cacheFactory', function($cacheFactory) {
    //used to track pagination and page size of Product pages (e.g. Comuter vs. Monitor vs. Keyboard)
    return $cacheFactory('pagination-cache');
  }]);
