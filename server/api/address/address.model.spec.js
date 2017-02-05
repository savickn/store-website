'use strict';

var expect = require('chai').expect;
var app = require('../../app');
var Address = require('./address.model');
var AddressFactory = require('./address.factory.js');



describe('Address Model', function() {
  var address;

  before(function(done) {
    Address.remove().exec().then(function() {
      done();
    });
  });

  beforeEach(function(done) {
    address = new Address(AddressFactory.build());
    done();
  })

  afterEach(function(done) {
    Address.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no addresses', function(done) {
    Address.find({}, function(err, addresses) {
      expect(addresses).to.have.length(0);
      done();
    });
  });

  it('should successfully save a valid address', function(done) {
    Address.create(address, function(err, address) {
      if(err) {done(err)};
      expect(address).to.exist;
      done();
    });
  });

  it('should fail to save an invalid postal code', function(done) {
    address.postalCode = 'm9r'
    Address.create(address, function(err, address) {
      expect(err).to.exist;
      done();
    });
  });

  it('should fails to save without a street address', function(done) {
    address.street = '';
    Address.create(address, function(err, address) {
      expect(err).to.exist;
      done();
    });
  });
})
