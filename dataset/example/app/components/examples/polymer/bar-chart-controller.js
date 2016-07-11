import './bar-chart-tag.html!';
import './bar-chart-tag';

controller.$inject = ['$scope'];
function controller (/* $scope */) {
  return Object.assign(this, {
    editorOptions: {
      data: this.dataPackage
    }
  });
}

export default {
  controller,
  templateUrl: 'components/examples/polymer/bar-chart-template.html',
  bindings: {
    dataPackage: '<package'
  }
};
