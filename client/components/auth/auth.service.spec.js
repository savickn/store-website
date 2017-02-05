'use strict';

describe("Service: Auth", function() {
  beforeAll(angular.mocks.module('passportApp'))

  var Auth;

  beforeAll(angular.mocks.inject(function(_Auth_) {
    Auth = _Auth_;
  }))

  it('should exist', function(done) {
    expect(Auth).toBeDefined();
  })
})
