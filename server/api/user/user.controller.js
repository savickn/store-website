'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

var sendWelcomeEmail = function(req, res) {
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'kingn3gu5@gmail.com', // Your email id
          pass: 'YaNeCk7799' // Your password
      }
  });

  var sendWelcome = transporter.templateSender(new EmailTemplate('./server/templates/welcome-email'));
  var data = {name: req.body.name};

  /*var text = 'Hello world from \n\n' + req.body.name;
  var templateDir = path.join(__dirname, 'templates', 'welcome-email');
  var html = new EmailTemplate(templateDir);*/

  var mailOptions = {
    from: 'kingn3gu5@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'Welcome' // Subject line
    //text: text, // plaintext body
    //html: html  //'<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };

  sendWelcome(mailOptions, data, function(error, info){
    if(error){
        res.header('debug', error);
        console.log(error);
        //res.json({yo: 'error'});
    }else{
        res.header('success', info);
        console.log('Message sent: ' + info.response);
        //res.json({yo: info.response});
    };
});
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  //sendWelcomeEmail(req, res, function() {
    var newUser = new User(req.body);
      newUser.provider = 'local';
      newUser.role = 'user';
      newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
        res.json({ token: token });
      });
    //});
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
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
exports.changePassword = function(req, res, next) {
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
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
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
