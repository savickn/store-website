'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var addressCtrlStub = {
  index: 'addressCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var addressIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './address.controller': addressCtrlStub
});

describe('Address API Router:', function() {
  it('should return an express router instance', function() {
    addressIndex.should.equal(routerStub);
  });

  describe('GET /api/addresses', function() {
    it('should route to address.controller.index', function() {
      routerStub.get
        .withArgs('/', 'addressCtrl.index')
        .should.have.been.calledOnce;
    });
  });
});
