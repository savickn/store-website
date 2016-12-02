'use strict';

var app = require('../..');
import request from 'supertest';

describe('Wishlist API:', function() {
  describe('GET /y', function() {
    var wishlists;

    beforeEach(function(done) {
      request(app)
        .get('/y')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          wishlists = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      wishlists.should.be.instanceOf(Array);
    });
  });
});
