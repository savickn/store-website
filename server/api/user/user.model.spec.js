'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./user.model');
var UserFactory = require('./user.factory.js');

var user = new User({
  provider: 'local',
  name: 'Fake User',
  phoneNumber: '4365675433',
  email: 'test@test.com',
  password: 'password'
});

describe('User Model', function() {
  //clears users from db
  before(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no users', function(done) {
    User.find({}, function(err, users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate user', function(done) {
    user.save(function() {
      var userDup = new User(user);
      userDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an email', function(done) {
    user.email = '';
    user.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail if the email is improperly formatted', function(done) {
    user.email = 'test';
    user.save(function(err) {
      should.exist(err);
      done();
    })
  })

  it('should fail if the phone number is improperly formatted', function(done) {
    user.phoneNumber = '1235';
    user.save(function(err) {
      should.exist(err);
      done();
    })
  })

  it('should should have virtual property NumberOfPurchases', function(done) {
    user.save(function(err, user) {
      should.exist(user.numberOfPurchases);
      done();
    })
  })






  it("should authenticate user if password is valid", function() {
    return user.authenticate('password').should.be.true;
  });

  it("should not authenticate user if password is invalid", function() {
    return user.authenticate('blah').should.not.be.true;
  });
});
