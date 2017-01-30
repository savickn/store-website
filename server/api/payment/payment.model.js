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
  }
});

/*
* Validations
*/

PaymentSchema
  .path('cardNumber')
  .validate(function(cardNumber) {
    var cardValidation = {
      'MasterCard': 5,
      'Visa': 4,
      'American Express': 3
    };
    switch(this.cardType) {
      case 'MasterCard':
        return cardNumber.toString().match(/^5([0-9]{15})$/);

      case 'Visa':
        return cardNumber.toString().match(/^4([0-9]{15})$/);

      case 'American Express':
        return cardNumber.toString().match(/^3([0-9]{15})$/);

      default:
        return false;
    }
  }, "The card number you provided is incorrect.")

//"The card number you provided is incorrect. ${payment.cardType} numbers start with ${cardValidation[this.cardType]}"

PaymentSchema
  .path('cardNumber')
  .validate(function(cardNumber) {
    //check that this card is not already registered to someone else.
  }, 'This card is already registered with another account.')

PaymentSchema
  .path('expiryDate')
  .validate(function(expiryDate) {
    return expiryDate > Date.now() ? true : false;
  }, 'The card number you provided is already expired.')

/*
* PRE and POST Hooks
*/

PaymentSchema.pre('save', function(next) {
  mongoose.model('User').findByIdAndUpdate(this.user, {$addToSet: {paymentMethods: this._id}}, function(err, user) {
    if(err) next(err);
    next();
  })
})

PaymentSchema.pre('remove', function(next) {
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
