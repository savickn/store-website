'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var orderCtrlStub = {
  index: 'purchaseCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var orderIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './order.controller': orderCtrlStub
});

describe('Order API Router:', function() {
  it('should return an express router instance', function() {
    orderIndex.should.equal(routerStub);
  });

  describe('GET /api/orders', function() {
    it('should route to order.controller.index', function() {
      routerStub.get
        .withArgs('/', 'orderCtrl.index')
        .should.have.been.calledOnce;
    });
  });
});
