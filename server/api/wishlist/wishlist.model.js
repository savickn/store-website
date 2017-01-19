'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WishlistSchema = new Schema({
	private: {
		type: Boolean,
		default: false
	},
	products: [{
		type: Schema.Types.ObjectId, 
		ref: 'Product',
		index: true
	}],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

WishlistSchema.pre('save', function(next) {
	console.log(this);
	mongoose.model('User').findOneAndUpdate(
		{_id: this.user}, 
		{$set: {wishlist: this._id}}, 
		function(err, user) {
			if(err) {next(err);}
			next();
		}
	);
});

WishlistSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Wishlist', WishlistSchema);
