import gulp from 'gulp';
import browserSync from 'browser-sync';

import paths from '../paths';

gulp.task('server', [], done => {
  browserSync({
    open: false,
    port: 9000,
    online: false,
    server: {
      baseDir: [paths.dataset, paths.base],  // dataset overrides base
      middleware: (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

gulp.task('server:dist', [], done => {
  browserSync({
    open: false,
    port: 9000,
    online: false,
    server: {
      baseDir: [paths.dist],
      middleware: (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

gulp.task('watch', ['server'], () => {
  gulp.watch([`${paths.base}/**/*.{js,css,html,json}`], file => {
    browserSync.reload(file.path);
  }).on('change', event => {
    console.log(`File ${event.path} was ${event.type}, running tasks...`);
  });
});

gulp.task('run', ['test:watch', 'serve']);
