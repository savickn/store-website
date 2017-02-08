'use strict';

describe('Controller: ReviewCtrl', function () {

  // load the controller's module
  beforeEach(module('passportApp'));

  var ReviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$rootScope_) {
    scope = _$rootScope_.$new();
    ReviewCtrl = _$controller_('ReviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(ReviewCtrl).toBeDefined();
  });
});
