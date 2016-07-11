import Chiasm from 'chiasm';
import ChiasmBarChart from 'chiasm-charts/src/components/barChart';
import ChiasmLayout from 'chiasm-layout';
import ChiasmLinks from 'chiasm-links';

// import barChart from './barChart';
import './barChart.css!';

import 'codemirror/lib/codemirror.css!';
import 'inlet/inlet.css!';

function controller () {
  const $ctrl = this;

  const chiasm = $ctrl.chiasm = new Chiasm();

  chiasm.plugins.layout = ChiasmLayout;
  chiasm.plugins.links = ChiasmLinks;
  chiasm.plugins.barChart = ChiasmBarChart;

  chiasm.getComponent('layout').then(comp => {
    comp.when(['containerSVG'], svg => {
      svg.attr('title', 'Bar Chart');
    });

    $ctrl.layoutComponent = comp;
  });

  chiasm.getComponent('barChart').then(comp => {
    $ctrl.barChart = comp;
  });

  Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      onChange: draw
    },
    $onInit: draw,
    $onDestroy: () => {
      if ($ctrl.layoutComponent && typeof $ctrl.layoutComponent.destroy === 'function') {
        $ctrl.layoutComponent.destroy();
      }
    }
  });

  function draw () {
    chiasm.config = $ctrl.dataPackage.resources[1].data;
    chiasm.dataset = {
      metadata: {
        columns: [
          {name: 'letter', type: 'string'},
          {name: 'frequency', type: 'number'}
        ]
      },
      data: $ctrl.dataPackage.resources[0].data
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
