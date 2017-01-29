'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Address = require('../address/address.model');

var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserSchema = new Schema({
  role: {
    type: String,
    default: 'user'
  },
  name: {
    type: String,
    maxlength: 30,
    required: 'You must provide a username.'
  },
  email: {
    type: String,
    lowercase: true,
    match: [/[A-Za-z0-9]+@([A-Za-z])+(\.[A-Za-z]+)+/, "This email address is not in the correct format. Please enter an email address in the format, 'example@example.com'."],
    required: 'You must provide an email address.'
  },
  phoneNumber: {
    type: String,
    match: [/((1-)|1)?[0-9]{3}-?[0-9]{3}-?[0-9]{4}/, "This phone number is not in the correct format."]
  },
  /*shippingAddresses: {
    type: [Address.schema], //primary shipping address is saved to cookie
    validate: {
      validator: function(arr) {
        return arr.length <= 5;
      },
      message: 'You can only save up to 5 shipping addresses.'
    }
  },
  billingAddress: {
    type: [Address.schema],
    validate: {
      validator: function(arr) {
        return arr.length === 1 || arr.length === 0;
      },
      message: 'An user can only have one billing address.'
    }
  },*/
  billingAddress: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
  },
  shippingAddresses: [{
    type: Schema.Types.ObjectId,
    ref: 'Address',
    index: true
  }],
  promotionalEmails: {
    type: Boolean,
    default: false
  },
  onlineCredit: {
    type: Number,
    default: 0     //in US dollars
  },
  paymentMethods: [{
    type: Schema.Types.ObjectId,
    ref: 'PaymentMethod',
    index: true
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
    index: true
  }],
  wishlist: {
    type: Schema.Types.ObjectId,
    ref: 'Wishlist'
  },
  reward: {
    type: Schema.Types.ObjectId,
    ref: 'Reward'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  twitter: {},
  google: {},
  github: {}
});


/**
 * Virtuals
 */


UserSchema
  .virtual('numberOfPurchases')
  .get(function() {
    return this.orders.length;
  })

UserSchema
  .virtual('amountSpent')
  .get(function() {
    //add up all orders
  })

//formats phoneNumber so that it looks nice
UserSchema
  .virtual('formattedNumber')
  .get(function() {
    var phone_number = "";
    for(let char of this.phoneNumber)
      if(/[0-9]/.test(char)) {
        phone_number.concat(char);
      }
    return phone_number;
  })

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });


/**
 * Validations
 */


// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');


var validatePresenceOf = function(value) {
  return value && value.length;
};


/**
 * PRE and POST Hooks
 */


UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
  });

UserSchema.pre('remove', function(next) {
  mongoose.model('Wishlist').remove({user: this._id}).exec();
  mongoose.model('Reward').remove({user: this._id}).exec();
  mongoose.model('PaymentMethod').remove({user: this._id}).exec();
  mongoose.model('Address').remove({user: this._id}).exec();

  next();
});


/**
 * Instance Methods
 */

UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);
