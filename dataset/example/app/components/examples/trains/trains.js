import d3 from 'd3';
import Chart from './trains-chart';

class controller {
  constructor () {
    this.chart = new Chart();
    this.editorOptions = {
      data: this.dataPackage,
      onChange: () => this.draw()
    };
  }

  draw () {
    const data = this.dataPackage.resources.map(d => d.data);

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
  controller,
  templateUrl: 'components/examples/bars/bars.html',
  datapackageUrl: 'components/examples/trains/datapackage.json',
  bindings: {
    dataPackage: '<package'
  }
};
