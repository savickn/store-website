'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    //browser.ignoreSynchronization = true;
    //browser.waitForAngular();
    browser.get('/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.hero.isPresent());
    expect(page.quote.getText()).toBe('Purchase state-of-the-art electronics for discounted prices.');
    //expect(page.images.length).toEqual(2);
  });
});
