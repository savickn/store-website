'use strict';

//used to test if HTTP requests return the correct methdos
var expect = require('chai').expect;
var app = require('../../app');
var request = require('supertest');

describe('Address API:', function() {
  describe('GET /api/data/countries', function() {
    beforeEach(function(done) {
      done();
    });

    it('should return an array of countries', function(done) {
      request(app)
        .get('/api/data/countries')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body).to.be.instanceOf(Array);
          expect(res.body).to.include('Canada');
          done();
        });
    });
  });

  describe('GET /api/data/provinces', function() {
    it('should return an array of provinces corresponding to the passed in provinces', function(done) {
      request(app)
        .get('/api/data/provinces')
        .query({country: 'Canada'})
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body).to.be.instanceOf(Array);
          expect(res.body).to.include('Ontario');
          done();
        });
    });
  });

});
