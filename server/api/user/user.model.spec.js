'use strict';

var expect = require('chai').expect;
var app = require('../../app');
var User = require('./user.model');
var UserFactory = require('./user.factory.js');

describe('User Model', function() {
  var user;

  before(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  beforeEach(function(done) {
    user = new User(UserFactory.build());
    done();
  });

  afterEach(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no users', function(done) {
    User.find({}, function(err, users) {
      expect(users.length).to.equal(0);
      done();
    });
  });

  it('should create a valid user', function(done) {
    User.create(user, function(err, user) {
      if(err) done(err);
      expect(user).to.exist;
      done();
    })
  });

  it('should fail when saving a duplicate user', function(done) {
    user.save(function(err, user) {
      var userDup = new User(user);
      userDup.save(function(err) {
        expect(err).to.exist;
        done();
      });
    });
  });

  it('should fail when saving without an email', function(done) {
    user.email = '';
    user.save(function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it('should fail if the email is improperly formatted', function(done) {
    user.email = 'test';
    user.save(function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it('should fail if the phone number is improperly formatted', function(done) {
    user.phoneNumber = '1235';
    user.save(function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it('numberOfPurchases should return no orders', function(done) {
    user.save(function(err, user) {
      if(err) done(err);
      expect(user.numberOfPurchases).to.equal(0);
      done();
    });
  });

  it("should authenticate user if password is valid", function(done) {
    expect(user.authenticate('password')).to.be.true;
    done();
  });

  it("should not authenticate user if password is invalid", function(done) {
    expect(user.authenticate('blah')).to.not.be.true;
    done();
  });
});
