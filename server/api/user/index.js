'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

//router.get('/email', auth.hasRole('admin'), controller.email); //used to test email functionality
//router.get('/', auth.hasRole('admin'), controller.index);

router.get('/:id/reset', auth.isAuthenticated(), controller.sendResetEmail); // used to send Reset Email
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/activate', auth.verifyActivationEmail(), controller.activateAccount;


router.get('/search', auth.hasRole('admin'), controller.search);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
