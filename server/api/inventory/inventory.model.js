'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InventorySchema = new Schema({
	warehouse: {
		type: String,
		enum: ['PEG', 'ING'],
		required: 'You must include a name for this product.'
	},
	stock: {
		type: Number,
		default: 0,
		validate: function(x) {
			return (x > 0);
		}
	}
});


InventorySchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Inventory', InventorySchema);
