'use strict';

describe('Controller: LoginController', function () {

  // load the controller's module
  beforeEach(module('passportApp'));

  var LoginController,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    LoginController = $controller('LoginController', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    expect(LoginController).toBeDefined();
  });
});
