import angular from 'angular';

export default function (route) {
  const hasDatapackageResolve = angular.isDefined(route.resolve) && angular.isDefined(route.resolve.dataPackage);
  if (!hasDatapackageResolve) {
    if (angular.isDefined(route.datapackage)) {
      route.resolve = route.resolve || {};
      angular.extend(route.resolve, {
        dataPackage: ['$route', 'dataService', function ($route, dataService) {
          const datapackage = (typeof route.datapackage === 'function') ? route.datapackage($route.current.params) : route.datapackage;
          const base = datapackage.base || route.datapackageUrl;
          return dataService._loadPackage(base, datapackage);
        }]
      });
    } else if (angular.isDefined(route.datapackageUrl)) {
      route.resolve = route.resolve || {};
      angular.extend(route.resolve, {
        dataPackage: ['$route', 'dataService', function ($route, dataService) {
          const datapackageUrl = (typeof route.datapackageUrl === 'function') ? route.datapackageUrl($route.current.params) : route.datapackageUrl;
          return dataService.loadPackage(datapackageUrl);
        }]
      });
    }
  }
  return route;
}
