import gulp from 'gulp';

// import jspm from 'jspm';
import del from 'del';
import vfs from 'vinyl-fs';
import SystemJSBuilder from 'systemjs-builder';
import runSequence from 'run-sequence';
// import gulpLoad from 'gulp-load-plugins';
import taskListing from 'gulp-task-listing';
import cached from 'gulp-cached';
import plumber from 'gulp-plumber';
// import {argv as args} from 'yargs';

import config from '../config';

const paths = config.paths;

gulp.task('help', taskListing);

// copy resources to distribution and temp folder
gulp.task('copy', () => {
  return gulp.src(paths.resources, {followSymlinks: true})
    .pipe(cached('copy'))
    .pipe(plumber())
    .pipe(gulp.dest(paths.temp))
    .pipe(gulp.dest(paths.dist));
});

// copy data to distribution folder
gulp.task('data', () => {
  return gulp.src(paths.data)
    .pipe(gulp.dest(paths.dist));
});

// copy templates to temp and distribution folder
gulp.task('html', () => {
  return gulp.src(paths.templates)
    .pipe(cached('templates'))
    .pipe(plumber())
    /* .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    })) */
    .pipe(gulp.dest(paths.temp))
    .pipe(gulp.dest(paths.dist));
});

// copy scripts to temp folder
gulp.task('js', () => {
  return gulp.src(paths.scripts)
    .pipe(cached('scripts'))
    .pipe(plumber())
    /* .pipe(babel({
      modules: 'system',
      externalHelpers: true,
    	comments: false,
    	compact: false,
      moduleIds: false
    }))
    .pipe(ngAnnotate({
      sourceType: 'module'
    })) */
    .pipe(gulp.dest(paths.temp));
});

// copy bundles to dist folder
gulp.task('bundles', () => {
  return gulp.src(`${paths.temp}/components/bundle.*`, {base: paths.temp})
    // .pipe($.cached('bundle'))
    // .pipe($.plumber())
    .pipe(gulp.dest(paths.dist));
});

// copy css to temp folder
gulp.task('css', () => {
  return gulp.src(paths.styles)
    .pipe(cached('styles'))
    .pipe(plumber())
    .pipe(gulp.dest(paths.temp));
});

// symlink jspm_packages into temp folder to avoid copy
gulp.task('symlink-jspm', () => {
  return vfs.src(paths.jspmLink, {followSymlinks: false, buffer: false})
    .pipe(vfs.symlink(`${paths.temp}/jspm_packages`, {overwrite: true}));
});

// symlink data into temp folder to avoid copy
gulp.task('symlink-data', () => {
  return vfs.src(paths.dataLink, {followSymlinks: false, buffer: false, allowEmpty: true})
    .pipe(vfs.symlink(`${paths.dist}/data`));
});

gulp.task('bundle', () => {
  const builder = new SystemJSBuilder(paths.temp, `${paths.temp}/system.config.js`);

  // var builder = new jspm.Builder({baseURL: path.temp});

  builder.config({
    buildCSS: true,
    buildHTML: true
  });

  return builder.bundle(paths.build, `${paths.temp}/components/bundle.js`, {
    sourceMaps: true,
    minify: true,
    mangle: true,
    runtime: false,
    esOptimize: true
    /* inject: true */
  });
});

gulp.task('clean-dist', () => del(paths.dist));
gulp.task('clean-tmp', () => del(paths.temp));

gulp.task('jspm-build', cb => {
  runSequence('bundle',
              'bundles',
              cb);
});

gulp.task('build', cb => {
  runSequence(['clean-tmp', 'clean-dist'],
              ['symlink-jspm', 'symlink-data'],
              ['copy', 'js', 'css', 'data', 'html'],
              'jspm-build',
              cb);
});
