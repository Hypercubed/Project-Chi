/* jshint -W003 */

import Inject from 'common/decorators/inject';

import d3 from 'd3';
import BarChart from './bars-chart';

@Inject('$scope', 'dataPackage')
export default class Ctrl {
  constructor ($scope, dataPackage) {
    var bars = new BarChart();

    $scope.dataPackage = dataPackage;
    $scope.change = draw;

    draw();

    function draw () {
      var data = dataPackage.resources
        .filter(function (d) { return !!d.data; })
        .map(function (d) { return d.data; });

      var divs = d3.select('#_examples_bars__chart')
        .selectAll('div').data(data);

      divs.enter().append('div');

      divs.exit().remove();

      divs.call(bars);
    }
  }
}
