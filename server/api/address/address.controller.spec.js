'use strict';

//used to test if HTTP requests return the correct methdos
var expect = require('chai').expect;
var app = require('../../app');
var request = require('supertest');
var AddressFactory = require('./address.factory.js');

describe('Address API:', function() {
  describe('POST /api/addresses/validate', function() {
    var address, wrong_address;

    beforeEach(function(done) {
      address = AddressFactory.build();
      wrong_address = AddressFactory.build({postalCode: 'm9r2k'});
      done();
    });

    it('should return status 200 when validating valid address', function(done) {
      request(app)
        .post('/api/addresses/validate')
        .send(address)
        .expect(200)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body).to.exist;
          done();
        });
    });

    it('should return status 500 when validating an invalid address', function(done) {
      request(app)
        .post('/api/addresses/validate')
        .send(wrong_address)
        .expect(500)
        .end((err, res) => {
          if(err) return done(err);
          done();
        });
    });
  });
});
