'use strict';

angular.module('passportApp')
  .controller('PaymentCtrl', function ($scope, Auth, PaymentService) {
  	$scope.paymentMethods = Auth.getCurrentUser().paymentMethods || [];
  	
  	$scope.isOwner = function(id) {
  		return Auth.isOwner(id);
  	}

  	$scope.newPayment = {};

  	$scope.paymentTypes = ['MasterCard', 'Visa', 'American Express'];
  	$scope.expiryMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  	$scope.expiryYears = ['2017', '2018', '2019', '2020', '2021'];

  	$scope.addPaymentMethod = function(form, newPayment) {
  		//console.log(newPayment);
  		if(form.$valid) {
  			newPayment.expiryDate = new Date(newPayment.expiryYear, newPayment.expiryMonth);
  			newPayment.user = Auth.getCurrentUser()._id;
  			//console.log(date);
  			PaymentService.addMethod(newPayment).then(function(payment) {
	  			//console.log(payment);
	  			$scope.paymentMethods.pushUnique(payment);
	  			$scope.newPayment = {};
	  		}).catch(function(err) {
	  			console.log(err);
	  		})
  		}
  	}

  	$scope.removePaymentMethod = function(paymentId) {
  		PaymentService.removeMethod(paymentId).then(function(payment) {
  			console.log(payment);
  			$scope.paymentMethods.remove(payment);
  		}).catch(function(err) {
  			console.log(err);
  		})
  	} 
  });
