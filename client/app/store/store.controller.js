

'use strict';

angular.module('passportApp')
  .controller('StoreCtrl', function ($scope, $http, socket, FileUploader) {
    $scope.uploader = new FileUploader();
  
  });
