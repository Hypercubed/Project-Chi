'use strict';

import './bar-chart-tag.html!';
import './bar-chart-tag';

export default class Ctrl {
  /* @ngInject */
  constructor ($scope, dataPackage) {
    $scope.dataPackage = dataPackage;
  }
}

Ctrl.$inject = ['$scope', 'dataPackage'];
