
'use strict';

angular.module('passportApp')
  .controller('TestCtrl', function ($scope, $timeout, UserService, ComputerService) {
  	$scope.email = {};

    $scope.errors = {};
    $scope.formObj = {};
    $scope.submitted = false;

  	$scope.sendEmail = function() {
  		UserService.sendEmail($scope.email).then(function(success) {
  			console.log(success);
  		}).catch(function(error) {
  			console.log(error);
  		});
  	};

    $scope.send = function() {
      UserService.send().then(function(success) {
        console.log(success);
      }).catch(function(error) {
        console.log(error);
      });
    };

    $scope.formSubmit = function(form, obj) {
      $scope.submitted = true;
      console.log(form);
      console.log(obj);
      $timeout(function () {
        $scope.submitted = false;
      }, 10000);
    }



  });





/*
  // YOUR CODE HERE !

/*
function proximity(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  let reward = 0;
  let penalty = 0;

  for(let x = 0; x < (a.length-1); x++) {
    for(let y = 0; y < a.length; y++) {
      if(b.indexOf(a.slice(x, y)) > -1) {
        reward += (y-x)*2;
      } else {
        penalty++;
      }
    }
  }
  return reward/(reward+penalty);
}*/



//This algorithm is an original work by Andrew Matte in Toronto, andrew.matte@gmail.com
//You are completely free to do whatever you want with this algorithm but,
//please credit me. Also there is no warranty that is it perfectly suited to your use case.
//Written originally in Visual Basic to replace VLOOKUP's fuzzy lookup in Microsoft Excel
//in 2014, implemented in MS-SQL, Python, and JS.
//Apologies for any similarities to an algorithm you personally might have written independently.
