'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	Product = require('../product/product.model'),
  Schema = mongoose.Schema;

var ComputerSchema = Product.schema.extend({
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

ComputerSchema
	.virtual('searchableCategories')
	.get(function() {
		return ['Brand', 'CPU', 'GPU', 'Motherboard'];
	})

ComputerSchema
  .virtual('publicProperties')
  .get(function() {
		//let publicProps = this.publicProperties || {};
		let computerProps = {
			'cpu': this.cpu,
			'gpu': this.gpu,
			'motherboard': this.motherboard
		};
		return computerProps;
		//return Object.assign(publicProps, computerProps);
	});


module.exports = mongoose.model('Computer', ComputerSchema);
