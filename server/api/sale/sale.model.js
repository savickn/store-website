'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SaleSchema = new Schema({
	startDate: {
		type: Date,
		required: 'You must choose a start date for this sale.' /*,
    validate: {
			validator: function(date) {
				return date > Date.now();
			},
			message: 'The starting date that you specified is already past.'
		}*/
	},
	endDate: {
		type: Date,
		required: 'You must choose an end date for this sale.',
    validate: {
			validator: function(date) {
				return date > Date.now();
			},
			message: 'The ending date that you specified is not appropriate.'
		}
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

SaleSchema.virtual('discount').get(function() {
  return String(this.discountRate*100) + '%';
})

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
  isApplicable: function(productType) {
    return (this.validProducts.includes(productType)) ? true:false;
  }
};

/*
* Class Methods
*/

SaleSchema.statics = {
  findByPromotionalCode: function(code) {
    return this.findOne({code: code}, function(err, sale) {
      return sale;
    });
  }
}


module.exports = mongoose.model('Sale', SaleSchema);
