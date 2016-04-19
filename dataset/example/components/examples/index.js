import {annotate} from 'angular-annotation-decorator/src/index';

import 'common/styles/index.css!';

@annotate('dataService')
class controller {
  constructor (dataService) {
    this.dataPackage.resources.forEach(resource => {
      dataService.normalizePackage(resource.url, resource.data);
    });
  }
}

export default {
  controller,
  templateUrl: 'components/examples/index.html',
  bindings: {
    dataPackage: '<package'
  }
};
