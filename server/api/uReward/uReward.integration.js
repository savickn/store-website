'use strict';

var app = require('../..');
import request from 'supertest';

describe('UReward API:', function() {
  describe('GET /y', function() {
    var uRewards;

    beforeEach(function(done) {
      request(app)
        .get('/y')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          uRewards = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      uRewards.should.be.instanceOf(Array);
    });
  });
});
