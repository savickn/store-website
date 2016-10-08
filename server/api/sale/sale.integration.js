'use strict';

var app = require('../..');
import request from 'supertest';

describe('Sale API:', function() {

  describe('GET /y', function() {
    var sales;

    beforeEach(function(done) {
      request(app)
        .get('/y')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sales = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      sales.should.be.instanceOf(Array);
    });

  });

});
