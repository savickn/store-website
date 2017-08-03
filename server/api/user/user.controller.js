'use strict';

const User = require('./user.model');
const Wishlist = require('../wishlist/wishlist.model');
const Reward = require('../reward/reward.model');
const config = require('../../config/environment');
const env = require('../../config/local.env.js');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const passport = require('passport');

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const EmailTemplate = require('email-templates-v2').EmailTemplate;

const _ = require('lodash');
const fs = require('fs');
const path = require('path');


// WORKING
var resetEmail = function(req, res, cb) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: env.HOME_EMAIL,
        pass: env.PASSWORD
    }
  });

  var templateDir = path.join(__dirname, '..', '..', 'templates', 'reset-email');
  var resetEmail = new EmailTemplate(templateDir);

  var resetKey = crypto.randomBytes(64).toString('hex');
  var resetRequest = {
    key: resetKey,
    id: req.user._id
  };

  req.session.reset = resetRequest;

  var token = jwt.sign(resetRequest, config.secrets.session, { expiresInMinutes: 60*24 }); // reset token lasts for 24 hours
  var url = `http://${req.headers.host}/resetPassword/${req.user._id}?resetToken=${token}`;
  var data = {name: req.user.name, url: url};

  resetEmail.render(data, function (err, result) {
    console.log('reset email render', result);
    if(err) return cb(err);
    var mailOptions = {
      from: env.HOME_EMAIL,
      to: env.RECEIVER_EMAIL,
      //to: req.user.email,
      subject: 'Reset Your Password',
      text: result.text,
      html: result.html
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error) return cb(error);
      return cb(null, info);
    });
  });
}

// WORKING
var activationEmail = function(req, res, cb) {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: env.HOME_EMAIL,
        pass: env.PASSWORD
    }
  });

  var templateDir = path.join(__dirname, '..', '..', 'templates', 'activation-email');
  var activationEmail = new EmailTemplate(templateDir);

  var activationKey = crypto.randomBytes(64).toString('hex');
  var activationRequest = {
    key: activationKey,
    id: req.user._id
  };

  req.session.activation = activationRequest;

  var token = jwt.sign(activationRequest, config.secrets.session, { expiresInMinutes: 60*24 }); // activation token lasts for 24 hours
  var url = `http://${req.headers.host}/activate/${req.user._id}?activationToken=${token}`;
  var data = {name: req.user.name, url: url};

  activationEmail.render(data, function (err, result) {
    if(err) return cb(err);
    var mailOptions = {
      from: env.HOME_EMAIL,
      to: env.RECEIVER_EMAIL,
      //to: req.user.email,
      subject: 'Activate Your Account',
      text: result.text,
      html: result.html
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error) return cb(error);
      return cb(null, info);
    });
  });
}

/*
** used to search for users
*/

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
      req.user = user;

      Wishlist.create({user: user._id}, function(err, wishlist) {
        if(err) return rollbackUser(res, err, user._id);
          activationEmail(req, res, function(err, info) {
            if(err) return rollbackUser(res, err, user._id);
            var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
            return res.json({ token: token });
          });
      });
    });
  });
};

/**
 * Get a single user
 */

exports.show = function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(501).send('User does not exist!');
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

exports.sendResetEmail = function(req, res) {
  User.findOne({email: req.query.email}, function(err, user) {
    if(err) return res.status(500).send(err);
    if(!user) return res.status().send('User could not be found.');

    req.user = user;
    console.log('user', req.user);
    resetEmail(req, res, function(err, info) {
      if(err) return res.status(500).send(err);
      return res.status(200).json({ msg: 'Please check your email to reset your password.' });
    });
  })
}

/*
* Send a new activation email, WORKING
*/

exports.sendActivationEmail = function(req, res) {
  if(req.user.active) {
    return res.status(403).json({ msg: 'Your account is already active.' });
  }
  activationEmail(req, res, function(err, info) {
    if(err) return res.status(500).send(err);
    return res.status(200).json({ msg: 'Please check your email to activate your account.' });
  });
}

/*
* Activates a user's account, WORKING
*/

exports.activateAccount = function(req, res) {
  User.findByIdAndUpdate(req.params.id, {$set: {active: true}}, {new: true}, function(err, user) {
    if(err) return validationError(res, err);
    return res.status(200).send('You have successfully activated your account!');
    //add code to invalidate reset token having reset the password
  });
}

/**
 * Change a users password
 */

exports.changePassword = function(req, res) {
  let userId = req.params.id; //req.user._id;
  let newPass = req.body.newPassword;
  let confirmPass = req.body.confirmPassword;

  if(newPass === confirmPass) {
    User.findById(userId, function (err, user) {
      if (err) return validationError(res, err);
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    });
  } else {
    let err = new Error("Passwords do not match!");
    res.status(403).send(err)
  }
};

/**
** Generic update function (for email, addresses, phone number, email settings, etc)
**/

exports.update = function(req, res) {
  console.log('update body', req.body);

  User.findByIdAndUpdate(
    req.params.id,
    {$set: req.body},
    {runValidators: true, new: true}
  )
  .select('-salt -hashedPassword')
  .populate('reward wishlist orders paymentMethods')
  .exec(function(err, user) {
    console.log('update error', err);
    console.log('updated user', user);
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

/*
** used to delete a user if the creation process is interrupted
*/

var rollbackUser = function(res, error, id) {
  User.findByIdAndRemove(id, function(err, user) {
    return res.status(500).json({err: error, msg: 'Unable to create account. Please try again later.'});
  });
}


/* working

exports.resetPassword = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return validationError(res, err);
    user.password = req.body.newPassword;
    user.save(function(err) {
      if (err) return validationError(res, err);
      //add code to invalidate reset token having reset the password
      return res.status(200).send('OK');
    })
  })
}

//{$set: {password: req.body.newPassword}}, {runValidators: true, new: true},

exports.changePassword = function(req, res) {
  var userId = req.params.id; //req.user._id;
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

/*var resetEncryption = function(id) {
  let idLength = id.length;

  let date = new Date();
  let salt = crypto.randomBytes(id.length).toString('base64');

  console.log('date', date);
  console.log('id', id);
  console.log('salt', salt);

  let idArr = id.split("");
  let saltArr = salt.split("");
  //let dateArr = [date.getFullYear(), date.getMonth(), date.getDate()];

  let hashString = date.getMonth() + date.getFullYear() + date.getDate();
  for(let x = 0; x < idLength; x++) {
    hashString += idArr[x] + saltArr[x];
  }
};

var resetDecryption = function(hash) {

};*/


/*var welcomeEmail = function(req, res, cb) {
  //var smtpString = 'smtps://' + env.HOME_EMAIL + ':' + env.PASSWORD + '@smtp.gmail.com';
  //var transporter = nodemailer.createTransport(smtpString);

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: env.HOME_EMAIL,
        pass: env.PASSWORD
    }
  });

  console.log('transport', transporter);

  var templateDir = path.join(__dirname, '..', '..', 'templates', 'welcome-email');
  var welcomeEmail = new EmailTemplate(templateDir);
  var data = {name: req.body.name};

  welcomeEmail.render(data, function (err, result) {
    if(err) return cb(err);
    var mailOptions = {
      from: env.HOME_EMAIL,
      to: env.RECEIVER_EMAIL,
      //to: req.body.email,
      subject: 'Welcome',
      text: result.text,
      html: result.html
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error) return cb(error);
      return cb(null, info);
    });
  });
};
*/
