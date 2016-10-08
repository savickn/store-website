'use strict';

var app = require('../..');
import request from 'supertest';

describe('Purchase API:', function() {
  describe('GET /api/purchases', function() {
    var purchases;

    beforeEach(function(done) {
      request(app)
        .get('/api/purchases')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          purchases = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      purchases.should.be.instanceOf(Array);
    });
  });
});
