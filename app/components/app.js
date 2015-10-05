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

import 'angular-loading-bar';  // ,'cfp.loadingBarInterceptor'

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
    'ui.codemirror',
    'cfp.loadingBarInterceptor'
  ])
  .config(['$logProvider', function($logProvider) {
    $logProvider.debugEnabled(false);
  }])
  .run(['$rootScope', '$location', function isPath($rootScope, $location){
    $rootScope.isPath = (path) => path === $location.path();
  }])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('common/partials/footer.html', footerHTML);
    $templateCache.put('common/partials/intro.html', introHTML);
  }])
  .run(['$rootScope','$location',function ($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function (a,b,c,d) {
      var err = $rootScope.error = 'failed to change routes '+d.status+' '+d.statusText;
      if (d.status = 404) {
        $location.path('/404').replace();
      } else {
        $location.path('/error').replace();
      }
    });
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
