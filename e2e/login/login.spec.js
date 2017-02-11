'use strict';

describe('Login View', function() {
  var page,
      ec;

  beforeEach(function() {
    browser.get('/login');
    page = require('./login.po');
    ec = protractor.ExpectedConditions;
  });

  it('should include form with correct elements', function() {
    expect(page.form.isPresent()).toBeTruthy();
    expect(page.emailInput.isPresent()).toBeTruthy();
    expect(page.passwordInput.isPresent()).toBeTruthy();
    expect(page.loginBtn.isPresent()).toBeTruthy();
    expect(page.registerBtn.isPresent()).toBeTruthy();
  });

  it('should submit the form with valid info', function() {
    page.emailInput.sendKeys('admin@admin.com');
    page.passwordInput.sendKeys('admin');
    page.loginBtn.click();
    var url = browser.wait(function() {
      return browser.getCurrentUrl();
    }, 4000);
    expect(url).toMatch('/');
  });

  it('should show errors with invalid info', function() {
    page.emailInput.sendKeys('admin');
    page.passwordInput.sendKeys('admin');
    page.loginBtn.click();
    var patternError = element(by.css('.email-pattern'));
    expect(patternError.getText()).toMatch("| This email address is not in the correct format. Please enter an email address in the format 'example@example.com'.")
  });
});
