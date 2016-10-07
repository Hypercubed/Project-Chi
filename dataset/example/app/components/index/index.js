import template from './index.html!text';
import 'common/styles/index.less!';

controller.$inject = ['dataService'];
function controller (dataService) {
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

export default {
  controller,
  template,
  bindings: {
    dataPackage: '<package'
  }
};
