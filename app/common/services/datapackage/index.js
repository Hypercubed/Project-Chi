/* global angular */

'use strict';

var moduleName = 'projectX.dataService';

// import { mimeType } from './mimeType-service'
import { DataService } from './dataservice';

// export { mimeType };
// export { DataService };

angular.module('projectX.dataService', ['ngRoute'])
  // .constant('mimeType', mimeType)
  .service('dataService', DataService)
  .config(['$routeProvider', function ($routeProvider) {
    var originalWhen = $routeProvider.when;

    $routeProvider.when = function (path, route) {
      if (angular.isDefined(route.datapackage)) {
        route.resolve || (route.resolve = {});
        angular.extend(route.resolve, {
          dataPackage: ['$route', 'dataService', function ($route, dataService) {
            let datapackage = (typeof route.datapackage === 'function') ? route.datapackage($route.current.params) : route.datapackage;
            return dataService._loadPackage(datapackage.base, datapackage);
          }]
        });
      } else if (angular.isDefined(route.datapackageUrl)) {
        route.resolve || (route.resolve = {});
        angular.extend(route.resolve, {
          dataPackage: ['$route', 'dataService', function ($route, dataService) {
            let datapackageUrl = (typeof route.datapackageUrl === 'function') ? route.datapackageUrl($route.current.params) : route.datapackageUrl;
            return dataService.loadPackage(datapackageUrl);
          }]
        });
      }

      return originalWhen.call($routeProvider, path, route);
    };
  }]);

export default moduleName;
