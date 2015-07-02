'use strict';

import 'angular-mocks';
import { mimeType } from './mimeType-service';

describe('Service: mimeType', function () {
  it('should return a service', function () {
    expect(typeof mimeType).toBe('function');
  });

  it('should return a service', function () {
    expect(mimeType('test.txt')).toBe('text/plain');
  });

  it('should return a service', function () {
    expect(mimeType('test.json')).toBe('application/json');
  });

  it('should return a service', function () {
    expect(mimeType('test.csv')).toBe('text/csv');
  });

  it('should return a service', function () {
    expect(mimeType('test.tsv')).toBe('text/tab-separated-values');
  });
});
