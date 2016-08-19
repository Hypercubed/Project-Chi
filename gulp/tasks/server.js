import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

import config from '../config';

Object.keys(config.server).forEach(key => {
  gulp.task(`server-${key}`, done => {
    browserSync(config.server[key], done);
  });
});

gulp.task('watch-dist', () => {
  gulp.watch(config.paths.resources, ['copy-resources']);
  gulp.watch(config.paths.data, ['copy-data']);
  gulp.watch(config.paths.templates, ['copy-html', 'jspm-build-app']);
  gulp.watch(config.paths.scripts, ['copy-js', 'jspm-build-app']);
  gulp.watch(config.paths.styles, ['copy-css', 'jspm-build-app']);
});

gulp.task('watch-dev', () => {
  gulp.watch(config.paths.templates, ['copy-html-tmp']);
});

gulp.task('dev', cb => {
  runSequence('clean-tmp',
              'copy-html-tmp',
              'server-dev',
              'watch-dev',
              cb);
});

gulp.task('dist', cb => {
  runSequence('build',
              'watch-dist',
              'server-dist',
              cb);
});

gulp.task('default', ['dev']);
