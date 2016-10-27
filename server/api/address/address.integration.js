'use strict';

var app = require('../..');
import request from 'supertest';

describe('Address API:', function() {
  describe('GET /api/addresses', function() {
    var addresss;

    beforeEach(function(done) {
      request(app)
        .get('/api/addresses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          addresss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      addresss.should.be.instanceOf(Array);
    });
  });
});
