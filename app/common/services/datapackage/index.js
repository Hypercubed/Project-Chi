import angular from 'angular';

import addDataPackageResolver from './resolver';
import {run, dataservice} from './dataservice';

const module = angular
  .module('projectX.dataService', ['ngRoute'])
  .service('dataService', dataservice)
  .run(run)
  .decorator('$route', ['$delegate', $delegate => {
    angular.forEach($delegate.routes, addDataPackageResolver);
    return $delegate;
  }]);

export default module.name;
