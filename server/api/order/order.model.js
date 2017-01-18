'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Address = require('../address/address.model').schema,
    PaymentMethod = require('../payment/payment.model').schema;

var OrderSchema = new Schema({
	customer: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'Product',
		index: true
	}],
	status: {
		type: String,
		enum: ['Awaiting Pre-Auth', 'Pre-Auth Declined', 'Credit Approved', 'Printed', 'On Route', 'Delivered', 'Canceled'],
		required: true
	},
	orderNumber: {
		type: Number
	},
	orderDate: {
		type: Date,
		required: true
	},
	subTotal: {
		type: Number,
		required: true
	},
	promotion: {
		type: Schema.Types.ObjectId,
		ref: 'Sale'
	},
	tax: {
		type: Number,
		required: true	
	}, //based on province/country
	shippingCost: {
		type: Number,
		required: true
	}, //maybe use API of a shipping company like CanadaPost or UPS
	//or have Free Shipping on Order > $50, flat rate $10 shipping within North America, $$$ for premium shipping
	shippingAddress: {
		type: [Address],
		validate: {
			validator: function(arr) {
				return arr.length === 1;
			},
			message: 'An order can only have one shipping address.'
		}
	},
	billingAddress: {
		type: [Address],
		validate: {
			validator: function(arr) {
				return arr.length === 1;
			},
			message: 'An order can only have one billing address.'
		}
	},
	payment: {
		type: [PaymentMethod],
		validate: {
			validator: function(arr) {
				return arr.length === 1;
			},
			message: 'An order can only have one method of payment.'
		}
	},
});


// Validate the phone number
/*UserSchema
  .path('postalCode')
  .validate(function(postalCode) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');
*/



/*
* Used for diagnostic purposes
*/

OrderSchema.statics = {
	//sorted by most late
	getLateOrders: function() {

	}
}

/*
* Used for managing a particular Order
*/

OrderSchema.methods = {
	cancel: function() {

	}, 
	attemptPreAuth: function() {

	},
	markAsShipped: function() {

	},
	markAsDelivered: function() {

	} 

};




OrderSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Order', OrderSchema);
