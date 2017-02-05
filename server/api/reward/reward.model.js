'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RewardSchema = new Schema({
	cardNumber: {
		type: String,
    match: /^([0-9]{8})$/,
		required: true
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
		ref: 'User',
    required: true
	}
});

/*
* Validations
*/

//prevents multiple rewards entries
RewardSchema
  .path('user')
  .validate(function(userId, respond) {
    var self = this;
    mongoose.model('User').findOne({_id: userId}, function(err, user) {
      if(err) throw err;
      if(user.reward) {
        return respond(false);
      }
      respond(true);
    })
  }, 'You already have a plum account!');

/*
* Pre and Post Hooks
*/

RewardSchema.pre('save', function(next) {
	mongoose.model('User').findOneAndUpdate(
	    {_id: this.user},
	    {$set: {reward: this._id}},
	    function(err, user) {
	      if(err) {next(err);}
	      next();
    	}
  );
});

/*
* Class methods
*/

RewardSchema.statics = {

};

/*
* Instance methods
*/

RewardSchema.methods = {
    addPoints: function(points) {
      this.points += points;
    },
    removePoints: function(points) {
      this.points -= points;
      if(this.points < 0) {
        this.points = 0;
      }
    }
};

/*
* Virtuals
*/

RewardSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Reward', RewardSchema);
