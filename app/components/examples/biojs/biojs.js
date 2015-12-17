import Inject from 'common/decorators/inject';

import biovisexpressionbar from 'expression-bar';

@Inject('$scope', 'dataPackage')
export default class BioJSCtrl {
  constructor ($scope, dataPackage) {
    $scope.dataPackage = dataPackage;
    $scope.draw = draw;

    var bar;

    function draw () {
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
