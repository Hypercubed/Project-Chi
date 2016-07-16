import Chiasm from 'chiasm';
import chiasmCharts from 'chiasm-charts';
import chiasmLayout from 'chiasm-layout';
import chiasmLinks from 'chiasm-links';
import chiasmDataReduction from 'chiasm-data-reduction';

// import barChart from './barChart';
import './chiasm.css!';

import 'codemirror/lib/codemirror.css!';
import 'inlet/inlet.css!';

function controller () {
  const $ctrl = this;

  const chiasm = new Chiasm();

  chiasm.plugins.layout = chiasmLayout;
  chiasm.plugins.links = chiasmLinks;

  chiasm.plugins.dataReduction = chiasmDataReduction;

  chiasm.plugins.barChart = chiasmCharts.components.barChart;
  chiasm.plugins.scatterPlot = chiasmCharts.components.scatterPlot;
  chiasm.plugins.lineChart = chiasmCharts.components.lineChart;
  chiasm.plugins.heatMap = chiasmCharts.components.heatMap;
  chiasm.plugins.boxPlot = chiasmCharts.components.boxPlot;

  let layoutComponent = null;
  chiasm.getComponent('layout').then(comp => {
    comp.when(['containerSVG'], svg => {
      svg.attr('title', 'Chiasm Chart');
    });

    layoutComponent = comp;
  });

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      onChange: draw
    },
    $onInit: draw,
    $onDestroy: () => {
      if (layoutComponent && typeof layoutComponent.destroy === 'function') {
        layoutComponent.destroy();
      }
    }
  });

  function draw () {
    const resources = $ctrl.dataPackage.resourcesByName;

    resources['week_temperature_sf.csv'].data.forEach(d => {
      /* d.temperature = Number(d.temperature);
      d.timestamp = new Date(d.timestamp); */
    });

    chiasm.config = resources['config.json'].data;
    chiasm.barsData = {
      metadata: {
        columns: [
          {name: 'letter', type: 'string'},
          {name: 'frequency', type: 'number'}
        ]
      },
      data: resources['letterFrequency.tsv'].data
    };
    chiasm.lineData = {
      metadata: {
        columns: [
          {name: 'timestamp', type: 'date'},
          {name: 'temperature', type: 'number'}
        ]
      },
      data: resources['week_temperature_sf.csv'].data
    };
    chiasm.scatterData = {
      metadata: {
        columns: [
          {name: 'Sepal.Length', type: 'number', label: 'Sepal Length'},
          {name: 'Sepal.Width', type: 'number', label: 'Sepal Width'},
          {name: 'Petal.Length', type: 'number', label: 'Petal Length'},
          {name: 'Petal.Width', type: 'number', label: 'Petal Width'},
          {name: 'Species', type: 'string', label: 'Species'}
        ]
      },
      data: resources['iris.csv'].data
    };
  }
}

export default {
  controller,
  templateUrl: 'components/examples/chiasm/chiasm.html',
  bindings: {
    dataPackage: '<package'
  }
};
