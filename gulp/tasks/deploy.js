import gulp from 'gulp';
import gutil from 'gulp-util';
import ghPages from 'gulp-gh-pages';
import vfs from 'vinyl-fs';

import paths from '../config';

// copy data before deploy
gulp.task('copy:data', [], () => {
  return gulp.src(`${paths.dataset}/data/**/*`, {base: paths.dataset})
    .pipe(gulp.dest(paths.dist));
});

gulp.task('deploy', ['build'], () => {
  gutil.log('deploying to', gutil.colors.magenta(paths.ghPages.branch || 'gh-pages'), 'in', gutil.colors.magenta(paths.ghPages.remoteUrl || 'default'));
  return vfs.src([`${paths.dist}/**/*`], {followSymlinks: true, dot: true})
    .pipe(ghPages(paths.ghPages));
});
