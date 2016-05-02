import d3 from 'd3';
import Chart from './trains-chart';

function controller () {
  const $ctrl = this;
  const chart = new Chart();

  $ctrl.editorOptions = {
    data: $ctrl.dataPackage,
    onChange: draw
  };

  $ctrl.$onInit = () => {
    draw();
  };

  function draw () {
    const data = $ctrl.dataPackage.resources.map(d => d.data);

    const divs = d3.select('#_examples_bars__chart')
      .selectAll('div').data(data);

    divs.enter().append('div');

    divs.exit().remove();

    divs.call(chart);
  }
}

export default {
  controller,
  templateUrl: 'components/examples/bars/bars.html',
  datapackageUrl: 'components/examples/trains/datapackage.json',
  bindings: {
    dataPackage: '<package'
  }
};
