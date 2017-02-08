/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.hero = element(by.css('.hero-unit'));
  this.quote = element(by.css('.lead'));
  this.images = element.all(by.css('img'));
};

module.exports = new MainPage();
