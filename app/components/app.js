import './app.css!';

import angular from 'angular';
import 'angular-route';
import 'angular-animate';
import 'angular-cookies';
import 'angular-sanitize';
import 'angular-touch';

import 'angular-ui-bootstrap';

import angularMarked from 'angular-marked';

import routes from 'components/routes';
import common from 'common/common';
import AppComponent from './app.component';

export default angular
  .module('projectX', [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    angularMarked,
    routes.name || routes,
    common
  ])
  .component('app', AppComponent)
  .config(['$logProvider', '$compileProvider', function ($logProvider, $compileProvider) {
    $logProvider.debugEnabled(!System.production);
    $compileProvider.debugInfoEnabled(!System.production);
  }]);
