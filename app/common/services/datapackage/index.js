import angular from 'angular';
import {DataService} from './dataservice';
import addDataPackageResolver from './resolver';

const module = angular
  .module('projectX.dataService', ['ngRoute'])
  .service('dataService', DataService)
  .decorator('$route', ['$delegate', $delegate => {
    angular.forEach($delegate.routes, addDataPackageResolver);
    return $delegate;
  }]);

export default module.name;
