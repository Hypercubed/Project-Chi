'use strict';

import examples from './examples/routes';
import IndexCtrl from './index/index';

import aboutHTML from 'components/about/about.html!text';
import errorHTML from 'components/error/error.html!text';
import indexHTML from 'components/index/index.html!text';

/*@ngInject*/
function configRoutes($routeProvider) {
  $routeProvider
  .when('/about', {
    template: aboutHTML,
  })

  .when('/error', {
    template: errorHTML,
  })

  .when('/404', {
    template: errorHTML,
  })

  .when('/', {
    template: indexHTML,
    controller: 'IndexCtrl',
    datapackageUrl: 'components/index/datapackage.json'
  })

  .otherwise({
    redirectTo: '/'
  });

}

configRoutes.$inject = ['$routeProvider'];

export default angular
  .module('routes', [examples.name])
  .controller('IndexCtrl', IndexCtrl)
  .config(configRoutes);
