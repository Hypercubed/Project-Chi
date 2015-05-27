'use strict';

import angular from 'angular';

import './app.css!';

import 'angular-route';

export default angular
  .module('myApp', [
    'ngRoute'
  ])
  .run(['$rootScope', '$location', function($rootScope, $location){
    var path = function() { return $location.path();};
    $rootScope.$watch(path, function(newVal){
      $rootScope.activepath = newVal;
    });
  }]);
