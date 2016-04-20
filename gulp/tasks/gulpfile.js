import gulp from 'gulp';

import SystemJSBuilder from 'systemjs-builder';
import del from 'del';
// import vfs from 'vinyl-fs';
// var karma = require('karma').server;
import runSequence from 'run-sequence';
import gulpLoad from 'gulp-load-plugins';
// import {argv as args} from 'yargs';

import paths from '../config';

const $ = gulpLoad();

gulp.task('help', $.taskListing);

// copy resources to distribution and temp folder
gulp.task('copy', [], () => {
  return gulp.src(paths.resources, {followSymlinks: true})
    .pipe($.cached('copy'))
    .pipe($.plumber())
    .pipe(gulp.dest(paths.temp))
    .pipe(gulp.dest(paths.dist));
});

// copy data to distribution folder
gulp.task('data', [], () => {
  return gulp.src(paths.data)
    .pipe(gulp.dest(paths.dist));
});

// copy templates to temp and distribution folder
gulp.task('html', () => {
  return gulp.src(paths.templates)
    .pipe($.cached('templates'))
    .pipe($.plumber())
    /* .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    })) */
    .pipe(gulp.dest(paths.temp))
    .pipe(gulp.dest(paths.dist));
});

// copy scripts to temp folder
gulp.task('js', [], () => {
  return gulp.src(paths.scripts)
    .pipe($.cached('scripts'))
    .pipe($.plumber())
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
gulp.task('bundles', [], () => {
  return gulp.src(`${paths.temp}/components/bundle.*`, {base: paths.temp})
    // .pipe($.cached('bundle'))
    // .pipe($.plumber())
    .pipe(gulp.dest(paths.dist));
});

// copy css to temp folder
gulp.task('css', [], () => {
  return gulp.src(paths.styles)
    .pipe($.cached('styles'))
    .pipe($.plumber())
    .pipe(gulp.dest(paths.temp));
});

// symlink jspm_packages into temp folder to avoid copy
gulp.task('symlink', () => {
  return gulp.src([`${paths.base}/jspm_packages/`])
    .pipe($.symlink.absolute([`${paths.temp}/jspm_packages`], {force: true}));
});

// symlink data into temp folder to avoid copy
gulp.task('symlink:data', () => {
  return gulp.src([`${paths.dataset}/data/`])
    .pipe($.symlink.absolute([`${paths.dist}/data`], {force: true}));
});

gulp.task('builder', [], () => {
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

gulp.task('clean', cb => {
  del(paths.dist, cb);
});

gulp.task('clean:tmp', cb => {
  del(paths.temp, cb);
});

gulp.task('build', cb => {
  runSequence(['clean', 'clean:tmp'],
              ['copy', 'js', 'css', 'data', 'html', 'symlink', 'symlink:data'],
              'builder',
              'bundles',
              cb);
});
