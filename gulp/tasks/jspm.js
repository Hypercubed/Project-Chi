import {execSync} from 'child_process';

import gulp from 'gulp';

import tap from 'gulp-tap';
import vfs from 'vinyl-fs';
import SystemJSBuilder from 'systemjs-builder';
import runSequence from 'run-sequence';
import gutil from 'gulp-util';

import config from '../config';

const paths = config.paths;

// symlink jspm_packages into temp folder to avoid copy
gulp.task('jspm-symlink', () => {
  return vfs.src(paths.jspmLink, {followSymlinks: false, buffer: false})
    .pipe(vfs.symlink(`${paths.temp}/jspm_packages`, {overwrite: true}));
});

gulp.task('jspm-bundle-app', () => {
  const builder = new SystemJSBuilder(paths.temp, `${paths.temp}/system.config.js`);
  builder.config(config.builder.config);
  return builder.bundle(config.builder.bundles.app, `${paths.temp}/${paths.bundles}/app.js`, config.builder.bundle);
});

gulp.task('jspm-bundle-deps', () => {
  const builder = new SystemJSBuilder(paths.temp, `${paths.temp}/system.config.js`);
  builder.config(config.builder.config);
  return builder.bundle(config.builder.bundles.deps, `${paths.temp}/${paths.bundles}/deps.js`, config.builder.bundle);
});

// copy bundles to dist folder
gulp.task('jspm-copy-bundles', () => {
  return gulp.src(`${paths.temp}/${paths.bundles}/*.*`, {base: paths.temp})
    .pipe(gulp.dest(paths.dist));
});

const cmd = bundle => `node_modules/.bin/source-map-explorer --tsv ${bundle} ${bundle}.map`;

gulp.task('jspm-treemaps', () => {
  gulp.src(`${config.paths.dist}/${config.paths.bundles}/*.js`)
    .pipe(tap(file => {
      gutil.log(`generating treemap for ${file.path}`);
      file.contents = execSync(cmd(file.path));
      file.path = gutil.replaceExtension(file.path, '.tsv');
    }))
    .pipe(gulp.dest(`${config.paths.dist}/${config.paths.bundles}`));
});

gulp.task('jspm-build', cb => {
  runSequence('jspm-symlink',
              'jspm-bundle-deps',
              'jspm-bundle-app',
              'jspm-copy-bundles',
              'jspm-treemaps',
              cb);
});
