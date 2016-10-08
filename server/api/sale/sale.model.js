'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SaleSchema = new Schema({
	startDate: {
		type: Date,
		required: 'You must choose an end date for this sale.'
	},
	endDate: {
		type: Date,
		required: 'You must choose a start date for this sale.'
	},
	discountRate: {
		type: String,
		required: 'You must include a discount rate for this sale.'
	}
});


module.exports = mongoose.model('Sale', SaleSchema);

