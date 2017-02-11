'use strict';

var ComputersPage = function() {
  this.computers = element.all(by.css('.product-flexbox'));
  this.navBar = element(by.css('.md-nav-bar'));
  this.searchBar = element(by.css('.md-sidenav-left'));
  this.sort = element(by.css('.sort-dropdown'));
  this.sortBtn = element(by.css('.sort-dropdown > button'));
  this.sortOpts = element.all(by.css('.sort-dropdown > ul > li'));
  this.pagination = element(by.css('.pagination'));
};

module.exports = new ComputersPage();
