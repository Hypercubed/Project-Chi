import gulp from 'gulp';

// import tap from 'gulp-tap';
import vfs from 'vinyl-fs';
import SystemJSBuilder from 'systemjs-builder';
import runSequence from 'run-sequence';
import gutil from 'gulp-util';
import replace from 'gulp-replace';
import through from 'through2';
import execa from 'execa';

import config from '../config';

const paths = config.paths;

// symlink jspm_packages into temp folder to avoid copy
gulp.task('jspm-symlink', () => {
  return vfs.src(paths.jspmLink, {followSymlinks: false, buffer: false})
    .pipe(vfs.symlink(`${paths.temp}/jspm_packages`, {overwrite: true}));
});

gulp.task('jspm-bundle-app', () => {
  const builder = new SystemJSBuilder('./', './system.config.js');
  builder.config(config.builder.config);
  return builder.bundle(config.builder.bundles.app, `${paths.temp}/${paths.bundles}/app.js`, config.builder.bundle);
});

gulp.task('jspm-bundle-deps', () => {
  const builder = new SystemJSBuilder('./', './system.config.js');
  builder.config(config.builder.config);
  return builder.bundle(config.builder.bundles.deps, `${paths.temp}/${paths.bundles}/deps.js`, config.builder.bundle);
});

// copy bundles to dist folder
gulp.task('jspm-copy-bundles', () => {
  return gulp.src(`${paths.temp}/${paths.bundles}/*.*`, {base: paths.temp})
    .pipe(replace('../../jspm_packages', '../jspm_packages'))  // fix relative paths in css
    .pipe(gulp.dest(paths.dist));
});

gulp.task('jspm-copy-config', () => {
  return gulp.src(paths.systemConfig)
    .pipe(gulp.dest(paths.temp))
    .pipe(gulp.dest(paths.dist));
});

function generateTreemap () {
  return through.obj((file, encoding, callback) => {
    gutil.log(`Generating treemap for ${file.relative}`);
    execa.stdout('source-map-explorer', ['--tsv', file.path, `${file.path}.map`])
      .then(result => {
        file.contents = new Buffer(result);
        file.path = gutil.replaceExtension(file.path, '.tsv');
        callback(null, file);
      })
      .catch(err => {
        console.log(err);
        callback(err);
      });
  });
}

gulp.task('jspm-treemaps', () => {
  gulp.src(`${config.paths.dist}/${config.paths.bundles}/*.js`, {read: false})
    .pipe(generateTreemap())
    .pipe(gulp.dest(`${config.paths.dist}/${config.paths.bundles}`));
});

gulp.task('jspm-rebuild', cb => {
  runSequence('jspm-bundle-app',
              'jspm-copy-bundles',
              'jspm-treemaps',
              cb);
});

gulp.task('jspm-build', cb => {
  runSequence(
    // 'jspm-symlink',
    'jspm-copy-config',
    'jspm-bundle-deps',
    'jspm-bundle-app',
    'jspm-copy-bundles',
    'jspm-treemaps',
  cb);
});
