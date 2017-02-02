'use strict';

var proxyquire = require('proxyquire').noPreserveCache();
var sinon = require('sinon');

var saleCtrlStub = {
  index: 'saleCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};
/*
// require the index with our stubbed out modules
var saleIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sale.controller': saleCtrlStub
});

describe('Sale API Router:', function() {

  it('should return an express router instance', function() {
    saleIndex.should.equal(routerStub);
  });

  describe('GET /y', function() {

    it('should route to sale.controller.index', function() {
      routerStub.get
        .withArgs('/', 'saleCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});*/
