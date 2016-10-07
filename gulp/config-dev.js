'use strict';

import {argv, BASE} from './utils/args';

export default {
  builder: {
    devBundle: argv.bundle,
    bundles: {
      'deps-bundle': `${BASE}/components/boot.js + universe + d3-svg-legend + d3-tip + URIjs + angular-ui-grid - [${BASE}/**/*] - [${BASE}/**/*!css] - [${BASE}/**/*!text] - [${BASE}/**/*!md]`
    },
    config: {
      production: false,
      buildCSS: true,
      buildHTML: true,
      separateCSS: true,
      paths: {
        'github:*': 'jspm_packages/github/*',
        'npm:*': 'jspm_packages/npm/*',
        'components/*': 'app/components/*',
        'common/*': 'app/common/*',
        'bundles/*': 'app/bundles/*'
      }
    },
    bundle: {
      sourceMaps: true,
      minify: false,
      mangle: false,
      runtime: false,
      esOptimize: false,
      cssOptimize: false,
      rollup: false
    }
  }
};
