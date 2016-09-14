import proc from 'child_process';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import packager from 'electron-packager';
import electron from 'electron';

import config from '../config';

const paths = config.paths;

gulp.task('run-electron-dev', cb => {
  proc.spawn(electron, [paths.base], {stdio: 'inherit'})
    .on('close', cb);
});

gulp.task('run-electron-prod', cb => {
  proc.spawn(electron, [paths.dist], {stdio: 'inherit'})
    .on('close', cb);
});

gulp.task('electron-packager', cb => {
  packager({
    dir: './dist/',
    asar: true,
    out: 'builds',
    overwrite: true
  }, cb);
});

gulp.task('dev-electron', cb => {
  runSequence('dev', 'set-dev-node-env', 'run-electron-dev', cb);
});

gulp.task('dist-electron', cb => {
  runSequence('build', 'set-prod-node-env', 'run-electron-prod', cb);
});

gulp.task('build-electron', cb => {
  runSequence('build', 'set-dev-node-env', 'electron-packager', cb);
});
