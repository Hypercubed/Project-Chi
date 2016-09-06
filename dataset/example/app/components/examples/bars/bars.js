import d3 from 'd3';
import BarChart from './bars-chart';

function controller () {
  const $ctrl = this;
  const chart = new BarChart();

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      onChange: draw
    },
    draw,
    $onInit: draw
  });

  function draw () {
    const data = $ctrl.dataPackage.resources
      .filter(d => Boolean(d.data))
      .map(d => d.data);

    console.log(typeof data[0][0].frequency);

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
