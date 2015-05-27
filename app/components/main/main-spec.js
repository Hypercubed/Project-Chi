'use strict';

var angular = require('angular');
require('angular-mocks');

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(angular.mock.module('myApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(angular.mock.inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MainCtrl.clicks.value).toBe(0);
  });
});
