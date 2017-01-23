
'use strict';

angular.module('passportApp')
  .controller('OrderCtrl', function ($scope, $stateParams, $timeout, OrderService, Auth, AlertService) {
    $scope.isAdmin = Auth.isAdmin();
    $scope.isLoggedIn = Auth.isLoggedIn();

    $scope.$watch( function () { return AlertService.alert; }, function (alert) {
      $scope.message = alert.message;
      $scope.type = alert.type;
    }, true);

    $scope.currentProduct = {};

    
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);

    OrderService.getOrder($stateParams.id).then(function(Order) {
      $scope.currentProduct = Order;
      $scope.previewImage = Order.displayPicture;


    });

    $scope.releaseOrder = function() {

    }

    $scope.arrivedAtStore = function() {
      
    }

    $scope.pickedUp = function() {

    }



    $scope.submitCancellationRequest = function(order) {
      var idx = $scope.availableorders.indexOf(order);
      
      orderService.removeorder(order._id).then(function() {
        $scope.availableorders.splice(idx, 1);
      });
    };

    $scope.updateOrder = function() {
      OrderService.updateOrder($scope.currentProduct).then(function(newOrder) {
        $scope.currentProduct = newOrder;
        $scope.previewImage = newOrder.displayPicture;
        $scope.updateDisplayPic = false;
        AlertService.setAlert("The Order was successfully updated.", "Success");
        $scope.OrderEditForm.$setPristine();
      }, function(err) {
        console.log(err);
        AlertService.setAlert('The Order could not be updated.', "Error");
      });
    };

    $scope.removeReview = function(review) {
      var idx = $scope.currentProduct.reviews.indexOf(review);

      ReviewService.removeReview(review._id).then(function() {
        $scope.currentProduct.reviews.splice(idx, 1);
      });
    };
  });
