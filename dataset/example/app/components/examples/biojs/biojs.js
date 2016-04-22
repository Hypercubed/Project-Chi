import biovisexpressionbar from 'expression-bar';

class controller {
  constructor () {
    this.bar = new biovisexpressionbar.ExpressionBar({
      target: '_examples_biojs__viewer',
      height: 300
    });
    this.editorOptions = {
      data: this.dataPackage,
      onChange: () => this.draw()
    };
  }

  update () {
    this.bar.data = this.dataPackage.resources[0].data;
    this.bar.data_loaded();
  }

  $onInit () {
    this.update();
  }
}

export default {
  controller,
  templateUrl: 'components/examples/biojs/biojs.html',
  datapackageUrl: 'components/examples/biojs/datapackage.json',
  bindings: {
    dataPackage: '<package'
  }
};
