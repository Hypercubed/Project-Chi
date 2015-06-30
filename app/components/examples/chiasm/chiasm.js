'use strict';

import Chiasm from 'chiasm';

import 'codemirror/lib/codemirror.css!';
import 'inlet/inlet.css!';
import './axes.css!';

var path = 'components/chiasm/config/';

export default class ChiasmCtrl {
  /*@ngInject*/
  constructor($scope, dataPackage){
    var main = this;

    $scope.dataPackage = dataPackage;
    $scope.draw = draw;

    var chiasm = Chiasm(document.getElementById('container'));

    console.log(chiasm);

    chiasm.getComponent('barChart').then(function(barChartComp) {
      barChartComp.when(["svg","title"], function(svg, title) {
        svg.attr('title', title);
      });
    });

    chiasm.getComponent('layout').then(function(comp) {
      $scope.$on("$destroy", function() {
        comp.destroy();
      });
    });

    chiasm.when(['data'], function(data) {
      chiasm.getComponent('barChart').then(function(barChartComp) {
        barChartComp.data = data;
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

ChiasmCtrl.resolve = {
  /*@ngInject*/
  dataPackage: ['$route', 'dataService', function($route, dataService) {
    return dataService.loadPackage($route.current.templateUrl+'/../datapackage.json');
  }],
};
