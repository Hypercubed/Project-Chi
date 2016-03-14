import angular from 'angular';
import {DataService} from './dataservice';
import addDataPackageResolver from './resolver';

export const moduleName = 'projectX.dataService';

angular.module(moduleName, ['ngRoute'])
  .service('dataService', DataService)
  .decorator('$route', ['$delegate', $delegate => {
    angular.forEach($delegate.routes, addDataPackageResolver);
    return $delegate;
  }]);

export default moduleName;
