import angular from 'angular';

import examples from './examples/routes';
import indexComponent from './index/index';

import aboutHTML from 'components/about/about.md!md';
import errorHTML from 'components/error/error.html!text';

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
  .when('/', indexComponent)
  .otherwise({
    redirectTo: '/'
  });
}

export default angular
  .module('routes', [examples.name])
  .config(['$routeProvider', configRoutes]);
