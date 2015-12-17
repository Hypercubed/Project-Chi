import Inject from 'common/decorators/inject';

import 'common/styles/index.css!';

@Inject('$scope', 'dataPackage', 'dataService')
export default class IndexCtrl {
  constructor ($scope, dataPackage, dataService) {
    $scope.dataPackage = dataPackage;

    dataPackage.resources.forEach(function (resource) {
      dataService.normalizePackage(resource.url, resource.data);
      return dataService.loadPackage(resource.url).then(function (dataPackage) {
        dataPackage.resources.forEach(function (resource) {
          dataService.normalizePackage(resource.url, resource.data);
        });
        resource.data = dataPackage;
      });
    });
  }
}
