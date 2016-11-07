'use strict';

import {argv, DIST, TMP, BUILD} from './utils/args';

export default {
  server: {
    dist: {
      open: argv.open,
      port: argv.port,
      online: argv.online,
      ghostMode: false,
      server: {
        baseDir: DIST,
        middleware: (req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }
      }
    }
  },
  builder: {
    bundles: {
      'deps-bundle': `${TMP}/${BUILD} - [${TMP}/**/*] - [${TMP}/**/*!css] - [${TMP}/**/*!text] - [${TMP}/**/*!md] + util + text + json + util/isBuffer`,
      'app-bundle': `${TMP}/${BUILD} - ${TMP}/bundles/deps-bundle.js`
    },
    config: {
      buildCSS: true,
      buildHTML: true,
      separateCSS: true,
      paths: {
        'github:*': 'jspm_packages/github/*',
        'npm:*': 'jspm_packages/npm/*',
        'components/*': `${TMP}/components/*`,
        'common/*': `${TMP}/common/*`,
        'bundles/*': `${TMP}/bundles/*`
      }
    },
    bundle: {
      sourceMaps: true,
      minify: false,
      mangle: false,
      runtime: false,
      esOptimize: false,
      cssOptimize: true,
      rollup: false
    }
  }
};
