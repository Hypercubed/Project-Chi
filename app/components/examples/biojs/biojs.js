'use strict';

import biovisexpressionbar from 'expression-bar';

export default class BioJSCtrl {

  /*@ngInject*/
  constructor($scope, dataPackage){
    $scope.dataPackage = dataPackage;
    $scope.draw = draw;

    var bar;

    function draw() {
      bar = bar || new biovisexpressionbar.ExpressionBar({
      	target: '_examples_biojs__viewer',
        height: 300
      });

      bar.data = dataPackage.resources[0].data;
      bar.data_loaded();
    }

    $scope.change = draw;
    draw();

  }

}

BioJSCtrl.$inject = ['$scope', 'dataPackage'];
