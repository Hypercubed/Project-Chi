import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import vfs from 'vinyl-fs';

import paths from '../paths';

const options = {
  // remoteUrl: 'git@github.com:Hypercubed/Project-Chi.git',
  branch: 'gh-pages'
};

// copy data before deploy
gulp.task('copy:data', [], () => {
  return gulp.src(`${paths.dataset}/data/**/*`, {base: paths.dataset})
    .pipe(gulp.dest(paths.dist));
});

gulp.task('deploy', [], () => {
  return vfs.src(`${paths.dist}/**/*`, {followSymlinks: true})
    .pipe(ghPages(options));
});
