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
		type: Number,
		required: 'You must include a discount rate for this sale.',
		validate: {
			validator: function(num) {
				return (num > 0 && num < 1);
			},
			message: 'The discount rate you specified is not valid. Please enter a rate between 0 and 1.'
		}
	}
});


module.exports = mongoose.model('Sale', SaleSchema);

