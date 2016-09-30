import angular from 'angular';

import biovisexample from 'biojs-vis-example';
import fasta from 'biojs-io-fasta/lib/fasta';

import './biojs.css!';

function controller () {
  const $ctrl = this;
  const $el = angular.element(document.getElementById('_examples_biojs__viewer'));

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      enableSvgDownload: false,
      enablePngDownload: false,
      onChange: draw
    },
    $onInit () {
      draw();
    }
  });

  function draw () {
    $el.empty();

    $ctrl.dataPackage.resources
      .filter(r => r.format === 'fasta')
      .forEach(r => {
        fasta.parse(r.content)
          .forEach(d => {
            const $fe = angular.element(`
              <div>
                <h3>${d.name}</h3>
                <biovisexample></biovisexample>
              </div>`
            );

            biovisexample({el: $fe.find('biovisexample')[0], sequence: d.seq});
            $el.append($fe);
          });
      });
  }
}

export default {
  controller,
  templateUrl: 'components/examples/biojs/biojs.html',
  bindings: {
    dataPackage: '<package'
  }
};
