var expect = require('chai').expect;
var app = require('../../app');
var request = require('supertest');

var User = require('../user/user.model')
var UserFactory = require('../user/user.factory.js');


describe('HTTP /api/rewards', function() {
  var user;
  before(function(done) {
    User.create(UserFactory.build(), function(err, usr) {
      user = usr;
      done();
    });
  });

  after(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  })

  it('POST should respond with reward object', function(done) {
    request(app)
      .post('/api/rewards')
      .send({user: user._id})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.instanceof(Object);
        expect(res.body.cardNumber).to.exist;
        done();
      });
  });
});
