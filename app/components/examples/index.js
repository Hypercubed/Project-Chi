import { annotate } from 'angular-annotation-decorator/src/index';

import 'common/styles/index.css!';

@annotate('$scope', 'dataPackage', 'dataService')
class IndexCtrl {
  constructor ($scope, dataPackage, dataService) {
    $scope.dataPackage = dataPackage;

    dataPackage.resources.forEach(function (resource) {
      dataService.normalizePackage(resource.url, resource.data);
    });
  }
}

export default {
  controller: IndexCtrl,
  datapackageUrl: 'components/examples/datapackage.json',
  templateUrl: 'components/examples/index.html'
};
