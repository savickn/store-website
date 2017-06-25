'use strict';

var mongoose = require('mongoose'),
    Upvote = require('../upvote/upvote.model'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  author: 	{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: 	{
    type: Schema.Types.ObjectId,
  	ref: 'Product',
    required: true
  },
  rating: 	{
    type: Number,
  	required: true,
  	min: 0,
  	max: 10
  },
  title: {
    type: String,
    required: true
  },
  summary: 	{
    type: String,
  	required: true,
  	minLength: 0,
    maxLength: 1000
  },
  date: {
    type: Date,
    default: Date.now()
  },
  verified: {
    type: Boolean,
    default: false
  },
  upvotes: [Upvote.schema]
});

/*
* Validations
*/

//prevents multiple identical upvotes
ReviewSchema
  .path('upvotes')
  .validate(function(upvotes) {
    return (new Set(upvotes)).size === upvotes.length ? true : false;
  }, 'You have already liked this review.')

/*
* Pre and POST Hooks
*/

// ensures that user does not review a product multiple times
ReviewSchema.pre("save", function(next) {
  let self = this;
  mongoose.model('Review')
    .findOne({author: this.author, product: this.product})
    .exec(function(err, review) {
      console.log(err);
      console.log(review);
      if(err) {next(err);}
      if(review) {
        console.log('invalid');
        self.invalidate("author", "You have already reviewed this product.");
        next(self);
      } else {
        next();
      }
  });
});

//sets Verified field, should be performed within 'create' instead
ReviewSchema.pre("save", function(next) {
  let self = this;
  mongoose.model('User').findById(this.author)
    .populate('orders', 'products')
    .exec(function(err, user) {
      if(err) {next(err);}
      for(let order of user.orders) {
        for(let product of order.products) {
          if(product.equals(self.product)) {
            self.verified = true;
            next(self);
          }
        }
      };
      next();
  });
});

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

ReviewSchema.virtual('shortSummary').get(function() {
  let arr = this.summary.split(" ");
  arr = arr.slice(0, 25);
  let str = arr.join(" ");
  return str + "...";
})

/*
* Class Methods
*/

ReviewSchema.statics = {
  findReviewsByAuthor: function(authorId) {
    return this.find({author: authorId}, function(err, reviews) {
      if (err) {return err;}
      return reviews;
    });
  }
}



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
