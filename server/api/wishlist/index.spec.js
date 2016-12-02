'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var wishlistCtrlStub = {
  index: 'wishlistCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var wishlistIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './wishlist.controller': wishlistCtrlStub
});

describe('Wishlist API Router:', function() {
  it('should return an express router instance', function() {
    wishlistIndex.should.equal(routerStub);
  });

  describe('GET /y', function() {
    it('should route to wishlist.controller.index', function() {
      routerStub.get
        .withArgs('/', 'wishlistCtrl.index')
        .should.have.been.calledOnce;
    });
  });
});
