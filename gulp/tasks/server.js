import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';

import config from '../config';

gulp.task('server:dev', done => {
  browserSync(config.devServer, done);
});

gulp.task('server:dist', done => {
  browserSync(config.distServer, done);
});

gulp.task('watch', () => {
  gulp.watch(config.paths.resources, ['copy']);
  gulp.watch(config.paths.data, ['data']);
  gulp.watch(config.paths.templates, ['html', 'jspm-build']);
  gulp.watch(config.paths.scripts, ['js', 'jspm-build']);
  gulp.watch(config.paths.styles, ['css', 'jspm-build']);
});

gulp.task('watch-tmp', () => {
  gulp.watch(config.paths.templates, ['html']);
});

// old commands
gulp.task('dev', ['clean-tmp', 'server:dev']);

gulp.task('dev', cb => {
  runSequence('clean-tmp',
              'html-tmp',
              'server:dev',
              'watch-tmp',
              cb);
});

gulp.task('dist', cb => {
  runSequence('build',
              'watch',
              'server:dist',
              cb);
});
