'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Address = require('../address/address.model').schema;

var PurchaseSchema = new Schema({
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
	shippedAddress: Address,
	billingAddress: Address,
	status: {
		type: String,
		required: true
	},
	trackingNumber: {
		type: Number
	}
});


PurchaseSchema.methods.cancelPurchase = function(purchase) {

};


PurchaseSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Purchase', PurchaseSchema);
