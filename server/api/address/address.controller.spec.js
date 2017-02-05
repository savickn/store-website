'use strict';

//used to test if HTTP requests return the correct methdos
var expect = require('chai').expect;
var app = require('../../app');
var request = require('supertest');

describe('Address API:', function() {
  /*describe('GET /api/addresses', function() {
    var addresses;

    beforeEach(function(done) {
      request(app)
        .get('/api/addresses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          addresses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(addresses).to.be.instanceOf(Array);
    });
  });*/
});
