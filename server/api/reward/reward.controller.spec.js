var expect = require('chai').expect;
var app = require('../../app');
var request = require('supertest');

var User = require('../user/user.model')
var UserFactory = require('../user/user.factory.js');


describe('HTTP /api/rewards', function() {
  var user;
  before(function(done) {
    User.create(UserFactory.build(), function(err, user) {
      user = user;
      done();
    });
  });

  it('POST / should respond with reward object', function(done) {
    request(app)
      .post('/api/rewards')
      .field('user', user._id)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        console.log(err);
        console.log(res);
        if (err) return done(err);
        expect(req.body).to.be.instanceof(Object);
        done();
      });
  });
});
