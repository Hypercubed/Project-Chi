'use strict';

import 'angular-mocks';

describe('Controller: ExamplesCtrl', function () {

  // load the controller's module
  beforeEach(module('projectX'));

  var IndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, dataService) {
    scope = $rootScope.$new();
    IndexCtrl = $controller('ExamplesCtrl', {
      $scope: scope,
			dataPackage: {
				resources: []
			}
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.dataPackage).toBeDefined();
  });

});
