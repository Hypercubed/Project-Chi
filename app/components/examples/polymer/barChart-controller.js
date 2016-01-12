import { annotate } from 'angular-annotation-decorator/src/index';

import './bar-chart-tag.html!';
import './bar-chart-tag';

@annotate('$scope', 'dataPackage')
class Ctrl {
  constructor ($scope, dataPackage) {
    $scope.dataPackage = dataPackage;
  }
}

export default {
  controller: Ctrl,
  templateUrl: 'components/examples/polymer/barChart-template.html',
  datapackageUrl: 'components/examples/polymer/datapackage.json'
};
