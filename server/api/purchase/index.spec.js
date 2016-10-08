'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var purchaseCtrlStub = {
  index: 'purchaseCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var purchaseIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './purchase.controller': purchaseCtrlStub
});

describe('Purchase API Router:', function() {
  it('should return an express router instance', function() {
    purchaseIndex.should.equal(routerStub);
  });

  describe('GET /api/purchases', function() {
    it('should route to purchase.controller.index', function() {
      routerStub.get
        .withArgs('/', 'purchaseCtrl.index')
        .should.have.been.calledOnce;
    });
  });
});
