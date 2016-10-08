'use strict';

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
	ProductSchema = require('../product/product.model'),
    Schema = mongoose.Schema;

var MonitorSchema = ProductSchema.extend({
  screenSize: Number,
  vertRes: Number,
  horzRes: Number, 
  input: String //e.g. HDMI
}, {collection: 'products'});

module.exports = mongoose.model('Monitor', MonitorSchema);