'use strict';

//import './template.css!'

import Chart from './trains-chart';

export default class TrainsCtrl {
  /*@ngInject*/
  constructor($scope, dataPackage){

    var chart = new Chart();

    $scope.dataPackage = dataPackage;
    $scope.change = draw;

    draw();

    function draw() {

      var data = dataPackage.resources.map(function(d) { return d.data; });

      var divs = d3.select("#charts")
        .selectAll('div').data(data);

      divs.enter().append('div');

      divs.call(chart);
    };

  }
}

TrainsCtrl.$inject = ['$scope', 'dataPackage'];

TrainsCtrl.resolve = {
  /*@ngInject*/
  dataPackage: ['$route', 'dataService', function($route, dataService) {
    return dataService.loadPackage($route.current.templateUrl+'/../dataPackage.json');
  }],
};
