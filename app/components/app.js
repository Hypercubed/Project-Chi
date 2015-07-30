/* global angular */

'use strict';

import './app.css!';

import 'angular-route';
import 'angular-animate';
import 'angular-cookies';

import 'angular-bootstrap';

import angularMarked from 'angular-marked';
import 'ui-codemirror';
import 'angular-downloadsvg-directive';

import dataServices from 'common/services/datapackage/index';
import dataPackageEditor from 'components/editor/editor';

import routes from 'components/routes';

import footerHTML from 'common/partials/footer.html!text';
import introHTML from 'common/partials/intro.html!text';

export default angular
  .module('projectX', [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    //'ngSanitize',
    //'ngTouch',
    'hc.downloader',
    'ui.bootstrap',
    routes.name,
    angularMarked,
    dataServices,
    dataPackageEditor,
    'ui.codemirror'
  ])
  .run(['$rootScope', '$location', function isPath($rootScope, $location){
    $rootScope.isPath = (path) => path === $location.path();
  }])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('common/partials/footer.html', footerHTML);
    $templateCache.put('common/partials/intro.html', introHTML);
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

        function resize() {
          scope.onResize();
        }

        angular.element($window).on('resize', debounceRedraw);
        if ('matchMedia' in window) {
          window.matchMedia('print').addListener(resize);
        }

        scope.$on('$destroy', function() {
          angular.element($window).off('resize', debounceRedraw);
          if ('matchMedia' in window) {
            window.matchMedia('print').removeListener(resize);
          }
        });

      }
    };
  }]);
