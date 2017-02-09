'use strict';

var expect = require('chai').expect;
var app = require('../../app');
var request = require('supertest');

var User = require('../user/user.model.js');
var UserFactory = require('../user/user.factory.js');
var Wishlist = require('./wishlist.model.js');
var WishlistFactory = require('./wishlist.factory.js')

describe('Wishlist API:', function() {
  describe('GET /api/wishlist/search', function() {
    var user1,
        user2;

    before(function(done) {
      User.create(UserFactory.build({name: 'Admin'}), function(err, user) {
        user1 = user;
        User.create(UserFactory.build({name: 'User'}), function(err, user) {
          user2 = user;
          done()
        })
      })
    });

    beforeEach(function(done) {
      Wishlist.create(WishlistFactory.build({user: user1._id}), function(err, wishlist) {
        Wishlist.create(WishlistFactory.build({user: user2._id}), function(err, wishlist) {
          done();
        })
      })
    })

    afterEach(function(done) {
      Wishlist.remove().exec().then(function() {
        done();
      });
    })

    after(function(done) {
      User.remove().exec().then(function() {
        done();
      });
    })

    it('should respond with JSON array', function(done) {
      request(app)
        .get('/api/wishlists/search')
        .query({})
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body).to.be.instanceOf(Array);
          expect(res.body.length).to.equal(2);
          done();
        });
    });

    it('should only retrieve wishlists associated with a specific user based on criteria', function(done) {
      request(app)
        .get('/api/wishlists/search')
        .query({name: 'Admin'})
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body).to.be.instanceOf(Array);
          expect(res.body.length).to.equal(1);
          for(let inst of res.body) {
            expect(inst.name).to.match(/Admin/);
          }
          done();
        });
    });

  });
});
