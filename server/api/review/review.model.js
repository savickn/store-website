'use strict';

var mongoose = require('mongoose'),
    Upvote = require('../upvote/upvote.model'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  author: 	{ 	
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  product: 	{	
    type: Schema.Types.ObjectId, 
  	ref: 'Product'
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
  upvotes: [Upvote.schema]
});

/*
* Validations 
*/



/*
* Pre and POST Hooks
*/

//data consistency with product
ReviewSchema.pre("save", function(next) {
  mongoose.model('Product').findOneAndUpdate(
    {_id: this.product},
    {$addToSet: {reviews: this._id}},
    function(err, product) {
      if(err) {next(err);}
      next();
    }
  );
});

//data consistency with product
ReviewSchema.pre("remove", function(next) {
  mongoose.model('Product').findOneAndUpdate(
    {_id: this.product},
    {$pull: {reviews: this._id}},
    function(err, product) {
      if(err) {next(err);}
      next();
    }
  );
}); 

/*
* Virtual Methods
*/

ReviewSchema.virtual('score').get(function() {
	return this.upvotes.length;
});

ReviewSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Review', ReviewSchema);






/*prevents duplicate likes
ReviewSchema.pre("save", function(next) {

  function pushUnique(array, item) {
    if (array.indexOf(item) == -1) {
      array.push(item);
    }
    return false;
  }
});

  /*function checkForDuplicates() {
    var newUpvotes = [];
    this.upvotes.forEach((upvote) => {
      if(!pushUnique(newUpvotes, upvote)) {
        this.invalidate("author", "You have already liked this post!");
        done();
      }
    })
    return newUpvotes;
  }
  if(this.upvotes) {
    this.upvotes = checkForDuplicates();
  };*/
/*  next();
});*/



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


  /*function duplicates() {
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
  }*/