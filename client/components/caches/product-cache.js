
angular.module('passportApp')
  .factory('ProductCache', ['$cacheFactory', function($cacheFactory) {
    //used to cache object pertaining to state of Product.Show (e.g. recommendedOffset, viewState)
    return $cacheFactory('product-cache');
  }]);
