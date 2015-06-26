/* global angular */

'use strict';

import './app.css!';

import 'angular-route';
import 'angular-animate';
import 'angular-cookies';
//import 'angular-sanitize';
//import 'angular-touch';
import 'angular-bootstrap';
//import 'angular-material';
import 'angular-marked';
import 'ui-codemirror';
import 'angular-downloadsvg-directive';


export default angular
  .module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    //'ngSanitize',
    //'ngTouch',
    'hc.downloader',
    'hc.marked',
    //'ngMaterial',
    //'myApp.dataService',
    'ui.bootstrap',
    'myApp.dataService',
    'myApp.dataEditor',
    'ui.codemirror'
  ])
  .run(['$rootScope', '$location', function isPath($rootScope, $location){
    $rootScope.isPath = (path) => path === $location.path();
  }])
  .directive('onResize', ['$window', function($window) {
    return {
      scope: {
        onResize: '&'
      },
      link: function(scope) {

        var timeout = null;
        function debounceRedraw() {
          if(timeout) {clearTimeout(timeout);}
          timeout = setTimeout(function() {
            scope.onResize();
          }, 500);
        }

        //function resize() {
        //  scope.onResize();
        //}

        angular.element($window).on('resize', debounceRedraw);
        //if ('matchMedia' in window) {
        //  window.matchMedia('print').addListener(resize);
        //}

        scope.$on('$destroy', function() {
          angular.element($window).off('resize', debounceRedraw);
          //if ('matchMedia' in window) {
          //  window.matchMedia('print').removeListener(resize);
          //}
        });

      }
    };
  }]);
