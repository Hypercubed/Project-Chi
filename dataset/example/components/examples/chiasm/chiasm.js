import { annotate } from 'angular-annotation-decorator/src/index';

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

@annotate('$scope', 'dataPackage')
class Ctrl {
  constructor ($scope, dataPackage) {
    // var main = this;

    $scope.dataPackage = dataPackage;
    $scope.draw = draw;

    var chiasm = new Chiasm();

    chiasm.plugins.layout = ChiasmLayout;
    chiasm.plugins.links = ChiasmLinks;
    chiasm.plugins.barChart = barChart;

    chiasm.getComponent('layout').then(function (comp) {
      comp.when(['containerSVG'], function (svg) {
        svg.attr('title', 'Bar Chart');
      });

      $scope.$on('$destroy', function () {
        if (typeof comp.destroy === 'function') { comp.destroy(); }
      });
    });

    function draw () {
      chiasm.config = dataPackage.resources[1].data;
      chiasm.data = dataPackage.resources[0].data;
    }

    $scope.change = draw;
    draw();
  }
}

export default {
  controller: Ctrl,
  templateUrl: 'components/examples/chiasm/chiasm.html',
  datapackageUrl: 'components/examples/chiasm/datapackage.json'
};
