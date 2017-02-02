'use strict';

var app = require('../..');
import request from 'supertest';

describe('Order API:', function() {
  describe('GET /api/orders', function() {
    var orders;

    beforeEach(function(done) {
      request(app)
        .get('/api/orders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          orders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      orders.should.be.instanceOf(Array);
    });
  });
});
