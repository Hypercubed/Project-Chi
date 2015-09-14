'use strict';

import Chiasm from 'chiasm';
import ChiasmLayout from 'chiasm-layout';
import ChiasmLinks from 'chiasm-links';

import barChart from './barChart';


import 'codemirror/lib/codemirror.css!';
import 'inlet/inlet.css!';
import './axes.css!';

import _ from 'lodash';

// because chiasm-layout is missing underscore/lodash import.
window._ = _;

export default class ChiasmCtrl {
  /*@ngInject*/
  constructor($scope, dataPackage){
    var main = this;

    $scope.dataPackage = dataPackage;
    $scope.draw = draw;

    var chiasm = new Chiasm(document.getElementById('chiasm-container'));

    chiasm.plugins.layout = ChiasmLayout;
    chiasm.plugins.links = ChiasmLinks;
    chiasm.plugins.barChart = barChart;

    chiasm.getComponent('layout').then(function(comp) {
      comp.when(['containerSVG'], function(svg) {
        svg.attr('title', 'Bar Chart');
      });

      $scope.$on('$destroy', function() {
        if (typeof comp.destroy === 'function' ) { comp.destroy(); }
      });
    });

    function draw() {
      chiasm.config = dataPackage.resources[1].data;
      chiasm.data = dataPackage.resources[0].data;
    }

    $scope.change = draw;
    draw();

  }
}

ChiasmCtrl.$inject = ['$scope', 'dataPackage'];
