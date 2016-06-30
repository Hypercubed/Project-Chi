import {exec} from 'child_process';
import file from 'gulp-file';
import gulp from 'gulp';

import config from '../config';

gulp.task('tree', cb => {
  const bundle = config.paths.bundle;
  const outFile = config.paths.bundle.replace('.js', '.tsv');

  const cmd = `node_modules/.bin/source-map-explorer --tsv --replace "^" --with "components/" --replace "components/\.\./" --with "" ${bundle} ${bundle}.map`;

  exec(cmd, (err, stdout) => {
    if (err) {
      cb(err);
    }
    file(outFile, stdout, {src: true})
      .pipe(gulp.dest('.'))
      .on('end', cb);
  });
});
