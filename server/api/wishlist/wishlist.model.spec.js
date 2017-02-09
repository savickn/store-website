'use strict';

var expect = require('chai').expect;
var app = require('../../app');
var Wishlist = require('./wishlist.model');
var WishlistFactory = require('./wishlist.factory.js');
var User = require('../user/user.model')
var UserFactory = require('../user/user.factory.js');

describe('Wishlist Model', function() {
  var user,
      wishlistWithoutUser,
      wishlistWithUser;

  before(function(done) {
    Wishlist.remove().exec().then(function() {
      User.create(UserFactory.build(), function(err, usr) {
        user = usr;
        done();
      })
    });
  });

  beforeEach(function(done) {
    wishlistWithoutUser = WishlistFactory.build();
    wishlistWithUser = WishlistFactory.build({user: user._id});
    done();
  });

  afterEach(function(done) {
    Wishlist.remove().exec().then(function() {
      done();
    });
  });

  after(function(done) {
    User.remove().exec().then(function() {
      done();
    })
  })

  it('should begin with no wishlists', function(done) {
    Wishlist.find({}, function(err, wishlists) {
      expect(wishlists.length).to.equal(0);
      done();
    });
  });

  it('should fail to create wishlist without user', function(done) {
    Wishlist.create(wishlistWithoutUser, function(err, wishlist) {
      expect(err).to.exist;
      done();
    })
  });

  it('should successfully create a wishlist with user', function(done) {
    Wishlist.create(wishlistWithUser, function(err, wishlist) {
      if(err) return done(err);
      expect(wishlist).to.exist;
      done();
    });
  });

  it('should create an empty array of products by default', function(done) {
    Wishlist.create(wishlistWithUser, function(err, wishlist) {
      if(err) return done(err);
      expect(wishlist.products).to.exist;
      expect(wishlist.products.length).to.equal(0);
      done();
    });
  });
});
