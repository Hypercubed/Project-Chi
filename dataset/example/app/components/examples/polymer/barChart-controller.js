import './bar-chart-tag.html!';
import './bar-chart-tag';

class controller {
  constructor () {
    this.editorOptions = {
      data: this.dataPackage
    };
  }
}

export default {
  controller,
  templateUrl: 'components/examples/polymer/barChart-template.html',
  bindings: {
    dataPackage: '<package'
  }
};
