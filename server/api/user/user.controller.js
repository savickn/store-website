'use strict';

var User = require('./user.model');
var Wishlist = require('../wishlist/wishlist.model');
var Reward = require('../reward/reward.model');
var config = require('../../config/environment');
var env = require('../../config/local.env.js');

var jwt = require('jsonwebtoken');
var passport = require('passport');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var EmailTemplate = require('email-templates-v2').EmailTemplate;

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var sendWelcomeEmail = function(req, res, cb) {
  var smtpString = 'smtps://' + env.HOME_EMAIL + ':' + env.PASSWORD + '@smtp.gmail.com';
  var transporter = nodemailer.createTransport(smtpString);

  var templateDir = path.join(__dirname, '..', '..', 'templates', 'welcome-email');
  var welcomeEmail = new EmailTemplate(templateDir);
  var data = {name: req.body.name};

  welcomeEmail.render(data, function (err, result) {
    if(err) cb(err);
    var mailOptions = {
      from: env.HOME_EMAIL,
      to: env.RECEIVER_EMAIL,
      //to: req.body.email,
      subject: 'Welcome',
      text: result.text,
      html: result.html
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error) cb(error);
      cb(null, info);
    });
  });
};

var sendResetEmail = function(req, res, cb) {

}

exports.search = function(req, res) {
  console.log(req.query);
  var searchObj = _.merge({}, req.query);

  if(searchObj.cardNumber) {
    Reward.findOne({cardNumber: req.query.cardNumber})
    .populate('user', '-salt -hashedPassword')
    .exec(function(err, reward) {
      if(err) return res.status(500).send(err);
      return res.status(200).json([reward.user]);
    })
  } else {
    User.find(searchObj)
    .select('-salt -hashedPassword')
    .populate('reward wishlist')
    .exec(function(err, users) {
      if(err) return res.status(500).send(err);
      return res.status(200).json(users);
    });
  }
};

/**
 * Creates a new user
 */
exports.create = function (req, res) {
  User.count(function(err, count) {
    if (err) return validationError(res, err);
    var userObj = {
      provider: 'local',
      role: 'user'
    };
    if(count < 1) {
      userObj.role = 'admin'
      console.log('admin true');
    }
    var newUser = _.merge(userObj, req.body);

    User.create(newUser, function(err, user) {
      if (err) return validationError(res, err);

      Wishlist.create({user: user._id}, function(err, wishlist) {
        if(err) return res.status(500).send(err);

        sendWelcomeEmail(req, res, function(err, info) {
          if(err) return res.status(500).send(err);
          var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
          return res.json({ token: token });
        });
      })
    });
  })
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    return res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/*
* Send a reset password email
*/

exports.resetPassword = function(req, res) {

}

/**
 * Change a users password
 */
exports.changePassword = function(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

/**
** Generic update function (for email, addresses, phone number, email settings, etc)
**/

exports.update = function(req, res) {
  console.log(req.body);
  var opts = {
    runValidators: true,
    new: true
  };

  User.findOneAndUpdate(
    {_id: req.params.id},
    {$set: req.body},
    opts
  )
  .select('-salt -hashedPassword')
  .populate('reward wishlist orders paymentMethods')
  .exec(function(err, user) {
    if (err) { return validationError(res, err); }
    return res.status(200).json(user);
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  User.findOne({_id: req.user._id})
  .select('-salt -hashedPassword')
  .populate('reward orders wishlist paymentMethods')
  .exec(function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

/*
** Respond with validation error
*/

var validationError = function(res, err) {
  return res.status(422).json(err);
};


/* working
exports.email = function(req, res) {
  var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      auth: {
          user: '${env.HOME_EMAIL}', // Your email id
          pass: '${env.PASSWORD}' // Your password
      }
  }));

  var mailOptions = {
    from: '${env.HOME_EMAIL}',
    to: '${env.RECEIVER_EMAIL}',
    subject: 'Welcome',
    text: 'Hello Guy',
    html:'<b>Hello world ✔</b>'
  };

  transporter.sendMail(mailOptions, function(err, info){
    if(err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).json({status: 'success'});
  });
};
*/

/**
* Changes email, working
*/
/*
exports.changeEmail = function(req, res) {
  var email = req.user.email.toLowerCase();

  User.findOne({email: email}, function(err, user) {
    if(user) { return validationError('This email is already in use.'); }

    User.findByIdAndUpdate(req.params.id, {$set: {email: email}}, function(err, user) {
      if (err){ return validationError(res, err); }
      return res.status(200).send('Ok');
    });
  })
};
*/

/**
 * Get list of users
 * restriction: 'admin'
 */
/*exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.status(500).send(err);
    return res.status(200).json(users);
  });
};*/
