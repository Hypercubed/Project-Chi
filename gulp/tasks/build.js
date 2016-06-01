import gulp from 'gulp';

// import jspm from 'jspm';
import del from 'del';
import vfs from 'vinyl-fs';
import SystemJSBuilder from 'systemjs-builder';
import runSequence from 'run-sequence';
// import htmlmin from 'gulp-htmlmin';
import taskListing from 'gulp-task-listing';
import cached from 'gulp-cached';
import plumber from 'gulp-plumber';
import template from 'gulp-template';

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

// copy jspm_package resources to distribution
gulp.task('copy-jspm', () => {
  return gulp.src(paths.jspmResources, {followSymlinks: true})
    .pipe(cached('copy-jspm'))
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist));
});

// copy data to distribution folder
gulp.task('data', () => {
  return gulp.src(paths.data)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('html-tmp', () => {
  return gulp.src(paths.templates)
    .pipe(cached('templates'))
    .pipe(plumber())
    .pipe(template(config))
    /* .pipe(htmlmin({
      collapseWhitespace: true
    })) */
    .pipe(gulp.dest(paths.temp));
});

// copy templates to temp and distribution folder
gulp.task('html', () => {
  return gulp.src(paths.templates)
    .pipe(cached('templates'))
    .pipe(plumber())
    .pipe(template(config))
    /* .pipe(htmlmin({
      collapseWhitespace: true
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
  if (!paths.dataLink || paths.dataLink.length === 0) {
    return;
  }
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
              ['copy', 'js', 'css', 'data', 'html', 'copy-jspm'],
              ['symlink-jspm', 'symlink-data'],
              'jspm-build',
              'tree',
              cb);
});
