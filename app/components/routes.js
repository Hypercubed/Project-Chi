'use strict';

import examples from './examples/routes';

/*@ngInject*/
function configRoutes($routeProvider) {
  $routeProvider
  .when('/about', {
    templateUrl: 'components/about/about.html',
  })
  .otherwise({
    redirectTo: '/examples'
  });
}

configRoutes.$inject = ['$routeProvider'];

export default angular
  .module('routes', [examples.name])
  .config(configRoutes);
