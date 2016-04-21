import Chiasm from 'chiasm';
import ChiasmLayout from 'chiasm-layout';
import ChiasmLinks from 'chiasm-links';

import barChart from './barChart';
import './barChart.css!';

import 'codemirror/lib/codemirror.css!';
import 'inlet/inlet.css!';

import _ from 'lodash';

// because chiasm-layout is missing underscore/lodash import.  https://github.com/chiasm-project/chiasm-layout/issues/1
window._ = _;

class controller {
  constructor () {
    const chiasm = this.chiasm = new Chiasm();

    chiasm.plugins.layout = ChiasmLayout;
    chiasm.plugins.links = ChiasmLinks;
    chiasm.plugins.barChart = barChart;

    chiasm.getComponent('layout').then(comp => {
      comp.when(['containerSVG'], svg => {
        svg.attr('title', 'Bar Chart');
      });

      this.layoutComponent = comp;
    });
  }

  draw () {
    console.log('draw');
    this.chiasm.config = this.dataPackage.resources[1].data;
    this.chiasm.data = this.dataPackage.resources[0].data;
  }

  $onInit () {
    this.draw();
  }

  $onDestroy () {
    if (this.layoutComponent && typeof this.layoutComponent.destroy === 'function') {
      this.layoutComponent.destroy();
    }
  }
}

export default {
  controller,
  templateUrl: 'components/examples/chiasm/chiasm.html',
  bindings: {
    dataPackage: '<package'
  }
};
