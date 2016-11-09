'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var URewardSchema = new Schema({
	cardNumber: {
		type: Number, 
		required: true,
		validate: function(number) {
			return number.toString().length === 10;
		}
	},
	points: {
		type: Number, 
		default: 0
	},
	user: {
		type:Schema.Types.ObjectId,
		ref: 'User'
	}
});


URewardSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('UReward', URewardSchema);
