import vg from 'vega/vega';
import vl from 'vega-lite/vega-lite';

controller.$inject = ['$log'];
function controller ($log) {
  const $ctrl = this;

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      onChange: draw
    },
    draw,
    $onInit: draw
  });

  function draw () {
    const element = document.querySelector('#_examples_vega__chart');
    const width = element.clientWidth;

    const config = $ctrl.dataPackage.resources[0].data;
    const data = $ctrl.dataPackage.resources[1].data;
    let spec = config.spec || {};

    spec.width = width - 20 - (spec.padding ? spec.padding.left + spec.padding.right : 0);
    spec.height = 440 / 900 * width;

    if (config.mode === 'vega-lite') {
      spec.data.values = data;
      spec = vl.compile(spec).spec;
    } else {
      spec.data[0].values = data;
    }

    vg.parse.spec(spec, (error, chart) => {
      if (error) {
        $log.error(error);
      }
      chart({
        el: element,
        renderer: 'svg'
      }).update();
    });
  }
}

export default {
  controller,
  templateUrl: 'components/examples/vega/bars.html',
  bindings: {
    dataPackage: '<package'
  }
};
