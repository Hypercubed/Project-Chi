import angular from 'angular';

import aboutHTML from 'components/about/about.md!md';
import errorHTML from 'components/error/error.html!text';

configRoutes.$inject = ['$routeProvider'];
function configRoutes ($routeProvider) {
  $routeProvider
  .when('/about', {
    template: aboutHTML
  })
  .when('/error', {
    template: errorHTML
  })
  .when('/404', {
    template: errorHTML
  })
  .otherwise({
    redirectTo: '/about'
  });
}

const routes = angular
  .module('routes', [])
  .config(configRoutes)
  .name;

export default routes;
