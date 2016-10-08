'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UpvoteSchema = new Schema({
  author: String,
  authorId: 	{ 	
    type: Schema.Types.ObjectId, 
  	ref: 'User', 
  	index: true 
  },
  reviewId: 	{ 	
    type: Schema.Types.ObjectId, 
  	ref: 'Review', 
  	index: true 
  },
  date: Date
}); 

/*UpvoteSchema.pre("save", function(next, done) {
  var self = this;
  mongoose.models["Upvote"].findOne({authorId: self.authorId}, function(err, upvote) {
    if(err) {
      done(err);
    } else if(upvote) {
      self.invalidate("authorId", "You have already liked this post");
      done();
    } else {
      done();
    }
  });

  next();
});*/

module.exports = mongoose.model('Upvote', UpvoteSchema);