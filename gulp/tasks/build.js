import gulp from 'gulp';

// import jspm from 'jspm';
import del from 'del';
import vfs from 'vinyl-fs';
import runSequence from 'run-sequence';

import cached from 'gulp-cached';
import plumber from 'gulp-plumber';
import template from 'gulp-template';

import config from '../config';

const paths = config.paths;

// copy resources to distribution and temp folder
gulp.task('copy-resources', () => {
  return gulp.src(paths.resources, {followSymlinks: true})
    .pipe(cached('copy'))
    .pipe(plumber())
    .pipe(gulp.dest(paths.temp))
    .pipe(gulp.dest(paths.dist));
});

// copy jspm_package resources to distribution
gulp.task('copy-jspm-resources', () => {
  return gulp.src(paths.jspmResources, {followSymlinks: true})
    .pipe(cached('copy-jspm'))
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist));
});

// copy data to distribution folder
gulp.task('copy-data', () => {
  return gulp.src(paths.data)
    .pipe(gulp.dest(paths.dist));
});

// copy templates to temp and distribution folder
gulp.task('copy-html', () => {
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

// copy templates to temp and distribution folder
gulp.task('copy-html-tmp', () => {
  return gulp.src(config.paths.templates)
    .pipe(cached('templates'))
    .pipe(plumber())
    .pipe(template(config))
    .pipe(gulp.dest(config.paths.temp));
});

// copy scripts to temp folder
gulp.task('copy-js', () => {
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

// copy css to temp folder
gulp.task('copy-css', () => {
  return gulp.src(paths.styles)
    .pipe(cached('styles'))
    .pipe(plumber())
    .pipe(gulp.dest(paths.temp));
});

// symlink data into temp folder to avoid copy
gulp.task('symlink-data', () => {
  if (!paths.dataLink || paths.dataLink.length === 0) {
    return;
  }
  return vfs.src(paths.dataLink, {followSymlinks: false, buffer: false, allowEmpty: true})
    .pipe(vfs.symlink(`${paths.dist}/data`));
});

gulp.task('clean-dist', () => del(paths.dist));
gulp.task('clean-tmp', () => del(paths.temp));

gulp.task('clean', ['clean-tmp', 'clean-dist']);
gulp.task('copy', ['copy-resources', 'copy-js', 'copy-css', 'copy-data', 'copy-html', 'copy-jspm-resources']);

gulp.task('build', cb => {
  runSequence('clean',
              'copy',
              ['symlink-data', 'jspm-build'],
              cb);
});

gulp.task('rebuild', cb => {
  runSequence('copy',
              'jspm-rebuild',
              cb);
});
