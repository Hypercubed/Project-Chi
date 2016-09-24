import d3 from 'd3';
import {autorun} from 'mobx';

import BarChart from './bars-chart';

controller.$inject = ['$log', 'dataService'];
function controller ($log, dataservice) {
  const $ctrl = this;
  const chart = new BarChart();

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      onChange: () => {
        $log.debug('change call back');
        $log.debug($ctrl.dataPackage);
      }
    },
    draw: () => {
      $log.debug('draw call back');
    },
    $onInit
  });

  function $onInit () {
    $log.debug('$onInit');

    dataservice.makePackageObservable($ctrl.dataPackage);

    autorun(draw);
  }

  function draw () {
    console.log($ctrl.dataPackag);

    const data = $ctrl.dataPackage.resources
      .filter(d => Boolean(d.data))
      .map(d => d.data);

    const element = d3.select('#_examples_bars__chart');

    const width = element[0][0].clientWidth;

    const divs = element
      .selectAll('div')
      .data(data);

    divs.enter().append('div');

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
