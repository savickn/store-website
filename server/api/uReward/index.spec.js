'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var uRewardCtrlStub = {
  index: 'uRewardCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var uRewardIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './uReward.controller': uRewardCtrlStub
});

describe('UReward API Router:', function() {
  it('should return an express router instance', function() {
    uRewardIndex.should.equal(routerStub);
  });

  describe('GET /y', function() {
    it('should route to uReward.controller.index', function() {
      routerStub.get
        .withArgs('/', 'uRewardCtrl.index')
        .should.have.been.calledOnce;
    });
  });
});
