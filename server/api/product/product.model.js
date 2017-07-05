'use strict';

var mongoose = require('mongoose'),
    Sale = require('../sale/sale.model').schema,
    Inventory = require('../inventory/inventory.model').schema,
    Schema = mongoose.Schema;

var ProductSchema = new Schema({

  // GENERAL

  name: {
		type: String,
		required: 'You must include a name for this product.'
	},
	description: {
		type: String,
		required: 'You must include a description for this product.'
	},
	brand: {
		type: String,
		required: 'You must include a brand for this product.'
	},
  SKU: {
    type: String,
    default: 'N/A'
  },

  // PRICING

  price: {
		type: Number,
		required: 'You must include a price for this product.'
	},
  discount: {
    type: Number,
		validate: {
			validator: function(num) {
				return (num >= 0 && num <= 1);
			},
			message: 'The discount rate you specified is not valid. Please enter a rate between 0 and 1.'
		}
  },

  // REVIEWS

	reviews: [{
		type: Schema.Types.ObjectId,
		ref: 'Review',
		index: true
	}],
  aggregateRating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },

  // PICTURES

	pictures: [{
		type: Schema.Types.ObjectId,
		ref: 'Picture',
		index: true
	}],
	displayPicture: {
		type: Schema.Types.ObjectId,
		ref: 'Picture'
	},

  // MISC

	inventory: [Inventory],
	onlineOnly: {
		type: Boolean,
		default: false
	},
	featured: {
		type: Boolean,
		default: false
	}
}, {collection: 'products'});

/*
	sale: {
		type: [Sale],
		validate: {
			validator: function(arr) {
				return arr.length === 1;
			},
			message: 'Only one sale can be active at a time.'
		}
	},

ProductSchema
  .virtual('searchableCategories')
  .get(function() {
    	return _.extend(this.searchableCategories, ['featured', 'onlineOnly', 'onSale', 'brand'])
    };
  });

ProductSchema.virtual('getPublicFields').get(function() {
	var obj = {};
	var self = this;
	self.publicFields.forEach(function(field) {
		obj[field] = self.field;
	})
	return obj;
});
*/

/**
* Class Methods
**/

ProductSchema.statics = {
  getBrands: function() { //working
    return this.distinct('brand', function(err, brands) {
      if(err) {return err;}
      return brands;
    });
  },
  getCategories: function() { //working
    return this.distinct('__t', function(err, types) {
      if(err) {return err;}
      return types;
    });
  }
};

/*
* Pre and Post Hooks
*/

ProductSchema.pre('remove', function(next) {
	mongoose.model('Review').remove({product: this._id}).exec();
	mongoose.model('Picture').remove({product: this._id}).exec();
	next();
});

/*
* Virtual Methods
*/

// Public product information
ProductSchema
  .virtual('publicProperties')
  .get(function() {
    return {
      'name': this.name,
      'description': this.description,
      'price': this.price,
      'brand': this.brand,
      'onSale': this.onSale,
      'onlineOnly': this.onlineOnly,
      'cpu': this.cpu,
      'gpu': this.gpu,
      'motherboard': this.motherboard
    };
  });

//should probabily be a aync batch task instead for performance
ProductSchema
  .virtual('recommendedProducts')
  .get(function() {
	//refers to products that are frequently bought with this item
    mongoose.model('Order').find({products: this._id}).populate('products', '_id').exec(function(err, orders) {
      //console.log('recommended err', err);
      //console.log('recommended orders', orders);

      let productIDs = [];
      for(let o of orders) {
        //console.log(o.products);
        productIDs.concat(o.products);
      }
      //console.log('recommended productIDs', productIDs);
    })
});

ProductSchema
  .virtual('salePrice')
  .get(function() {
  	if(this.discount) {
  		var salePrice = this.price * this.discount;
  		return salePrice;
  	}
  });

ProductSchema
  .virtual('onSale')
  .get(function() {
  	return (this.discount && this.discount > 0) ? true:false;
  });

ProductSchema
  .virtual('averageRating')
  .get(function() {
    return (this.reviewCount === 0) ? 0 : this.aggregateRating / this.reviewCount;
  })


//maybe make this into a separate field
/*ProductSchema
  .virtual('averageRating')
  .get(function() {
    let score = 0;
    let iterations = 0;
    mongoose.model('Review').find({product: this._id}, function(err, reviews) {
      for(let review of reviews) {
        score += review.rating;
        iterations += 1;
      }
      return iterations > 0 ? Math.ceil(score/iterations) : score;
    })
  })*/

/*ProductSchema
  .virtual('availability')
  .get(function() {
    switch (expression) {
      case expression:

        break;
      default:

    }
  })

availability: {
  type: String,
  enum: ['In Stock', '2-3 Weeks', 'On Re-Order', 'Unavailable']
  //required: true
},*/


ProductSchema.set('toJSON', {virtuals: true});

exports.schema = ProductSchema;
exports.model = mongoose.model('Product', ProductSchema);


/*
	// recommended refers to frequently bought with
	recommendedAccessories: [{
		type: Schema.Types.ObjectId,
		ref: 'Product',
		index: true
	}],
	*/
