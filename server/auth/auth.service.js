'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({ secret: config.secrets.session });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id, function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');

        req.user = user;
        next();
      });
    });
}


function verifyActivationRequest() {
  return compose()
    .use(function(req, res, next) {
      let activationToken = req.session.activation;
      console.log('verifying');
      console.log('session key', activationToken);
      console.log('url key', req.query.activationToken);
      console.log('req.user', req.user);

      /*if(req.user.active) {
        return res.status(401).send('Your account is already active!');
      }*/

      jwt.verify(req.query.activationToken, config.secrets.session, {maxAge: '1 day'}, function(err, token) {
        console.log('verify', err, token);
        if(err) return res.status(401).send('This link has expired!');
        if(token.key !== activationToken.key || token.id !== activationToken.id) return res.status(401).send('Unauthorized');
        next();
      });
    });
}

function verifyResetRequest() {
  return compose()
    .use(function(req, res, next) {
      let resetToken = req.session.reset;
      console.log('verifying');
      console.log('session key', activationToken);
      console.log('url key', req.query.activationToken);

      jwt.verify(req.body.resetToken, config.secrets.session, {maxAge: '1 day'}, function(err, token) {
        console.log('verify', err, token);
        if(err) return res.status(401).send('This link has expired!');
        if(token.key !== resetToken.key || token.id !== resetToken.id) return res.status(401).send('Unauthorized');
        next();
      });
    });
}


// used to check if currentUser is the author of the accessed material
function correctUser(className) {
  if (!className) throw new Error('Class name needs to be set');
  var objUser = '';

  className.findById(req.params.id, function(err, obj) {
    if (err) return next(err);
    if (!obj.user) return res.status(401).send('Unauthorized');

    objUser = obj.user;
  })

  return compose()
    .use(function checkUser(req, res, next) {
      if (req.user === objUser) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60*5 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.status(404).json({ message: 'Something went wrong, please try again.'});
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}






exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.correctUser = correctUser;
exports.verifyActivationRequest = verifyActivationRequest;
exports.verifyResetRequest = verifyResetRequest;
