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
  .when('/', {
    template: '<index data-package="$resolve.dataPackage"></index>',
    datapackageUrl: 'components/index/datapackage.json'
  })
  .otherwise({
    redirectTo: '/'
  });
}

export default angular
  .module('routes', [examples.name])
  .component('index', indexComponent)
  .config(['$routeProvider', configRoutes]);
