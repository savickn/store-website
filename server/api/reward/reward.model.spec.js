'use strict';

var expect = require('chai').expect;
var app = require('../../app');
var Reward = require('./reward.model');
var RewardFactory = require('./reward.factory.js')
var User = require('../user/user.model')
var UserFactory = require('../user/user.factory.js');

describe('Reward Model', function() {
  var userF;
  var reward;
  var rewardWithUser;

  //clears users from db
  before(function(done) {
    Reward.remove().exec().then(function() {
      done();
    });
  });

  beforeEach(function(done) {
    reward = RewardFactory.build();
    User.create(UserFactory.build(), function(err, user) {
      userF = user;
      rewardWithUser = RewardFactory.build({user: user._id});
      done();
    });
  });

  afterEach(function(done) {
    Reward.remove().exec().then(function() {
      done();
    });
    User
  });

  after(function(done) {
    User.remove().exec().then(function() {
      done();
    });
  });

  it('should fail to create a reward without a user', function(done) {
    Reward.create(reward, function(err, reward) {
      expect(err).to.exist;
      done();
    });
  });

  it('should successfully save a reward with a user', function(done) {
    Reward.create(rewardWithUser, function(err, reward) {
      expect(reward).to.exist;
      done();
    })
  })

  /*it('should update user.reward field if successfully saved', function(done) {
    Reward.create(reward_with_user, function(err, reward) {
      expect(reward).to.exist;


      done();
    })
  })

  it('should fail to save if the user already has a reward card', function(done) {

  })*/

  it('should set points to 0 if not provided', function(done) {
    Reward.create(rewardWithUser, function(err, reward) {
      expect(reward.points).to.equal(0);
      done();
    })
  })

  it('should set points if provided', function(done) {
    rewardWithUser.points = 500;
    Reward.create(rewardWithUser, function(err, reward) {
      expect(reward.points).to.equal(500);
      done();
    })
  })

  it('should fail with a 9 digit card number', function(done) {
    rewardWithUser.cardNumber = "005475899";
    Reward.create(rewardWithUser, function(err, reward) {
      expect(err).to.exist;
      done();
    })
  })

  it('should fail with a card number that contains a letter', function(done) {
    rewardWithUser.cardNumber = "0054dg66";
    Reward.create(rewardWithUser, function(err, reward) {
      expect(err).to.exist;
      done();
    })
  })
})

function addLeadingZeroes(number) {
  var num = number.toString();
  while(num.length < 8) {
    num = "0" + num;
  };
  return num;
};

describe('addLeadingZeroes', function() {
  it('should prefix a 4-digit number with 4 zeroes', function(done) {
    var number = "4550";
    var expectedResult = "00004550";
    number = addLeadingZeroes(number);
    expect(number).to.equal(expectedResult);
    done();
  })

  it('should not prefix an 8-digit number', function(done) {
    var number = "11223344";
    var expectedResult = "11223344"
    number = addLeadingZeroes(number);
    expect(number).to.equal(expectedResult);
    done();
  })
})
