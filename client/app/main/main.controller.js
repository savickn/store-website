'use strict';

angular.module('passportApp')
  .controller('MainCtrl', function ($scope, $http, socket, Restangular) {
    

  });

/*

    $scope.awesomeThings = [];

    var baseThings = Restangular.all('things');

    baseThings.getList().then(function(things) {
      //resync using promises/AJAX
      $scope.awesomeThings = things;
      //resync using socket.io
      //socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      var newThing = {name: $scope.newThing};
      baseThings.post(newThing).then(function(thing) {
        $scope.awesomeThings.push(thing);
      });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      var findthing = thing;
      var thing = Restangular.one('things', thing._id)
      thing.remove().then(function() {
        var index = $scope.awesomeThings.indexOf(findthing);
        if(index > -1) {$scope.awesomeThings.splice(index, 1)};
      });
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
*/

    /* using http/socket.io
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });*/
