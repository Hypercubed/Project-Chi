import angular from 'angular';

import 'angular-loading-bar';
import 'angular-loading-bar/build/loading-bar.css!';
import './loading-bar.css!';

import spinnerTemplate from './loading-bar.html!text';

const name = 'projectX.loading-bar';

export default name;

angular
  .module(name, [
    'angular-loading-bar'
  ])
  .config(['cfpLoadingBarProvider', cfpLoadingBarProvider => {
    cfpLoadingBarProvider.latencyThreshold = 32;
    cfpLoadingBarProvider.spinnerTemplate = spinnerTemplate;
  }])
  .run(['$rootScope', 'cfpLoadingBar', function ($rootScope, cfpLoadingBar) {
    $rootScope.$on('$routeChangeStart', () => {
      cfpLoadingBar.start();
    });

    $rootScope.$on('$routeChangeError', () => {
      cfpLoadingBar.complete();
    });

    $rootScope.$on('$routeChangeSuccess', () => {
      cfpLoadingBar.complete();
    });
  }]);
