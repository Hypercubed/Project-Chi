import Inject from 'common/decorators/inject';
import d3 from 'd3';

import Chart from './trains-chart';

@Inject('$scope', 'dataPackage')
export default class TrainsCtrl {
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
