'use strict';

angular.module('passportApp')
  .controller('PaymentCtrl', function ($scope, Auth, PaymentService, AlertService) {
  	$scope.errors = {};

  	$scope.isOwner = function(id) {
  		return Auth.isOwner(id);
  	}

  	$scope.newPayment = {};
    $scope.paymentMethods = Auth.getCurrentUser().paymentMethods;

  	$scope.paymentTypes = ['MasterCard', 'Visa', 'American Express'];
  	$scope.expiryMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  	$scope.expiryYears = ['2017', '2018', '2019', '2020', '2021'];

  	$scope.addPaymentMethod = function(form, newPayment) {
      $scope.submitted = true;
			newPayment.expiryDate = new Date(newPayment.expiryYear, newPayment.expiryMonth);
			newPayment.user = Auth.getCurrentUser()._id;

      PaymentService.addMethod(newPayment).then(function(payment) {
        $scope.submitted = false;
        $scope.paymentMethods.pushUnique(payment);
        AlertService.setAlert('Payment Method Added!','Success');
  			$scope.newPayment = {};
  		}).catch(function(err) {
        err = err.data;
        $scope.errors = {};

        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
  		})
  	}

  	$scope.removePaymentMethod = function(payment) {
  		PaymentService.removeMethod(payment._id).then(function(payment) {
        AlertService.setAlert('Payment Methods Removed', 'Success');
        $scope.paymentMethods.remove(payment);
  		}).catch(function(err) {
  			console.log(err);
  		})
  	}
  });
