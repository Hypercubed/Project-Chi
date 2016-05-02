import 'common/styles/index.css!';

controller.$inject = ['dataService'];
function controller(dataService) {
  this.dataPackage.resources.forEach(resource => {
    dataService.normalizePackage(resource.url, resource.data);
  });
}

export default {
  controller,
  templateUrl: 'components/examples/index.html',
  bindings: {
    dataPackage: '<package'
  }
};
