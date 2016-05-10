import './app.css!';

import angular from 'angular';
import 'angular-route';
// import 'angular-animate';
import 'angular-cookies';
import 'angular-sanitize';

import 'angular-ui-bootstrap';

import angularMarked from 'angular-marked';
import 'ui-codemirror';
import 'angular-downloadsvg-directive';

import dataServices from 'common/services/datapackage/index';
import dataPackageEditor from 'components/editor/editor';

import routes from 'components/routes';

import footerHTML from 'common/partials/footer.html!text';
import introHTML from 'common/partials/intro.html!text';

import 'angular-loading-bar';
import 'angular-loading-bar/build/loading-bar.css!';

import 'angular-growl/build/angular-growl.js';
import 'angular-growl/build/angular-growl.css!';

import onResize from 'common/directives/resize';

export default angular
  .module('projectX', [
    'ngRoute',
    // 'ngAnimate',
    'ngCookies',
    'ngSanitize',
    // 'ngTouch',
    'hc.downloader',
    'ui.bootstrap',
    routes.name,
    angularMarked,
    dataServices,
    dataPackageEditor,
    onResize,
    'ui.codemirror',
    'angular-loading-bar',
    'angular-growl'
  ])
  .config(['$logProvider', '$compileProvider', function ($logProvider, $compileProvider) {
    $logProvider.debugEnabled(!System.production);
    $compileProvider.debugInfoEnabled(!System.production);
  }])
  .run(['$rootScope', '$location', function isPath ($rootScope, $location) {
    $rootScope.isPath = path => path === $location.path();
  }])
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('common/partials/footer.html', footerHTML);
    $templateCache.put('common/partials/intro.html', introHTML);
  }])
  .run(['$rootScope', '$location', 'growl', ($rootScope, $location, growl) => {
    $rootScope.$on('$routeChangeError', (event, curr, prev, rej) => {
      if (typeof rej !== 'string') {
        if (rej.status && rej.statusText) {
          rej = `${rej.status} ${rej.statusText}`;
        } else if (rej.message) {
          rej = rej.message;
        } else {
          rej = String(rej);
        }
      }
      return growl.error(`failed to change routes; ${rej}`);
    });
  }])
  .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 32;
  }]);
