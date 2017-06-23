'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UpvoteSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

/*UpvoteSchema.pre("save", function(next, done) {
  var self = this;
  mongoose.model["Upvote"].findOne({authorId: self.authorId}, function(err, upvote) {
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
