'use strict';

describe('Signup View', function() {
  var page;

  beforeEach(function() {
    browser.get('/signup');
    page = require('./signup.po');
  });

  it('should include form with correct elements', function() {
    this.form = element(by.css('form'));
    this.nameInput = element(by.name('name'));
    this.emailInput = element(by.name('email'));
    this.passwordInput = element(by.name('password'));
    this.loginBtn = element(by.css('.btn-login'));
    this.registerBtn = element(by.css('.btn-register'));
  });

  it('should create a new user with valid info', function() {
    page.nameInput.sendKeys('user1')
    page.emailInput.sendKeys('user1@admin.com');
    page.passwordInput.sendKeys('user1');
    page.registerBtn.click();
    var url = browser.wait(function() {
      return browser.getCurrentUrl();
    }, 4000);
    expect(url).toMatch('/');
  });

  it('should show errors with invalid info', function() {
    page.emailInput.sendKeys('user1@admin.com');
    page.passwordInput.sendKeys('user1');
    page.registerBtn.click();
    var requiredError = element(by.css('.name-required'));
    expect(requiredError.getText()).toMatch("| A name is required")
  });
});
