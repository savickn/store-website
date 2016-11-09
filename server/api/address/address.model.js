'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AddressSchema = new Schema({
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
	}
});


AddressSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Address', AddressSchema);
