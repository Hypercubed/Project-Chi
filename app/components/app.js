'use strict';

import angular from 'angular';

import './app.css!';

import 'angular-route';
import 'angular-animate';
import 'angular-cookies';
import 'angular-sanitize';
import 'angular-touch';

export default angular
  .module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngTouch'
  ])
  .run(['$rootScope', '$location', function isPath($rootScope, $location){
    $rootScope.isPath = (path) => path === $location.path();
  }]);
