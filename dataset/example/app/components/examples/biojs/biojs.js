// import biovisexpressionbar from 'expression-bar';
import biovisexample from 'biojs-vis-example';
import Fasta from 'biojs-io-fasta/lib/fasta';

import './biojs.css!';

function controller () {
  const $ctrl = this;
  const $el = document.getElementById('_examples_biojs__viewer');

  Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      enableSvgDownload: false,
      enablePngDownload: false,
      onChange: update
    },
    $onInit () {
      update();
    }
  });

  function update () {
    while ($el.firstChild) {
      $el.removeChild($el.firstChild);
    }

    $ctrl.fasta = Fasta.parse($ctrl.dataPackage.resources[0].content)[0];

    biovisexample({
      el: $el,
      sequence: $ctrl.fasta.seq
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
