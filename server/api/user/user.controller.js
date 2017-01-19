'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var fs = require('fs');
//const output = fs.createWriteStream('./stdout.log');
//const errorOutput = fs.createWriteStream('./stderr.log');
//const myConsole = new console.Console(output, errorOutput);

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');

var Wishlist = require('../wishlist/wishlist.model');
var Reward = require('../reward/reward.model');



var sendWelcomeEmail = function(req, res) {
  var transporter = nodemailer.createTransport("SMTP", {
      service: 'gmail',
      auth: {
          user: 'kingn3gu5@gmail.com', // Your email id
          pass: 'YaNeCk7799' // Your password
      }
  });

  //transporter.templateSender(new EmailTemplate('./server/templates/welcome-email'));

  var templateDir = path.join(__dirname, 'templates', 'welcome-email');
  var welcomeEmail = new EmailTemplate(templateDir);
  var data = {name: req.body.name};

  welcomeEmail.render(data, function (err, result) {
    var mailOptions = {
      from: 'kingn3gu5@gmail.com',
      to: 'nsavickas988@hotmail.com',
      //to: req.body.email, // list of receivers
      subject: 'Welcome',
      text: result.text, 
      html: result.html
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(err) return res.status(500).send(err);
      return res.status(200).json(info);
    });
  });
};

exports.email = function(req, res) {
  var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      auth: {
          user: 'kingn3gu5@gmail.com', // Your email id
          pass: 'YaNeCk7799' // Your password
      }
  }));

  var mailOptions = {
    from: 'kingn3gu5@gmail.com',
    to: 'nsavickas988@hotmail.com',
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

exports.search = function(req, res) {
  console.log(req.query);

  if(req.query.cardNumber) {
    Reward.find({cardNumber: req.query.cardNumber})
    .populate('user', '-salt -hashedPassword')
    .exec(function(err, reward) {
      if(err) return res.status(500).send(err);
      return res.status(200).json(reward.user);  
    })
  }

  var searchObj = _.merge({}, req.query);

  User.find(searchObj)
  .select('-salt -hashedPassword')
  .populate('reward wishlist')
  .exec(function(err, users) {
    if(err) return res.status(500).send(err);
    return res.status(200).json(users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res) {
  var userObj = {
    provider: 'local',
    role: 'user'
  };

  var newUser = _.merge(userObj, req.body);

  //var newUser = new User(req.body);
  //newUser.provider = 'local';
  //newUser.role = 'user';

  User.create(newUser, function(err, user) {
    if (err) return validationError(res, err);

    Wishlist.create({user: user._id}, function(err, wishlist) {
      if(err) return res.status(500).send(err);


      var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
      return res.json({ token: token });
      
      /*sendWelcomeEmail(req, res, function(err, data) {
        if(err) return res.status(500).send(err);
        //res.header('debug3', data);

        var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
        res.json({ token: token });
      });*/
    })
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
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

  /*Review.findOneAndUpdate(
    {_id: req.params.id}, 
    {$set: {rating: req.body.rating, summary: req.body.summary}, $addToSet: {upvotes: req.body.newUpvote}}, 
    {new: true})*/

  User.findOneAndUpdate(
    {_id: req.params.id}, 
    {$set: req.body},
    {new: true}
  )
  .select('-salt -hashedPassword')
  .populate('reward wishlist')
  .exec(function(err, user) {
    if (err) { return validationError(res, err); }
    return res.status(200).json(user);
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({_id: userId})
  .select('-salt -hashedPassword')
  .populate('reward wishlist billingAddress shippingAddresses paymentMethods')
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






/**
* Changes email
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