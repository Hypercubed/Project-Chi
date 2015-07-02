'use strict';

import 'angular-mocks';

describe('Service: dataservice', function () {

  // load the controller's module
  beforeEach(module('myApp.dataService'));

  var dataservice;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_dataService_) {
    dataService = _dataService_;
  }));

  it('should return a service', function () {
    expect(typeof dataService).toBe('object');
  });
});
