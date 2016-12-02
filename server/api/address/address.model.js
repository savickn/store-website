'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AddressSchema = new Schema({
	type: {
		type: String,
		enum: ['Billing', 'Shipping'],
		required: true
	},
	primary: {
		type: Boolean,
		default: true
	},
	nickname: {
		type: String,
		required: true
	},
	street: {
		type: String, 
		required: true
	},
	poBox: {
		type: String
	},
	aptNumber: {
		type: String
	},
	postalCode: {
		type: String, 
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});


AddressSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Address', AddressSchema);
