import Inject from 'common/decorators/inject';

import './bar-chart-tag.html!';
import './bar-chart-tag';

@Inject('$scope', 'dataPackage')
export default class Ctrl {
  constructor ($scope, dataPackage) {
    $scope.dataPackage = dataPackage;
  }
}
