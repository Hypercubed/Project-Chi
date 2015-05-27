'use strict';

var angular = require('angular');
require('angular-mocks');

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(angular.mock.module('myApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(angular.mock.inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AboutCtrl.value).toBe(0);
  });
});
