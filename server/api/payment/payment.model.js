'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  user: 	{ 	
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  cardType: {
    type: String,
    enum: ['MasterCard', 'Visa', 'American Express'],
    required: true
  },
  userName: {
    type: String,
    required: 'You must provide the name on your credit card.'
  },
  cardNumber: {
    type: Number,
    required: 'You must provide a credit card number.'
  },
  expiryDate: {
    type: Date,
    required: "You must provide your credit card's expiry date"
  } //should expire at the end of the provided month
});

/*
* Validations
*/

PaymentSchema
  .path('cardNumber')
  .validate(function(cardNumber) {
    /*switch(this.cardType) {
      case 'MasterCard':
        cardNumber.toString().match('//');
        //should start with 5 and be 16 digits

      case 'Visa':
        //should start with 4 and be 16 digits

      case 'American Express':
        //should start with 3 and be 16 digits

      default:

    }*/
  }, 'The card number you provided does not match the type of card you selected.')

PaymentSchema
  .path('cardNumber')
  .validate(function(cardNumber) {
    //check that this card is not already registered to someone else.
  }, 'This card is already registered with another account.')

PaymentSchema
  .path('expiryDate')
  .validate(function(expiryDate) {
    //check that the card is not expired
  }, 'The card number you provided is already expired.')

/*
* PRE and POST Hooks
*/

PaymentSchema.pre('save', function(next) {
  //console.log(this);
  mongoose.model('User').findByIdAndUpdate(this.user, {$addToSet: {paymentMethods: this._id}}, function(err, user) {
    if(err) next(err);
    next();
  })
})

PaymentSchema.pre('remove', function(next) {
  //console.log(this);
  mongoose.model('User').findByIdAndUpdate(this.user, {$pull: {paymentMethods: this._id}}, function(err, user) {
    if(err) next(err);
    next();
  })
})

/*
* Instance Methods
*/

PaymentSchema.methods = {
  isExpired: function() {
    return (Date.now() > this.expiryDate) ? true : false;
  }
}

/*
* Static Methods
*/

PaymentSchema.statics = {

}

/*
* Virtual Methods
*/

PaymentSchema
  .virtual('expiryMonth')
  .get(function() {
    return this.expiryDate.getMonth();
  })

PaymentSchema
  .virtual('expiryYear')
  .get(function() {
    return this.expiryDate.getYear();
  })





PaymentSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('PaymentMethod', PaymentSchema);



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