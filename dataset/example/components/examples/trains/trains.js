import { annotate } from 'angular-annotation-decorator/src/index';

import d3 from 'd3';
import Chart from './trains-chart';

@annotate('$scope', 'dataPackage')
class Ctrl {
  constructor ($scope, dataPackage) {
    var chart = new Chart();

    $scope.dataPackage = dataPackage;
    $scope.change = draw;

    draw();

    function draw () {
      var data = dataPackage.resources.map(function (d) { return d.data; });

      var divs = d3.select('#_examples_bars__chart')
        .selectAll('div').data(data);

      divs.enter().append('div');

      divs.exit().remove();

      divs.call(chart);
    }
  }
}

export default {
  controller: Ctrl,
  templateUrl: 'components/examples/bars/bars.html',
  datapackageUrl: 'components/examples/trains/datapackage.json'
};
