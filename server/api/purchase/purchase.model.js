'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
	shipping: {
		type: Number,
		required: true
	},
	finalPrice: {
		type: Number,
		required: true
	}
});


//PurchaseSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Purchase', PurchaseSchema);
