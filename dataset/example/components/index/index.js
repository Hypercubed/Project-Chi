import {annotate} from 'angular-annotation-decorator/src/index';

import template from './index.html!text';
import 'common/styles/index.css!';

@annotate('dataService')
class controller {
  constructor (dataService) {
    this.dataPackage.resources.forEach(resource => {
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
  controller,
  template,
  bindings: {
    dataPackage: '<package'
  }
};
