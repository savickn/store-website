'use strict';

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    Product = require('../product/product.model'),
    Schema = mongoose.Schema;

var KeyboardSchema = Product.schema.extend({
  size: String, //e.g. full, mini
  macro: {
  	type: Boolean,
  	default: false
  },
  backlit: {
  	type: Boolean,
  	default: false
  },
  wireless: {
  	type: Boolean,
  	default: false
  }
}, {collection: 'products'});

module.exports = mongoose.model('Keyboard', KeyboardSchema);