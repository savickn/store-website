'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash');


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
		match: [/[a-zA-Z]{1}[0-9]{1}[a-zA-Z]{1}(\s|-)?[0-9]{1}[a-zA-Z]{1}[0-9]{1}/, 'Incorrect Format. The postal code should be provided in the format A1A1A1.'],
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
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

/*
* Pre and Post Hooks
*/

AddressSchema.pre("save", function(next) {
  if(this.type === 'Billing') {
  	mongoose.model('User').findOneAndUpdate(
	    {_id: this.user},
	    {$set: {billingAddress: this._id}},
	    function(err, user) {
	      if(err) {next(err);}
	      next();
	    }
	  );
  } else if(this.type === 'Shipping') {
  	mongoose.model('User').findOneAndUpdate(
	    {_id: this.user},
	    {$addToSet: {shippingAddresses: this._id}},
	    function(err, product) {
	      if(err) {next(err);}
	      next();
	    }
	  );
  }
});

AddressSchema.pre('remove', function(next) {
	if(this.type === 'Billing') {
		mongoose.model('User').findOneAndUpdate(
			{_id: this.user},
			{$set: {billingAddress: {}}},
			function(err, user) {
				if(err) {next(err);}
	      next();
			}
		);
	} else if(this.type === 'Shipping') {
		mongoose.model('User').findOneAndUpdate(
			{_id: this.user},
			{$pull: {shippingAddresses: this._id}},
			function(err, user) {
				if(err) {next(err);}
	      next();
			}
		);
	}
})

/*
* Validations
*/

//validate that user does not have 2+ addresses with the same nickname, not working currently
AddressSchema
	.path('nickname')
	.validate(function(nickname) {
		var state = true;
		mongoose.model('User').findOne({_id: this.user}, function(err, user) {
			var addresses = user.shippingAddresses
			if(user.billingAddress) {
				addresses.push(user.billingAddress);
			}
			addresses.forEach(function(address) {
				if(address.nickname === nickname) {
					return false;
				}
			})
			return state;
		});
	}, 'The nickname you provided is already associated with another address.')

// Validate the postal code, use api to compare postal code to province and country
AddressSchema
  .path('postalCode')
  .validate(function(postalCode) {

  }, 'The postal code you specified does not match your address.');

/*
* Virtuals
*/

AddressSchema
  .virtual('formatAddress')
  .get(function() {
    var str = '';

    return str;
  })

AddressSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Address', AddressSchema);


/*
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}*/
