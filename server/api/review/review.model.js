'use strict';

var mongoose = require('mongoose'),
    Upvotes = require('../upvote/upvote.model'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  author: 	{ 	
    type: Schema.Types.ObjectId, 
    ref: 'User', 
  	index: true 
  },
  product: 	{	
    type: Schema.Types.ObjectId, 
  	ref: 'Product',
    //refPath: 'productType',
    index: true
  },
  rating: 	{	
    type: Number, 
  	required: true,
  	min: 0,
  	max: 10, 
  	trim: true
  },
  summary: 	{	
    type: String, 
  	required: true,
  	minLength: 0,
    maxLength: 500
  },
  upvotes: [Upvotes.schema]
});

//data consistency with product
ReviewSchema.pre("save", function(next) {
  var self = this;

  mongoose.model('Product').findOneAndUpdate(
    {_id: self.product},
    {$push: {reviews: self._id}},
    function(err, product) {
      if(err) {next(err);}
      next();
    }
  );
});

//prevents duplicate likes
ReviewSchema.pre("save", function(next) {

  var duplicates = function() {
    var i,
        len=this.upvotes.length,
        out=[],
        obj={};

    for (i=0;i<len;i++) {
      obj[this.upvotes[i]]=0;
    }
    for (i in obj) {
      out.push(i);
    }
    if (len === obj.length) {
      return false;
    } else {
      return true;
    }
  }

  if(duplicates === true) {
    self.invalidate("authorId", "You have already liked this post");
    done();
  } 

  next();
});

//data consistency with product
ReviewSchema.pre("remove", function(next) {
  var self = this;
  
  mongoose.model('Product').findOneAndUpdate(
    {_id: self.product},
    {$pull: {reviews: self._id}},
    function(err, product) {
      if(err) {next(err);}
      next();
    }
  );
}); 

ReviewSchema.virtual('score').get(function() {
	var score = this.upvotes.length;

	return score;
});

ReviewSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Review', ReviewSchema);



/*
mongoose.model(self.productType).findOne({_id: self.product}, function(err, product) {
    if(product) {
      if (product.reviews.indexOf(self._id) === -1) {
        product.reviews.push(self._id);
        product.save();
      }
    } else {
      next(err);
    }
  }); 

*/

 /*mongoose.model('Product').findOne({_id: self.product}, function(err, product) {
    if(err) {next(err);}
    if (product.reviews.indexOf(self._id) === -1) {
      product.reviews.push(self._id);
      product.save();
    }

  });*/
