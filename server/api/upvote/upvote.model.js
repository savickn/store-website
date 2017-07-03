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
    ref: 'User',
    required: true
  }
}, { _id: false });

//only works if Upvotes are saved separately, e.g. as references
/*UpvoteSchema.pre("save", function(next) {
  var self = this;
  mongoose.model["Upvote"].findOne({authorId: self.authorId}, function(err, upvote) {
    if(err) { next(err); }
    if(upvote) {
      self.invalidate("authorId", "You have already liked this post");
      next(self);
    } else {
      next();
    }
  });
});*/

module.exports = mongoose.model('Upvote', UpvoteSchema);
