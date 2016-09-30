import vg from 'vega/vega';
import vl from 'vega-lite/vega-lite';
import {autorun} from 'mobx';

controller.$inject = ['$log', 'dataService', 'growl'];
function controller ($log, dataService, growl) {
  const $ctrl = this;

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage
    },
    $onInit: () => {
      $log.debug('$onInit');
      autorun(draw);
    }
  });

  function draw () {
    const element = document.querySelector('#_examples_vega__chart');

    const config = $ctrl.dataPackage.resources[0].data;
    const data = $ctrl.dataPackage.resources[1].data;
    let spec = config.spec || {};
    const width = spec.width || element.clientWidth;

    spec.width = width - 20 - (spec.padding ? spec.padding.left + spec.padding.right : 0);
    spec.height = spec.height || 440 / 900 * width;

    try {
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
    } catch (err) {
      $log.error(err);
      growl.error(err.message || err, {title: 'Error processing Vega config'});
    }
  }
}

export default {
  controller,
  templateUrl: 'components/examples/vega/bars.html',
  bindings: {
    dataPackage: '<package'
  }
};
