import Chiasm from 'chiasm';
import chiasmCharts from 'chiasm-charts';
import chiasmLayout from 'chiasm-layout';
import chiasmLinks from 'chiasm-links';
import chiasmDataReduction from 'chiasm-data-reduction';

// import barChart from './barChart';
import './chiasm.less!';

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

  function resourceToChiasm (resource) {
    return {
      metadata: {
        columns: resource.schema ? resource.schema.fields : []
      },
      data: resource.data
    };
  }

  function draw () {
    chiasm.config = $ctrl.dataPackage.$resourcesByName.config.data;
    $ctrl.dataPackage.resources.forEach(resource => {
      if (resource.name !== 'config') {
        chiasm[resource.name] = resourceToChiasm(resource);
      }
    });
  }
}

export default {
  controller,
  templateUrl: 'components/examples/chiasm/chiasm.html',
  bindings: {
    dataPackage: '<package'
  }
};
