/* jshint -W003 */
/* global d3 */

'use strict';

import BarChart from './bars-chart';

export default class Ctrl {
  /*@ngInject*/
  constructor($scope, dataPackage){

    var bars = new BarChart();

    $scope.dataPackage = dataPackage;
    $scope.change = draw;

    draw();

    function draw() {

      var data = dataPackage.resources.map(function(d) { return d.data; });

      var divs = d3.select('#chart')
        .selectAll('div').data(data);

      divs.enter().append('div');

      divs.call(bars);
    }

  }
}

Ctrl.$inject = ['$scope', 'dataPackage'];

Ctrl.resolve = {
  /*@ngInject*/
  dataPackage: ['$route', 'dataService', function($route, dataService) {
    return dataService.loadPackage($route.current.templateUrl+'/../datapackage.json');
  }],
};