import vg from 'vega/vega';
import vl from 'vega-lite/vega-lite';
import d3 from 'd3';

function controller () {
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

    config.spec.width = width - config.spec.padding.left - config.spec.padding.right;
    config.spec.height = 440 / 900 * width;

    if (config.mode === 'vega-lite') {
      config.spec.data.values = data;
      config.spec = vl.compile(config.spec).spec;
    } else {
      config.spec.data[0].values = data;
    }

    vg.parse.spec(config.spec, (error, chart) => {
      if (error) {
        console.error(error);
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
