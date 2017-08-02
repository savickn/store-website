'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

//router.get('/email', auth.hasRole('admin'), controller.email); //used to test email functionality
//router.get('/', auth.hasRole('admin'), controller.index);
//router.get('/:id/resetForm', auth.verifyResetRequest(), controller.renderResetForm);

router.get('/resetEmail', controller.sendResetEmail); // used to send Reset Email
router.put('/:id/reset', auth.verifyResetRequest(), controller.changePassword); // used to update password in MongoDB
router.put('/:id/password', auth.isAuthenticated(), auth.verifyOldPassword(), controller.changePassword);

router.get('/:id/activationEmail', auth.isAuthenticated(), controller.sendActivationEmail); // used to send Activation Email
router.get('/:id/activate', auth.verifyActivationRequest(), controller.activateAccount); // used to activate account

router.get('/search', auth.hasRole('admin'), controller.search);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);

router.post('/', controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
