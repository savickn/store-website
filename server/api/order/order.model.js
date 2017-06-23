'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Address = require('../address/address.model').schema,
    PaymentMethod = require('../payment/payment.model').schema;

var OrderSchema = new Schema({
  orderNumber: {
    type: String,
    match: /^([0-9]{10})$/,
    required: true
  },
  customer: {
		type: Schema.Types.ObjectId,
		ref: 'User',
    required: true
	},
  giftee: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'Product',
		index: true/*,
    validate: {
			validator: function(arr) {
				return arr.length > 0;
			},
			message: 'An order must contain at least one product.'
		}*/
	}],
	status: {
		type: String,
		enum: ['Awaiting Pre-Auth', 'Pre-Auth Declined', 'Credit Approved', 'Printed', 'On Route', 'Delivered', 'Canceled'],
		required: true
	},



  orderDate: {
		type: Date,
		required: true
	},
	subTotal: {
		type: Number,
		required: true
	},
	promotions: [{
		type: Schema.Types.ObjectId,
		ref: 'Sale'
	}],
	tax: {
		type: Number,
		required: true
	}, //based on province/country
	shippingCost: {
		type: Number,
		required: true
	}, //maybe use API of a shipping company like CanadaPost or UPS
	//or have Free Shipping on Order > $50, flat rate $10 shipping within North America, $$$ for premium shipping



  shippingAddress: {
		type: [Address],
		validate: {
			validator: function(arr) {
				return arr.length === 1;
			},
			message: 'An order can only have one shipping address.'
		}
	},
	billingAddress: {
		type: [Address],
		validate: {
			validator: function(arr) {
				return arr.length === 1;
			},
			message: 'An order can only have one billing address.'
		}
	},
	paymentMethod: {
		type: [PaymentMethod],
		validate: {
			validator: function(arr) {
				return arr.length === 1;
			},
			message: 'An order can only have one method of payment.'
		}
	},
});

/*
* Validations
*/



/*
* Pre and Post Hooks
*/

OrderSchema.pre('save', function(next) {
  mongoose.model('User').findByIdAndUpdate(this.customer, {$addToSet: {orders: this._id}}, function(err, user) {
    if(err) {next(err)};
    next();
  })
})

/*
* Class Methods used for diagnostic purposes
*/

OrderSchema.statics = {
	//sorted by most late
	getLateOrders: function() {
    return this.find({}).sort({orderDate: 'asc'}).exec(function(orders) {
      return orders;
    });
	},
  findOrdersWithProduct: function(productId) {
    return this.find({products: productId}).exec(function(orders) {
      return orders;
    })
  }
}

/*
* Instance Methods used for managing a particular Order
*/

OrderSchema.methods = {
  isShipped: function() {
    return (['On Route', 'Delivered'].contains(this.status)) ? true : false
  },
	cancel: function() {
    try {
      //attempt to remove it from ShippingQueue process
      this.status = 'Canceled';
      return true;
    } catch (e) {
      return false;
    }
	},
	attemptPreAuth: function() {

	},
  attemptProcessPayment: function() {

  },
	markAsShipped: function() {

	},
	markAsDelivered: function() {
    this.status = 'Delivered';
    //should remove item from giftee's wishlist at this point
    mongoose.model('Wishlist').findByIdAndUpdate(this.giftee, {$pull: {products: this.products}}, function(err, wishlist) {
      if(err) console.log(err);
      console.log(wishlist);
    });
	}
};

/*
* Virtuals
*/

OrderSchema
  .virtual('totalPrice')
  .get(function() {
    return this.subTotal + this.tax + this.shippingCost;
  })

OrderSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Order', OrderSchema);
