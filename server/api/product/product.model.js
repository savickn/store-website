'use strict';

var mongoose = require('mongoose'),
    Sale = require('../sale/sale.model').schema,
    Inventory = require('../inventory/inventory.model').schema,
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: {
		type: String,
		required: 'You must include a name for this product.'
	},
	description: {	
		type: String,
		required: 'You must include a description for this product.'	
	},
	price: {
		type: Number,
		required: 'You must include a price for this product.'
	},
	brand: {
		type: String,
		required: 'You must include a brand for this product.'
	},
	reviews: [{
		type: Schema.Types.ObjectId, 
		ref: 'Review',
		index: true
	}],
	pictures: [{
		type: Schema.Types.ObjectId, 
		ref: 'Picture',
		index: true
	}],
	displayPicture: {
		type: Schema.Types.ObjectId, 
		ref: 'Picture'
	},
	recommendedAccessories: [{
		type: Schema.Types.ObjectId,
		ref: 'Product',
		index: true
	}],
	publicFields: [{
		type: String
	}],
	inventory: [Inventory],
	sale: Sale,
	/*sale: {
		type: Schema.Types.ObjectId,
		ref: 'Sale'
	},*/
	onSale: {
		type: Boolean,
		default: false
	},
	onlineOnly: {
		type: Boolean,
		default: false
	},
	featured: {
		type: Boolean,
		default: false
	}
}, {collection: 'products'});

/*ProductSchema.virtual('getPublicFields').get(function() {
	var obj = {};
	var self = this;
	self.publicFields.forEach(function(field) {
		obj[field] = self.field;
	})
	return obj;
});*/

ProductSchema.pre('remove', function(next) {
	mongoose.model('Review').remove({product: this._id}).exec();
	mongoose.model('Picture').remove({product: this._id}).exec();

	next();
});

ProductSchema.virtual('salePrice').get(function() {
	if(this.sale) {
		var salePrice = this.price * this.sale.discountRate;
		return salePrice;
	}
});

ProductSchema.set('toJSON', {virtuals: true});

module.exports = ProductSchema, mongoose.model('Product', ProductSchema);
