import { annotate } from 'angular-annotation-decorator/src/index';

import biovisexpressionbar from 'expression-bar';

@annotate('$scope', 'dataPackage')
class BioJSCtrl {
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

export default {
  controller: BioJSCtrl,
  templateUrl: 'components/examples/biojs/biojs.html',
  datapackageUrl: 'components/examples/biojs/datapackage.json'
};
