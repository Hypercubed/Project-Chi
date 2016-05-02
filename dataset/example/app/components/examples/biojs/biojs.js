import biovisexpressionbar from 'expression-bar';

function controller () {
  const $ctrl = this;

  const bar = new biovisexpressionbar.ExpressionBar({
    target: '_examples_biojs__viewer',
    height: 300
  });

  Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      onChange: update
    },
    $onInit () {
      update();
    }
  });

  function update () {
    bar.data = $ctrl.dataPackage.resources[0].data;
    bar.data_loaded();
  }
}

export default {
  controller,
  templateUrl: 'components/examples/biojs/biojs.html',
  bindings: {
    dataPackage: '<package'
  }
};
