/* global describe, beforeEach, it, expect */
/* global inject */

'use strict';

import 'angular-mocks';

describe('Service: dataservice', function () {
  // load the controller's module
  beforeEach(module('projectX.dataService'));

  var dataService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_dataService_) {
    dataService = _dataService_;
  }));

  it('should return a service', function () {
    expect(typeof dataService).toBe('object');
  });
});
