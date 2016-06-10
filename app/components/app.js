import './app.css!';

import angular from 'angular';
import 'angular-route';
import 'angular-animate';
import 'angular-cookies';
import 'angular-sanitize';

import 'angular-ui-bootstrap';

import angularMarked from 'angular-marked';
import 'ui-codemirror';
import 'angular-downloadsvg-directive';

import dataServices from 'common/services/datapackage/index';
import dataPackageEditor from 'components/editor/editor';

import footerHTML from 'common/partials/footer.html!text';
import introHTML from 'common/partials/intro.html!text';

import loadingBar from 'common/services/loading-bar/loading-bar';
import dynamicTitle from 'common/services/dynamic-title/dynamic-title';
import growl from 'common/services/growl/growl';

import onResize from 'common/directives/resize';
import activePath from 'common/directives/active-path';

import routes from 'components/routes';

export default angular
  .module('projectX', [
    'ngRoute',
    'ngAnimate',
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
    loadingBar,
    dynamicTitle,
    growl,
    activePath
  ])
  .config(['$logProvider', '$compileProvider', function ($logProvider, $compileProvider) {
    $logProvider.debugEnabled(!System.production);
    $compileProvider.debugInfoEnabled(!System.production);
  }])
  /* .run(['$rootScope', '$location', function isPath ($rootScope, $location) {
    $rootScope.isPath = path => path === $location.path();
  }]) */
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('common/partials/footer.html', footerHTML);
    $templateCache.put('common/partials/intro.html', introHTML);
  }]);
