'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RewardSchema = new Schema({
	cardNumber: {
		type: String, 
		required: true,
		match: /^\d{8}$/
	},
	points: {
		type: Number, 
		validate: function(number) {
			return number >= 0;
		},
		default: 0
	},
	user: {
		type:Schema.Types.ObjectId,
		ref: 'User'
	}
});

//prevents multiple rewards entries

RewardSchema.pre('save', function(next) {
	var self = this;

	mongoose.model('User').findOne({_id: self.user}, function(err, user) {
		if(err) {next(err);}
		if(user.reward) {
			self.invalidate("user", "You already have a plum account!");
			done();
		}
		next();
	});
})

//data consistency
RewardSchema.pre('save', function(next) {
	mongoose.model('User').findOneAndUpdate(
	    {_id: this.user},
	    {$set: {reward: this._id}},
	    function(err, user) {
	      if(err) {next(err);}
	      next();
    	}
  	);
})

RewardSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Reward', RewardSchema);
