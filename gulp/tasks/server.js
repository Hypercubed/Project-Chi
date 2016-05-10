import gulp from 'gulp';
import browserSync from 'browser-sync';

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

// old commands
gulp.task('dev', ['server:dev']);
gulp.task('dist', ['build', 'watch', 'server:dist']);
