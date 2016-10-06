import d3 from 'd3';
import {autorun} from 'mobx';

import './bars.less!';
import BarChart from './bars-chart';

controller.$inject = ['$log'];
function controller ($log) {
  const $ctrl = this;
  const chart = new BarChart();

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage
    },
    $onInit () {
      $log.debug('$onInit');
      autorun(draw);
    },
    draw
  });

  function draw () {
    $log.debug('draw');
    const data = $ctrl.dataPackage.resources
      .filter(d => Boolean(d.data))
      .map(d => d.data);

    const element = d3.select('#_examples_bars__chart');

    const width = element[0][0].clientWidth;

    const divs = element
      .selectAll('.chart')
      .data(data);

    divs.enter()
      .append('div')
      .attr('class', 'chart');

    divs.exit().remove();

    divs.call(chart.width(width).height('auto'));
  }
}

export default {
  controller,
  templateUrl: 'components/examples/bars/bars.html',
  bindings: {
    dataPackage: '<package'
  }
};
