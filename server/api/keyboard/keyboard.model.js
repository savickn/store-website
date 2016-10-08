'use strict';

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
	ProductSchema = require('../product/product.model'),
    Schema = mongoose.Schema;

var KeyboardSchema = new Schema({
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
});

module.exports = mongoose.model('Keyboard', KeyboardSchema);