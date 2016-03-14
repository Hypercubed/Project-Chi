/* jshint -W003 */

import {annotate} from 'angular-annotation-decorator/src/index';

import d3 from 'd3';
import BarChart from './bars-chart';

@annotate('$scope', 'dataPackage')
class Ctrl {
  constructor ($scope, dataPackage) {
    const bars = new BarChart();

    $scope.dataPackage = dataPackage;
    $scope.change = draw;

    draw();

    function draw () {
      const data = dataPackage.resources
        .filter(d => Boolean(d.data))
        .map(d => d.data);

      const divs = d3.select('#_examples_bars__chart')
        .selectAll('div').data(data);

      divs.enter().append('div');

      divs.exit().remove();

      divs.call(bars);
    }
  }
}

export default {
  controller: Ctrl,
  datapackageUrl: 'components/examples/bars/datapackage.json',
  templateUrl: 'components/examples/bars/bars.html'
};
