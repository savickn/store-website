'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	ProductSchema = require('../product/product.model'),
    Schema = mongoose.Schema;

var ComputerSchema = ProductSchema.extend({
	cpu: {
		type: String,
		default: 'Not Specified'
	},
	motherboard: {
		type: String,
		default: 'Not Specified'
	},
	gpu: {
		type: String,
		default: 'Not Specified'
	},
}, {collection: 'products'});

module.exports = mongoose.model('Computer', ComputerSchema);