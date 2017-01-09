'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var countryList = ['Canada', 'USA'];
var provinceList = {
	'Canada': ['Alberta', 'British Columbia', 'Saskachewan', 'Manitoba', 'Ontario'],
	'USA': ['New York', 'California', 'Colorado']
};
var cityList = {
	'Alberta': [],
	'Manitoba': []
};

var AddressSchema = new Schema({
	type: {
		type: String,
		enum: ['Billing', 'Shipping'],
		required: true
	},
	nickname: {
		type: String,
		required: 'You must provide a nickname for this address.'
	},
	street: {
		type: String, 
		required: 'You must provide a street address.'
	},
	poBox: {
		type: Number
	},
	aptNumber: {
		type: Number
	},
	postalCode: {
		type: String,
		//match: [/[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}(\s|-)?[0-9]{1}[a-zA-Z]{1}[0-9]{1}/, 'Incorrect Format. The postal code should be provided in the format A1A1A1.'], 
		required: 'You must provide a postal code.'
	},
	city: {
		type: String,
		required: 'You must provide a city.'
	},
	province: {
		type: String,
		//enum: ['Alberta', 'British Columbia', 'Saskachewan', 'Manitoba', 'Ontario'],
		required: 'You must select a province.'
	}, 
	country: {
		type: String,
		//enum: countryList,
		required: 'You must select a country.'
	}
});

//validate that user does not have 2+ addresses with the same nickname


AddressSchema
  .virtual('formatAddress')
  .get(function() {
    var str = '';

    return str;
  })


// Validate the postal code
/*AddressSchema
  .path('postalCode')
  .validate(function(postalCode) {

  }, 'The postal code you specified does not match your address.');
*/
  //use api to compare postal code to province and country



AddressSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Address', AddressSchema);


/*
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}*/