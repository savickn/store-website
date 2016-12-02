
'use strict';

angular.module('passportApp')
  .controller('TestCtrl', function ($scope, UserService) {
  	$scope.email = {
  		text: 'hello'
  	};

  	$scope.sendEmail = function() {
  		UserService.sendEmail($scope.email).then(function(success) {
  			console.log(success);
  		}).catch(function(error) {
  			console.log(error);
  		});
  	};

  });

