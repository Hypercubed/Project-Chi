import gulp from 'gulp';
import browserSync from 'browser-sync';

import config from '../config';

gulp.task('dev', [], done => {
  browserSync(config.devServer, done);
});

gulp.task('dist', ['build'], done => {
  browserSync(config.distServer, done);
});

gulp.task('watch', ['server'], () => {
  gulp.watch([`${config.paths.base}/**/*.{js,css,html,json}`], file => {
    browserSync.reload(file.path);
  }).on('change', event => {
    console.log(`File ${event.path} was ${event.type}, running tasks...`);
  });
});

// old commands
gulp.task('server', ['dev']);
gulp.task('server:dist', ['dist']);
