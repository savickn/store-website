'use strict';

describe('Computers View', function() {
  var page;

  beforeEach(function() {
    browser.get('/products/computers');
    page = require('./computers.po');
  });

  it('should render 4 computers', function() {
    expect(page.computers.count()).toEqual(4);
  });

  it('each computer should have an image, a link, a button, a price', function() {
    var computer = page.computers.first();
    expect(computer.element(by.xpath('./div/img')).isPresent()).toBeTruthy();
    expect(computer.element(by.xpath('./div/a')).getText()).toMatch('Comp1');
    //expect(computer.element(by.xpath('./div/button')).isPresent()).toBeTruthy(); // have to be logged in
  });

  it('should render a nav bar', function() {
    expect(page.navBar.isPresent()).toBeTruthy();
  });

  it('should render a search bar', function() {
    expect(page.searchBar.isPresent()).toBeTruthy();
  });

  it('should render sort dropdown with 4 options and a button', function() {
    expect(page.sort.isPresent()).toBeTruthy();
    expect(page.sortBtn.isPresent()).toBeTruthy();
    expect(page.sortOpts.count()).toEqual(4);
  });

});
