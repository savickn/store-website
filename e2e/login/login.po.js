'use strict';

var LoginPage = function() {
  this.form = element(by.css('form'));
  this.emailInput = element(by.name('email'));
  this.passwordInput = element(by.name('password'));
  this.loginBtn = element(by.css('.btn-login'));
  this.registerBtn = element(by.css('.btn-register'));
};

module.exports = new LoginPage();
