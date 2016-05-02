import Chiasm from 'chiasm';
import ChiasmLayout from 'chiasm-layout';
import ChiasmLinks from 'chiasm-links';

import _ from 'lodash';

import barChart from './barChart';
import './barChart.css!';

import 'codemirror/lib/codemirror.css!';
import 'inlet/inlet.css!';

// because chiasm-layout is missing underscore/lodash import.  https://github.com/chiasm-project/chiasm-layout/issues/1
window._ = _;

function controller () {
  const $ctrl = this;

  const chiasm = $ctrl.chiasm = new Chiasm();

  chiasm.plugins.layout = ChiasmLayout;
  chiasm.plugins.links = ChiasmLinks;
  chiasm.plugins.barChart = barChart;

  chiasm.getComponent('layout').then(comp => {
    comp.when(['containerSVG'], svg => {
      svg.attr('title', 'Bar Chart');
    });

    $ctrl.layoutComponent = comp;
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
    chiasm.data = $ctrl.dataPackage.resources[0].data;
  }
}

export default {
  controller,
  templateUrl: 'components/examples/chiasm/chiasm.html',
  bindings: {
    dataPackage: '<package'
  }
};
