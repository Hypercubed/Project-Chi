import gulp from 'gulp';
import taskListing from 'gulp-task-listing';

gulp.task('help', taskListing);

gulp.task('set-dev-node-env', () => {
  process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', () => {
  process.env.NODE_ENV = 'production';
});
