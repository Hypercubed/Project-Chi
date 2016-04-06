import {annotate} from 'angular-annotation-decorator/src/index';

import template from './index.html!text';
import 'common/styles/index.css!';

@annotate('$scope', 'dataPackage', 'dataService')
class IndexCtrl {
  constructor ($scope, dataPackage, dataService) {
    $scope.dataPackage = dataPackage;

    dataPackage.resources.forEach(resource => {
      dataService.normalizePackage(resource.url, resource.data);
      return dataService.loadPackage(resource.url).then(dataPackage => {
        dataPackage.resources.forEach(resource => {
          dataService.normalizePackage(resource.url, resource.data);
        });
        resource.data = dataPackage;
      });
    });
  }
}

export default {
  controller: IndexCtrl,
  datapackageUrl: 'components/index/datapackage.json',
  template
};
