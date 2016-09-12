import execa from 'execa';
import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('run-electron-dev', () => {
  execa.shell('NODE_ENV=development electron ./app/').catch(console.log.bind(console));
});

gulp.task('run-electron-prod', () => {
  execa.shell('NODE_ENV=production electron ./dist/').catch(console.log.bind(console));
});

gulp.task('run-electron-build', () => {
  execa.shell('NODE_ENV=production electron-packager ./dist/ --version 1.3.5 --out builds').catch(console.log.bind(console));
});

gulp.task('dev-electron', cb => {
  runSequence('dev', 'set-prod-node-env', 'run-electron-dev', cb);
});

gulp.task('dist-electron', cb => {
  runSequence('build', 'set-dev-node-env', 'run-electron-prod', cb);
});

gulp.task('build-electron', cb => {
  runSequence('build', 'set-dev-node-env', 'run-electron-build', cb);
});
