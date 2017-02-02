'use strict';

var should = require('should');
var app = require('../../app');
var Address = require('./address.model');
var AddressFactory = require('./address.factory.js');

var address = AddressFactory.build();
console.log(address);

describe('Address Model', function() {
  before(function(done) {
    Address.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Address.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no addresses', function(done) {
    Address.find({}, function(err, addresses) {
      addresses.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate address', function(done) {
    Address.create(address, function(err, address) {
      var addressDup = new Address(address);
      addressDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should successfully save an address', function(done) {
    Address.create(address, function(err, address) {
      if(err) {done(err)};
      console.log(address);
      should.exist(address);
      done();
    })
  })
})
