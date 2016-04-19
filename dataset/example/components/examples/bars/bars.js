/* jshint -W003 */

import d3 from 'd3';
import BarChart from './bars-chart';

class Ctrl {
  constructor () {
    this.chart = new BarChart();
  }

  draw () {
    const data = this.dataPackage.resources
      .filter(d => Boolean(d.data))
      .map(d => d.data);

    const divs = d3.select('#_examples_bars__chart')
      .selectAll('div').data(data);

    divs.enter().append('div');

    divs.exit().remove();

    divs.call(this.chart);
  }

  $onInit () {
    this.draw();
  }
}

export default {
  controller: Ctrl,
  templateUrl: 'components/examples/bars/bars.html',
  bindings: {
    dataPackage: '<package'
  }
};
