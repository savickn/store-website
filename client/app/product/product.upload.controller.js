'use strict';

angular.module('passportApp')
  .controller('ComputerUploadCtrl', function ($scope, $timeout,
      Auth, Upload, ComputerService, SessionService) {
    $scope.isAdmin = Auth.isAdmin();

    $scope.errorMessages = "";
    $scope.validationErrors = {};

    ///////////////////////////////////////////////////////////////////////

    $scope.newComputer = {};
    $scope.newPictures = [];
    $scope.newDisplayPicture = {};

    //ADD + REMOVE COMPUTERS
    $scope.addComputer = function() {
      !$scope.newComputer.gpu ? 'Not Specified' : $scope.newComputer.gpu;
      !$scope.newComputer.cpu ? 'Not Specified' : $scope.newComputer.cpu;
      !$scope.newComputer.motherboard ? 'Not Specified' : $scope.newComputer.motherboard; 

      $scope.newComputer.publicFields = ['name', 'description', 'price', 'brand', 'onSale', 
        'onlineOnly', 'featured', 'cpu', 'gpu', 'motherboard'];

      if($scope.computerform.$valid && Auth.isAdmin()) {
        ComputerService.addComputer($scope.newComputer).then(function(computer) {
          var newComputer = computer;
          var numberOfPictures = $scope.newPictures.length;

          $scope.newPictures.forEach(function(pic) {
            Upload.upload({
              url: '/api/pictures',
              method: 'POST',
              data: {file: pic, filename: pic.name, contentType: pic.type, size: pic.size,  
                displayPicture: pic.displayPicture, productType: computer.__t, product: computer._id} 
            }).then(function (response) {
              $timeout(function () {
                $scope.status = "success";

                if(response.displayPicture === true) {
                  newComputer.displayPicture = response.path;
                  //console.log(response._id);
                }

                newComputer.pictures.push({path: response.path});
                numberOfPictures -= 1;
                
                if(numberOfPictures === 0) {
                  //console.log('success');
                  $scope.availableComputers.push(newComputer);
                  $scope.newComputer = {};
                }
              });
            }, function (err) {
              if (err.status > 0)
                $scope.errorMsg = err.status + ': ' + err.data;
            }, function (evt) {
              // Math.min is to fix IE which reports 200% sometimes
              pic.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
          })
        }, function(err) {
          var err = err.data;
          $scope.validationErrors = {};

          angular.forEach(err.errors, function(error, field) {
            //$scope.computerform[field].$setValidity('mongoose', false);
            $scope.validationErrors[field] = error.message;
          });
        });
      }
    };

    $scope.setAsDisplayPicture = function(filename) {
      $scope.newPictures.forEach(function(pic) {
        if(pic.name === filename) {
          pic.displayPicture = true;
        } else {
          pic.displayPicture = false;
        }
      })
    }

  });
