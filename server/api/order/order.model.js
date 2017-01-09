'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Address = require('../address/address.model').schema;

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
	subTotal: {
		type: Number,
		required: true
	},
	tax: {
		type: Number,
		required: true	
	},
	shippingCost: {
		type: Number,
		required: true
	},
	finalPrice: {
		type: Number,
		required: true
	},
	orderDate: {
		type: Date,
		required: true
	},
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
	status: {
		type: String,
		required: true
	},
	trackingNumber: {
		type: Number
	}
});


// Validate the phone number
/*UserSchema
  .path('postalCode')
  .validate(function(postalCode) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');
*/




OrderSchema.methods.cancelPurchase = function(purchase) {

};


OrderSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Order', OrderSchema);
