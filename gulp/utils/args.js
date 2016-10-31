import {join} from 'path';

import minimist from 'minimist';

const argv = minimist(process.argv.slice(2), {
  boolean: ['debug', 'dev', 'prod', 'bundle', 'open', 'online'],
  alias: {
    env: ['environment', 'e'],
    dev: ['development'],
    prod: ['production'],
    dataset: ['d']
  },
  default: {
    bundle: false,  // build dev bundle
    open: false,
    dataset: 'dataset/example',
    port: 9000,
    online: false,
    debug: false
  }
});

const PROJECT_ROOT = join(__dirname, '../..');  // needed so that imports could co-exist with requires (on some edge cases)

/**
 * Available environments.
 */
const ENVIRONMENTS = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};

/**
 * These tasks force ENVIRONMENTS.PRODUCTION
 */
const PRODTASKS = ['build', 'dist', 'deploy', 'dist-electron', 'build-electron', 'e2e'];

const BASE = 'app';
const DIST = 'dist';
const TMP = '.tmp';
const BUILD = 'components/boot.js';
const ENV = getEnvironment();

const DATASET = join(argv.dataset, '.');

export {
  argv,
  ENV,
  BASE,
  TMP,
  DIST,
  BUILD,
  PROJECT_ROOT,
  DATASET
};

function getEnvironment () {
  let env = ENVIRONMENTS.DEVELOPMENT;
  if (typeof argv.env === 'string') {
    env = argv.env.toLowerCase();
  } else if (argv.prod) {
    env = ENVIRONMENTS.PRODUCTION;
  } else if (argv.dev) {
    env = ENVIRONMENTS.DEVELOPMENT;
  } else if (Array.isArray(argv._)) {
    if (argv._.some(o => PRODTASKS.indexOf(o) >= 0)) {
      env = ENVIRONMENTS.PRODUCTION;
    }
  }
  return (env === ENVIRONMENTS.PRODUCTION) ? ENVIRONMENTS.PRODUCTION : ENVIRONMENTS.DEVELOPMENT;
}
