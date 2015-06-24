'use strict';

import './examples/routes';

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

import app from 'components/app';

app
  .config(configRoutes);
