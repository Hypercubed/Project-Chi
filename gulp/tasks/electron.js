import execa from 'execa';
import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('run-electron-dev', () => {
  execa.shell('electron ./app/').catch(console.log.bind(console));
});

gulp.task('run-electron-prod', () => {
  execa.shell('electron ./dist/').catch(console.log.bind(console));
});

gulp.task('run-electron-build', () => {
  execa.shell('electron-packager ./dist/ --out builds --overwrite --asar').catch(console.log.bind(console));
});

gulp.task('dev-electron', cb => {
  runSequence('dev', 'set-dev-node-env', 'run-electron-dev', cb);
});

gulp.task('dist-electron', cb => {
  runSequence('build', 'set-prod-node-env', 'run-electron-prod', cb);
});

gulp.task('build-electron', cb => {
  runSequence('build', 'set-dev-node-env', 'run-electron-build', cb);
});
