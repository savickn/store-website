'use strict';

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
	Product = require('../product/product.model'),
    Schema = mongoose.Schema;

var MonitorSchema = Product.schema.extend({
  screenSize: Number,
  vertRes: Number,
  horzRes: Number, 
  input: String //e.g. HDMI
}, {collection: 'products'});

module.exports = mongoose.model('Monitor', MonitorSchema);