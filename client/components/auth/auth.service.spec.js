'use strict';

describe("Service: Auth", function() {
  beforeEach(module('passportApp'))

  var Auth;

  beforeEach(inject(function(_Auth_) {
    Auth = _Auth_;
  }))

  it('should exist', function() {
    expect(Auth).toBeDefined();
  })
})
