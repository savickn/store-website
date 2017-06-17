'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SaleSchema = new Schema({
	startDate: {
		type: Date,
		required: 'You must choose a start date for this sale.'
	},
	endDate: {
		type: Date,
		required: 'You must choose an end date for this sale.'
	},
  promotionalCode: {
    type: String,
    required: 'You must provide a promotional code.'
  },
  validProducts: [{
    type: String,
    required: 'You must select applicable categories.'
  }],
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

/**
 * Virtuals
 */

/**
* Validations
*/

/**
 * PRE and POST Hooks
 */

/**
* Instance Methods
*/

SaleSchema.methods = {
	isActive: function() {
    date = Date.now();
    return (this.startDate <= date && this.endDate >= date) ? true:false;
	},
  isApplicable: function(product) {
    return (product in this.validProducts) ? true:false;
  }
};

/*
* Class Methods
*/

SaleSchema.statics = {
  findByPromotionalCode: function(code) {
    SaleSchema.findOne({code: code}, function(err, sale) {
      return sale;
    });
  }
}


module.exports = mongoose.model('Sale', SaleSchema);
